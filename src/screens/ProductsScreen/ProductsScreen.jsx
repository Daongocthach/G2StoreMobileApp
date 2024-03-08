import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useState, useEffect } from 'react'
import { useColorScheme } from 'nativewind'
import getStyles from './styles'
import ProductHomeSale from '../../components/Product/ProductHomeSale'
import Header from '../../components/Header/Header'
import productApi from '../../apis/productApi'

const ProductsScreen = () => {
  const navigation = useNavigation()
  const { colorScheme } = useColorScheme()
  const styles = getStyles(colorScheme)
  const [products, setProducts] = useState([])
  const [page, setPage] = useState(0)
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
    setIsLoading(false)
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
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Header />
        <View className='flex-1 pl-5 pb-1'>
          <View className='flex-row justify-between items-center' style={{ paddingRight: 30 }}>
            <Text className='text-xl font-bold' >Sản phẩm</Text>
            <Icon name='filter' size={30} />
          </View>
          {isLoading && <ActivityIndicator size="large" color="#0000ff" style={{ height: 100 }} />}
          <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              {products.map((product, index) => (
                <ProductHomeSale product={product} key={index} />
              ))}
              {showMessage && <Text className='flex-1  text-center text-base text-gray-500 font-semibold'>Bạn đã đến cuối trang</Text>}
            </View>
          </ScrollView>
        </View>
      </View>
    </View >
  )

}

export default ProductsScreen
