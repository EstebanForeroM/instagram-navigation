import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import AntDesign from '@expo/vector-icons/AntDesign';

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState('')

  return (
    <SafeAreaView className='bg-background w-screen h-full'>
      <TextField
        placeHolder='Search Something'
        containerStyles='px-4 mt-4'
        textFieldStyles='rounded-full h-12 bg-background'
        value={searchResult}
        onChange={(newSearch) => setSearchResult(newSearch)}
      />
      
    </SafeAreaView>
  )
}

export default SearchPage
