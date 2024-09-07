import React from 'react'
import { Tabs } from 'expo-router'
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Octicons from '@expo/vector-icons/Octicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const TabsLayout = () => {
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#FF006E',
      tabBarInactiveTintColor: '#CDCDE0',
      tabBarStyle: {
        backgroundColor: '#000000',
        borderTopWidth: 1,
        borderTopColor: '#000000',
        height: 70
      }
    }}>

      <Tabs.Screen name='home' options={{
        headerShown: false,
        title: 'Home',
        tabBarIcon: ({color }) => (
          <Feather name='home' size={24} color={color}/>
        )
      }}/>

      <Tabs.Screen name='search' options={{
        headerShown: false,
        title: 'Search',
        tabBarIcon: ({color }) => (
          <FontAwesome5 name="search" size={24} color={color} />
        )
      }}/>

      <Tabs.Screen name='create' options={{
        headerShown: false,
        tabBarIcon: ({color }) => (
          <Ionicons name="add-circle" size={24} color={color} />
        )
      }}/>

      <Tabs.Screen name='video' options={{
        headerShown: false,
        tabBarIcon: ({color }) => (
          <Octicons name="video" size={24} color={color} />
        )
      }}/>

      <Tabs.Screen name='profile' options={{
        headerShown: false,
        tabBarIcon: ({color }) => (
          <MaterialIcons name="account-circle" size={24} color={color} />
        )
      }}/>
    </Tabs>
  )
}

export default TabsLayout
