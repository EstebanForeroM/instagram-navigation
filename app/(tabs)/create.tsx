
import { View, Text, Image, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as ImagePicker from 'expo-image-picker'
import CustomButton from '@/components/CustomButton'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Video } from 'expo-av'

const CreatePage = () => {

  const [mediaSelected, setMediaSelected] = useState<null | ImagePicker.ImagePickerAsset>(null)

  const openPicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 0.5,
      videoQuality: ImagePicker.UIImagePickerControllerQualityType.Medium,
    })

    if (result.canceled) { return }

      setMediaSelected(result.assets[0])
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
                onPress={() => {}}
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
            />
          </View>

          :
          <View>
            <Text className='text-2xl text-center font-psemibold text-accent'>Upload a video</Text>
            <Text className='text-2xl text-center font-psemibold text-accent mb-24'>Or an image</Text>
            <FontAwesome name="cloud-upload" size={230} color="white" onPress={openPicker}/>
          </View>
        }
      </View>
    </SafeAreaView>
  )
}

export default CreatePage
