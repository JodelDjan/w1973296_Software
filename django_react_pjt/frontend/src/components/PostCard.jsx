import { useState } from 'react'
import { applyToPost } from '../api'


export default function PostCard({ post }) {
    const role = localStorage.getItem('role')
      const [applied, setApplied]   = useState(false)
      const [error, setError]       = useState(null)
      const token = localStorage.getItem('token')
      const isAuthenticated = !!token
      

    const handleApply = async (postId) => {
        const response = await applyToPost(postId)
        if (response.error) {
          setError(response.error)
        } else {
          setApplied(true)
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
      <p>Tags: {post.tags.join(', ')}</p>
      <p>Posted by: {post.author_name}</p>


    {!isAuthenticated ? (
      <p>
        <a href="/login">Log in</a> to apply to this post.
      </p>
    ) : role === 'general_user' ? (
      <>
        {applied ? (
          <p>Application submitted successfully.</p>
        ) : (
          <button onClick={() => handleApply(post.id)}>Apply</button>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </>
    ) : null}
  </div>
  )
}
