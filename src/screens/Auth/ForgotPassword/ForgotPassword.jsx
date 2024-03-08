import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as Progress from 'react-native-progress'
import { SafeAreaView } from 'react-native-safe-area-context'
import getStyles from './styles'
import showAlertOk from '../../../components/Alert/AlertOk'
import { validateEmail } from '../../../utils/email'
import authenApi from '../../../apis/authenApi'

function ForgotPassword() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { colorScheme } = useColorScheme()
  const styles = getStyles(colorScheme)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleResetPassword = async () => {
    if (!validateEmail(email)) {
      showAlertOk('Gửi thất bại', 'Vui lòng kiểm tra lại thông tin')
    }
    else {
      authenApi.forgotPassword(email)
      showAlertOk('Gửi email thành công', 'Xem mật khẩu mới trong gmail')
      setTimeout(() => {
        navigation.navigate('Login')
      }, 1000)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.title}>Đổi mật khẩu</Text>
        {loading && <View style={{ alignItems: 'center' }}>
          <Progress.Circle size={80} indeterminate={true} borderWidth={3} />
        </View>}
        <View style={{ ...styles.flexView, marginHorizontal: 20, marginTop: 40 }}>
          <TextInput style={styles.input} placeholder='Nhập email' placeholderTextColor={'#BBBBBB'} onChangeText={setEmail} value={email} />
        </View>
        <TouchableOpacity style={styles.buttonSubmit} onPress={handleResetPassword}>
          <Text style={{ ...styles.text, color: 'white' }}>Nhận OTP qua Mail</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  )
}

export default ForgotPassword