import { StyleSheet } from 'react-native'

const getStyles = (colorScheme) => {
  return StyleSheet.create({
    input: {
      width: '85%',
      height: '100%',
      padding: 5,
      marginRight: 10,
      fontSize: 20,
      color: colorScheme == 'dark' ? '#AAAAAA' : '#696969'
    }
  
  })
}

export default getStyles
