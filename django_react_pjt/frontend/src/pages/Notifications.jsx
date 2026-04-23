import { useState, useEffect } from 'react'
import { getNotifications } from '../api'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    getNotifications().then(data => {
      if (Array.isArray(data)) setNotifications(data)
    })
  }, [])

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h1>Notifications</h1>
      {notifications.length === 0 ? (
        <p>You have no notifications.</p>
      ) : (
        notifications.map(n => (
          <div key={n.id} style={{
            border:          '1px solid #e5e7eb',
            borderRadius:    '8px',
            padding:         '1rem',
            marginBottom:    '1rem',
            backgroundColor: n.is_read ? '#fff' : '#eff6ff',
          }}>
            <p>{n.message}</p>
            <p style={{ color: '#6b7280', fontSize: '0.8rem' }}>
              {new Date(n.created_at).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  )
}