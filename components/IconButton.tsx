import { View, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
  icon: React.ReactNode,
  onPress: () => void
}

const IconButton = (props: Props) => {
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        {props.icon}
      </TouchableOpacity>
    </View>
  )
}

export default IconButton
