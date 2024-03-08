import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import * as Progress from 'react-native-progress'
import getStyles from './styles'
import showAlertOk from '../../../components/Alert/AlertOk'
import authenApi from '../../../apis/authenApi'
import { login } from '../../../redux/actions/auth'


function Register() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const { colorScheme } = useColorScheme()
  const styles = getStyles(colorScheme)
  const [email, setEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (userName == '' || password == '') {
      showAlertOk('Bạn chưa điền đầy đủ thông tin', 'Bấm Ok để tiếp tục')
    }
    else if (password !== rePassword) {
      showAlertOk('Mật khẩu không trùng khớp', 'Bấm Ok để tiếp tục')
    }
    else if (password.length < 6) {
      showAlertOk('Mật khẩu tối thiểu 6 ký tự', 'Bấm Ok để tiếp tục')
    }
    else {
      setLoading(true)
      authenApi.signup(userName, password, email, fullName, phone)
        .then(response => {
          dispatch(login(response.data))
          showAlertOk('Đăng ký thành công', 'Đăng nhập để tiếp tục')
          setTimeout(() => {
            navigation.navigate('Login')
          }, 1000)
        })
        .catch(error => {
          console.log(error)
          showAlertOk('Vui lòng kiểm tra lại', 'Sai tài khoản hoặc mật khẩu')
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }
  return (
    <View style={styles.container}>
      <View style={{ height: 50 }}></View>
      <Icon name='chevron-left' size={40} style={{ marginLeft: 20 }} />
      <View style={styles.body}>
        <Text style={styles.title}>Đăng ký</Text>
        {loading && <View style={{ alignItems: 'center' }}>
          <Progress.Circle size={80} indeterminate={true} borderWidth={3} />
        </View>}
        <View style={{ ...styles.flexView, marginHorizontal: 20, marginTop: 40 }}>
          <TextInput style={styles.input} placeholder='Nhập email' placeholderTextColor={'#BBBBBB'} onChangeText={setEmail} value={email} />
        </View>
        <View style={{ ...styles.flexView, marginHorizontal: 20 }}>
          <TextInput style={styles.input} placeholder='Nhập tên đăng nhập' placeholderTextColor={'#BBBBBB'} onChangeText={setUserName} value={userName} />
        </View>
        <View style={{ ...styles.flexView, marginHorizontal: 20 }}>
          <TextInput style={styles.input} placeholder='Nhập họ và tên' placeholderTextColor={'#BBBBBB'} onChangeText={setFullName} value={fullName} />
        </View>
        <View style={{ ...styles.flexView, marginHorizontal: 20 }}>
          <TextInput style={styles.input} placeholder='Nhập số điện thoại' placeholderTextColor={'#BBBBBB'} onChangeText={setPhone} value={phone} />
        </View>
        <View style={{ ...styles.flexView, marginHorizontal: 20 }}>
          <TextInput style={styles.input} secureTextEntry={true} placeholder='Nhập mật khẩu' placeholderTextColor={'#BBBBBB'} onChangeText={setPassword} value={password} />
        </View>
        <View style={{ ...styles.flexView, marginHorizontal: 20 }}>
          <TextInput style={styles.input} secureTextEntry={true} placeholder='Xác nhận mật khẩu' placeholderTextColor={'#BBBBBB'} onChangeText={setRePassword} value={rePassword} />
        </View>
        <TouchableOpacity style={styles.buttonSubmit} onPress={handleRegister}>
          <Text style={{ ...styles.text, color: 'white' }}>Tạo tài khoản</Text>
        </TouchableOpacity>
        <View style={{ marginHorizontal: 20 }}>
          <Text style={{ ...styles.textTitle, textAlign: 'right' }} onPress={() => { navigation.navigate('Login') }}>Bạn đã có tài khoản ? Đăng nhập ?</Text>
        </View>
      </View>
    </View >
  )
}

export default Register