import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const Address = ({ isCheckout }) => {
    const navigation = useNavigation()
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const handleSave = () => {

    }
    return (
        <TouchableOpacity className='flex-row bg-white rounded-md items-center mt-2 w-11/12'>
            <Icon name='map-marker-radius-outline' size={40} className='w-2/12' />
            <View className='w-9/12  gap-1'>
                <View className='flex-row justify-between items-center'>
                    <Text className='text-sm font-semibold text-gray-700'>Đào Ngọc Thạch</Text>
                    <Text className='text-xs text-gray-700'>0373060206</Text>
                </View>
                <Text className='text-xs text-gray-600 mb-1 '>Chung cư Bcons Plaza, 22a/6 Đường Thống Nhất, Bình Dương, Thành phố Dĩ An, phường Đông Hòa</Text>
                {!isCheckout && <View className='bg-red-200 w-20 h-5 justify-center items-center rounded-md mb-1'>
                    <Text className='text-xs font-semibold text-red-500 '>Mặc định</Text>
                </View>}
            </View>
            <Icon name='chevron-right' size={30} className='w-2' />
        </TouchableOpacity>
    )

}

export default Address
