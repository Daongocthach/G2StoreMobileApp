import React, { useState } from 'react'
import { TouchableOpacity, Text, Alert } from 'react-native'
import orderApi from '../../../apis/orderApi'
import showAlertOk from '../../../components/Alert/AlertOk'

function DeleteOrder({ orderId, handleGetOrdersPending }) {
    const handleClickDelete = () => {
        Alert.alert(
            'Bạn muốn hủy đơn hàng',
            'Bấm chấp nhận để hủy!',
            [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text: 'Chấp nhận',
                    onPress: () => {
                        orderApi.deleteOrder(orderId)
                            .then(() => {
                                showAlertOk('Bạn đã hủy đơn hàng thành công', 'Bấm Ok để tiếp tục')
                                handleGetOrdersPending()
                            })
                            .catch(error => {
                                console.log(error)
                                showAlertOk('Thất bại', 'Bấm Ok để tiếp tục')
                            })
                    },
                    style: 'default'
                }
            ]
        )
    }

    return (
        <>
            <TouchableOpacity onPress={handleClickDelete} className='bg-red-600 rounded-xl p-2 items-center'>
                <Text className='text-white font-bold'>Hủy đơn hàng</Text>
            </TouchableOpacity>
        </>
    )
}

export default DeleteOrder
