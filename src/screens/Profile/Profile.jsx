import { Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import getStyles from './styles'
import { logout } from '../../redux/actions/auth'
import showAlertOk from '../../components/Alert/AlertOk'


const Profile = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { colorScheme, toggleColorScheme } = useColorScheme()
  const user = useSelector(state => state.auth)
  const avatar = user?.avatar
  const styles = getStyles(colorScheme)
  const handleLogout = () => {
    dispatch(logout())
    showAlertOk('Bạn đã đăng xuất thành công', 'Bấm Ok để tiếp tục')
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Thông tin tài khoản</Text>
        <Image source={{
          uri: avatar || 'https://th.bing.com/th/id/OIP.TGIfj1Q3EkKWxD2ftAhyRQAAAA?w=387&h=387&rs=1&pid=ImgDetMain'
        }} style={{ height: 100, width: 100, borderRadius: 50, marginTop: 20 }} />
        <Text className='text-xl font-semibold'>{user?.fullName}</Text>
        {user?.id != '' && <Text className='text-lg mb-4'>Id: {user?.id}</Text>}
      </View>
      {user?.id == '' && <View className='gap-5'>
        <TouchableOpacity className='flex-row justify-between items-center pl-5' onPress={() => navigation.navigate('Login')}>
          <View className='flex-row items-center gap-5'>
            <Icon name='login' size={30} />
            <Text className='text-xl font-semibold text-gray-600'>Dăng nhập</Text>
          </View>
          <Icon name='chevron-right' size={30} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity className='flex-row justify-between items-center pl-5' onPress={() => navigation.navigate('Register')}>
          <View className='flex-row items-center gap-5'>
            <Icon name='account-plus-outline' size={30} />
            <Text className='text-xl font-semibold text-gray-600'>Đăng ký</Text>
          </View>
          <Icon name='chevron-right' size={30} style={{ marginRight: 20 }} />
        </TouchableOpacity>
      </View>}
      {user?.id != '' && <View className='gap-5'>
        <TouchableOpacity className='flex-row justify-between items-center pl-5' onPress={() => navigation.navigate('EditProfile')}>
          <View className='flex-row items-center gap-5'>
            <Icon name='account-edit-outline' size={30} />
            <Text className='text-xl font-semibold text-gray-600'>Thông tin liên hệ</Text>
          </View>
          <Icon name='chevron-right' size={30} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity className='flex-row justify-between items-center pl-5' onPress={() => navigation.navigate('Orders')}>
          <View className='flex-row items-center gap-5'>
            <Icon name='package-variant-closed' size={30} />
            <Text className='text-xl font-semibold text-gray-600'>Đơn hàng của tôi</Text>
          </View>
          <Icon name='chevron-right' size={30} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity className='flex-row justify-between items-center pl-5' onPress={() => navigation.navigate('EditAddress')}>
          <View className='flex-row items-center gap-5'>
            <Icon name='map-marker-circle' size={30} />
            <Text className='text-xl font-semibold text-gray-600'>Địa chỉ nhận hàng</Text>
          </View>
          <Icon name='chevron-right' size={30} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity className='flex-row justify-between items-center pl-5' onPress={() => navigation.navigate('EditBank')}>
          <View className='flex-row items-center gap-5'>
            <Icon name='bank-outline' size={30} />
            <Text className='text-xl font-semibold text-gray-600'>Thông tin ngân hàng</Text>
          </View>
          <Icon name='chevron-right' size={30} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity className='flex-row justify-between items-center pl-5' onPress={() => navigation.navigate('EditEWallet')}>
          <View className='flex-row items-center gap-5'>
            <Icon1 name='payment' size={30} />
            <Text className='text-xl font-semibold text-gray-600'>Ví điện tử</Text>
          </View>
          <Icon name='chevron-right' size={30} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity className='flex-row justify-between items-center pl-5' onPress={() => navigation.navigate('ForgotPassword')}>
          <View className='flex-row items-center gap-5'>
            <Icon name='form-textbox-password' size={30} />
            <Text className='text-xl font-semibold text-gray-600'>Đổi mật khẩu</Text>
          </View>
          <Icon name='chevron-right' size={30} style={{ marginRight: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity className='flex-row justify-between items-center pl-5' onPress={handleLogout}>
          <View className='flex-row items-center gap-5'>
            <Icon name='logout' size={30} />
            <Text className='text-xl font-semibold text-gray-600'>Đăng xuất</Text>
          </View>
          <Icon name='chevron-right' size={30} style={{ marginRight: 20 }} />
        </TouchableOpacity>
      </View>}
    </SafeAreaView>
  )

}

export default Profile
