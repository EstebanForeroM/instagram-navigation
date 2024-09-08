
import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import GoBackHeader from '@/components/GoBackHeader'
import { router } from 'expo-router'

const Notification = () => {
  return (
    <SafeAreaView className='bg-background w-screen h-full'>
      <GoBackHeader
        text='Notifications'
        onPressBack={() => router.back()}
      />
    </SafeAreaView>
  )
}

export default Notification
