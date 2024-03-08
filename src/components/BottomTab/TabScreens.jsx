import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BottomNavigation from './BottomNavigation'
import Home from '../../screens/Home/Home'
import Profile from '../../screens/Profile/Profile'
import Chats from '../../screens/Chats/Chats'
import Notifications from '../../screens/Notifications/Notifications'

const Tab = createBottomTabNavigator()
function TabScreens() {
    return (
        <Tab.Navigator tabBar={(props) => <BottomNavigation {...props} />}>
            <Tab.Screen name="Trang chủ" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Hỏi đáp" component={Chats} options={{ headerShown: false }} />
            <Tab.Screen name="Thông báo" component={Notifications} options={{ headerShown: false }} />
            <Tab.Screen name="Tài khoản" component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}
export default TabScreens