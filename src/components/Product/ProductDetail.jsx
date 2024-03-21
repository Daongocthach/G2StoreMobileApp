import { Text, View, Image } from 'react-native'
import { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { formatCurrency } from '../../utils/price'
import reviewApi from '../../apis/reviewApi'

function ProductDetail({ product }) {
  const [reviews, setReviews] = useState([])
  var avarageReviews = 0
  reviews.map((review) => { avarageReviews += review?.rating })
  avarageReviews = avarageReviews / reviews.length
  useEffect(() => {
    reviewApi.getReviewByProduct(product?.id)
      .then((response) => {
        setReviews(response.data)
      })
  }, [])
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
            <Text className='text-xl font-light text-gray-600' >{avarageReviews}</Text>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Icon name='star-outline' size={20} color={'#EEAD0E'} />
              <Icon name='star-outline' size={20} color={'#EEAD0E'} />
              <Icon name='star-outline' size={20} color={'#EEAD0E'} />
              <Icon name='star-outline' size={20} color={'#EEAD0E'} />
              <Icon name='star-outline' size={20} color={'#EEAD0E'} />
            </View>
            <Text className='text-xl font-light text-gray-600' >({reviews.length})</Text>
          </View>
          <Text className='text-lg font-medium text-gray-600' >3 đã bán</Text>
        </View>
        <Text className='text-sm font-medium text-gray-600' >Hồ chí Minh</Text>
      </View>
    </View>
  )
}
export default ProductDetail