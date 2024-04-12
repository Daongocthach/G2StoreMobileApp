import axios from 'axios'
const notificationApi = {
    getAllnotifications() {
        const url = `${process.env.EXPO_PUBLIC_API_URL}notifications`
        return axios.get(url)
    },
}
export default notificationApi