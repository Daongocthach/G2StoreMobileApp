import { View, Text, TouchableOpacity, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useColorScheme } from 'nativewind'
import { useNavigation } from '@react-navigation/native'
import getStyles from './styles'
import { useState } from 'react'

function SideBar() {
    const { colorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const [isMenuVisible, setMenuVisible] = useState(false)

    const toggleMenu = () => {
        setMenuVisible(!isMenuVisible)
    }
    return (
        <TouchableOpacity onPress={toggleMenu} style={styles.container}>
            <Icon name='menu' size={30} style={{}} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isMenuVisible}
                onRequestClose={toggleMenu}>
                <View style={styles.menu}>
                    <TouchableOpacity onPress={toggleMenu}>
                        <Text>Close Menu</Text>
                    </TouchableOpacity>
                    <Text>Menu Item 1</Text>
                    <Text>Menu Item 2</Text>
                    <Text>Menu Item 3</Text>
                </View>
            </Modal>
        </TouchableOpacity>
    )
}

export default SideBar