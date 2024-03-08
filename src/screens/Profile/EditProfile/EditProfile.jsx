import { Text, View, Image, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getStyles from './styles'


const EditProfile = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const user = useSelector(state => state.auth)
    const [fullName, setFullName] = useState(user?.fullName)
    const [email, setEmail] = useState(user?.email)
    const [gender, setGender] = useState('Nam')
    const [birthDay, setBirthDay] = useState('07/05/2002')
    const [phone, setPhone] = useState(user?.phoneNo)
    const handleSave = () => {

    }
    return (
        <SafeAreaView style={styles.container}>
            <Icon name='chevron-left' size={40} style={{ marginTop: 10 }} onPress={() => {navigation.navigate('Tài khoản')}}/>
            <View style={styles.body}>
                <Text style={styles.title}>Thông tin liên hệ</Text>
                <View style={{ height: 100, width: 100, borderRadius: 50, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Image blurRadius={5}
                        source={{ uri: user?.avatar || 'https://th.bing.com/th/id/OIP.aAHsT7cIeX2YL0Ae9uA58wHaKl?rs=1&pid=ImgDetMain' }}
                        style={{ height: '100%', width: '100%', borderRadius: 50, position: 'absolute', opacity: 0.5, backgroundColor: 'black' }}
                    />
                    <Icon name="pencil-outline" size={30} color={'white'}
                        style={{ zIndex: 1, position: 'absolute', top: '50%', left: '50%', transform: [{ translateX: -15 }, { translateY: -15 }] }}
                    />
                </View>
            </View>
            <View className='gap-5 mt-3 '>
                <View className=' pl-5 pr-5'>
                    <Text className='text-xs font-semibold text-gray-400'>Họ và tên</Text>
                    <TextInput placeholder='Họ và tên' className='text-lg font-semibold text-gray-500' style={styles.input} value={fullName} />
                </View>
                <View className=' pl-5 pr-5'>
                    <Text className='text-xs font-semibold text-gray-400'>Ngày sinh</Text>
                    <TextInput placeholder='Ngày sinh' className='text-lg font-semibold text-gray-500' style={styles.input} value={birthDay} />
                </View>
                <View className=' pl-5 pr-5'>
                    <Text className='text-xs font-semibold text-gray-400'>Giới tính</Text>
                    <TextInput placeholder='Giới tính' className='text-lg font-semibold text-gray-500' style={styles.input} value={fullName} />
                </View>
                <View className=' pl-5 pr-5'>
                    <Text className='text-xs font-semibold text-gray-400'>Email</Text>
                    <TextInput placeholder='Email' className='text-lg font-semibold text-gray-500' style={styles.input} value={email} />
                </View>
                <View className=' pl-5 pr-5'>
                    <Text className='text-xs font-semibold text-gray-400'>Số điện thoại</Text>
                    <TextInput placeholder='Số điện thoại' className='text-lg font-semibold text-gray-500' style={styles.input} value={phone} />
                </View>
                <View className=' pl-5 pr-5 items-center'>
                    <TouchableOpacity className='h-12 bg-gray-500 items-center justify-center rounded-3xl w-10/12' onPress={handleSave}>
                        <Text className='text-xl font-semibold text-white text-center'>Lưu</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )

}

export default EditProfile
