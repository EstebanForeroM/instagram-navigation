import { View, Text, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Post } from '@/lib/rust_backend'
import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av'

interface Props {
  post: Post
}
const PostItem = ({ post }: Props) => {
  const isImage = isUrlContainImage(post.media_url);
  const [aspectRatio, setAspectRatio] = useState<number>(1);

  useEffect(() => {
    if (post.media_url && isImage) {
      Image.getSize(
        post.media_url,
        (width, height) => {
          setAspectRatio(width / height);
        },
        (error) => {
          console.error(`Couldn't get the image size: ${error.message}`);
        }
      );
    }
  }, [post.media_url]);

  return (
    <View className='mb-4'>
      <View className='flex flex-row items-center h-14 p-4'>
        <Image 
          source={{ uri: post.user_profile_img_url }}
          className='w-9 h-9 rounded-full mr-3'
        />
        <Text className='text-white font-pmedium grow'>
          {post.username}
        </Text>
        <Text className='text-white font-pmedium'>
          {post.publishing_date}
        </Text>
      </View>
      <View className='justify-center items-center'>
        {isImage ? (
          <Image
            source={{ uri: post.media_url }}
            style={{ width: '100%', aspectRatio }}
            resizeMode="contain"
          />
        ) : (
          <Video
            source={{ uri: post.media_url }}
            style={{ width: '100%', aspectRatio }}
            resizeMode={ResizeMode.CONTAIN}
            useNativeControls
            shouldPlay
            onReadyForDisplay={(event) => {
              const { width, height } = event.naturalSize;
              if (width && height) {
                setAspectRatio(width / height);
              }
            }}
          />
        )}
      </View>
      <Text className='text-white font-pmedium text-base m-3'>{post.post_text}</Text>
    </View>
  );
};


const SUPPORTED_FILE_FORMATS: string[] = [
  "png",
    "jpg",
    "jpeg",
    "gif",
    "mp4",
];

function isUrlContainImage(url: string): boolean {
    const fileExtension = url.split('.').pop()?.toLowerCase();

    const IMAGE_FORMATS: string[] = ["png", "jpg", "jpeg", "gif"];
    
    return IMAGE_FORMATS.includes(fileExtension || "");
}

export default PostItem
