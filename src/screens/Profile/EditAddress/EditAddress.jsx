import { Text, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getStyles from './styles'
import Address from '../../../components/Address/Address'


const EditAddress = ({ route }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const handleSave = () => {

    }
    return (
        <SafeAreaView style={styles.container}>
            <Icon name='chevron-left' size={40} style={{ marginTop: 10 }} onPress={() => {navigation.navigate('Tài khoản')}}/>
            <View style={styles.body}>
                <Text style={styles.title}>Sổ địa chỉ nhận hàng</Text>
                <View className='h-16 w-9/12 bg-white rounded-3xl items-center justify-center border-2 mt-2 mb-2'>
                    <Text className='text-base'>+ Thêm địa chỉ nhận hàng mới</Text>
                </View>
                <ScrollView className='w-full mb-5'>
                    <View className='items-center'>
                        <Address />
                    </View>
                </ScrollView>

            </View>
        </SafeAreaView>
    )

}

export default EditAddress
