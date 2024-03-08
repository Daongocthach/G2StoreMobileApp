import { StyleSheet } from 'react-native'

const getStyles = (colorScheme) => {
  return StyleSheet.create({
    container: {
      marginLeft: '10px', flex: 1
    },
    menu: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
      width: '80%',
      height: '80%',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: 'black',
    }
  
  })
}

export default getStyles
