import { Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getStyles from './styles'
import Bank from '../../../components/Bank/Bank'


const EditBank = ({ route }) => {
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
                <Text style={styles.title}>Thông tin ngân hàng</Text>
                <View className='h-16 w-9/12 bg-white rounded-3xl items-center justify-center border-2 mt-2 mb-2'>
                    <Text className='text-base'>+ Thêm ngân hàng mới</Text>
                </View>
                <ScrollView className='w-full mb-5'>
                    <View className='items-center'>
                        <Bank />
                        <Bank />
                        <Bank />
                    </View>
                </ScrollView>

            </View>

        </SafeAreaView>
    )

}

export default EditBank
