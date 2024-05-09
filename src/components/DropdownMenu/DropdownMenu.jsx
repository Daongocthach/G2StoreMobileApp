import DropDownPicker from 'react-native-dropdown-picker'
import { View } from 'react-native'
import { useState } from 'react'

function DropdownMenu({ items, value, setValue }) {
    const [open, setOpen] = useState(false)

    return (
        <View >
            <DropDownPicker items={items} open={open} setOpen={() => { setOpen(!open) }} value={value}
                setValue={(val) => { setValue(val) }} maxHeight={300} autoScroll placeholder={value}
                showArrowIcon={true} className='border-0 bg-gray-200 z-0'
            />
        </View>
    )
}

export default DropdownMenu