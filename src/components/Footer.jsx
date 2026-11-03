import { Link } from 'react-router-dom';
import { Package2, Mail, Phone, MapPin, Share2, Globe, GitBranch } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#0f172a', color: '#94a3b8', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 40, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ background: 'linear-gradient(135deg,#2563eb,#1e40af)', borderRadius: 10, padding: '6px 10px' }}>
                <Package2 size={22} color="white" />
              </div>
              <div>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', color: 'white' }}>Stock</span>
                <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#60a5fa' }}>Bridge</span>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, color: '#94a3b8', maxWidth: 280 }}>
              India's intelligent B2B marketplace for surplus and slow-moving inventory. Turn dead stock into working capital.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {[Share2, Globe, GitBranch].map((Icon, i) => (
                <button key={i} style={{ background: '#1e293b', border: 'none', borderRadius: 8, padding: 8, cursor: 'pointer', color: '#94a3b8', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#1e293b'; e.currentTarget.style.color = '#94a3b8'; }}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: 16 }}>Quick Links</h4>
            {[
              { to: '/marketplace', label: 'Browse Listings' },
              { to: '/add-listing', label: 'Post a Listing' },
              { to: '/seller-dashboard', label: 'Seller Dashboard' },
              { to: '/buyer-dashboard', label: 'Buyer Dashboard' },
              { to: '/messages', label: 'Messages' },
            ].map(link => (
              <Link key={link.to} to={link.to} style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem', marginBottom: 10, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
              >
                → {link.label}
              </Link>
            ))}
          </div>

          {/* Categories */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: 16 }}>Categories</h4>
            {['Electronics', 'Textiles', 'Hardware', 'Packaging', 'Food & Beverage', 'Industrial Parts', 'Stationery'].map(cat => (
              <Link key={cat} to={`/marketplace?category=${cat}`} style={{ display: 'block', color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem', marginBottom: 10, transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#60a5fa'}
                onMouseLeave={e => e.currentTarget.style.color = '#94a3b8'}
              >
                {cat}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, fontSize: '0.95rem', marginBottom: 16 }}>Contact</h4>
            {[
              { Icon: Mail, text: 'support@stockbridge.in' },
              { Icon: Phone, text: '+91 98765 00000' },
              { Icon: MapPin, text: 'Ahmedabad, Gujarat, India' },
            ].map(({ Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Icon size={14} color="#60a5fa" />
                <span style={{ fontSize: '0.875rem' }}>{text}</span>
              </div>
            ))}

            <div style={{ marginTop: 20, padding: '14px 16px', background: '#1e293b', borderRadius: 10, border: '1px solid #334155' }}>
              <p style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: 8 }}>Gujarat DPIT recognized startup</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: '0.8rem', color: '#22c55e', fontWeight: 600 }}>Platform status: Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #1e293b', paddingTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: '0.8rem' }}>© 2026 StockBridge. All rights reserved. | Built as a college major project prototype.</p>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(t => (
              <a key={t} href="#" style={{ fontSize: '0.8rem', color: '#64748b', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#94a3b8'}
                onMouseLeave={e => e.currentTarget.style.color = '#64748b'}
              >{t}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
