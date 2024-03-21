import { Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import { useColorScheme } from 'nativewind'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import getStyles from './styles'

const { width, height } = Dimensions.get('window')

function Header() {
    const navigation = useNavigation()
    const { colorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const cartItems = useSelector(state => state.cart.cartItems)
    return (
        <View style={{ backgroundColor: '#EEEEEE' }}>
            <View style={{ marginTop: 40, height: height / 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                <TouchableOpacity style={{ flex: 1, paddingLeft: 5 }}>
                    <Icon name='menu' size={30} style={{ color: '#333333' }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', flex: 5, height: '90%', paddingLeft: 10, borderRadius: 30, gap: 5, borderColor: '#828282', borderWidth: 1 }}
                    onPress={() => navigation.navigate('SearchResult')}>
                    <Icon1 name='search' size={25} style={{ color: 'gray' }} />
                    <TextInput style={styles.input} className="text-black" placeholder='Search...' readOnly={true} />
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 1, paddingLeft: 5 }} onPress={() => navigation.navigate('Cart')}>
                    <Icon name='cart' size={30} style={{ color: '#333333' }} />
                    <View style={{
                        position: 'absolute',
                        right: -5,
                        top: -5,
                        backgroundColor: '#EE2C2C',
                        borderRadius: 10,
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{ color: 'white', fontSize: 12 }}>{cartItems.length || 0}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ paddingLeft: 20, backgroundColor: '#EEEEEE', marginBottom: 20 }}>
                <Text className='text-xl font-semibold text-gray-600 '>G2 Store Xin Chào, Thach.</Text>
            </View>
        </View>
    )
}

export default Header