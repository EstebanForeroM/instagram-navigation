import Modal, { ReactNativeModal } from 'react-native-modal'
import { View, Text, Image, TextInput, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import CustomButton from '@/components/CustomButton'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Video } from 'expo-av'
import { ImageVideoAsset, uploadPost } from '@/lib/rust_backend'
import { useAuth } from '@clerk/clerk-expo'

import * as Location from 'expo-location'
import { CameraType } from 'expo-camera'
import CameraComponent from '@/components/CameraComponents'

const CreatePage = () => {
  const [mediaSelected, setMediaSelected] = useState<null | ImageVideoAsset>(null)
  const [descriptionText, setDescriptionText] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const { getToken } = useAuth()

  const [cameraActive, setCameraActive] = useState(false)

  const [location, setLocation] = useState<null | Location.LocationObjectCoords>(null)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.error('user did not gave permision to use his location')
        return
      }

      const location = await Location.getCurrentPositionAsync()
      console.log("The location of the user is: ", JSON.stringify(location.coords))
      setLocation(location.coords)
    })()
  }, [])

  const openPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 0.5,
      videoQuality: ImagePicker.UIImagePickerControllerQualityType.Low,
    })

    if (result.canceled) { return }

    let asset = result.assets[0];

    setMediaSelected({
      uri: asset.uri,
      type: asset.type ?? 'image'
    });
  }

  return (
    <SafeAreaView className='bg-background w-screen h-full flex'>

      <View className='w-screen grow bg-black h-full flex justify-center items-center'>
        {mediaSelected? 
          <View className='h-full w-full flex'>
            <View className='m-4 flex flex-row justify-between'>
              <AntDesign name="closecircle" size={24} color="#FF006E" onPress={() => setMediaSelected(null)}/>
              <CustomButton
                containerStyles='m-0 p-0'
                buttonStyles='bg-accent h-10 w-24'
                text='Send'
                onPress={async () => {
                  setIsUploading(true)
                  const token = await getToken()
                  if (!token) {
                    console.error("No token found")
                    return
                  }
                  uploadPost({ uri: mediaSelected.uri, type: mediaSelected.type?? 'image' }, descriptionText, token, location)
                  setMediaSelected(null)
                  setIsUploading(false)
                }}
              />
            </View>
            {(mediaSelected.type === 'video' ?
              <Video
                source={{ uri: mediaSelected.uri }}
                className='w-full grow'
                shouldPlay
              />
              :
              <Image 
                source={{ uri: mediaSelected.uri }}
                resizeMode='contain'
                className='w-full grow'
              />
            )}
            <TextInput
              className='w-full text-white border border-t-white px-4 pb-24 font-psemibold text-base pt-4'
              placeholderTextColor='gray'
              multiline
              placeholder='Write something that you want to add'
              value={descriptionText}
              onChangeText={setDescriptionText}
            />
          </View>

          :
          <View>
            <Text className='text-2xl text-center font-psemibold text-accent'>Upload a video</Text>
            <Text className='text-2xl text-center font-psemibold text-accent mb-24'>Or an image</Text>
            <FontAwesome name="cloud-upload" size={230} color="white" onPress={openPicker}/>
            <CustomButton
              text='Or use your camera'
              onPress={() => {setCameraActive(true)}}
              containerStyles='bg-accent rounded-2xl'
            />
          </View>
        }
      </View>
      <Modal isVisible={isUploading}>
        <ActivityIndicator size={'large'} color={'#FF006E'}/>
      </Modal>
      <Modal isVisible={cameraActive} className='' hasBackdrop={false}>
        <CameraComponent
          onGoBack={() => setCameraActive(false)}
          onGaleryButtonPress={() => {
            setCameraActive(false)
            openPicker()
          }}
          onResourceTaken={(asset) => {
            setMediaSelected(asset)
          }}
        />
      </Modal>
    </SafeAreaView>
  )
}

export default CreatePage

