import { View, Text, Image, TouchableOpacity } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useEffect, useState } from 'react'
import reviewApi from '../../../apis/reviewApi'

function Reviews({ reviews }) {
  return (
    <View style={{ backgroundColor: 'white', padding: 1 }}>
      {Array.isArray(reviews) && reviews.map((review, index) => (
        <View key={index} className='flex-row items-center m-1 p-1 rounded-md'>
          <Image source={{
            uri: 'https://thewinwoman.com/wp-content/uploads/2021/08/download-2.png'
          }} style={{ height: 40, width: 40, borderRadius: 20 }} />
          <View className='ml-2'>
            <View className='flex-row items-center'>
              <Text className='text-base font-semibold text-gray-500'>Nguời mua #{review?.customerId}</Text>
              <AirbnbRating
                count={5}
                defaultRating={review?.rating}
                size={15}
                showRating={false}
              />
            </View>
            <Text className='text-base w-9/12' numberOfLines={3}>{review?.comment}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default Reviews