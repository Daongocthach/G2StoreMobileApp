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
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      color: colorScheme == 'light' ? '#666666' : '#D7D7D7'
    },
    body: {
      backgroundColor: colorScheme == 'light' ? 'white' : '#121212',
      gap: 5,
      alignItems:'center'
    },
    flexView: {
      height: 70,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 10,
      backgroundColor: colorScheme == 'light' ? 'white' : '#121212'
    },
    icon: {
      color: colorScheme == 'light' ? '#666666' : '#B7B7B7'
    }
  })
}

export default getStyles
