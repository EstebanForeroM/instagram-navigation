import React, { useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import GoBackHeader from '@/components/GoBackHeader'
import { router } from 'expo-router'
import { useAuth, useUser } from '@clerk/clerk-expo'
import IconButton from '@/components/IconButton'
import AntDesign from '@expo/vector-icons/AntDesign';
import { ChatData, getUserChats } from '@/lib/rust_backend'
import { FlatList, Text } from 'react-native'
import CustomButton from '@/components/CustomButton'

const Inbox = () => {
  const { user } = useUser()
  const [searchQuery, setSearchResult] = useState('')
  const [userChats, setUserChats] = useState<ChatData[]>([]);
  const { getToken } = useAuth()
  const [hasChanged, setHasChanged] = useState(false)

  useEffect(() => {
    const retrieveUserChats = async () => {
      const token = await getToken()
      const userChats = await getUserChats(token ?? '')

      setUserChats(userChats)
    }
    retrieveUserChats()
  }, [hasChanged])

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
        value={searchQuery}
        onChange={(newSearch) => setSearchResult(newSearch)}
      />
      <FlatList
        data={userChats}
        keyExtractor={userChat => userChat.chat_id}
        className='mt-8'
        renderItem={userChatRender => (
          <CustomButton
            text={userChatRender.item.chat_name}
            buttonStyles='border-t border-b border-accent h-14'
            onPress={() => router.push(`/(chat)/${userChatRender.item.chat_id}`)}
          />
        )}
      />
      <IconButton
        containerStyles='absolute bottom-4 right-4 p-2'
        icon={<AntDesign name="pluscircleo" size={32} color="#FF006E"/>}
        onPress={() => {
          router.push('/(chat)/chat_creation')
          setHasChanged(!hasChanged)
        }}
      />
    </SafeAreaView>
  )
}

export default Inbox
