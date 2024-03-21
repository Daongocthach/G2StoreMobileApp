import axios from 'axios'
const productApi = {
    getAllEnabledProducts(page) {
        const url = `http://192.168.1.6:8080/api/v1/products-enabled?page=${page}`
        return axios.get(url)
    },
    getProductById(id) {
        const url = `http://192.168.1.6:8080/api/v1/product/${id}`
        return axios.get(url)
    },
    getProductsByProviderId(id) {
        const url = `http://192.168.1.6:8080/api/v1/products-provider/${id}`
        return axios.get(url)
    },
    getProductsBySubCategoryId(id) {
        const url = `http://192.168.1.6:8080/api/v1/products-subcategory/${id}`
        return axios.get(url)
    },
    getProductsByCategoryId(id) {
        const url = `http://192.168.1.6:8080/api/v1/products-category/${id}`
        return axios.get(url)
    },
    searchProductsByName(keyword) {
        const url = `http://192.168.1.6:8080/api/v1/products-search?keyword=${keyword}`
        return axios.get(url)
    }
}

export default productApi