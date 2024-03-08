import axios from 'axios'
const categoryApi = {
    getAllEnabledCategories() {
        const url = 'http://192.168.1.8:8080/api/v1/categories-enabled'
        return axios.get(url)
    },
    getCategoryById(id) {
        const url = `http://192.168.1.8:8080/api/v1/category/${id}`
        return axios.get(url)
    }
}
export default categoryApi