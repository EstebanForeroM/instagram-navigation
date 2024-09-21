
import { View, Text } from 'react-native'
import React from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import GoBackHeader from '@/components/GoBackHeader'

const ChatScreen = () => {
  const { chat_id, chat_name } = useLocalSearchParams<{ chat_id: string, chat_name: string}>()

  return (
    <SafeAreaView className='bg-background h-full w-screen'>
      <GoBackHeader
        text={chat_name}
        onPressBack={() => router.back()}
      />
      <Text>ChatScreen</Text>
    </SafeAreaView>
  )
}

export default ChatScreen
