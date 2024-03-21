import { Text, View, Dimensions, useWindowDimensions, ScrollView, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TabView, TabBar } from 'react-native-tab-view'
import { useState } from 'react'
import { useColorScheme } from 'nativewind'
import { useSelector, useDispatch } from 'react-redux'
import getStyles from './styles'
import ProductDetail from '../../components/Product/ProductDetail'
import Details from './Details/Details'
import Review from './Review/Review'
import Header from '../../components/Header/Header'
import cartItemApi from '../../apis/cartItemApi'
import { updateQuantity, addToCart } from '../../redux/actions/cart'
import showAlertOk from '../../components/Alert/AlertOk'

const { width, height } = Dimensions.get('window')

const ProductDetailScreen = ({ route }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { colorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const user = useSelector(state => state.auth)
    const cartItems = useSelector(state => state.cart.cartItems)
    let product
    let heightReviews = 0
    if (route.params.product) {
        product = route.params.product
        heightReviews = product?.reviews ? product?.reviews?.length * 160 : 300
    }
    function handleClickAddToCart() {
        if (user && product && cartItems) {
            var update = false
            var quantity = 1
            cartItems.forEach(cartItem => {
                if (cartItem.product.id == product.id) {
                    update = true
                    quantity = cartItem.quantity + 1
                }
            })
            const cartItem = {
                'id': {
                    'customerId': user.id,
                    'productId': product.id
                },
                'customer': {
                    'id': user.id
                },
                'product': {
                    'id': product.id
                },
                'quantity': quantity
            }
            if (update) {
                cartItemApi.updateCartItem(cartItem)
                    .then(response => {
                        showAlertOk('Cập nhật số lượng sản phẩm', 'Thành công')
                        dispatch(updateQuantity(response.data))
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
            else {
                cartItemApi.addCartItem(cartItem)
                    .then(response => {
                        showAlertOk('Thêm vào giỏ hàng thành công', 'Thành công')
                        dispatch(addToCart(response.data))
                    })
                    .catch(error => {
                        console.error('Lỗi khi thêm vào giỏ hàng:', error)
                    })
            }
        } else {
            console.error('User hoặc Product không tồn tại.')
        }
    }
    const layout = useWindowDimensions()
    const [index, setIndex] = useState(0)
    const [routes] = useState([
        { key: 'first', title: 'Thông tin chi tiết' },
        { key: 'second', title: 'Bình luận và đánh giá' }
    ])
    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <Details description={product?.description} />
            case 'second':
                return <Review productId={product?._id} />
            default:
                return null
        }
    }
    const renderTabBar = props => (
        <TabBar
            {...props}
            activeColor={'#EE6363'}
            inactiveColor={'#696969'}
            indicatorStyle={{ backgroundColor: '#EE6363' }}
            style={{ backgroundColor: 'white' }}
            labelStyle={{ fontSize: 13, fontWeight: 'bold' }}
        />
    )
    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <Header />
                <ScrollView>
                    <View style={{ flexDirection: 'column', alignItems: 'center', height: height / 1.9, backgroundColor: 'blue' }}>
                        <ProductDetail product={product} />
                    </View>
                    <View style={{ width: '100%', height: heightReviews }}>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            renderTabBar={renderTabBar}
                            initialLayout={{ width: layout.width }}
                            indicatorStyle={{ backgroundColor: 'white' }}
                        />
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footer}>
                <View className='flex-column items-center'>
                    <Image source={{
                        uri: product?.image
                    }} style={{ height: 30, width: 30, borderRadius: 15 }} />
                    <Text className='text-sm font-medium text-gray-600 text-right'>Gian hàng</Text>
                </View>
                <TouchableOpacity className='flex-column items-center' onPress={() => { navigation.navigate('Hỏi đáp') }}>
                    <Icon name='chat-outline' size={30} color={'gray'} />
                    <Text className='text-sm font-medium text-gray-600 text-right'>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.buttonSubmit, backgroundColor: '#EE2C2C' }}>
                    <Text style={{ ...styles.text, color: 'white' }}>Mua hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ ...styles.buttonSubmit, backgroundColor: '#31A063' }} onPress={handleClickAddToCart}>
                    <Text style={{ ...styles.text, color: 'white' }}>Thêm vào giỏ</Text>
                </TouchableOpacity>
            </View>
        </View >
    )

}

export default ProductDetailScreen
