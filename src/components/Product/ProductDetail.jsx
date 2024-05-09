import { Text, View, Image } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import { formatCurrency } from '../../utils/price'

function ProductDetail({ product, reviews }) {
  var avarageReviews = 0
  reviews.map((review) => { avarageReviews += review?.rating })
  avarageReviews = avarageReviews / reviews.length

  return (
    <View style={{ width: '100%', height: '100%', backgroundColor: 'white', flexDirection: 'column', paddingHorizontal: 5 }}>
      <Image source={{
        uri: product?.image
      }} style={{ height: '65%', width: '100%', borderRadius: 10 }} resizeMode='contain' />
      <View >
        <Text className='text-xl font-bold text-red-500' >{formatCurrency(product?.price)}</Text>
        <Text className='text-xl font-semibold text-gray-600 h-14 ' ellipsizeMode='tail' numberOfLines={2} >{product?.name}</Text>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text className='text-xl font-semibold text-gray-600' >{avarageReviews || 0}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <AirbnbRating
                count={5}
                defaultRating={avarageReviews}
                size={20}
                showRating={false}
              />
            </View>
            <Text className='text-xl font-light text-gray-600' >({reviews.length})</Text>
          </View>
          <Text className='text-lg font-medium text-gray-600' >{product?.sold} đã bán</Text>
        </View>
        <Text className='text-base font-normal text-gray-600' >Còn lại {product?.quantity}</Text>
      </View>
    </View>
  )
}
export default ProductDetail