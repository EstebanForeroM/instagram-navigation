
import React, { useState } from 'react'
import GoBackHeader from '@/components/GoBackHeader'
import { router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import CustomButton from '@/components/CustomButton'
import { createChat } from '@/lib/rust_backend'
import { useAuth } from '@clerk/clerk-expo'
import ReactNativeModal from 'react-native-modal'
import { Alert } from 'react-native'
import { useQueryClient } from '@tanstack/react-query'

const ChatCreation = () => {
  const [chatName, setChatName] = useState('')
  const { getToken } = useAuth()
  const queryClient = useQueryClient()

  return (
    <SafeAreaView className='bg-background w-screen h-full'>
      <GoBackHeader
        text={ 'Chat creation' }
        onPressBack={() => router.back()}
      />
      <TextField
        value={chatName}
        textFieldStyles='h-14'
        containerStyles='mx-2'
        placeHolder='Write the name of the chat'
        onChange={setChatName}
      />
      <CustomButton
        buttonStyles='bg-accent h-12 mt-4'
        containerStyles='px-2'
        text='Create chat'
        onPress={async () => {
          const token = await getToken() ?? ''
          await createChat(token, chatName)
          queryClient.invalidateQueries({ queryKey: ["chats"] })
          router.back()
        }}
      />
    </SafeAreaView>
  )
}

export default ChatCreation
