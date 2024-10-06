import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import PostList from '@/components/PostList';
import { getUserQuery } from '@/lib/rust_backend';

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState('')
  const [reset, setReset] = useState(false)

  console.log("this is the console log page")

  return (
    <SafeAreaView className='bg-background w-screen h-full'>
      <TextField
        placeHolder='Search Something'
        containerStyles='px-4 my-4'
        textFieldStyles='rounded-full h-12 bg-background'
        value={searchResult}
        onChange={(newSearch) => setSearchResult(newSearch)}
        onSubmit={() => setReset(!reset)}
      />

      <PostList
        postsTag='search'
        fetchPostFunction={async (token, page) => {
          console.log("fetch post function executed, in search.tsx")
          return await getUserQuery(token, page, searchResult)
        }}
        resetControl={{
          reset: reset,
        }}
      />
      
    </SafeAreaView>
  )
}

export default SearchPage
