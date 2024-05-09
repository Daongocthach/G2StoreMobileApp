import { Text, View, TextInput, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { useColorScheme } from 'nativewind'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import showAlertOk from '../../../components/Alert/AlertOk'
import getStyles from './styles'
import ghnApi from '../../../apis/ghnApi'
import authenApi from '../../../apis/authenApi'
import DropdownMenu from '../../../components/DropdownMenu/DropdownMenu'
import { login } from '../../../redux/actions/auth'
import Loading from '../../../components/Loading/Loading'

const EditAddress = () => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const user = useSelector(state => state.auth)
    const [fullName, setFullName] = useState(user?.fullName)
    const [phoneNo, setPhoneNo] = useState(user?.phoneNo)
    const [address, setAddress] = useState(user?.address)
    const [ward, setWard] = useState(user?.ward)
    const [wards, setWards] = useState([])
    const [district, setDistrict] = useState(user?.district)
    const [districts, setDistricts] = useState([])
    const [province, setProvince] = useState(user?.province)
    const [provinces, setProvinces] = useState([])
    const navigation = useNavigation()
    const { colorScheme, toggleColorScheme } = useColorScheme()
    const styles = getStyles(colorScheme)
    const handleSave = async () => {
        setLoading(true)
        const provinceName = provinces.find(item => item.value === province)?.label || ''
        const districtName = districts.find(item => item.value === district)?.label || ''
        if (provinceName && districtName) {
            authenApi.updateProfile(user?.id, fullName, phoneNo, user?.avatar, provinceName, districtName, district, ward)
                .then((response) => {
                    dispatch(login(response.data))
                    showAlertOk('Thành công', 'Cập nhật thành công!')
                })
                .catch(error => {
                    console.error('Error fetching data:', error)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
        else {
            showAlertOk('Cập nhật thất bại', 'Vui lòng kiểm tra lại thông tin!')
            setLoading(false)
        }
    }
    useEffect(() => {
        ghnApi.getProvices()
            .then(response => {
                setProvinces(response.data.data.map(item => ({
                    label: item.ProvinceName,
                    value: item.ProvinceID
                })))
            })
            .catch(error => {
                console.error('Error fetching data:', error)
            })
    }, [])
    useEffect(() => {
        if (province && province !== user?.province)
            ghnApi.getDistricts(province)
                .then(response => {
                    setDistricts(response.data.data.map(item => ({
                        label: item.DistrictName,
                        value: item.DistrictID
                    })))
                    setDistrict('')
                })
    }, [province])
    useEffect(() => {
        if (district && district !== user?.district)
            ghnApi.getWards(district)
                .then(response => {
                    setWards(response.data.data.map(item => ({
                        label: item.WardName,
                        value: item.WardName
                    })))
                    setWard('')
                })
    }, [district])
    return (
        <SafeAreaView style={styles.container}>
            <Icon name='chevron-left' size={40} style={{ marginTop: 10 }} onPress={() => { navigation.navigate('Tài khoản') }} />
            <View style={styles.body}>
                <Text style={styles.title}>Thông tin nhận hàng</Text>
                <View className='w-full p-2'>
                    <Text className='text-sm font-medium mt-3'>Tên người nhận</Text>
                    <TextInput className='bg-gray-200 h-14 p-1 rounded-md' placeholder='Tên người nhận' placeholderTextColor={'gray'} onChangeText={setFullName} value={fullName} />
                    <Text className='text-sm font-medium mt-3'>Số điện thoại</Text>
                    <TextInput className='bg-gray-200 h-12 p-1 rounded-md' placeholder='Số điện thoại' placeholderTextColor={'gray'} onChangeText={setPhoneNo} value={phoneNo} />
                    <Text className='text-sm font-medium mt-3'>Tỉnh / Thành phố</Text>
                    <DropdownMenu items={provinces} value={province} setValue={setProvince} />
                    <Text className='text-sm font-medium mt-3'>Quận / Huyện</Text>
                    <DropdownMenu items={districts} value={district} setValue={setDistrict} />
                    <Text className='text-sm font-medium mt-3'>Phường / Xã</Text>
                    <DropdownMenu items={wards} value={ward} setValue={setWard} />
                    <Text className='text-sm font-medium mt-3'>Địa chỉ</Text>
                    <TextInput className='bg-gray-200 h-12 p-1 rounded-md' placeholder='Ex: 112 Đường Lê Văn Chí' placeholderTextColor={'gray'} onChangeText={setAddress} value={address} />
                </View>
                <TouchableOpacity className='w-24 h-9 bg-orange-400 rounded-xl justify-center mt-5' onPress={handleSave}>
                    <Text className='text-center font-bold text-sm text-white'>Lưu</Text>
                </TouchableOpacity>
            </View>
            {loading && <Loading />}
        </SafeAreaView>
    )

}

export default EditAddress
