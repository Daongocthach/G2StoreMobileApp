import { Text, View, ScrollView, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import getStyles from './styles'
import ButtonTab from './ButtonTab/ButtonTab'
import OrderItem from '../../components/Product/OrderItem'
import orderApi from '../../apis/orderApi'
import DeleteOrder from './DeleteOrder/DeleteOrder'
import { formatCurrency } from '../../utils/price'
import GoodsReceived from './GoodsReceived/GoodsReceived'

const Orders = () => {
    const user = useSelector(state => state.auth)
    const navigation = useNavigation()
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const [orders, setOrders] = useState([])
    const handleGetOrdersPending = () => {
        orderApi.getOrderByCustomerIdPending(user?.id)
            .then((response) => { setOrders(response.data) })
    }
    useEffect(() => {
        handleGetOrdersPending()
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <Icon name='chevron-left' size={40} onPress={() => { navigation.navigate('Tài khoản') }} />
            <Text style={styles.title}>Đơn hàng của tôi</Text>
            <ButtonTab setOrders={setOrders} user={user} />
            <View style={{ flex: 7 }}>
                <ScrollView >
                    <View style={styles.body}>
                        {Array.isArray(orders) && orders.map((order, index) =>
                            <View key={index} className='pl-2 bg-white'>
                                <View className='flex-row items-center justify-between pr-2'>
                                    <View className='flex-row items-center'>
                                        <Text className='font-bold text-base' >Đơn hàng: </Text>
                                        <Text className='text-sm text-gray-500'>#{order?.id}</Text>
                                    </View>
                                    <View className='flex-row items-center gap-2'>
                                        <Icon name='checkbox-blank-circle' size={7}
                                            color={(order?.orderStatus == 'PENDING') || (order?.orderStatus == 'CONFIRRMED') ? 'blue' :
                                                (order?.orderStatus == 'ON_DELIVERY') ? 'orange' : (order?.orderStatus == 'CANCEL') ? 'red' : 'green'} />
                                        <Text className='text-sm font-semibold'
                                            style={{
                                                color: (order?.orderStatus == 'PENDING') || (order?.orderStatus == 'CONFIRRMED') ? 'blue' :
                                                    (order?.orderStatus == 'ON_DELIVERY') ? 'orange' : (order?.orderStatus == 'CANCEL') ? 'red' : 'green'
                                            }}>{order?.orderStatus}</Text>
                                    </View>
                                </View>
                                <View className='w-full'>
                                    {order?.orderItems.map((orderItem, index) =>
                                        <OrderItem product={orderItem?.product} userId={user?.id} orderStatus={order?.orderStatus} key={index} />
                                    )}
                                </View>
                                <View className='flex-row items-center py-2 justify-between pr-2'>
                                    <View className='flex-row items-center '>
                                        {order?.orderStatus == 'PENDING' && <DeleteOrder orderId={order?.id} handleGetOrdersPending={handleGetOrdersPending} />}
                                        {order?.orderStatus == 'ON_DELIVERY' && <GoodsReceived orderId={order?.id} />}
                                    </View>
                                    <View className='flex-row items-center gap-2'>
                                        <Text className='font-bold text-base' >Thành tiền: </Text>
                                        <Text className='text-lg font-bold text-red-600'>{formatCurrency(order.total)}</Text>
                                    </View>
                                </View>
                            </View>)}
                        {orders.length < 1 && <View className='items-center gap-1 mt-2'>
                            <Image source={require('../../../assets/empty-order.png')} style={{ height: 200, width: 200 }} />
                            <Text className='font-semibold text-base text-gray-500' >Bạn chưa có đơn hàng nào </Text>
                        </View>}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )

}

export default Orders
