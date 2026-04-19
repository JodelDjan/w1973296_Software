export default function ResearcherCard({ researcher }) {
  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '1rem',
      backgroundColor: '#fff'
    }}>
      <h3>{researcher.first_name} {researcher.last_name}</h3>
      <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>{researcher.department}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
        {researcher.tags && researcher.tags.map(tag => (
          <span key={tag} style={{
            padding: '0.2rem 0.5rem',
            borderRadius: '999px',
            backgroundColor: '#eff6ff',
            color: '#2563eb',
            fontSize: '0.75rem'
          }}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}