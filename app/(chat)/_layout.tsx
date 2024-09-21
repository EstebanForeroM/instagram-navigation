import React from 'react'
import { Stack } from 'expo-router'

const ChatLayout = () => {

  return (
    <Stack>
      <Stack.Screen name='inbox' options={{ headerShown: false }}/>
      <Stack.Screen name='chat' options={{ headerShown: false }}/>
      <Stack.Screen name='chat_creation' options={{ headerShown: false }}/>
    </Stack>
  )
}

export default ChatLayout
