
import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { useSignIn } from '@clerk/clerk-expo'

interface SignInFormData {
  email: string,
  password: string
}

const SignIn = () => {
  const [form, setForm] = useState<SignInFormData>({
    email: '',
    password: '' 
  })

  const [errorMessage, setErrorMessage] = useState('')

  const { signIn, setActive, isLoaded } = useSignIn()

  const logIn = async () => {
    if (!isLoaded) {
      return
    }

    if (!form.email || !form.password) {
      setErrorMessage('Please fill all the fields')
      return 
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(tabs)/home')
      } else {
        console.log(JSON.stringify(signInAttempt, null, 2))
        setErrorMessage('Invalid data, try again')
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2))
      setErrorMessage(err.errors[0].message)
    }
  }

  return (
    <SafeAreaView className='bg-background w-screen h-full flex items-center'>
      <Text className='text-white mt-12 mb-8 text-2xl font-psemibold'>
        Log in into {' '}
        <Text className='text-accent font-pextrabold text-3xl'>Night Flow</Text>
      </Text>

      <Text className='text-red-600 text-base'>
        {errorMessage}
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
        secureTextField={true}
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
