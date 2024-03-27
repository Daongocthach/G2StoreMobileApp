import axios from 'axios'
const categoryApi = {
    getAllEnabledCategories() {
        const url = `${process.env.EXPO_PUBLIC_API_URL}categories-enabled`
        return axios.get(url)
    },
    getCategoryById(id) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}category/${id}`
        return axios.get(url)
    }
}
export default categoryApi