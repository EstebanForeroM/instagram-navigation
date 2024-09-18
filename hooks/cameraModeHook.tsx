import { CameraMode } from "expo-camera"
import { useState } from "react"


const useCameraMode = () => {
  const [cameraMode, setCameraMode] = useState(0)
  const setCameraModeDebuger = (newCameraMode: CameraMode) => {
    console.log('set camera mode called with state: ', newCameraMode)
    if (newCameraMode === 'picture') {
      setCameraMode(0)
    } else {
      setCameraMode(1)
    }
  }

  const getCameraMode = () => {
    console.log('getting camera mode of: ', cameraMode)
    return cameraMode
  }

  return { setCameraModeDebuger, getCameraMode }
}

export default useCameraMode
