import { StyleSheet } from 'react-native'

const getStyles = (colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme == 'light' ? '#EEEEEE' : 'black'
    },
    header: {
      flex: 1,
      gap: 10,
      backgroundColor: colorScheme == 'light' ? '#EEEEEE' : 'black'
    },
    title: {
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      fontSize: 28,
      fontWeight: 'bold',
      textAlign:'center'
    },
    body: {
      backgroundColor: colorScheme == 'light' ? '#EEEEEE' : '#121212',
      alignItems:'center',
      justifyContent:'center',
      marginTop: 10
    }
  })
}

export default getStyles
