import { StyleSheet } from 'react-native'

const getStyles = (colorScheme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme == 'light' ? 'white' : 'black'
    },
    header: {
      marginTop: 20,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: colorScheme == 'light' ? '#E8E8E8' : '#292929',
      gap: 10,
      backgroundColor: colorScheme == 'light' ? 'white' : 'black'
    },
    title: {
      color: colorScheme == 'dark' ? '#AAAAAA' : 'black',
      fontSize: 34,
      fontWeight: 'bold'
    },
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 18,
      color: colorScheme == 'light' ? '#666666' : '#D7D7D7'
    },
    body: {
      backgroundColor: colorScheme == 'light' ? 'white' : '#121212',
      gap: 5,
      alignItems:'center',
      marginTop: 10
    },
    icon: {
      color: colorScheme == 'dark' ? '#AAAAAA' : '#696969'
    },
    buttonSubmit: {
      backgroundColor: colorScheme == 'dark' ? '#696969' : '#4F4F4F',
      width: '90%',
      borderRadius: 20,
      height: 50,
      marginTop: 20,
      justifyContent: 'center',
      flexDirection:'row',
      alignItems:'center',
      gap: 10
    },
    flexView: {
      height: 50,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginVertical: 10
    },
    input: {
      flex: 7,
      height: '100%',
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 20,
      padding: 10,
      marginRight: 10,
      fontSize: 20,
      color: colorScheme == 'dark' ? '#AAAAAA' : '#696969'
    },
    textTitle: {
      color: colorScheme == 'dark' ? '#AAAAAA' : '#696969',
      flex: 3,
      fontSize: 20,
      fontWeight: 'bold'
    },
  })
}

export default getStyles
