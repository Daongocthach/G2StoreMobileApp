import { StyleSheet } from 'react-native'

const getStyles = (colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:'column',
      gap:3,
      backgroundColor: colorScheme == 'dark' ? 'black' : '#EEEEEE'
    },
    header: {
      flex: 1,
      backgroundColor: colorScheme == 'dark' ? 'black' : '#EEEEEE'
    },
    title: {
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      fontSize: 24,
      fontWeight: 'bold'
    },
    body: {
      flex: 5,
      flexDirection: 'column',
      display: 'flex',
      paddingTop: 10,
      backgroundColor: colorScheme == 'dark' ? 'black' : '#EEEEEE'
    },
    flexView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10
    },
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20
    },
    textTitle: {
      color: colorScheme == 'dark' ? '#AAAAAA' : '#696969',
      flex: 1,
      fontSize: 20,
      marginLeft: 10,
      fontWeight: 'bold'
    }
  })
}

export default getStyles
