
import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import CustomButton from '@/components/CustomButton'
import GoBackHeader from '@/components/GoBackHeader'
import { router } from 'expo-router'

const ProfileCustom = () => {
  const [username, setUsername] = useState('')

  return (
    <SafeAreaView className='bg-background h-full p-4 flex'>
      <GoBackHeader
        text='Profile'
        onPressBack={() => router.back()}
      />
      <View className='grow'>
        <Text className='text-accent font-psemibold text-2xl mb-10'>Change your profile</Text>
        <TextField
          value=''
          placeHolder='Enter your new username here'
          onChange={setUsername}
        />
      </View>

      <CustomButton
        buttonStyles='border border-accent'
        text='Save changes'
        onPress={() => {}}
      />
    </SafeAreaView>
  )
}

export default ProfileCustom
