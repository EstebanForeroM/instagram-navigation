import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Text, View } from "react-native";

interface CameraProps {
  onGoBack: () => void
}

const CameraComponent = (props: CameraProps) => {
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    requestPermission()
    return <View className="w-full h-full bg-background">
        <Text>Permissions are loading</Text>
      </View>
  }

  return (
    <View>
      {permission.granted
      ?
        <View className="w-full h-full">
          <CameraView className="w-full h-full">

          </CameraView>
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
