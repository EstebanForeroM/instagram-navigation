
import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import CustomButton from '@/components/CustomButton'
import { Link } from 'expo-router'

interface SignUpFormData {
  username: string
  email: string,
  password: string
}

const SignUp = () => {

  const [form, setForm] = useState<SignUpFormData>({
    username: '',
    email: '',
    password: '' 
  })

  const signUp = async () => {

  }

  return (
    <SafeAreaView className='bg-background w-screen h-full flex items-center'>
      <Text className='text-white my-12 text-2xl font-psemibold'>
        Sign Up Into {' '}
        <Text className='text-accent font-pextrabold text-3xl'>Night Flow</Text>
      </Text>

      <TextField
        containerStyles='w-full px-8'
        value={form.email}
        placeHolder='Enter your username'
        onChange={(newUserName) => setForm({
          ...form,
          username: newUserName
        })}
        textFieldStyles='mb-8'
      />

      <TextField
        containerStyles='w-full px-8'
        value={form.email}
        placeHolder='Enter your email'
        onChange={(newEmail) => setForm({
          ...form,
          email: newEmail
        })}
        textFieldStyles='mb-8'
      />

      <TextField
        containerStyles='w-full px-8'
        value={form.password}
        placeHolder='Enter your password'
        secureTextField={true}
        onChange={(newPassword) => setForm({
          ...form,
          password: newPassword
        })}
      />

      <CustomButton
        containerStyles='w-full px-8 my-8'
        buttonStyles='border-2 border-highlight'
        text='Sign Up'
        onPress={signUp}
      />

      <CustomButton
        containerStyles='w-full px-8'
        buttonStyles='bg-secondary'
        text='Log in with google'
        onPress={signUp}
      />

      <View className='w-full px-8'>
        <Text className='text-white text-base font-pregular mt-8'>
          already have an account? <Link href={'/sign-in'} className='text-accent font-pbold'>Sign In</Link>
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default SignUp
