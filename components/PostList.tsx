import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Post } from '@/lib/rust_backend'
import { useAuth } from '@clerk/clerk-expo'
import PostItem from './PostItem'

interface Props {
  fetchPostFunction: (token: string, page: number) => Promise<Post[]>
  headerComponent?: () => React.ReactNode
  resetControl?: ResetControl
}

interface PostsInfo {
  quantity: number
  refetchOnTime: boolean
}

interface ResetControl {
  reset: boolean
}

const PostList = (props: Props) => {
  const { getToken } = useAuth()
  const [refreshing, setRefreshing] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(0)
  const [posts, setPosts] = useState<Post[]>([])

  
  useEffect(() => {
    console.log('reset has changed')
    setPage(0)
    setPosts([])
    setHasMore(true)
    setRefreshing(false)
    onRefresh()
  }, [props.resetControl?.reset])

  console.log('the page is: ', page)

  const onRefresh = async () => {
    if (!hasMore || refreshing) return;

    setRefreshing(true)
    const token = await getToken()
    const newPosts = await props.fetchPostFunction(token ?? '', page)
    setPage(page + 1)
    if (newPosts.length === 0) {
      setHasMore(false)
    }
    setPosts([...posts, ...newPosts])
    setRefreshing(false)
  }

  const renderFooter = () => {
    return (
      hasMore && (
        <View className='p-4'>
          <ActivityIndicator size={'large'}/>
        </View>
      )
    )
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(post) => post.post_id}
      renderItem={({ item }) => (
        <PostItem post={item}/>
      )}
      ListHeaderComponent={props.headerComponent}
      onEndReached={onRefresh}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => {
          setPage(0)
          setPosts([])
          onRefresh()
        }}/>
      }
    />
  )
}

export default PostList
