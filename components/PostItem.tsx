import { View, Text } from 'react-native'
import React from 'react'
import { Post } from '@/lib/rust_backend'

interface Props {
  post: Post
}

const PostItem = ({ post }: Props) => {
  const isImage = isUrlContainImage(post.media_url) 

  return (
    <View>
      <Text>{post.post_text}</Text>
    </View>
  )
}

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
