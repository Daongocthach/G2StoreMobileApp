import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import orderApi from '../../../apis/orderApi'

function ButtonTab({ setOrders, user, pending, confirm, delivery, success, cancel, all }) {
    const [selectedButton, setSelectedButton] = useState('ordered')
    const handleGetOrders = (button) => {
        setSelectedButton(button)
        if (button == 'ordered')
            orderApi.getOrderByCustomerIdPending(user?.id)
                .then((response) => { setOrders(response.data) })
        else if (button == 'packaged')
            orderApi.getOrderByCustomerIdConfirmed(user?.id)
                .then((response) => { setOrders(response.data) })
        else if (button == 'delivering')
            orderApi.getOrderByCustomerIdOnDelivery(user?.id)
                .then((response) => { setOrders(response.data) })
        else if (button == 'cancel')
            orderApi.getOrderByCustomerIdCancel(user?.id)
                .then((response) => { setOrders(response.data) })
        else if (button == 'success')
            orderApi.getOrderByCustomerIdSuccess(user?.id)
                .then((response) => { setOrders(response.data) })
        else if (button == 'all')
            orderApi.getOrderByCustomerId(user?.id)
                .then((response) => { setOrders(response.data) })
    }

    return (
        <View className=' bg-white p-2 mt-2'>
            <TouchableOpacity className='flex-row justify-end items-center' onPress={() => handleGetOrders('all')} >
                <Text className='text-xs h-6 text-gray-500 text-center font-medium' style={{ color: '#00B2EE' }}>Xem tất cả ({all})</Text>
                <Icon name='chevron-right' size={20} color={'#00B2EE'} />
            </TouchableOpacity>
            <View className='flex-row items-center justify-between bg-white'>
                <TouchableOpacity className='items-center gap-1 flex-1' onPress={() => handleGetOrders('ordered')} >
                    <Icon name='calendar-check' size={25} color={selectedButton === 'ordered' ? '#00B2EE' : 'gray'} />
                    <Text className='text-xs text-gray-500 w-14 h-10 text-center font-medium' style={{ color: selectedButton === 'ordered' ? '#00B2EE' : 'gray' }}>Đặt hàng ({pending})</Text>
                </TouchableOpacity>
                <TouchableOpacity className='items-center gap-1 flex-1' onPress={() => handleGetOrders('packaged')}>
                    <Icon name='package-variant-closed' size={25} color={selectedButton === 'packaged' ? '#00B2EE' : 'gray'} />
                    <Text className='text-xs text-gray-500 w-14 h-10 text-center font-medium' style={{ color: selectedButton === 'packaged' ? '#00B2EE' : 'gray' }}>Xác nhận ({confirm})</Text>
                </TouchableOpacity>
                <TouchableOpacity className='items-center gap-1 flex-1' onPress={() => handleGetOrders('delivering')}>
                    <Icon name='truck-delivery' size={25} color={selectedButton === 'delivering' ? '#00B2EE' : 'gray'} />
                    <Text className='text-xs text-gray-500 w-14 h-10 text-center font-medium' style={{ color: selectedButton === 'delivering' ? '#00B2EE' : 'gray' }}>Đang giao ({delivery})</Text>
                </TouchableOpacity>
                <TouchableOpacity className='items-center gap-1 flex-1' onPress={() => handleGetOrders('success')} >
                    <Icon name='clipboard-check' size={25} color={selectedButton === 'success' ? '#00B2EE' : 'gray'} />
                    <Text className='text-xs text-gray-500 w-16 h-10 text-center font-medium' style={{ color: selectedButton === 'success' ? '#00B2EE' : 'gray' }}>Thành công ({success})</Text>
                </TouchableOpacity>
                <TouchableOpacity className='items-center gap-1 flex-1' onPress={() => handleGetOrders('cancel')} >
                    <Icon name='archive-cancel' size={25} color={selectedButton === 'cancel' ? '#00B2EE' : 'gray'} />
                    <Text className='text-xs text-gray-500 w-12 h-10 text-center font-medium' style={{ color: selectedButton === 'cancel' ? '#00B2EE' : 'gray' }}>Đã hủy ({cancel})</Text>
                </TouchableOpacity>
            </View>
        </View>


    )
}

export default ButtonTab