import { Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Notification = ({ notification }) => {
    return (
        <TouchableOpacity className='flex-row w-11/12 bg-white rounded-xl mt-6 justify-between' style={{ borderBottomWidth: 0.5 }}>
            <Image source={{
                uri: notification?.image || 'https://th.bing.com/th/id/OIP.aHNtkforW_FGqv0olWaVngHaFf?rs=1&pid=ImgDetMain'
            }} style={{ height: 50, width: 50, borderRadius: 10 }} className='w-2/12' />
            <View className='w-8/12  ml-1'>
                <Text className='text-sm text-gray-600 font-medium'>{notification?.content}</Text>
            </View>
            <Icon name='chevron-right' size={30} className='w-2' />
        </TouchableOpacity>
    )
}

export default Notification
