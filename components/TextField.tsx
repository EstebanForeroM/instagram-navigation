import { View, Text, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Platform } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'

interface Props {
  value: string,
  placeHolder: string,
  containerStyles?: string,
  textFieldStyles?: string,
  secureTextField?: boolean
  onSubmit?: () => void
  onChange: (text: string) => void
}

const TextField = (props: Props) => {
  return (
    <KeyboardAvoidingView  behavior={Platform.OS === 'ios' ? 'padding': 'height'} className={props.containerStyles}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} className='w-full'>
        <TextInput 
          className={`text-white border-2 w-full border-accent h-16 bg-secondary rounded-2xl p-4 ${props.textFieldStyles}`}
          placeholderTextColor={'#BEBEBE'}
          value={props.value} 
          placeholder={props.placeHolder}
          onChangeText={props.onChange}
          secureTextEntry={props.secureTextField}
          onSubmitEditing={props.onSubmit}
        />
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default TextField
