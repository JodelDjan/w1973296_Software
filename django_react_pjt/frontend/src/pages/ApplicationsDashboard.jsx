import { useState, useEffect } from 'react'
import { getApplications, withdrawApplication } from '../api'
import { useNavigate } from 'react-router-dom'

export default function ApplicationsDashboard() {
  const [applications, setApplications] = useState([])
  const [error, setError]               = useState('')
  const navigate                        = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role !== 'general_user') {
      navigate('/')
      return
    }
    getApplications().then(data => {
      if (Array.isArray(data)) setApplications(data)
    })
  }, [])

  async function handleWithdraw(postId) {
    try {
      await withdrawApplication(postId)
      setApplications(prev => prev.filter(app => app.post_id !== postId))
    } catch (err) {
      setError('Failed to withdraw application.')
    }
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '1rem' }}>
      <h1>My Applications</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {applications.length === 0 ? (
        <p>You have not applied to any posts yet.</p>
      ) : (
        applications.map(app => (
          <div key={app.application_id} style={{
            border:        '1px solid #e5e7eb',
            borderRadius:  '8px',
            padding:       '1rem',
            marginBottom:  '1rem',
          }}>
            <h2>{app.title}</h2>
            <p>Posted by: {app.author_name}</p>
            <p>Applied on: {new Date(app.created_at).toLocaleDateString()}</p>
            <p>Status: {app.state === 'closed' ? (
              <span style={{ color: '#dc2626' }}>Closed</span>
            ) : (
              <span style={{ color: '#16a34a' }}>Open</span>
            )}</p>

            <button
              onClick={() => handleWithdraw(app.post_id)}
              style={{
                backgroundColor: '#fee2e2',
                color:           '#dc2626',
                border:          'none',
                padding:         '0.5rem 1rem',
                borderRadius:    '6px',
                cursor:          'pointer',
                marginTop:       '0.5rem',
              }}
            >
              Withdraw
            </button>
          </div>
        ))
      )}
    </div>
  )
}