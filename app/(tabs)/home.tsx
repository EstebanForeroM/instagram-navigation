import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconButton from '@/components/IconButton'
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { getPosts } from '@/lib/rust_backend';
import PostList from '@/components/PostList';

const Home = () => {
  return (
    <SafeAreaView className='bg-background w-screen h-full'>
      <HomeHeader/>
      <PostList
        fetchPostFunction={getPosts}
      />
    </SafeAreaView>
  )
}

export default Home


const HomeHeader = () => {
  return (
    <View className='mt-4 px-4 flex flex-row justify-between items-center'>
      <Text className='text-accent font-pbold text-2xl'>Night Flow</Text>
      <View className='flex flex-row'>

        <IconButton
          icon = {<Entypo name="notification" size={24} color="white" />}
          onPress={() => {router.push('/notification/notification')}}
        />

        <IconButton
          containerStyles='ml-4'
          icon = {<Ionicons name="chatbubble-ellipses" size={24} color="white" />}
          onPress={() => {router.push('/(chat)/inbox')}}
        />

      </View>
    </View>
  )
}
