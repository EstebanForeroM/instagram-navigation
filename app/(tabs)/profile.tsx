import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { useClerk, useUser } from '@clerk/clerk-expo'

const ProfilePage = () => {
  
  const { signOut } = useClerk()

  const onSignOut = () => {
    signOut()
    router.replace('/(auth)/sign-in')
  }

  return (
    <SafeAreaView className='bg-background w-screen h-full'>
      <Text>ProfilePage</Text>
      <CustomButton
        text='Log out'
        onPress={onSignOut}
      />
    </SafeAreaView>
  )
}

export default ProfilePage
