import { Text, View, Image } from 'react-native'
import { formatCurrency } from '../../utils/price'

function ProductHomeNew({ product }) {
  return (
    <View style={{ width: 120, height: '90%', borderRadius: 10 }}>
      <Image source={{
        uri: product?.image
      }} style={{ height: '70%', width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 }} resizeMode='stretch'/>
      <Text className='text-sm font-bold text-red-500' >{formatCurrency(product?.price)}</Text>
      <Text className='text-sm text-black overflow-hidden' ellipsizeMode='tail' numberOfLines={1} >{product?.name}</Text>
    </View>
  )
}

export default ProductHomeNew