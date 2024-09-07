

import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView className='bg-background w-screen h-full'>
      <HomeHeader/>
      <Text className='text-white'>Home</Text>
    </SafeAreaView>
  )
}

export default Home


const HomeHeader = () => {
  return (
    <View className='mt-4 px-4 flex flex-row justify-between'>
      <Text className='text-accent font-pbold text-2xl'>Night Flow</Text>
      <View></View>
    </View>
  )
}
