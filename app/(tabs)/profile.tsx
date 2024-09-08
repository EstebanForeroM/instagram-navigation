import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'

const ProfilePage = () => {
  return (
    <SafeAreaView className='bg-background w-screen h-full'>
      <Text>ProfilePage</Text>
      <CustomButton
        text='Log out'
        onPress={() => router.replace('/(auth)/sign-in')}
      />
    </SafeAreaView>
  )
}

export default ProfilePage
