import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { mockData } from '../../../apis/mockdata'
import { useState } from 'react'
import OrderItem from '../../../components/Product/OrderItem'

function Shops() {
    const [products, setProducts] = useState(mockData.products)
    const navigation = useNavigation()
    return (
        <TouchableOpacity className='bg-white rounded-lg p-2 justify-between w-full'>
            <View className='flex-row items-center gap-3'>
                <Text className='text-sm font-bold text-gray-700'>ShopKeo</Text>
                <Icon name='chevron-right' size={30} className='w-2' color={'gray'} />
            </View>
            <View className='gap-2 pl-2 mt-1'>
                <View className='flex-row items-center'>
                    <OrderItem />
                    <Icon name='chevron-right' size={30} className='w-2' style={{ flex: 1, color: 'gray' }} />
                </View>
                <View className='flex-row items-center'>
                    <OrderItem />
                    <Icon name='chevron-right' size={30} className='w-2' style={{ flex: 1, color: 'gray' }} />
                </View>
            </View>
            <View className='flex-row items-center justify-between mt-3'>
                <TouchableOpacity className='items-center bg-red-400 rounded-2xl p-1' >
                    <Text className='text-sm text-white text-center' >Đánh giá đơn hàng</Text>
                </TouchableOpacity>
                <View className='flex-row items-center gap-2'>
                    <Text className='text-sm text-gray-600 text-center' >Tổng cộng</Text>
                    <Text className='text-lg font-bold text-red-500 text-center' >230.000 đ</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Shops