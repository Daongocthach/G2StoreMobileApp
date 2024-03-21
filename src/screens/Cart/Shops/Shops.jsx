import { Text, View, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CheckBox from 'expo-checkbox'
import { mockData } from '../../../apis/mockdata'
import { useState } from 'react'
import CartItem from '../../../components/Product/CartItem'

function Shops() {
    const [products, setProducts] = useState(mockData.products)
    const navigation = useNavigation()
    return (
        <TouchableOpacity className='bg-white rounded-lg p-2 justify-between w-full'>
            <View className='flex-row items-center gap-3'>
                <CheckBox value={false} />
                <Text className='text-sm font-bold text-gray-700'>ShopKeo</Text>
                <Icon name='chevron-right' size={30} className='w-2' color={'gray'} />
            </View>
            <View className='gap-2 pl-2'>
                <View className='flex-row items-center' >
                    <CheckBox value={false} style={{ flex: 0.5, marginRight: 3 }} />
                    <CartItem />
                    <Icon name='chevron-right' size={30} className='w-2' style={{ flex: 1, color: 'gray' }} />
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default Shops