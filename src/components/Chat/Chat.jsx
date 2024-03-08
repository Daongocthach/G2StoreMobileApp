import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const Chat = ({ eWallet }) => {
    const navigation = useNavigation()
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const handleSave = () => {

    }
    return (
        <TouchableOpacity className='flex-row w-11/12 bg-white rounded-3xl mt-3 p-2 justify-between items-center'>
            <View className='w-10/12 rounded-xl'>
                <View className='flex-row justify-between gap-2'>
                    <Image source={{
                        uri: 'https://th.bing.com/th/id/OIP.aHNtkforW_FGqv0olWaVngHaFf?rs=1&pid=ImgDetMain'
                    }} style={{ height: 50, width: 50, borderRadius: 25 }} />
                    <View style={{ flex: 1 }}>
                        <Text className='text-base font-bold'>ShopKeo</Text>
                        <Text className='text-xs text-gray-800 '>02:35 PM</Text>
                    </View>

                </View>
                <Text className='text-sm text-gray-600 overflow-hidden' ellipsizeMode='tail' numberOfLines={1}>Yến sào khánh hòa sale,
                    Số lượng có hạn, mua ngay
                    để lấy mã khuyến mãi.</Text>
            </View>
            <Icon name='chevron-right' size={30} className='w-2' color={'gray'} />
        </TouchableOpacity>
    )

}

export default Chat
