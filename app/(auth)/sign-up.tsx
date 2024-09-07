
import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomInputTextField from '@/components/CustomInputTextField'
import TextField from '@/components/TextField'

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

  return (
    <SafeAreaView className='text-3xl'>
      <Text>SignUp</Text>

      <TextField
        value={form.username}
        placeHolder='Enter your user name'
        onChange={(newUsername) => setForm({
          ...form,
          username: newUsername
        })}
      />

      <TextField
        value={form.email}
        placeHolder='Enter your email'
        onChange={(newEmail) => setForm({
          ...form,
          email: newEmail
        })}
      />

      <TextField
        value={form.password}
        placeHolder='Enter your password'
        onChange={(newPassword) => setForm({
          ...form,
          password: newPassword
        })}
      />
    </SafeAreaView>
  )
}

export default SignUp
