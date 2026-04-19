//import { useState } from 'react'
//import { searchPosts, getPosts } from '../api'
import { useNavigate } from 'react-router-dom'

//Change the dashboard to show in profile instead
export default function Navbar({ setPosts }) {
  const navigate = useNavigate()
  const role     = localStorage.getItem('role')

  return (
    <nav>
      <input type="text" placeholder="Search posts..." />
      {role === 'researcher' && (
        <span
          onClick={() => navigate('/dashboard')}
          style={{ cursor: 'pointer', marginRight: '1rem' }}
        >
          Dashboard
        </span>
      )}
      <span
        onClick={() => navigate('/profile')}
        style={{ cursor: 'pointer' }}
      >
        Profile
      </span>
    </nav>
  )
}