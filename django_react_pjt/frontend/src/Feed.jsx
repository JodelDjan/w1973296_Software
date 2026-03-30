import PostCard from './PostCard'


export default function Feed({ posts }) {
  return (
    <div>
      {posts.map(post => <PostCard key={post.id} post={post} />)}
    </div>
  )
}