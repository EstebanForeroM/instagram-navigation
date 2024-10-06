import React from 'react'
import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const ChatLayout = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name='inbox' options={{ headerShown: false }}/>
        <Stack.Screen name='[chat_id]' options={{ headerShown: false }}/>
        <Stack.Screen name='chat_creation' options={{ headerShown: false }}/>
      </Stack>
    </QueryClientProvider>
  )
}

export default ChatLayout
