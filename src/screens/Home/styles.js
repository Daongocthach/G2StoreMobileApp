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
      backgroundColor: colorScheme == 'dark' ? 'black' : '#EEEEEE'
    },
    footer: {
      flex: 0.8,
      backgroundColor: colorScheme == 'dark' ? 'black' : 'white',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10
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
      fontSize: 20
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
      backgroundColor: colorScheme == 'dark' ? '#696969' : '#4F4F4F',
      borderRadius: 10,
      height: 50,
      justifyContent: 'center'
    }
  })
}

export default getStyles
