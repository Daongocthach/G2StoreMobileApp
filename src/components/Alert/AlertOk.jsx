import { Alert } from 'react-native'
const showAlertOk = (title, message) =>
    Alert.alert(
        title || 'Thành công',
        message || 'Thêm thành công',
        [
            {
                text: 'Ok',
                style: 'destructive'
            }
        ]
    )
export default showAlertOk