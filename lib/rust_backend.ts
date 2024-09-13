import { ImagePickerAsset } from "expo-image-picker"
import ky from "ky"

export const uploadPost = async (mediaContent: ImagePickerAsset, description: string, token: string) => {
  try {
    const put_link_url = await ky.post("https://backendsocialnetwork-production.up.railway.app/post/upload", { 
      json: {
        post_text: description,
        file_format: mediaContent.type  
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).text()

    console.log("The put url received is: ", put_link_url)

    const fileData = await getFileData(mediaContent)

    await ky.put(put_link_url, {
      body: fileData,
      headers: {
        'Content-Type': mediaContent.type  
      }
    })

    console.log("File uploaded successfully!")
  } catch (error) {
    console.error("Error uploading post:", error)
  }
}

const getFileData = async (mediaContent: ImagePickerAsset) => {
  try {
    const response = await fetch(mediaContent.uri)

    if (!response.ok) {
      throw new Error(`Failed to fetch file from URI: ${mediaContent.uri}`)
    }

    const blob = await response.blob()
    return blob
  } catch (error) {
    console.error("Error getting file data:", error)
    throw error 
  }
}

