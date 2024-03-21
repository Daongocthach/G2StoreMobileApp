import { StyleSheet } from 'react-native'

const getStyles = (colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme == 'light' ? '#EEEEEE' : 'black'
    },
    title: {
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      fontSize: 28,
      fontWeight: 'bold',
      textAlign:'center'
    },
    body: {
      marginTop: 2,
      flexDirection: 'column',
      display: 'flex',
      alignItems:'center',
      backgroundColor: colorScheme == 'dark' ? 'black' : '#EEEEEE',
      padding: 1,
      gap: 5
    },
    footer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
    },
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14
    },
    buttonSubmit: {
      justifyContent: 'center',
      width: 100,
      height: 35,
      borderRadius: 10
    },
    checkbox: {
      alignSelf: 'center',
    },
  })
}

export default getStyles
