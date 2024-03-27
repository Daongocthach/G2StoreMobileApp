import { TouchableOpacity, Text, Alert, View } from 'react-native'
import orderApi from '../../../apis/orderApi'
import showAlertOk from '../../../components/Alert/AlertOk'

function GoodsReceived({ orderId }) {
    const handleClickGoodsReceived = () => {
        Alert.alert(
            'Bạn đã nhận hàng',
            'Bấm đã nhận để tiếp tục!',
            [
                {
                    text: 'Chưa nhận',
                    style: 'cancel'
                },
                {
                    text: 'Đã nhận',
                    onPress: () => {
                        orderApi.updateOrderStatus(orderId, 3)
                        .then(() => {
                            showAlertOk()
                        })
                        .catch(error => {
                            console.log(error)
                            showAlertOk('Cập nhật thất bại', 'Bấm Ok để tiếp tục')
                        })
                    },
                    style: 'default'
                }
            ]
        )
    }
    return (
        <View>
            <TouchableOpacity onPress={handleClickGoodsReceived} className='bg-green-500 rounded-xl p-2 items-center' >
                <Text className='text-white font-bold'>Đã nhận hàng</Text>
            </TouchableOpacity>

        </View>
    )
}
export default GoodsReceived