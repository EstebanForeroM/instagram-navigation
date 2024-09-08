
import React from 'react'
import { Redirect } from 'expo-router'
import { SignedIn, SignedOut } from '@clerk/clerk-expo'

const Index = () => {

  return (
    <>
      <SignedIn>
        <Redirect href={'/(tabs)/home'}/>
      </SignedIn>

      <SignedOut>
        <Redirect href={'/(auth)/sign-in'}/>
      </SignedOut>
    </>
  )
}

export default Index
