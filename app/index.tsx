
import React from 'react'
import { Redirect } from 'expo-router'
import { SignedIn, SignedOut } from '@clerk/clerk-expo'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const Index = () => {

  return (
    <QueryClientProvider client={queryClient}>
      <SignedIn>
        <Redirect href={'/(tabs)/home'}/>
      </SignedIn>

      <SignedOut>
        <Redirect href={'/(auth)/sign-in'}/>
      </SignedOut>
    </QueryClientProvider>
  )
}

export default Index
