
import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'

interface SignInFormData {
  email: string,
  password: string
}

const SignIn = () => {

  const [form, setForm] = useState<SignInFormData>({
    email: '',
    password: '' 
  })

  return (
    <SafeAreaView>
      <Text>SignIn</Text>
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

export default SignIn
