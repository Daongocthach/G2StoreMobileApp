import { View, Text, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { mockData } from '../../../apis/mockdata'

function Review({ productId }) {
  return (
    <View style={{ backgroundColor: 'white', padding: 5 }}>
      {mockData?.products[0]?.reviews.map((review, index) => (
        <View style={{ height: 120 }} key={index} className='flex-row justify-between items-center bg-gray-200 m-2 p-1 rounded-md'>
          <View style={{ flex: 1.5 }}>
            <Text>{review?.content}</Text>
            <View className='flex-row items-center'>
              <Icon name='star-outline' size={10} color={'#EEAD0E'} />
              <Icon name='star-outline' size={10} color={'#EEAD0E'} />
              <Icon name='star-outline' size={10} color={'#EEAD0E'} />
              <Icon name='star-outline' size={10} color={'#EEAD0E'} />
              <Icon name='star-outline' size={10} color={'#EEAD0E'} />
              <Text style={{ fontSize: 12 }}>Thach</Text>
            </View>
          </View>
          <TouchableOpacity style={{ borderRadius: 10, flex: 1 }}>
            <View className='flex-row justify-end items-center gap-1'>
              <Text className='text-sm font-bold text-red-400 text-right' >Xem chi tiết</Text>
              <Icon name='arrow-right' size={15} color={'#FE555D'} />
            </View>
            <Image source={{
              uri: mockData?.products[0]?.image
            }} style={{ height: '90%', aspectRatio: 1 / 1, borderRadius: 10 }} />
          </TouchableOpacity>
        </View>
      ))
      }
      <Text className='text-sm font-bold text-red-400 text-right' >Xem chi tiết</Text>
      <Text className='text-sm font-bold text-red-400 text-right' >Xem chi tiết</Text>
      <Text className='text-sm font-bold text-red-400 text-right' >Xem chi tiết</Text>
      <Text className='text-sm font-bold text-red-400 text-right' >Xem chi tiết</Text>
      <Text className='text-sm font-bold text-red-400 text-right' >Xem chi tiết</Text>
    </View>
  )
}

export default Review