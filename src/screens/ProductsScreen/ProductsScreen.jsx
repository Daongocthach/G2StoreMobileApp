import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import { useColorScheme } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import getStyles from './styles'
import ProductHomeSale from '../../components/Product/ProductHomeSale'
import Header from '../../components/Header/Header'
import productApi from '../../apis/productApi'
import DropDownPicker from 'react-native-dropdown-picker'

const selects = [
  { label: 'Cũ nhất', value: 0 }, { label: 'Mới nhất', value: 1 }
]

const ProductsScreen = () => {
  const { colorScheme } = useColorScheme()
  const styles = getStyles(colorScheme)
  const [products, setProducts] = useState([])
  const temps = products
  const [select, setSelect] = useState(0)
  const [open, setOpen] = useState(false)
  const [page, setPage] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

  const fetchProducts = async () => {
    setIsLoading(true)
    productApi.getAllEnabledProducts(page)
      .then((response) => {
        setProducts((prevProducts) => [...prevProducts, ...response.data.content])
        setPage((prevPage) => prevPage + 1)
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
  const handleSelect = (val) => {
    if (val == 1)
      productApi.getAllEnabledProductsDesc(0)
        .then((response) => {
          // setProducts(response.data.content)
          console.log(response.data.content)
          // setPage(1)
        })
        .catch(err => {
          console.log(err)
        })
    else {
      setProducts(temps)
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
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Header />
        <View className='flex-1 pb-1'>
          <View className='flex-row justify-between items-center gap-24 pr-5 mb-1' >
            <Text className='text-xl font-bold pl-3' >Sản phẩm</Text>
            {/* <Icon name='filter' size={30} /> */}
            <View className='flex-1'>
              <DropDownPicker items={selects} open={open} setOpen={() => { setOpen(!open) }} value={select}
                setValue={(val) => { handleSelect(val) }} autoScroll placeholder={select}
                showArrowIcon={true} className='bg-gray-200 z-0'
              />
            </View>
          </View>
          <ScrollView onScroll={handleScroll} scrollEventThrottle={16}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              {Array.isArray(products) && products.map((product, index) => (
                <ProductHomeSale product={product} key={index} />
              ))}
            </View>
            {isLoading && <ActivityIndicator size="large" color="#009ACD" style={{ height: 100 }} />}
            {showMessage && <Text className='flex-1 mt-1 text-center text-base text-gray-500 font-semibold'>Bạn đã đến cuối trang</Text>}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView >
  )

}

export default ProductsScreen
