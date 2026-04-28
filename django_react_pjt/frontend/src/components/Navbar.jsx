import { useState } from 'react'
import { searchPosts, getPosts } from '../api'

const TAG_OPTIONS = [
  'Health and Fitness', 'Mental Health', 'Medicine', 'Law',
  'Technology', 'Public Health', 'Nutrition', 'Molecular Biology',
  'Pharmacology', 'Biomedical Science', 'Microbiology',
  'Anatomy and Physiology', 'Immunology', 'Environmental Science',
  'Business', 'Software Development',
]

export default function Navbar({ setPosts }) {
  const [query, setQuery]             = useState('')
  const [showFilter, setShowFilter]   = useState(false)
  const [selectedTag, setSelectedTag] = useState('')

  const handleSearch = () => {
    if (query.trim()) {
      searchPosts(query).then(data => setPosts(data))
    } else {
      getPosts().then(data => {
        if (Array.isArray(data)) setPosts(data)
      })
    }
  }

  const handleTagFilter = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag('')
      setShowFilter(false)
      getPosts().then(data => {
        if (Array.isArray(data)) setPosts(data)
      })
    } else {
      setSelectedTag(tag)
      setShowFilter(false)
      getPosts(tag).then(data => {
        if (Array.isArray(data)) setPosts(data)
      })
    }
  }

  return (
    <nav style={{
      position:        'fixed',
      top:             0,
      left:            '72px',
      right:           0,
      height:          '60px',
      backgroundColor: '#96DDA5',
      display:         'flex',
      alignItems:      'center',
      padding:         '0 1.5rem',
      zIndex:          99,
    }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>

        {/* Search input with icons inside */}
        <div style={{
          display:         'flex',
          alignItems:      'center',
          backgroundColor: '#f3f4f6',
          borderRadius:    '8px',
          padding:         '0.4rem 0.8rem',
          gap:             '0.5rem',
          width:           '320px',
        }}>
          <i
            className="bi bi-search"
            onClick={handleSearch}
            style={{ color: '#6b7280', cursor: 'pointer', fontSize: '0.9rem' }}
          ></i>
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyUp={e => e.key === 'Enter' && handleSearch()}
            placeholder="Search posts..."
            style={{
              border:          'none',
              background:      'none',
              outline:         'none',
              flex:            1,
              fontSize:        '0.875rem',
              fontFamily:      'Inter, sans-serif',
            }}
          />
          <i
            className={`bi bi-funnel${selectedTag ? '-fill' : ''}`}
            onClick={() => setShowFilter(prev => !prev)}
            style={{
              color:  selectedTag ? '#2563eb' : '#6b7280',
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          ></i>
        </div>

        {/* Filter dropdown */}
        {showFilter && (
          <div style={{
            position:        'absolute',
            top:             '2.5rem',
            left:            0,
            backgroundColor: '#043E54',
            border:          '1px solid #e5e7eb',
            borderRadius:    '8px',
            padding:         '0.5rem',
            zIndex:          300,
            width:           '220px',
            boxShadow:       '0 4px 12px rgba(0,0,0,0.1)',
            maxHeight:       '300px',
            overflowY:       'auto',
          }}>
            {TAG_OPTIONS.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagFilter(tag)}
                style={{
                  display:         'block',
                  width:           '100%',
                  textAlign:       'left',
                  padding:         '0.4rem 0.6rem',
                  border:          'none',
                  backgroundColor: selectedTag === tag ? '#eff6ff' : 'transparent',
                  cursor:          'pointer',
                  borderRadius:    '4px',
                  color:           selectedTag === tag ? '#2563eb' : 'black',
                  fontSize:        '0.85rem',
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}