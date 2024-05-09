import { Text, View, Dimensions, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react'
import { useColorScheme } from 'nativewind'
import getStyles from './styles'
import ProductHome from '../../components/Product/ProductHomeNew'
import Voucher from './Voucher/Voucher'
import ProductHomeSale from '../../components/Product/ProductHomeSale'
import Header from '../../components/Header/Header'
import productApi from '../../apis/productApi'
import promotionApi from '../../apis/promotionApi'

const { width, height } = Dimensions.get('window')

const Home = () => {
  const [products, setProducts] = useState([])
  const [top10Products, setTop10Products] = useState([])
  const [promotions, setPromotions] = useState([])
  const navigation = useNavigation()
  const { colorScheme } = useColorScheme()
  const styles = getStyles(colorScheme)
  const [page, setPage] = useState(0)
  const [pageTop10, setPageTop10] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const fetchProducts = async () => {
    setIsLoading(true)
    setTimeout(() => {
    }, 1000)
    productApi.getAllEnabledProducts(page)
      .then((response) => {
        setProducts((prevProducts) => [...prevProducts, ...response.data.content])
        setPage((prevPage) => prevPage + 1)
      })
      .catch(err => {
        console.log(err)
        setShowMessage(true)
      })
    productApi.getTop10Products(page)
      .then((response) => {
        setTop10Products((prevProducts) => [...prevProducts, ...response.data.content])
        setPageTop10((prevPage) => prevPage + 1)
      })
      .catch(err => {
        console.log(err)
        setShowMessage(true)
      }).finally(() => {
        setIsLoading(false)
      })
  }
  const handleScroll = ({ nativeEvent }) => {
    if (isCloseToBottom(nativeEvent) && !isLoading) {
      fetchProducts()
    }
  }

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 20
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
  }
  useEffect(() => {
    fetchProducts()
    promotionApi.getAllPromotions()
      .then(response => {
        setPromotions(response.data)
      })
      .catch(error => {
        console.error(error)
      })
  }, [])
  return (
    <SafeAreaView style={styles.body}>
      <Header />
      <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
        <View className='pl-2 bg-white flex-col justify-center' style={{ height: height / 4 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20 }}>
            <Text className='text-lg font-semibold text-gray-600' >Top 10 bán chạy</Text>
            <TouchableOpacity className='flex-row items-center' onPress={() => { navigation.navigate('ProductsScreen') }}>
              <Text className='text-base font-bold text-red-400' >Xem thêm</Text>
              <Icon name='arrow-right' size={25} color={'#FE555D'} />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} onScroll={handleScroll} scrollEventThrottle={16}>
            <View className='flex-1 flex-row items-center justify-center gap-3 ml-2' style={{ gap: 10 }}>
              {Array.isArray(top10Products) && top10Products.map((product, index) => (
                <ProductHome product={product} key={index} />
              ))}
              {isLoading && <ActivityIndicator size="large" color="#009ACD" />}
              {showMessage && <Text className='text-center text-base text-gray-500 font-semibold'>Hết</Text>}
            </View>

          </ScrollView>
        </View>
        <View className='bg-white flex-col justify-center' style={{ height: height / 5 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingRight: 20 }}>
            <Text className='text-lg font-semibold text-gray-600 ml-2' >Trạm voucher</Text>
            <TouchableOpacity className='flex-row items-center'>
              <Text className='text-base font-bold text-red-400' >Xem thêm</Text>
              <Icon name='arrow-right' size={25} color={'#FE555D'} />
            </TouchableOpacity>
          </View>
          <ScrollView horizontal={true} >
            <View className='flex-1 flex-row items-center ml-2' style={{ gap: 3 }}>
              {Array.isArray(promotions) && promotions.map((promotion, index) => (
                <Voucher voucher={promotion} key={index} />
              ))}
            </View>
          </ScrollView>
        </View>
        <View className='flex-col pb-1' style={{ flex: 3 }}>
          <Text className='text-lg font-semibold text-gray-600 ml-2' >Giảm giá</Text>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            {Array.isArray(products) && products.map((product, index) => (
              <ProductHomeSale product={product} key={index} style={{ flex: '1 1 50%' }} />
            ))}
          </View>
          {isLoading && <ActivityIndicator size="large" color="#009ACD" style={{ height: 100 }} />}
          {showMessage && <Text className='flex-1 mt-1 text-center text-base text-gray-500 font-semibold'>Bạn đã đến cuối trang</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
