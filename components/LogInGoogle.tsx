
import { View } from 'react-native'
import React, { useEffect } from 'react'
import CustomButton from './CustomButton'
import { useOAuth } from '@clerk/clerk-expo'
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'

WebBrowser.maybeCompleteAuthSession();

interface Props {
  strategy: 'oauth_google'
}

const LogInOAuth = (props: Props) => {
  useWarmUpBrowser()

  const { startOAuthFlow, } = useOAuth({ strategy: props.strategy} )

  const handleSignIn = async () => {
    try {
      try {
        const { createdSessionId, signUp, setActive, authSessionResult } = await startOAuthFlow({
          redirectUrl: Linking.createURL('/(tabs)/home')
        })

        if (createdSessionId) {
          await setActive!({ session: createdSessionId })
        } else {
          const response = await signUp?.update({
            username: signUp!.emailAddress!.split("@")[0],
          });
          if (response?.status === "complete") {
            await setActive!({ session: signUp!.createdSessionId });
          }
        }

      } catch (err) {
        throw err
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }

  return (
    <View className='w-full'>
      <CustomButton
        containerStyles='w-full px-8'
        buttonStyles='bg-secondary'
        text='Log in with google'
        onPress={() => handleSignIn()}
      />
    </View>
  )
}

export default LogInOAuth

const useWarmUpBrowser = () => {
  useEffect(() => {
    WebBrowser.warmUpAsync()
    return () => {
      WebBrowser.coolDownAsync();
    }
  }) 
}
