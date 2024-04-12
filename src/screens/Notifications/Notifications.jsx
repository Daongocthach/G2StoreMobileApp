import { Text, View, ScrollView } from 'react-native'
import { useColorScheme } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import notificationApi from '../../apis/notificationApi'
import getStyles from './styles'
import Notification from '../../components/Notification/Notification'


const Notifications = () => {
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const [notifications, setNotifications] = useState([])
    const styles = getStyles(colorScheme)
    useEffect(() => {
        notificationApi.getAllnotifications()
            .then((response) => {
                setNotifications(response.data)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.body}>
                <Text style={styles.title}>Thông báo</Text>
                <ScrollView className='w-full mb-5'>
                    <View className='items-center'>
                        {Array.isArray(notifications) && notifications.map((notification, index) => (
                            <Notification key={index} notification={notification}/>
                        )) }
                    </View>
                </ScrollView>

            </View>

        </SafeAreaView>
    )

}

export default Notifications
