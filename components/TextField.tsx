import { View, Text, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'

interface Props {
  value: string,
  placeHolder: string,
  onChange: (text: string) => void
}

const TextField = (props: Props) => {
  return (
    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding': 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <TextInput 
          value={props.value} 
          placeholder={props.placeHolder}
          onChangeText={props.onChange}
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default TextField
