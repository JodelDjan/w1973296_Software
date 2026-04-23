import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getNotifications } from '../api'

//Change the dashboard to show in profile instead
export default function Navbar({ setPosts }) {
  const navigate = useNavigate()
  const role     = localStorage.getItem('role')
  const [unreadCount, setUnreadCount] = useState(0)


  useEffect(() => {
    if (role === 'general_user') {
      getNotifications().then(data => {
        if (Array.isArray(data)) {
          setUnreadCount(data.filter(n => !n.is_read).length)
        }
      })
    }
  }, [])

  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
      <input type="text" placeholder="Search posts..." />

      {role === 'researcher' && (
        <span onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
          Dashboard
        </span>
      )}

      {role === 'general_user' && (
        <>
          <span onClick={() => navigate('/applications')} style={{ cursor: 'pointer' }}>
            My Applications
          </span>
          <span onClick={() => navigate('/bookmarks')} style={{ cursor: 'pointer' }}>
            Bookmarks
          </span>
          <span onClick={() => navigate('/notifications')} style={{ cursor: 'pointer', position: 'relative' }}>
            Notifications
            {unreadCount > 0 && (
              <span style={{
                backgroundColor: '#dc2626',
                color:           'white',
                borderRadius:    '999px',
                fontSize:        '0.7rem',
                padding:         '0.1rem 0.4rem',
                marginLeft:      '0.3rem',
              }}>
                {unreadCount}
              </span>
            )}
          </span>
        </>
      )}

      <span onClick={() => navigate('/profile')} style={{ cursor: 'pointer' }}>
        Profile
      </span>
    </nav>
  )
}