import { Text, View, TextInput, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Icon1 from 'react-native-vector-icons/FontAwesome'
import { useColorScheme } from 'nativewind'
import { useNavigation } from '@react-navigation/native'
import getStyles from './styles'

const { width, height } = Dimensions.get('window')

function Header() {
    const navigation = useNavigation()
    const { colorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    return (
        <View style={{ backgroundColor:'#EEEEEE' }}>
            <View style={{ marginTop:40, height: height / 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20 }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', flex: 5, height: '90%', paddingLeft: 10, borderRadius: 30, gap: 5, borderColor: '#828282', borderWidth: 1 }}
                    onPress={() => navigation.navigate('SearchResult')}>
                    <Icon1 name='search' size={25} style={{ color: 'gray' }} />
                    <TextInput style={styles.input} className="text-black" placeholder='Search...' readOnly={true}/>
                </TouchableOpacity>
                <View style={{ flex: 1, paddingLeft: 5 }}>
                    <Icon name='cart' size={30} />
                </View>
            </View>
            <View style={{ paddingLeft: 20, backgroundColor: '#EEEEEE', marginBottom: 20 }}>
                <Text className='text-xl font-bold' >G2 Store Xin Chào, Thach.</Text>
            </View>
        </View>
    )
}

export default Header