import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

function PaymentMethod() {
    const [selectedButton, setSelectedButton] = useState('Cod')

    return (
        <View className='bg-white w-11/12 p-1 rounded-sm'>
            <Text className='text-base text-gray-700 font-semibold m-1' >Chọn phương thức thanh toán</Text>
            <ScrollView horizontal={true} className='gap-2'>
                <TouchableOpacity className='items-center gap-1 flex-row rounded-2xl p-1' style={{ backgroundColor: selectedButton === 'Cod' ? '#D1EEEE' : 'white' }}
                    onPress={() => setSelectedButton('Cod')}>
                    <Icon name='cash' size={30} color={'orange'} />
                    <Text className='text-sm font-medium text-gray-500 w-28'>Thanh toán khi nhận hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity className='items-center gap-1 flex-row rounded-2xl p-1' style={{ backgroundColor: selectedButton === 'Momo' ? '#D1EEEE' : 'white' }}
                    onPress={() => setSelectedButton('Momo')} >
                    <Image source={{
                        uri: 'https://th.bing.com/th/id/OIP.1DqbCoaBoMZYh692ZW9u5gAAAA?w=300&h=300&rs=1&pid=ImgDetMain'
                    }} style={{ height: 30, width: 30, borderRadius: 10 }} className='w-2/12' />
                    <Text className='text-sm font-medium text-gray-500'>Momo</Text>
                </TouchableOpacity>
                <TouchableOpacity className='items-center gap-1 flex-row rounded-2xl p-1' style={{ backgroundColor: selectedButton === 'Zalo' ? '#D1EEEE' : 'white' }}
                    onPress={() => setSelectedButton('Zalo')} >
                    <Image source={{
                        uri: 'https://th.bing.com/th/id/R.94da32993bff86ccd2045e51ef57211b?rik=FQ1mOOuuqczYYw&riu=http%3a%2f%2fagiletech.vn%2fwp-content%2fuploads%2f2019%2f06%2fagiletechvietnam-zalopay.png&ehk=I9gnOznX4IszHNUenS707nG9FS2r7xTGgj1YQ4qmZo0%3d&risl=&pid=ImgRaw&r=0'
                    }} style={{ height: 30, width: 30, borderRadius: 10 }} className='w-2/12' />
                    <Text className='text-sm font-medium text-gray-500'>Zalo</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    )
}
export default PaymentMethod