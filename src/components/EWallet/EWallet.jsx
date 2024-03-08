import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const EWallet = ({ eWallet }) => {
    const navigation = useNavigation()
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const handleSave = () => {

    }
    return (
        <TouchableOpacity className='flex-row w-11/12 bg-white rounded-xl mt-2'>
            <Image source={{
                uri: 'https://th.bing.com/th/id/OIP.KQ69bikk5iCsjYonmD4ViAHaHa?rs=1&pid=ImgDetMain'
            }} style={{ height: 40, width: 40, borderRadius: 10 }} className='w-2/12' />
            <View className='w-9/12  gap-1 ml-1'>
                <Text className='text-base font-semibold text-gray-700'>Momo - 033622xxxx</Text>
                <Text className='text-sm text-gray-600 '>DAO NGOC THACH</Text>
                <View className='bg-red-200 w-20 h-5 justify-center items-center rounded-md mb-1'>
                    <Text className='text-xs font-semibold text-red-500 '>Mặc định</Text>
                </View>
            </View>
            <Icon name='dots-vertical' size={30} className='w-2' />
        </TouchableOpacity>
    )

}

export default EWallet
