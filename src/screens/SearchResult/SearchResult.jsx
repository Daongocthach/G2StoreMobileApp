import { Text, View, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import { useState, useEffect } from 'react'
import { useColorScheme } from 'nativewind'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import { SafeAreaView } from 'react-native-safe-area-context'
import productApi from '../../apis/productApi'
import getStyles from './styles'


const { width, height } = Dimensions.get('window')

export default function SearchResult() {
  const [productsPropose, setProductsPropose] = useState([])
  const [products, setProducts] = useState([])
  const [notFound, setNotFound] = useState(false)
  const [input, setInput] = useState('')
  const navigation = useNavigation()
  const { colorScheme } = useColorScheme()
  const styles = getStyles(colorScheme)
  useEffect(() => {
    productApi.getAllEnabledProducts()
      .then(response => {
        setProductsPropose(response.data.content)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])
  const handleSearch = () => {
    productApi.searchProductsByName(input)
      .then(response => {
        setProducts(response.data)
        setNotFound(false)
      })
      .catch(error => {
        setNotFound(true)
        setProducts([])
      })
  }
  const handleClear = () => {
    setInput('')
    setProducts([])
    setNotFound(false)
  }
  const handleTextInputChange = (value) => {
    if (value == '') {
      setProducts([])
      setNotFound(false)
    }
    setInput(value)

  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <View className='items-center mt-2 h-1/8 flex-row justify-between pl-5 pr-5 gap-2'>
          <Icon name='chevron-left' size={30} onPress={() => { navigation.navigate('Trang chủ') }} />
          <View className='flex-row items-center pl-2 h-5/6 w-4/6 rounded-3xl' style={{ borderColor: '#828282', borderWidth: 1 }}
            onPress={() => navigation.navigate('SearchResult')}>
            <TextInput style={styles.input} className="text-black" placeholder='Tìm kiếm...' autoFocus value={input}
              onChangeText={(value) => handleTextInputChange(value)} />
            {input !== '' && <Text className='text-center text-black text-base font-bold' onPress={handleClear}>x</Text>}
          </View>
          <TouchableOpacity className='ml-1 w-14 h-8 bg-orange-400 rounded-xl justify-center' onPress={handleSearch}>
            <Text className='text-center text-white text-xs font-bold'>Tìm</Text>
          </TouchableOpacity>
        </View>
        <View className='flex-1 pl-5 pt-2'>
          {notFound &&
            <Text className='text-base font-bold text-center text-gray-400 mt-2' >Không tìm thấy nội dung yêu cầu!</Text>
          }
          {(products.length < 1) && <Text className='text-base font-bold mt-2' >Đề xuất tìm kiếm</Text>}
          <ScrollView className='gap-6 mt-1'>
            {(Array.isArray(products) && products.length > 0) ?
              products.map((product, index) => (
                <TouchableOpacity key={index} className='flex-row justify-between pr-2 border-b-gray-300' style={{ borderBottomWidth: 0.5 }}
                  onPress={() => { navigation.navigate('ProductDetailScreen', { product: product }) }}>
                  <Text className='text-base'>{product?.name}</Text>
                  <Icon name='chevron-right' size={20} />
                </TouchableOpacity>
              ))
              : Array.isArray(products) && productsPropose.map((product, index) => (
                <TouchableOpacity key={index} className='flex-row justify-between pr-2 border-b-gray-300' style={{ borderBottomWidth: 0.5 }}
                  onPress={() => { navigation.navigate('ProductDetailScreen', { product: product }) }}>
                  <Text className='text-base'>{product?.name}</Text>
                  <Icon name='chevron-right' size={20} color={'gray'} />
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>
      </View>
    </SafeAreaView >
  )
}
