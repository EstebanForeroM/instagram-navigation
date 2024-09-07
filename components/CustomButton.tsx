
import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
  text: string
  onPress: () => void
}

const CustomButton = (props: Props) => {
  return (
    <View>
      <TouchableOpacity>
        <Text>{props.text}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomButton
