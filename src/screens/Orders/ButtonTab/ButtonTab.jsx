import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import orderApi from '../../../apis/orderApi'

function ButtonTab({ setOrders, user }) {
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
        else if (button == 'review')
            orderApi.getOrderByCustomerIdSuccess(user?.id)
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
        <View className='flex-row items-center justify-between bg-white p-2 mt-2'>
            <TouchableOpacity className='items-center gap-1 flex-1' onPress={() => handleGetOrders('ordered')} >
                <Icon name='calendar-check' size={25} color={selectedButton === 'ordered' ? '#3CB371' : 'gray'} />
                <Text className='text-xs text-gray-500 w-14 h-10 text-center' style={{ color: selectedButton === 'ordered' ? '#3CB371' : 'gray' }}>Đã đặt hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center gap-1 flex-1' onPress={() => handleGetOrders('packaged')}>
                <Icon name='package-variant-closed' size={25} color={selectedButton === 'packaged' ? '#3CB371' : 'gray'} />
                <Text className='text-xs text-gray-500 w-14 h-10 text-center' style={{ color: selectedButton === 'packaged' ? '#3CB371' : 'gray' }}>Đã xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center gap-1 flex-1' onPress={() => handleGetOrders('delivering')}>
                <Icon name='truck-delivery' size={25} color={selectedButton === 'delivering' ? '#3CB371' : 'gray'} />
                <Text className='text-xs text-gray-500 w-14 h-10 text-center' style={{ color: selectedButton === 'delivering' ? '#3CB371' : 'gray' }}>Đang giao hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center gap-1 flex-1' onPress={() => handleGetOrders('review')} >
                <Icon name='clipboard-check' size={25} color={selectedButton === 'review' ? '#3CB371' : 'gray'} />
                <Text className='text-xs text-gray-500 w-14 h-10 text-center' style={{ color: selectedButton === 'review' ? '#3CB371' : 'gray' }}>Chưa đánh giá</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center gap-1 flex-1' onPress={() => handleGetOrders('cancel')} >
                <Icon name='archive-cancel' size={25} color={selectedButton === 'cancel' ? '#3CB371' : 'gray'} />
                <Text className='text-xs text-gray-500 w-14 h-10 text-center' style={{ color: selectedButton === 'cancel' ? '#3CB371' : 'gray' }}>Đã hủy đơn</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center gap-1 flex-1' onPress={() => handleGetOrders('success')} >
                <Icon name='checkbox-marked' size={25} color={selectedButton === 'success' ? '#3CB371' : 'gray'} />
                <Text className='text-xs text-gray-500 w-14 h-10 text-center' style={{ color: selectedButton === 'success' ? '#3CB371' : 'gray' }}>Thành công</Text>
            </TouchableOpacity>
            <TouchableOpacity className='items-center gap-1 flex-1' onPress={() => handleGetOrders('all')} >
                <Icon name='checkbox-marked' size={25} color={selectedButton === 'all' ? '#3CB371' : 'gray'} />
                <Text className='text-xs text-gray-500 w-14 h-10 text-center' style={{ color: selectedButton === 'all' ? '#3CB371' : 'gray' }}>Tất cả đơn</Text>
            </TouchableOpacity>
        </View>

    )
}

export default ButtonTab