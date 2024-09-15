import { View, Text, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import { router } from 'expo-router'
import { useClerk, useUser } from '@clerk/clerk-expo'
import PostItem from '@/components/PostItem'
import { Post } from '@/lib/rust_backend'

const ProfilePage = () => {
  
  const { signOut } = useClerk()
  const { user } = useUser()

  const [userPost, setUserPost] = useState<Post[]>([])

  const onSignOut = async () => {
    await signOut()
    router.replace('/(auth)/sign-in')
  }

  return (
    <SafeAreaView className='bg-background w-screen h-full p-4 pt-8'>
      <View className='w-full flex flex-row'>
        <Image
          source={{ uri: user?.imageUrl }}
          className='h-20 w-20 rounded-full mr-10'
        />
        <View className='flex'>
          <Text className='text-accent font-pmedium text-lg'>
            {user?.username}
          </Text>
          <Text className='text-white font-pmedium'>
            Followers: 9
          </Text>
          <Text className='text-white font-pmedium'>
            Posts: 9
          </Text>
        </View>
      </View>
      <CustomButton
        text='Modify profile'
        containerStyles='my-8'
        buttonStyles='bg-accent h-14'
        onPress={() => router.push('/profile_custom/profile_custom')}
      />
      <CustomButton
        text='Log out'
        buttonStyles='border border-red-500 h-12'
        onPress={onSignOut}
      />
      <Text className='text-accent text-lg font-pmedium my-4'>Your posts</Text>
      <FlatList
        data={userPost}
        keyExtractor={(post) => post.post_id}
        renderItem={({ item }) => (
          <PostItem post={item}/>
        )}
      />
    </SafeAreaView>
  )
}

export default ProfilePage
