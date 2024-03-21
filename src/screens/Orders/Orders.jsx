import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import CheckBox from 'expo-checkbox'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getStyles from './styles'
import Shops from './Shops/Shops'


const Orders = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const user = useSelector(state => state.auth)
    const [selectedButton, setSelectedButton] = useState('')
    const handleSave = () => {

    }
    return (
        <SafeAreaView style={styles.container}>
            <Icon name='chevron-left' size={40} onPress={() => { navigation.navigate('Tài khoản') }} />
            <Text style={styles.title}>Đơn hàng của tôi</Text>
            <View className='bg-white h-24 p-2'>
                <TouchableOpacity className='flex-row items-center justify-end gap-1'>
                    <Text className='text-base text-red-400 text-right' >Xem tất cả</Text>
                    <Icon name='arrow-right' size={15} color={'#FE555D'} />
                </TouchableOpacity>
                <View className='flex-row items-center justify-between'>
                    <TouchableOpacity className='items-center' onPress={() => setSelectedButton('waiting')} >
                        <Icon name='calendar-check' size={30} color={selectedButton === 'waiting' ? '#3CB371' : 'gray'} />
                        <Text className='text-xs text-gray-500' style={{ color: selectedButton === 'waiting' ? '#3CB371' : 'gray' }}>Chờ xác nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='items-center gap-1' onPress={() => setSelectedButton('packaged')}>
                        <Icon name='package-variant-closed' size={30} color={selectedButton === 'packaged' ? '#3CB371' : 'gray'} />
                        <Text className='text-xs text-gray-500' style={{ color: selectedButton === 'packaged' ? '#3CB371' : 'gray' }}>Đã đóng gói</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='items-center gap-1' onPress={() => setSelectedButton('delivering')}>
                        <Icon name='truck-delivery' size={30} color={selectedButton === 'delivering' ? '#3CB371' : 'gray'} />
                        <Text className='text-xs text-gray-500' style={{ color: selectedButton === 'delivering' ? '#3CB371' : 'gray' }}>Đang giao hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className='items-center gap-1' onPress={() => setSelectedButton('review')} >
                        <Icon name='clipboard-check' size={30} color={selectedButton === 'review' ? '#3CB371' : 'gray'} />
                        <Text className='text-xs text-gray-500' style={{ color: selectedButton === 'review' ? '#3CB371' : 'gray' }}>Đánh giá</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flex: 7 }}>
                <ScrollView >
                    <View style={styles.body}>
                        <Shops />
                        <Shops />
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <View className='flex-column items-center'>
                    <CheckBox value={false} />
                    <Text className='text-sm font-normal text-gray-600 text-right'>Tất cả</Text>
                </View>
                <Text className='text-base text-gray-600 font-medium'>Tổng cộng:</Text>
                <Text className='text-xl text-red-500 font-semibold'>270.000 đ</Text>
                <TouchableOpacity className='w-24 h-9 bg-orange-400 rounded-xl justify-center'>
                    <Text className='text-center font-bold text-sm text-white'>Thanh toán</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}

export default Orders
