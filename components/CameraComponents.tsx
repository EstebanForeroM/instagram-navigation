import { CameraMode, CameraType, CameraView, useCameraPermissions, useMicrophonePermissions } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";
import IconButton from "./IconButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Animatable from "react-native-animatable";
import { ImageVideoAsset } from "@/lib/rust_backend";

interface CameraProps {
  onGoBack: () => void
  onGaleryButtonPress: () => void
  onResourceTaken: (imageVideoAsset: ImageVideoAsset) => void
}

const zoomIn = {
  0: {
    opacity: 1,
    scale: 0.8,
  },
  1: {
    opacity: 1,
    scale: 1.2,
  },
};

const zoomOut = {
  0: {
    opacity: 1,
    scale: 1.2,
  },
  1: {
    opacity: 1,
    scale: 0.8,
  },
};

const CameraComponent = (props: CameraProps) => {
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission, requestPermission] = useCameraPermissions();
  const [permissionAudioRecord, requestAudioRecordPermission] = useMicrophonePermissions();
  const [cameraMode, setCameraMode] = useState<CameraMode>('picture');
  const [onPressPhoto, setOnPressPhoto] = useState(false)

  const camera = useRef<CameraView>(null)

  if (!permission) {
    requestPermission()
    return <View className="w-full h-full bg-background">
        <Text>Permissions are loading</Text>
      </View>
  }

  if (!permissionAudioRecord) {
    requestAudioRecordPermission()
    return <View className="w-full h-full bg-background">
        <Text>Permissions are loading</Text>
      </View>
  }

  if (!permissionAudioRecord.granted) {
    requestAudioRecordPermission()
  }

  const changeIsFacing = () => {
    if (facing == 'back') {
      setFacing('front')
    } else {
      setFacing('back')
    }
  }

  const takePhoto = async () => {
    //setCameraMode('picture')
    let photo = await camera.current?.takePictureAsync()
    if (!photo) return
    props.onResourceTaken({
      uri: photo.uri,
      type: 'image'
    })
  }

  const startRecording = async () => {
    let video = await camera.current?.recordAsync().catch(e => console.log('error recording: ', e))
    if (!video) return
    props.onResourceTaken({
      uri: video.uri,
      type: 'video'
    })
  }

  const stopRecording = () => {
    if (cameraMode !== 'video') return
    camera.current?.stopRecording()
  }

  const onPressIn = async () => {
    setOnPressPhoto(true)
  }

  const onPressOut = async () => {
    setOnPressPhoto(false)
    if (cameraMode === 'picture') {
      await takePhoto()
    } else {
      stopRecording()
    }
    props.onGoBack()
  }

  const onLongPress = () => {
    setCameraMode('video')
    startRecording()
  }

  return (
    <View className="w-full h-full">
      <IconButton 
        onPress={() => props.onGoBack()}
        icon={<Ionicons name="arrow-back" size={24} color="white" />}
        containerStyles="absolute top-4 z-50 bg-black rounded-full w-8 h-8 flex justify-center items-center"
      />
      {permission.granted
        ?
        <View className="w-full h-full">
          <CameraView className="w-full h-full" facing={facing}
            mode={cameraMode}
            videoQuality="480p"
            ref={camera}
          />
          <View className="absolute bottom-4 left-0 right-0 h-14 flex-row justify-between items-center">
            <IconButton
              onPress={() => { changeIsFacing() }}
              icon={<AntDesign name="swap" size={32} color="white" />}
              containerStyles="bg-black rounded-full border border-4"
            />
            <IconButton
              onPress={() => {}}
              icon={
                <Animatable.View
                  duration={500}
                  animation={onPressPhoto? zoomIn: zoomOut}
                >
                  <MaterialIcons name="motion-photos-on" size={48} 
                    color={cameraMode === 'picture' ? 'white' : 'red'} />
                </Animatable.View>
              }
              activeOpacity={1}
              containerStyles="bg-black rounded-full border border-4"
              onLongPress={onLongPress}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
            />
            <IconButton
              onPress={() => {props.onGaleryButtonPress()}}
              icon={<MaterialIcons name="insert-photo" size={32} color="white" />}
              containerStyles="bg-black rounded-full border border-4"
            />
          </View>
        </View>
        :
        <Text className="text-white">
          Made sure that you gave this application the ability to take a photo
        </Text>
      }
    </View>
  )
}

export default CameraComponent;
