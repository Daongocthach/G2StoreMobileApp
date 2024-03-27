import axios from 'axios'
const reviewApi = {
    addReview(comment, rating, productId, customerId) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}add-review`
        return axios.post(url, { comment, rating, product: { id: productId }, customer: { id: customerId } })
    },
    getReviewByProduct(id) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}reviews-product/${id}`
        return axios.get(url)
    },
    getReviewByCustomer(id) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}reviews-customer/${id}`
        return axios.get(url)
    },
    getReviewByCustomerAndProduct(customerId, productId) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}review-customer-product?customerId=${customerId}&productId=${productId}`
        return axios.get(url)
    }
}
export default reviewApi