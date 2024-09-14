import { View, Text, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import IconButton from '@/components/IconButton'
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { Post, getPosts } from '@/lib/rust_backend';
import { useAuth } from '@clerk/clerk-expo';
import PostItem from '@/components/PostItem';

const Home = () => {

  const [posts, setPosts] = useState<Post[]>([])
  const { getToken } = useAuth()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    const token = await getToken()
    const posts = await getPosts(token ?? '')
    setPosts(posts)
    setRefreshing(false)
  }

  useEffect(() => {
    onRefresh()
  }, [])


  return (
    <SafeAreaView className='bg-background w-screen h-full'>
      <HomeHeader/>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.post_id}
        renderItem={({ item }) => (
          <PostItem post={item}/>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
        }
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
