import { getPosts } from '../api'
import PostCard from './PostCard'

export default function Feed({ posts, setPosts }) {
  return (
    <div>
      {posts.map(post => (
        <PostCard key={post.id} post={post} setPosts={setPosts} getPosts={getPosts} />
      ))}
    </div>
  )
}