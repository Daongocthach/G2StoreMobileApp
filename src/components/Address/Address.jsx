import { Text, View, TouchableOpacity, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'


const Address = () => {
    const navigation = useNavigation()
    const user = useSelector(state => state.auth)
    const handleClick = () => {
        Alert.alert(
            'Bạn muốn đổi địa chỉ nhận hàng',
            'Sẽ chuyển hướng đến trang thay đổi địa chỉ!',
            [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        navigation.navigate('EditAddress')
                    },
                    style: 'default'
                }
            ]
        )
    }
    return (
        <TouchableOpacity className='flex-row bg-white rounded-md items-center mt-2 w-11/12 h-20' onPress={handleClick}>
            <Icon name='map-marker-radius-outline' size={40} className='w-2/12' />
            <View className='w-9/12  gap-1'>
                <View className='flex-row justify-between items-center'>
                    <Text className='text-sm font-semibold text-gray-700'>{user?.fullName}</Text>
                    <Text className='text-xs text-gray-700'>{user?.phoneNo}</Text>
                </View>
                <Text className='text-xs text-gray-600 mb-1 '>{user?.address}, {user?.ward}, {user?.district}, {user?.province}</Text>
            </View>
            <Icon name='chevron-right' size={30} className='w-2' />
        </TouchableOpacity>
    )

}

export default Address
