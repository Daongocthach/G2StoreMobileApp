import axios from 'axios'
const subCategoryApi = {
    getAllEnabledSubCategories() {
        const url = `${process.env.EXPO_PUBLIC_API_URL}sub-categories-enabled`
        return axios.get(url)
    },
    getSubCategoryById(id) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}sub-category/${id}`
        return axios.get(url)
    },
    getSubCategoriesByCateId(id) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}sub-categories/${id}`
        return axios.get(url)
    },
}

export default subCategoryApi