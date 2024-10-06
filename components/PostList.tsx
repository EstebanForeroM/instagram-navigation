import { View, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Post } from '@/lib/rust_backend'
import { useAuth } from '@clerk/clerk-expo'
import PostItem from './PostItem'
import { keepPreviousData, useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'

interface Props {
  fetchPostFunction: (token: string, page: number) => Promise<Post[]>
  headerComponent?: () => React.ReactNode
  resetControl?: ResetControl
  postsTag: string
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

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch
  } = useInfiniteQuery({
    queryKey: [props.postsTag],
    queryFn: async ({ pageParam }) => {
      const token = await getToken() ?? ''
      return props.fetchPostFunction(token, pageParam)
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {

      if (lastPage.length === 0) {
        return undefined
      }

      return lastPageParam + 1
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }

      return firstPageParam - 1;
    }
  })

  const renderFooter = () => {
    return (
      !hasNextPage && (
        <View className='p-4'>
          <ActivityIndicator size={'large'}/>
        </View>
      )
    )
  }

  return (
    <FlatList
      data={data?.pages.flat()}
      keyExtractor={(post) => post.post_id}
      renderItem={({ item }) => (
        <PostItem post={item}/>
      )}
      ListHeaderComponent={props.headerComponent}
      onEndReached={() => {
        if (!hasNextPage || isFetchingNextPage) {
          fetchNextPage()
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => {
          refetch()
        }}/>
      }
    />
  )
}

export default PostList
