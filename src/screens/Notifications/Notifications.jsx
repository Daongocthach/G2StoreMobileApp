import { Text, View, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getStyles from './styles'
import Notification from '../../components/Notification/Notification'


const Notifications = ({ route }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const handleSave = () => {

    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.title}>Thông báo</Text>
                <ScrollView className='w-full mb-5'>
                    <View className='items-center'>
                        <Notification />
                        <Notification />
                        <Notification />
                    </View>
                </ScrollView>

            </View>

        </SafeAreaView>
    )

}

export default Notifications
