import { useState } from 'react'
import { searchPosts, getPosts } from '../api'

export default function Navbar({ setPosts }) {
  const [query, setQuery] = useState('')

  const handleSearch = () => {
    if (query.trim()) {
      searchPosts(query).then(data => setPosts(data))
    } else {
      getPosts().then(data => setPosts(data))  // reset if search is cleared
    }
  }

  return (
    <nav>
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyUp={handleSearch}
      />
      <img src="/profile-icon.png" alt="Profile" />
    </nav>
  )
}