import { ImagePickerAsset } from "expo-image-picker"
import { LocationObjectCoords } from "expo-location"
import ky from "ky"

const prefixUrl = "https://backendsocialnetwork-production.up.railway.app/"

export const uploadPost = async (mediaContent: ImagePickerAsset, description: string, token: string, coords: LocationObjectCoords | null) => {
  try {
    const put_link_url = await ky.post("post/upload", { 
      json: {
        post_text: description,
        file_format: getFileExtension(mediaContent.uri),
        post_location: coords
      },
      headers: {
        'Authorization': `Bearer ${token}`
      },
      prefixUrl: prefixUrl
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

export interface Post {
  post_id: string,
  post_text: string,
  media_url: string,
  username: string,
  user_profile_img_url: string,
  post_location: Coords,
  publishing_date: string
}

export interface Coords {
  longitude: string,
  latitude: string
}

export const getPosts = async (token: string, page: number) => {
  const posts: Post[] = await ky(`post/latest/${page}`, { 
    prefixUrl: prefixUrl,
    headers: {
        'Authorization': `Bearer ${token}`
      },
  }).json();

  return posts
}

export const getUserPosts = async (token: string, page: number) => {
  const posts: Post[] = await ky(`post/user/${page}`, { 
    prefixUrl: prefixUrl,
    headers: {
        'Authorization': `Bearer ${token}`
      },
  }).json();


  return posts
}

export const getUserQuery = async (token: string, page: number, query: string) => {
  console.log("getting user query: ", query)
  const posts: Post[] = await ky(`post/search/${query}/${page}`, { 
    prefixUrl: prefixUrl,
    headers: {
        'Authorization': `Bearer ${token}`
      },
  }).json();
  console.log("finished user query: ", JSON.stringify(posts))

  return posts
}

export const getVideoPost = async (token: string, offset: number) => {
  let post: Post | undefined;

  try {
    post = await ky(`post/video/${offset}`, { 
      prefixUrl: prefixUrl,
      headers: {
        'Authorization': `Bearer ${token}`
      },
    }).json();

  } catch (err) {
    post = undefined
    console.error(`Error in get video post: `, err)
  }
  
  return post
}

const getFileExtension = (uri: string) => {
  const match = uri.match(/\.([^.]+)$/);
  if (match) {
    console.log("The file extesion is: ", match[1])
    return match[1]; 
  } else {
    throw new Error(`Unable to extract file extension from URI: ${uri}`);
  }
}

