import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './src/redux/store.js'
import Theme from './theme'
import { publicScreens } from './src/routers/routes.jsx'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={Theme}>
          <Stack.Navigator initialRouteName="Home">
            {publicScreens.map((screen, index) =>
              <Stack.Screen
                key={index}
                name={screen.name}
                component={screen.component}
                options={{ headerShown: false }}
              />
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}
