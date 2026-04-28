import { useState, useEffect } from 'react'
import { getBookmarks, removeBookmark, getPosts } from '../api'
import { useNavigate } from 'react-router-dom'
import PostCard from '../components/PostCard'

export default function Bookmarks() {
  const [bookmarkedPosts, setBookmarkedPosts] = useState([])
  const [allPosts, setAllPosts]   = useState([])
  const [error, setError]         = useState('')
  const navigate                  = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role !== 'general_user') {
      navigate('/')
      return
    }
    Promise.all([getBookmarks(), getPosts()]).then(([bookmarks, posts]) => {
      if (Array.isArray(bookmarks) && Array.isArray(posts)) {
        const bookmarkedIds = bookmarks.map(b => b.post_id)
        const filtered      = posts.filter(p => bookmarkedIds.includes(p.id))
        setBookmarkedPosts(filtered)
        setAllPosts(posts)
      }
    })
  }, [])

    return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h1>Bookmarks</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {bookmarkedPosts.length === 0 ? (
        <p>You have no bookmarks yet.</p>
      ) : (
        bookmarkedPosts.map(post => (
          <PostCard
            key={post.id}
            post={post}
            setPosts={setAllPosts}
            getPosts={getPosts}
            initialBookmarked={true}
            onUnbookmark={(postId) => setBookmarkedPosts(prev => prev.filter(p => p.id !== postId))}
          />
        ))
      )}
    </div>
  )
}

  async function handleRemove(postId) {
    try {
      await removeBookmark(postId)
      setBookmarks(prev => prev.filter(b => b.post_id !== postId))
    } catch (err) {
      setError('Failed to remove bookmark.')
    }
  }


