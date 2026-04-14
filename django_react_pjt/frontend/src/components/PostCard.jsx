export default function PostCard({ post }) {
    const role = localStorage.getItem('role')

    const handleApply = (postId) => {
    console.log('Applying to post:', postId)
  }
}
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>Start Date: {post.start_date}</p>
      <p>Tags: {post.tags.join(', ')}</p>
      <p>Created: {new Date(post.created_at).toLocaleDateString()}</p>
      <p>Max Participants: {post.max_participants}</p>
      <p>State: {post.state}</p>
      <p>Posted by: {post.author_name}</p>
       {role === 'general_user' && (
        <button onClick={() => handleApply(post.id)}>Apply</button>
      )}
    </div>
  )
}