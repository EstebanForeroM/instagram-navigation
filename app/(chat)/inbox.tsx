import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import GoBackHeader from '@/components/GoBackHeader'
import { router } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'

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
    </SafeAreaView>
  )
}

export default Inbox
