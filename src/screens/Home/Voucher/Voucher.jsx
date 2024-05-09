import { Text, TouchableOpacity, View } from 'react-native'
import { formatCurrency } from '../../../utils/price'
import * as Clipboard from 'expo-clipboard'
import showAlertOk from '../../../components/Alert/AlertOk'

function Voucher({ voucher }) {
    const copyToClipboard = async () => {
        try {
            Clipboard.setString(voucher?.code)
            showAlertOk('Mã đã được sao chép vào Clipboard!', 'Dán mã để nhận giảm giá')

        } catch (error) {
            console.log('Lỗi khi copy vào clipboard: ', error)
        }
    }
    return (
        <View style={{ width: 'auto', height: '70%', backgroundColor: '#EED5D2', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5, borderRadius: 5, gap: 10 }}>
            <View>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FF0000' }}>{voucher?.code}</Text>
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FF0000' }}>{formatCurrency(voucher?.value)}</Text>
            </View>
            <TouchableOpacity
                style={{ backgroundColor: '#EE6363', height: '95%', aspectRatio: 1 / 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={copyToClipboard}
            >
                <Text style={{ fontSize: 14, fontWeight: 'bold', color: '#FFFFFF' }}>Lấy mã</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Voucher
