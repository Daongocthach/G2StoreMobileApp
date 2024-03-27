import { Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Progress from 'react-native-progress'
import getStyles from './styles'
import promotionApi from '../../apis/promotionApi'
import showAlertOk from '../../components/Alert/AlertOk'
import { formatCurrency } from '../../utils/price'
import Address from '../../components/Address/Address'
import CartItem from '../../components/Product/CartItem'
import PaymentMethod from './PaymentMethod/PaymentMethod'
import orderApi from '../../apis/orderApi'
import ghnApi from '../../apis/ghnApi'
import cartItemApi from '../../apis/cartItemApi'
import { deleteAllCart } from '../../redux/actions/cart'

const Checkout = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const [checked, setChecked] = useState(0)
    const [note, setNote] = useState('')
    const [code, setCode] = useState('')
    const [voucher, setVoucher] = useState()
    const [feeShip, setFeeShip] = useState(0)
    const user = useSelector(state => state.auth)
    const cart = useSelector(state => state.cart)
    var valueVoucher = voucher?.value || 0
    var total = cart?.total ? cart.total + feeShip - valueVoucher : 0
    if (total < 0)
        total = 0
    const [loading, setLoading] = useState(false)
    function handleClickPromotion() {
        promotionApi.checkPromotion(code)
            .then(response => {
                setVoucher(response.data)
                total = total - response.data
                showAlertOk()
            })
            .catch(err => {
                console.log(err)
                showAlertOk('Thêm thất bại', 'Vui lòng kiểm tra lại thông tin')
            })
    }
    function handleClickOrder() {
        setLoading(true)
        const currentTimeString = new Date()
        const orderItems = cart?.cartItems.map(cartItem => ({
            product: {
                id: cartItem.product.id,
                price: cartItem.product.price
            },
            quantity: cartItem.quantity
        }))
        const order = {
            'createdDate': currentTimeString,
            'orderStatus': 'PENDING',
            'paymentMethod': checked,
            'shippingFee': feeShip,
            'voucherDiscount': valueVoucher,
            'total': total,
            'note': note,
            'customer': {
                'id': user?.id
            },
            'orderItems': orderItems
        }
        orderApi.addOrder(order)
            .then(() => {
                showAlertOk('Đặt hàng thành công', 'Bấm OK để tiếp tục')
                cartItemApi.deleteAllCartItemByCustomerId(user?.id)
                    .then(() => { dispatch(deleteAllCart()) })
                setTimeout(() => {
                    navigation.navigate('Cart')
                }, 1000)
            })
            .catch(() => {
                showAlertOk('Đặt hàng thất bại', 'Vui lòng kiểm tra lại thông tin')
            })
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        if (user)
            ghnApi.calculateFeeShip(user.districtId)
                .then((response) => {
                    setFeeShip(response.data.data.total)
                })
                .catch(err => {
                    console.log(err)
                })
        else navigation.navigate('Login')
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Icon name='chevron-left' size={40} style={{ marginTop: 10 }} onPress={() => { navigation.navigate('Tài khoản') }} />
            <Text style={styles.title}>Thanh toán</Text>
            <View style={{ flex: 7 }}>
                <ScrollView >
                    <View style={styles.body}>
                        <Address isCheckout={true} />
                        <View className='w-11/12 bg-white rounded-md'>
                            {cart?.cartItems.map((cartItem, index) =>
                                <CartItem product={cartItem?.product} quantity={cartItem?.quantity} key={index} isCheckout={true} />)}
                        </View>
                        <PaymentMethod />
                        <View className='w-11/12 bg-white rounded-md p-1 mb-1'>
                            <View className='flex-row items-center gap-2'>
                                <Text className='text-base font-medium text-gray-600 w-24'>Ghi chú: </Text>
                                <TextInput className='border-b-2 border-gray-500 w-40' placeholder='Nhập ghi chú ...' placeholderTextColor={'gray'} onChangeText={setNote} value={note} />
                            </View>
                            <View className='flex-row items-center gap-2 mt-2'>
                                <Text className='text-base font-medium text-gray-600'>Mã giảm giá: </Text>
                                <TextInput className='border-b-2 border-gray-500 w-40' placeholder='Nhập mã ...' placeholderTextColor={'gray'} onChangeText={setVoucher} value={voucher} />
                                <TouchableOpacity className='bg-orange-400 rounded-xl justify-center p-1' onPress={handleClickPromotion}>
                                    <Text className='text-center font-bold text-sm text-white'>Nhập</Text>
                                </TouchableOpacity>
                            </View>
                            <View className='flex-row justify-between items-center mt-3'>
                                <Text className='text-sm font-medium text-gray-600'>Tiền hàng (tạm tính) ({cart?.cartItems.length} sản phẩm)</Text>
                                <Text className='text-base font-medium text-gray-800'>{formatCurrency(cart?.total)}</Text>
                            </View>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-sm font-medium text-gray-600'>Phí vận chuyển</Text>
                                <Text className='text-base font-medium text-green-600'>{formatCurrency(feeShip)}</Text>
                            </View>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-sm font-medium text-gray-600'>Voucher giảm giá</Text>
                                <Text className='text-base font-medium text-red-500'>- {formatCurrency(valueVoucher)}</Text>
                            </View>
                            <View className='flex-row justify-between items-center'>
                                <Text className='text-base font-bold text-gray-600'>Tổng cộng (Đã bao gồm VAT)</Text>
                                <Text className='text-lg font-bold text-red-500'>{formatCurrency(total)}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <View className='flex-column items-center'>
                    <Text className='text-sm font-normal text-white text-right'>Tất cả</Text>
                </View>
                <Text className='text-base text-gray-500 font-medium'>Tổng cộng:</Text>
                <Text className='text-xl text-red-500 font-semibold'>{formatCurrency(cart?.total)}</Text>
                <TouchableOpacity className='w-24 h-9 bg-orange-400 rounded-xl justify-center' onPress={handleClickOrder}>
                    <Text className='text-center font-bold text-sm text-white'>Thanh toán</Text>
                </TouchableOpacity>
            </View>
            {loading && <View className='fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 flex justify-center items-center z-50'>
                <Progress.Circle size={80} indeterminate={true} borderWidth={3} />
            </View>}
        </SafeAreaView>
    )

}

export default Checkout
