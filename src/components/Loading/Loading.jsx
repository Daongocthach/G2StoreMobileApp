import * as Progress from 'react-native-progress'
import { View } from 'react-native'

function Loading() {
    return (
        <View className='fixed top-0 left-0 w-full h-full bg-700 bg-opacity-50 flex justify-center items-center z-50'>
            <Progress.Circle size={80} indeterminate={true} borderWidth={3} />
        </View>
    )
}

export default Loading