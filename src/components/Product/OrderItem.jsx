import { Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



function OrderItem({ product, isReview }) {

    return (
        <View className='flex-row gap-2 items-center' style={{ flex: 8 }}>
            <Image source={{
                uri: 'https://th.bing.com/th/id/OIP.aHNtkforW_FGqv0olWaVngHaFf?rs=1&pid=ImgDetMain'
            }} style={{ height: 70, width: 70, borderRadius: 10 }} />
            <View className=''>
                <Text className='text-sm font-normal text-gray-700 w-6/12' numberOfLines={2} ellipsizeMode="tail">Yến sào khánh hòa Yến sào khánh hòa Yến sào khánh hòa</Text>
                <Text className='text-sm font-bold text-red-500'>200.000 đ</Text>
                <View className='flex-row items-center mt-1'>
                    <Text className='text-base text-gray-400 w-10 text-center' >x 1</Text>
                    {!isReview && <TouchableOpacity className='items-center bg-green-600 rounded-2xl p-1' >
                        <Text className='text-sm text-white text-center' >Đánh giá</Text>
                    </TouchableOpacity>}
                </View>
            </View>
        </View>
    )
}
export default OrderItem