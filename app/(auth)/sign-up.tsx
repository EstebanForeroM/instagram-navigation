import { View, Text } from 'react-native'
import Modal, { ReactNativeModal } from 'react-native-modal'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import CustomButton from '@/components/CustomButton'
import { Link, router } from 'expo-router'
import { useSignUp } from '@clerk/clerk-expo'
import LogInOAuth from '@/components/LogInGoogle'

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

  const { isLoaded, signUp, setActive } = useSignUp()
  const [pendingVerification, setPendingVerification] = useState(false)
  const [code, setCode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [errVerification, setErrVerification] = useState('')

  useEffect(() => {
    setCode('')
    if (errVerification !== '') {
      setTimeout(() => {
        setErrVerification('')
      }, 4000)
    }
  }, [errVerification])

  useEffect(() => {
    if (errorMessage !== '') {
      setTimeout(() => setErrorMessage(''), 4000)
    }
  }, [errorMessage])

  const onSignUpPressed = async () => {

    if (!form.username || !form.email || !form.password) {
      setErrorMessage('Please fill all the fields')
      return
    }

    try {
      await signUp?.create({
        username: form.username,
        emailAddress: form.email,
        password: form.password
      })

      await signUp?.prepareEmailAddressVerification({ strategy: 'email_code' })
      setPendingVerification(true)
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2))
      setErrorMessage(error.errors[0].message)
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return <Text>Loading ...</Text>
    }

    try {
      const completeSignUp = await signUp.attemptVerification({
        strategy: 'email_code',
        code: code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdUserId })
        router.replace('/(tabs)/home')
      }
    } catch (err) {
      setErrVerification('Incorrect')
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SafeAreaView className='bg-background w-screen h-full flex items-center'>
      <Text className='text-white mt-12 mb-6 text-2xl font-psemibold'>
        Sign Up Into {' '}
        <Text className='text-accent font-pextrabold text-3xl'>Night Flow</Text>
      </Text>

      <Text className='text-red-500 mb-2 text-lg'>{errorMessage}</Text>

      <TextField
        containerStyles='w-full px-8'
        value={form.username}
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
        onPress={onSignUpPressed}
      />

      <LogInOAuth strategy='oauth_google'/>

      <View className='w-full px-8'>
        <Text className='text-white text-base font-pregular mt-8'>
          already have an account? <Link href={'/sign-in'} className='text-accent font-pbold'>Sign In</Link>
        </Text>
      </View>

      <Modal isVisible={pendingVerification} className='px-2'>
        <View className='min-h-[300px] w-full bg-background rounded-2xl p-6'> 
          <Text className='text-white text-2xl font-psemibold'>Verification</Text>
          <Text className='text-white text-sm font-pregular'>We have sent a verification code to your email</Text>

          <Text className='text-white text-xl font-psemibold mt-6 mb-2'>Code</Text>
          <TextField
            textFieldStyles='text-xl h-14'
            containerStyles='mb-4'
            placeHolder={errVerification || '12345'}
            value={code}
            onChange={(newCode) => setCode(newCode)}
          />
          <CustomButton
            text='Verify Email'
            containerStyles='w-full h-12'
            buttonStyles='bg-accent h-12'
            onPress={() => onPressVerify()}
          />
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default SignUp
