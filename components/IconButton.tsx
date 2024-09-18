import { View, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props {
  icon: React.ReactNode,
  onPress: () => void
  onLongPress?: () => void
  onPressOut?: () => void
  containerStyles?: string
  onPressIn?: () => void
  activeOpacity?: number
}

const IconButton = (props: Props) => {
  return (
    <View className={props.containerStyles}>
      <TouchableOpacity 
        activeOpacity={props.activeOpacity}
        onPressIn={props.onPressIn}
        onPress={props.onPress}
        onLongPress={props.onLongPress}
        onPressOut={props.onPressOut}
      >
        {props.icon}
      </TouchableOpacity>
    </View>
  )
}

export default IconButton
