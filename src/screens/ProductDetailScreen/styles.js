import { StyleSheet } from 'react-native'

const getStyles = (colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      gap: 3,
      backgroundColor: colorScheme == 'dark' ? 'black' : '#EEEEEE'
    },
    header: {
      flex: 2,
      backgroundColor: colorScheme == 'dark' ? 'black' : '#EEEEEE'
    },
    title: {
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      fontSize: 24,
      fontWeight: 'bold'
    },
    body: {
      flex: 7,
      flexDirection: 'column',
      display: 'flex',
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
    },
    footer: {
      flex: 0.8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 5,
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white'
    },
    flexView: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 10
    },
    button: {
      flex: 1,
      borderWidth: 2,
      borderColor: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      borderRadius: 10,
      marginHorizontal: 10,
      height: 40,
      justifyContent: 'center'
    },
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 14
    },
    input: {
      width: '85%',
      height: '100%',
      padding: 5,
      marginRight: 10,
      fontSize: 20,
      color: colorScheme == 'dark' ? '#AAAAAA' : '#696969'
    },
    textTitle: {
      color: colorScheme == 'dark' ? '#AAAAAA' : '#696969',
      flex: 1,
      fontSize: 20,
      marginLeft: 10,
      fontWeight: 'bold'
    },
    buttonSubmit: {
      justifyContent: 'center',
      width: 100,
      height: 35,
      borderRadius: 10
    }
  })
}

export default getStyles
