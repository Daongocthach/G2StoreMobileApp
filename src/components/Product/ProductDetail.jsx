import { Text, View, Image } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatCurrency } from '../../utils/price'


function ProductDetail({ product }) {

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: 'white', flexDirection: 'column', paddingHorizontal: 5 }}>
      <Image source={{
        uri: product?.image
      }} style={{ height: '65%', width: '100%', borderRadius: 10 }} resizeMode='stretch'/>
      <View >
        <Text className='text-xl font-bold text-red-500' >{formatCurrency(product?.price)}</Text>
        <Text className='text-xl font-semibold text-gray-600 h-14 ' ellipsizeMode='tail' numberOfLines={2} >{product?.name}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text className='text-xl font-light text-gray-600' >5.0</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Icon name='star-outline' size={20} color={'#EEAD0E'} />
              <Icon name='star-outline' size={20} color={'#EEAD0E'} />
              <Icon name='star-outline' size={20} color={'#EEAD0E'} />
              <Icon name='star-outline' size={20} color={'#EEAD0E'} />
              <Icon name='star-outline' size={20} color={'#EEAD0E'} />
            </View>
            <Text className='text-xl font-light text-gray-600' >(10)</Text>
          </View>
          <Text className='text-lg font-medium text-gray-600' >3 đã bán</Text>
        </View>
        <Text className='text-sm font-medium text-gray-600' >Hồ chí Minh</Text>
      </View>
    </View>
  )
}
export default ProductDetail