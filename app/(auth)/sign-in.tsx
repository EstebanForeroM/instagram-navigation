
import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { logger } from '@/lib/pino'

interface SignInFormData {
  email: string,
  password: string
}

const SignIn = () => {

  const [form, setForm] = useState<SignInFormData>({
    email: '',
    password: '' 
  })

  const logIn = async () => {
    router.replace('/(tabs)/home')
  }

  return (
    <SafeAreaView className='bg-background w-screen h-full flex items-center'>
      <Text className='text-white my-12 text-2xl font-psemibold'>
        Log in into {' '}
        <Text className='text-accent font-pextrabold text-3xl'>Night Flow</Text>
      </Text>
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
        onChange={(newPassword) => setForm({
          ...form,
          password: newPassword
        })}
      />

      <CustomButton
        containerStyles='w-full px-8 my-8'
        buttonStyles='border-2 border-highlight'
        text='Log in'
        onPress={logIn}
      />

      <CustomButton
        containerStyles='w-full px-8'
        buttonStyles='bg-secondary'
        text='Log in with google'
        onPress={logIn}
      />

      <View className='w-full px-8'>
        <Text className='text-white text-sm font-pbold mt-8'>
          Don't have an account? <Link href={'/sign-up'} className='text-accent'>Sign Up</Link>
        </Text>
      </View>
    </SafeAreaView>
  )
}

export default SignIn
