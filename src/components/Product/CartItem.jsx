import { Text, View, Image, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { formatCurrency } from '../../utils/price'
import cartItemApi from '../../apis/cartItemApi'
import { updateQuantity, removeFromCart } from '../../redux/actions/cart'
import showAlertOk from '../Alert/AlertOk'

function CartItem({ product, quantity, isCheckout }) {
    const dispatch = useDispatch()
    const [changeQuantity, setChangeQuantity] = useState(quantity || 1)
    const user = useSelector(state => state.auth)
    const handleMinusQuantity = () => {
        setChangeQuantity(quantity - 1)
    }
    const handlePlusQuantity = () => {
        setChangeQuantity(quantity + 1)
    }
    const handleDelete = () => {
        if (product?.id && user?.id) {
            Alert.alert(
                'Xóa sản phẩm khỏi giỏ',
                'Bấm chấp nhận!',
                [
                    {
                        text: 'Hủy',
                        style: 'cancel'
                    },
                    {
                        text: 'Chấp nhận',
                        onPress: () => {
                            cartItemApi.deleteCartItem(user?.id, product?.id)
                                .then(() => {
                                    dispatch(removeFromCart(product?.id))
                                })
                                .catch(err => {
                                    console.log(err)
                                    showAlertOk('Lỗi ', 'Bấm Ok để tiếp tục')
                                })
                        },
                        style: 'default'
                    }
                ]
            )
        } else {
            showAlertOk('Lỗi ', 'Bấm Ok để tiếp tục')
        }
    }
    useEffect(() => {
        const cartItem = {
            'id': {
                'customerId': user?.id,
                'productId': product.id
            },
            'quantity': changeQuantity
        }

        cartItemApi.updateCartItem(cartItem)
            .then(response => [
                dispatch(updateQuantity(response.data))
            ])
            .catch(err => {
                console.log(err)
            })
    }, [changeQuantity])
    return (
        <View className='flex-row items-center' >
            {/* <CheckBox value={false} style={{ marginHorizontal: 10 }} /> */}
            <View className='flex-row gap-2 items-center ml-2' style={{ flex: 8 }}>
                {product.image && <Image source={{
                    uri: product.image
                }} style={{ height: 70, width: 70, borderRadius: 10 }} />}
                <View className=''>
                    <Text className='text-sm font-normal text-gray-700 w-7/12' numberOfLines={2} ellipsizeMode="tail">{product?.name}</Text>
                    <Text className='text-sm font-bold text-red-500'>{formatCurrency(product?.price)}</Text>
                    {isCheckout ?
                        <Text className='text-base text-gray-400 w-10 text-center' >x{changeQuantity}</Text>
                        : <View className='flex-row items-center mt-1'>
                            <TouchableOpacity className='flex-row items-center bg-gray-200 justify-center w-5 h-5' onPress={handleMinusQuantity}>
                                <Icon name='minus' size={15} color={'gray'} />
                            </TouchableOpacity>
                            <Text className='text-base text-gray-400 w-10 text-center' >{changeQuantity}</Text>
                            <TouchableOpacity className='flex-row items-center bg-gray-200 justify-center w-5 h-5' onPress={handlePlusQuantity}>
                                <Icon name='plus' size={15} color={'gray'} />
                            </TouchableOpacity>
                        </View>}
                </View>
            </View>
            {isCheckout ?
                <Icon name='chevron-right' size={30} className='w-2' style={{ flex: 1, color: 'gray' }} />
                :
                <Icon name='delete' size={30} className='w-2' style={{ flex: 1, color: 'gray' }} onPress={handleDelete} />}
        </View>
    )
}
export default CartItem