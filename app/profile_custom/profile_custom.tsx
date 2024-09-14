
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextField from '@/components/TextField'
import CustomButton from '@/components/CustomButton'
import GoBackHeader from '@/components/GoBackHeader'
import { router } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker'
import Modal from 'react-native-modal/dist/modal'

const ProfileCustom = () => {
  const [username, setUsername] = useState('')
  const [mediaSelected, setMediaSelected] = useState<null | ImagePicker.ImagePickerAsset>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    setUsername(user?.username ?? '')
  }, [])

  const updateUserInfo = async () => {
    setIsUploading(true)
    if (mediaSelected) {
      const base64 = mediaSelected.base64;
      const mimeType = mediaSelected.mimeType;
      const image = `data:${mimeType};base64,${base64}`;
      await user?.setProfileImage({ file: image }).catch(err => console.log(`The error is: ${err}`))
    }

    if (username) {
      await user?.update({ username: username })
    }
    setIsUploading(false)
    router.back()
  }

  const openPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
      base64: true,
      aspect: [4, 4],
      videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
    })

    if (result.canceled) { return }

    setMediaSelected(result.assets[0])
  }

  return (
    <SafeAreaView className='bg-background h-full p-4 flex'>
      <GoBackHeader
        text='Profile'
        onPressBack={() => router.back()}
      />
      <View className='grow'>
        <Text className='text-accent font-psemibold text-2xl mb-10 mt-4'>Change your profile</Text>
        <Text className='text-accent mb-3'>UserName:</Text>
        <TextField
          value={username}
          placeHolder='Enter your new username here'
          onChange={setUsername}
        />
        <View className='w-full flex justify-center items-center mt-10'>
          <TouchableOpacity className='w-72 h-72 rounded-full' onPress={openPicker}>
            <Image
              source={{ uri: mediaSelected?.uri || user?.imageUrl}}
              className='w-72 h-72 rounded-full'
            />
          </TouchableOpacity>
        </View>
      </View>

      <CustomButton
        buttonStyles='border border-accent'
        text='Save changes'
        onPress={updateUserInfo}
      />
      <Modal isVisible={isUploading}>
        <ActivityIndicator size={'large'} color={'#FF006E'}/>
      </Modal>

    </SafeAreaView>
  )
}

export default ProfileCustom
