
import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
  text?: string
  containerStyles?: string
  onPressBack?: () => void
  children?: React.ReactNode
}

const GoBackHeader = (props: Props) => {
  return (
    <View className={`py-3 px-4 flex flex-row items-center ${props.containerStyles}`}>
      <TouchableOpacity onPress={props.onPressBack}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text className='text-white text-base font-psemibold ml-4'>
        {props.text}
      </Text>
      {props.children}
    </View>
  )
}

export default GoBackHeader
