import { useState } from 'react'
import { createPost, getPosts } from '../api'

export default function CreatePost({ setPosts }) {
  const [content, setContent] = useState('')

  const handleSubmit = () => {
    createPost(content).then(() => {
      getPosts().then(data => setPosts(data))  // refresh feed after posting
      setContent('')
    })
  }

  return (
    <div>
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={handleSubmit}>Post</button>
    </div>
  )
}