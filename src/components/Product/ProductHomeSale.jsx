import { Text, View, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { formatCurrency } from '../../utils/price'


function ProductHomeSale({ product, width }) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={{ width: width || '45%', aspectRatio: 1 / 1.5, borderRadius: 20, backgroundColor: 'white' }}
      onPress={() => { navigation.navigate('ProductDetailScreen', { product: product }) }}>
      <Image source={{
        uri: product?.image
      }} style={{ height: '60%', width: '100%', borderTopLeftRadius: 20, borderTopRightRadius: 20 }} resizeMode='stretch'/>
      <View style={{ padding: 5 }}>
        <Text className='text-sm font-bold text-red-500' >{formatCurrency(product?.price)}</Text>
        <Text className='text-sm text-black overflow-hidden h-10' ellipsizeMode='tail' numberOfLines={2} >{product?.name}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text className='text-xs text-black' >4.9</Text>
            <Icon name='star-outline' size={12} color={'#EEAD0E'} />
          </View>
          <Text className='text-xs text-black' >3 đã bán</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ProductHomeSale