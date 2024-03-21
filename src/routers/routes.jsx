import TabScreens from '../components/BottomTab/TabScreens.jsx'
import Login from '../screens/Auth/Login/Login.jsx'
import Register from '../screens/Auth/Register/Register.jsx'
import ForgotPassword from '../screens/Auth/ForgotPassword/ForgotPassword.jsx'
import ProductsScreen from '../screens/ProductsScreen/ProductsScreen.jsx'
import ProductDetailScreen from '../screens/ProductDetailScreen/ProductDetailScreen.jsx'
import EditProfile from '../screens/Profile/EditProfile/EditProfile.jsx'
import EditAddress from '../screens/Profile/EditAddress/EditAddress.jsx'
import EditBank from '../screens/Profile/EditBank/EditBank.jsx'
import EditEWallet from '../screens/Profile/EditEWallet/EditEWallet.jsx'
import SearchResult from '../screens/SearchResult/SearchResult.jsx'
import Cart from '../screens/Cart/Cart.jsx'
import Orders from '../screens/Orders/Orders.jsx'
import Checkout from '../screens/Checkout/Checkout.jsx'

const publicScreens = [
    { name:'TabScreens', component: TabScreens },
    { name:'Login', component: Login },
    { name:'Register', component: Register },
    { name:'ForgotPassword', component: ForgotPassword },
    { name:'ProductsScreen', component: ProductsScreen },
    { name:'ProductDetailScreen', component: ProductDetailScreen },
    { name:'EditProfile', component: EditProfile },
    { name:'EditAddress', component: EditAddress },
    { name:'EditBank', component: EditBank },
    { name:'EditEWallet', component: EditEWallet },
    { name:'SearchResult', component: SearchResult },
    { name:'Cart', component: Cart },
    { name:'Orders', component: Orders },
    { name:'Checkout', component:  Checkout }

]


export { publicScreens }