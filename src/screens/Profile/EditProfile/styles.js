import { StyleSheet } from 'react-native'

const getStyles = (colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme == 'light' ? 'white' : 'black'
    },
    header: {
      flex: 1,
      gap: 10,
      backgroundColor: colorScheme == 'light' ? 'white' : 'black'
    },
    title: {
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      fontSize: 28,
      fontWeight: 'bold',
      textAlign:'center'
    },
    body: {
      backgroundColor: colorScheme == 'light' ? 'white' : '#121212',
      gap: 5,
      alignItems:'center'
    },
    input: {
      borderBottomWidth: 0.5,
      borderBottomColor: 'black'
    }
  })
}

export default getStyles
