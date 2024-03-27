import axios from 'axios'
const authenApi = {
    signin(username, password) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}signin/customer`
        return axios.get(url, { params: { username, password } })
    },
    signup(username, password, email, fullName, phoneNo) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}signup`
        return axios.post(url, {
            username,
            password,
            email,
            fullName,
            phoneNo
        })
    },
    forgotPassword(email) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}customer/forgot-password?email=${email}`
        return axios.get(url)
    },
    updateProfile(id, fullName, phoneNo, avatar, province, district, districtId, ward, address) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}update-profile`
        return axios.put(url, {
           id, fullName, phoneNo, avatar, province, district, districtId, ward, address
        })
    },
    updatePassword(id, password, newPassword) {
        const url = `${process.env.EXPO_PUBLIC_API_URL}customer/update-password?newPassword=${newPassword}`
        return axios.post(url, {
           id, password
        })
    }
}

export default authenApi