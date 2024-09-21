import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import GoBackHeader from '@/components/GoBackHeader'
import { router } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import IconButton from '@/components/IconButton'
import AntDesign from '@expo/vector-icons/AntDesign';

const Inbox = () => {
  const { user } = useUser()

  const [searchResult, setSearchResult] = useState('')

  return (
    <SafeAreaView className='bg-background w-screen h-full'>
      <GoBackHeader
        text={ user?.username ?? 'Invalid User'}
        onPressBack={() => router.back()}
      />
      <TextField
        placeHolder='Search a chat'
        containerStyles='px-4 mt-4'
        textFieldStyles='rounded-full h-12 bg-background'
        value={searchResult}
        onChange={(newSearch) => setSearchResult(newSearch)}
      />
      <IconButton
        containerStyles='absolute bottom-4 right-4 p-2'
        icon={<AntDesign name="pluscircleo" size={32} color="#FF006E"/>}
        onPress={() => router.push('/(chat)/chat_creation')}
      />
    </SafeAreaView>
  )
}

export default Inbox
