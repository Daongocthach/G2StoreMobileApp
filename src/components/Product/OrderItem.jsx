import { Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatCurrency } from '../../utils/price'



function OrderItem({ product, isReview }) {

    return (
        <View className='flex-row justify-between p-1 items-center'>
            <View className='flex-row flex-1 gap-2'>
                <Image source={{
                    uri: product?.image || 'https://th.bing.com/th/id/OIP.aHNtkforW_FGqv0olWaVngHaFf?rs=1&pid=ImgDetMain'
                }} style={{ height: 70, width: 70, borderRadius: 10 }} />
                <View >
                    <Text className='text-sm font-bold text-gray-700 w-11/12' numberOfLines={1} ellipsizeMode="tail">{product?.name}</Text>
                    <View className='flex-row items-center mt-1'>
                        <Text className='text-sm font-bold text-red-500'>{formatCurrency(product?.price)}</Text>
                        <Text className='text-base text-gray-400 w-10 text-center' >x 1</Text>
                        {isReview && <TouchableOpacity className='items-center bg-green-600 rounded-2xl p-1' >
                            <Text className='text-sm text-white text-center' >Đánh giá</Text>
                        </TouchableOpacity>}
                    </View>
                </View>
            </View>
            <Icon name='chevron-right' size={30} className='w-2' style={{ color: 'gray' }} />
        </View>
    )
}
export default OrderItem