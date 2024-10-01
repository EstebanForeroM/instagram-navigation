import { Post } from "@/lib/rust_backend";

import { create } from 'zustand'

interface PostsStore {
  postsPages: Post[][]
  fetchPage: (index: number) => void
}

const usePostsStore = create<PostsStore>((set, get) => ({
  postsPages: [],
  
  fetchPage: async (index: number) => {
    const { postsPages } = get(); 
    
    if (postsPages[index]) {
      console.log(`Page ${index} is already cached.`);
      return;
    }

    try {
      const newPage: Post[] = await fetchPostsFromBackend(index); 
      
      set((state) => {
        const updatedPostsPages = [...state.postsPages];
        updatedPostsPages[index] = newPage;
        return { postsPages: updatedPostsPages };
      });

    } catch (error) {
      console.error("Error fetching page:", error);
    }
  },
}));

