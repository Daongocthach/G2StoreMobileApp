import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const Notification = ({ eWallet }) => {
    const navigation = useNavigation()
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const handleSave = () => {

    }
    return (
        <TouchableOpacity className='flex-row w-11/12 bg-white rounded-xl mt-6 justify-between' style={{ borderBottomWidth: 0.5 }}>
            <Image source={{
                uri: 'https://th.bing.com/th/id/OIP.aHNtkforW_FGqv0olWaVngHaFf?rs=1&pid=ImgDetMain'
            }} style={{ height: 50, width: 50, borderRadius: 10 }} className='w-2/12' />
            <View className='w-8/12  ml-1'>
                <Text className='text-sm text-gray-600 '>Yến sào khánh hòa sale,
                    Số lượng có hạn, mua ngay
                    để lấy mã khuyến mãi.</Text>
            </View>
            <Icon name='chevron-right' size={30} className='w-2' />
        </TouchableOpacity>
    )
}

export default Notification
