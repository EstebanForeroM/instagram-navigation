import { View, Text, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { router, useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import GoBackHeader from '@/components/GoBackHeader'
import { ChatData, UserData, add_users_to_chat, get_users_by_username } from '@/lib/rust_backend'
import { Socket, io } from 'socket.io-client'
import TextField from '@/components/TextField'
import Ionicons from '@expo/vector-icons/Ionicons';

import * as DateFns from 'date-fns'
import IconButton from '@/components/IconButton'
import ReactNativeModal from 'react-native-modal'
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomButton from '@/components/CustomButton'
import { useAuth } from '@clerk/clerk-expo'

interface Message {
  chat_id: string,
  created_at: string,
  message_content: string,
  message_id: string
}

const ChatScreen = () => {
  const { getToken } = useAuth()

  const { chat_id } = useLocalSearchParams<{chat_id: string}>();
  const [socket, setSocket] = useState<null | Socket>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const onceRef = useRef(false)
  const [configOpen, setConfigOpen] = useState(false)

  const [userQuery, setUserQuery] = useState('')
  const [users, setUsers] = useState<UserData[]>([])
  const [selectedUsers, setSelectedUsers] = useState<Map<string, UserData>>(new Map())

  const onSelectUser = (user: UserData) => {
    const updatedSelectedUsers = new Map(selectedUsers)
    if (selectedUsers.has(user.user_id)) {
      updatedSelectedUsers.delete(user.user_id)
    } else {
      updatedSelectedUsers.set(user.user_id, user)
    }

    setSelectedUsers(updatedSelectedUsers)
  }

  const addUsersToChat = async () => {
    const token = await getToken()

    setConfigOpen(false)
    setSelectedUsers(new Map())

    const userIdsArray = Array.from(selectedUsers.values()).map(user => user.user_id)

    add_users_to_chat(token ?? '', userIdsArray, chat_id)
  }

  
  useEffect(() => {
    const fetchUsers = async () => {
      let users = await get_users_by_username(userQuery)
      console.log('users: ', users)
      setUsers(users)
    }

    fetchUsers()
  }, [userQuery])

  useEffect(() => {
    if (onceRef.current) {
      return;
    }

    onceRef.current = true

    const socket = io('https://backendsocialnetwork-production.up.railway.app/chat_socket')
    setSocket(socket)

    socket.on('connect', () => {
      console.log("connected to socket server")
      console.log('emmiting join')
      socket.emit('join', chat_id)
    })

    socket.on("messages", (data) => {
      console.log('message data: ', data.Ok)
      data.Ok.map(message => {
        const date = new Date(message.created_at)
        const formattedDate = date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        });
        message.created_at = formattedDate
        return message
      })
      setMessages(data.Ok)
    })

    socket.on("message", (data) => {
      console.log('The messge is: ', data)
      const message = data
      const date = new Date(message.created_at)
      const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
      message.created_at = formattedDate
      setMessages((messages) => [...messages, message])
    })
  }, [])

  const sendMessage = () => {
    setText('')
    console.log('Sending message')
    socket?.emit('message',
      {
        chat_id: chat_id,
        content: text
      }
    )
  }

  return (
    <SafeAreaView className='bg-background h-full w-screen'>
      <GoBackHeader
        text={"chat" ?? 'no_chat_name'}
        onPressBack={() => router.back()}
      >
        <View className='grow flex-row justify-end'>
          <IconButton
            icon={<Ionicons name="settings-sharp" size={24} color="white"
              className='absolute grow'
            />}
            onPress={() => setConfigOpen(true)}
          />

        </View>
      </GoBackHeader>
      <FlatList
        data={messages}
        keyExtractor={data => data.message_id}
        className='px-4 mb-16'
        renderItem={(data) => (
          <View className='border bg-black rounded-xl p-3 mb-4'>
            <Text className='text-white'>{data.item.message_content}</Text>
            <Text className='text-white'>{data.item.created_at}</Text>
          </View>
        )}
      />

      <TextField
        value={text}
        placeHolder='write your message here'
        onChange={setText}
        containerStyles='absolute bottom-4 right-4 left-4'
        textFieldStyles='bg-background h-14 rounded-full'
        onSubmit={sendMessage}
      />

      <ReactNativeModal isVisible={configOpen}>
        <View className='h-5/6 bg-background rounded-xl p-4'>
          <Text className='text-white font-pmedium'>Add more users</Text>
          <IconButton
            containerStyles='absolute right-4 top-4'
            icon={<AntDesign name="closecircle" size={24} color="white" />}
            onPress={() => setConfigOpen(false)}
          />
          <TextField
            value={userQuery}
            onChange={setUserQuery}
            placeHolder='Enter the user to search'
            containerStyles='my-8'
            textFieldStyles='bg-background h-14'
          />
          <ScrollView>
            {users.map(user => <CustomButton 
              key={user.user_id}
              text={user.username + '#' + user.user_id.slice(5, 9)}
              buttonStyles={selectedUsers.has(user.user_id) ? 'border border-accent': ''}
              containerStyles='my-2'
              onPress={() => onSelectUser(user)}
            />)}
          </ScrollView>
          <CustomButton
            text={'Add users to chat'}
            onPress={() => addUsersToChat()}
            buttonStyles='bg-accent'
          />
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  )
}

export default ChatScreen
