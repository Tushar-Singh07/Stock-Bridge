export default function StatCard({ icon: Icon, label, value, sub, color = '#2563eb', bgColor = '#eff6ff' }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: 14,
      padding: '20px 24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      transition: 'all 0.2s ease',
    }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.10)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)'}
    >
      <div style={{ background: bgColor, borderRadius: 12, padding: 14, flexShrink: 0 }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#64748b', marginTop: 2 }}>{label}</div>
        {sub && <div style={{ fontSize: '0.75rem', color: color, fontWeight: 500, marginTop: 2 }}>{sub}</div>}
      </div>
    </div>
  );
}
