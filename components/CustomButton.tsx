
import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface Props {
  text: string
  containerStyles?: string
  buttonStyles?: string
  onPress: () => void
}

const CustomButton = (props: Props) => {
  return (
    <View className={`${props.containerStyles}`}>
      <TouchableOpacity className={`${props.buttonStyles} h-16 w-full rounded-2xl flex justify-center items-center`}
        onPress={props.onPress}
      >
        <Text className='text-white text font-pbold'>{props.text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton
