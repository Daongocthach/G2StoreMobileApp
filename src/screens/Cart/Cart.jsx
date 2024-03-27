import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import getStyles from './styles'
import showAlertOk from '../../components/Alert/AlertOk'
import CartItem from '../../components/Product/CartItem'
import { formatCurrency } from '../../utils/price'

const Cart = () => {
    const navigation = useNavigation()
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const user = useSelector(state => state.auth)
    const cart = useSelector(state => state.cart)
    const [cartItems, setCartItems] = useState([])
    const handleClickCheckout = () => {
        if (cartItems.length < 1)
            showAlertOk('Bạn chưa có sản phẩm nào trong giỏ', 'Bấm Ok để tiếp tục')
        else {
            navigation.navigate('Checkout')
        }
    }
    useEffect(() => {
        if (user?.id) {
            setCartItems(cart?.cartItems)
        }
        else {
            navigation.navigate('Login')
        }
    }, [cart, user])
    return (
        <SafeAreaView style={styles.container}>
            <Icon name='chevron-left' size={40} style={{ marginTop: 10 }} onPress={() => { navigation.navigate('Tài khoản') }} />
            <Text style={styles.title}>Giỏ hàng của tôi ({cartItems?.length})</Text>
            <View style={{ flex: 7 }}>
                <ScrollView >
                    <View style={styles.body}>
                        {cartItems.map((cartItem, index) =>
                            <CartItem product={cartItem?.product} quantity={cartItem?.quantity} key={index} />)}
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <View className='flex-column items-center'>
                    <Text className='text-sm font-normal text-white text-right'>Tất cả</Text>
                </View>
                <Text className='text-base text-gray-600 font-medium'>Tổng cộng:</Text>
                <Text className='text-xl text-red-500 font-semibold'>{formatCurrency(cart?.total)}</Text>
                <TouchableOpacity className='w-24 h-9 bg-orange-400 rounded-xl justify-center' onPress={handleClickCheckout}>
                    <Text className='text-center font-bold text-sm text-white'>Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

export default Cart
