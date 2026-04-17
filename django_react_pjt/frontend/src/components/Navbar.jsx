import { useState } from 'react'
import { searchPosts, getPosts } from '../api'
import { useNavigate } from 'react-router-dom'

export default function Navbar({ setPosts }) {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    if (query.trim()) {
      searchPosts(query).then(data => setPosts(data))
    } else {
      getPosts().then(data => setPosts(data))  // resets the text if search is cleared
    }
  }

   return (
    <nav>
      <input type="text" placeholder="Search posts..." />
      <span 
        onClick={() => navigate('/profile')} 
        style={{ cursor: 'pointer' }}
      >
        Profile
      </span>
    </nav>
  )
}