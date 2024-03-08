import { Text, TouchableOpacity, View } from 'react-native'

import { formatCurrency } from '../../../utils/price'

function Voucher({ voucher }) {
    const copyToClipboard = () => {

    }
    return (
        <View style={{ width: 'auto', height: '70%', backgroundColor: '#EED5D2', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 5, borderRadius: 5, gap: 10 }}>
            <View>
                <Text className='text-base font-bold text-red-500' >{voucher?.code}</Text>
                <Text className='text-sm font-bold text-red-500' >{formatCurrency(voucher?.value)}</Text>
            </View>
            <TouchableOpacity style={{ backgroundColor: '#EE6363', height: '95%', aspectRatio: 1 / 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}
                onPress={copyToClipboard}>
                <Text className='text-sm font-bold text-white' >Lấy mã</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Voucher