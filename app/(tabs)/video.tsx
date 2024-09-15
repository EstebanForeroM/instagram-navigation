import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  FlatList,
  Dimensions,
  ListRenderItem,
  View,
  Text,
  ViewToken,
  Image,
} from 'react-native';
import { ResizeMode, Video } from 'expo-av';
import { Post, getVideoPost } from '@/lib/rust_backend';
import { useAuth } from '@clerk/clerk-expo';

const { height } = Dimensions.get('window');
const height_without = height - 160

const VideoPage = () => {
  const [videos, setVideos] = useState<(Post | null | undefined)[]>([]);
  const [noMoreVideos, setNoMoreVideos] = useState(false);
  const { getToken } = useAuth();
  const viewabilityConfig = { itemVisiblePercentThreshold: 50 };
  const [playingVideoIndex, setPlayingVideoIndex] = useState(0)

  const fetchVideo = async (index: number): Promise<Post | null> => {
    try {
      const token = (await getToken()) ?? '';
      const videoPost = await getVideoPost(token, index);
      return videoPost ?? null; 
    } catch (error) {
      console.error(`Error fetching video at index ${index}:`, error);
      return null;
    }
  };

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      viewableItems.forEach(async (viewableItem) => {
        const index = viewableItem.index;
        if (typeof index === 'number' && videos[index] === undefined) {
          const video = await fetchVideo(index);
          if (video) {
            setVideos((prevVideos) => {
              const newVideos = [...prevVideos];
              newVideos[index] = video;
              return newVideos;
            });
          } else {
            setNoMoreVideos(true);
            setVideos((prevVideos) => {
              const newVideos = [...prevVideos];
              newVideos[index] = null;  
              return newVideos;
            });
          }
        }
      });
    }
  ).current;

  useEffect(() => {
    setVideos([undefined]); 
  }, []);

  const handleEndReached = () => {
    if (!noMoreVideos) {
      setVideos((prevVideos) => [...prevVideos, undefined]);
    }
  };

  const renderItem: ListRenderItem<Post | null | undefined> = ({ item: post }) => {
    if (post) {
      return (
        <SafeAreaView>
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
          <Video
            source={{ uri: post.media_url }}
            style={{ height: height_without, width: '100%' }}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
            useNativeControls
          />
        </SafeAreaView>
      );
    } else if (post === null) {
      return (
        <View
          style={{
            height: height_without,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
          }}
        >
          <Text style={{ color: 'white' }}>No more videos</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            height: height_without,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
          }}
        >
          <Text style={{ color: 'white' }}>Loading...</Text>
        </View>
      );
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <FlatList
        data={videos}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        pagingEnabled
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        viewabilityConfig={viewabilityConfig}
        removeClippedSubviews
        onViewableItemsChanged={onViewableItemsChanged}
      />
    </SafeAreaView>
  );
};

export default VideoPage;

