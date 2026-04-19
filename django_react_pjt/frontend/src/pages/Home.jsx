import { useState, useEffect } from 'react'
import { getPosts } from '../api'
import Navbar from '../components/Navbar'
import Feed from '../components/Feed'
import CreatePost from '../components/CreatePost'
import Directory from '../components/Directory'

export default function Home() {
  const role = localStorage.getItem('role')
  const [posts, setPosts] = useState([])
  const [activeTab, setActiveTab] = useState('feed')

  useEffect(() => {
    getPosts()
      .then(data => {
        if (Array.isArray(data)) setPosts(data)
      })
      .catch(err => console.error(err))
  }, [])

return (
    <div>
      <Navbar setPosts = {activeTab === 'feed' && <Feed posts={posts} setPosts={setPosts} />} />
      {role === 'researcher' && <CreatePost setPosts={setPosts} />}

      {/* Tab buttons */}
      <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
        <button
          onClick={() => setActiveTab('feed')}
          style={{ fontWeight: activeTab === 'feed' ? 'bold' : 'normal' }}
        >
          Posts
        </button>
        <button
          onClick={() => setActiveTab('directory')}
          style={{ fontWeight: activeTab === 'directory' ? 'bold' : 'normal' }}
        >
          Researcher Directory
        </button>
      </div>

      {/* Tab content */}
      {activeTab === 'feed'      && <Feed posts={posts} />}
      {activeTab === 'directory' && <Directory />}
    </div>
  )
}