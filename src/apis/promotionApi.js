import axios from 'axios'
const promotionApi = {
    checkPromotion(code) {
        const url = `http://192.168.114.86:8080/api/v1/check-promotion?code=${code}`
        return axios.get(url)
    },
    getAllPromotions() {
        const url = 'http://192.168.114.86:8080/api/v1/promotions'
        return axios.get(url)
    },
    usePromotion(id) {
        const url = `http://192.168.114.86:8080/api/v1/use-promotion/${id}`
        return axios.put(url)
    }
}
export default promotionApi