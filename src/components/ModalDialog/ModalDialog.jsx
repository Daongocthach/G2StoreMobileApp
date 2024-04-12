import { useState } from 'react'
import { TouchableOpacity, Modal, TextInput, Text, View } from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import showAlertOk from '../Alert/AlertOk'
import reviewApi from '../../apis/reviewApi'

function ModalDialog({ productId, userId }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const handleAdd = () => {

    reviewApi.addReview(comment, rating, productId, userId)
      .then(() => {
        showAlertOk()
        setModalVisible(false)
      })
      .catch(() => {
        showAlertOk('Thêm thất bại', ' Lỗi hệ thống !')
      })
  }
  return (
    <View >
      <Modal animationType="slide" transparent={true} visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View className='items-center justify-center flex-1 bg-gray-600 p-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <View className='bg-white w-full opacity-100 rounded-lg p-1'>
            <Text className='text-xl text-blue-500 font-semibold text-center' >Viết đánh giá</Text>
            <View className='flex-row items-center mt-5 justify-between'>
              <Text className='text-base text-gray-600 font-medium ' >Đánh giá tổng quát</Text>
              <AirbnbRating count={5} defaultRating={rating} onFinishRating={(v) => setRating(v)} size={20} showRating={false}/>
            </View>
            <TextInput className='w-full text-base bg-gray-200 rounded-xl h-20 mt-2' multiline onChangeText={text => setComment(text)}
              value={comment} placeholder='Nhập nội dung đánh giá' />
            <View className='flex-row items-center justify-end gap-2 mt-2'>
              <TouchableOpacity className='items-center bg-gray-500 rounded-lg w-10 p-1' onPress={() => setModalVisible(false)}>
                <Text className='text-sm text-white text-center'>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity className='items-center bg-green-600 rounded-lg w-10  p-1' onPress={() => handleAdd()}>
                <Text className='text-sm text-white text-center'>Gửi</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity className='items-center bg-green-600 rounded-2xl p-1' onPress={() => setModalVisible(true)}>
        <Text className='text-sm text-white text-center' >Đánh giá</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ModalDialog