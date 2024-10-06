import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import PostList from '@/components/PostList';
import { getUserQuery } from '@/lib/rust_backend';
import { useQueryClient } from '@tanstack/react-query';

const SearchPage = () => {
  const [searchResult, setSearchResult] = useState('')
  const queryClient = useQueryClient()

  console.log("this is the console log page")

  return (
    <SafeAreaView className='bg-background w-screen h-full'>
      <TextField
        placeHolder='Search Something'
        containerStyles='px-4 my-4'
        textFieldStyles='rounded-full h-12 bg-background'
        value={searchResult}
        onChange={(newSearch) => setSearchResult(newSearch)}
        onSubmit={() => queryClient.invalidateQueries({ queryKey: ['search'] })}
      />

      <PostList
        postsTag='search'
        fetchPostFunction={async (token, page) => {
          console.log("fetch post function executed, in search.tsx")
          return await getUserQuery(token, page, searchResult)
        }}
      />
      
    </SafeAreaView>
  )
}

export default SearchPage
