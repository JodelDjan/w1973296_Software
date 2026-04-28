import { useState, useEffect } from 'react'
import { getPosts } from '../api'
import Navbar from '../components/Navbar'
import SideBar from '../components/SideBar'
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
  <div style={{ display: 'flex' }}>
    <SideBar setPosts={setPosts} activeTab={activeTab} setActiveTab={setActiveTab} />

    <div style={{ marginLeft: '72px', flex: 1 }}>
      <Navbar setPosts={setPosts} />

      {/* Main content pushed below navbar */}
      <div style={{ padding: '2rem', marginTop: '60px' }}>
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <button
            onClick={() => setActiveTab('feed')}
            style={{
              background:    'none',
              cursor:        'pointer',
              paddingBottom: '0.75rem',
              fontSize:      '0.95rem',
              fontWeight:    activeTab === 'feed' ? '600' : '400',
              transition:    'all 0.2s',
            }}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            style={{
              background:    'none',
              cursor:        'pointer',
              paddingBottom: '0.75rem',
              fontSize:      '0.95rem',
              fontWeight:    activeTab === 'directory' ? '600' : '400',
              transition:    'all 0.2s',
            }}
          >
            Researcher Directory
          </button>
        </div>
        {/*{role === 'researcher' && <CreatePost setPosts={setPosts} />}*/}
        
        {activeTab === 'feed'      && <Feed posts={posts} setPosts={setPosts} />}
        {activeTab === 'directory' && <Directory />}
      </div>
    </div>
  </div>
)}