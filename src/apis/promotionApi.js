import axios from 'axios'
const promotionApi = {
    checkPromotion(code) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}check-promotion?code=${code}`
        return axios.get(url)
    },
    getAllPromotions() {
        const url = `${process.env.EXPO_PUBLIC_API_URL}promotions`
        return axios.get(url)
    },
    usePromotion(id) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}use-promotion/${id}`
        return axios.put(url)
    }
}
export default promotionApi