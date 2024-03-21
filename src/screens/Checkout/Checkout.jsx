import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getStyles from './styles'
import promotionApi from '../../apis/promotionApi'
import showAlertOk from '../../components/Alert/AlertOk'
import { formatCurrency } from '../../utils/price'
import Address from '../../components/Address/Address'
import CartItem from '../../components/Product/CartItem'

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
                        <View className='w-full flex-row'>
                            {/* <TouchableOpacity className='items-center' onPress={() => setSelectedButton('waiting')} >
                                <Icon name='calendar-check' size={30} color={selectedButton === 'waiting' ? '#3CB371' : 'gray'} />
                                <Text className='text-xs text-gray-500' style={{ color: selectedButton === 'waiting' ? '#3CB371' : 'gray' }}>Chờ xác nhận</Text>
                            </TouchableOpacity> */}
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
                <TouchableOpacity className='w-24 h-9 bg-orange-400 rounded-xl justify-center'>
                    <Text className='text-center font-bold text-sm text-white'>Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

export default Checkout
