import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Package2, Bell, MessageSquare, User, LogOut, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

const navLinks = [
  { to: '/marketplace', label: 'Browse Listings' },
  { to: '/seller-dashboard', label: 'Seller Dashboard' },
  { to: '/buyer-dashboard', label: 'Buyer Dashboard' },
  { to: '/add-listing', label: 'Post Listing' },
  { to: '/profile/b1', label: 'My Profile' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
    }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: 64, gap: 32 }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{
            background: 'linear-gradient(135deg, #2563eb, #1e3a5f)',
            borderRadius: 10,
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <Package2 size={22} color="white" />
          </div>
          <div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#1e3a5f', letterSpacing: '-0.5px' }}>Stock</span>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', color: '#2563eb', letterSpacing: '-0.5px' }}>Bridge</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div style={{ display: 'flex', gap: 4, flex: 1, alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                color: isActive ? '#2563eb' : '#64748b',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 500,
                fontSize: '0.875rem',
                padding: '6px 12px',
                borderRadius: 8,
                background: isActive ? '#eff6ff' : 'transparent',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              })}
              onMouseEnter={e => { if (!e.currentTarget.style.background.includes('eff6ff')) e.currentTarget.style.background = '#f8fafc'; }}
              onMouseLeave={e => { if (!e.currentTarget.style.background.includes('eff6ff')) e.currentTarget.style.background = 'transparent'; }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto' }}>
          <button
            onClick={() => navigate('/messages')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, position: 'relative', color: '#64748b' }}
            title="Messages"
          >
            <MessageSquare size={20} />
            <span style={{
              position: 'absolute', top: 2, right: 2,
              background: '#ef4444', color: 'white', fontSize: '0.6rem',
              width: 14, height: 14, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700,
            }}>3</span>
          </button>
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, borderRadius: 8, position: 'relative', color: '#64748b' }}
            title="Notifications"
          >
            <Bell size={20} />
            <span style={{
              position: 'absolute', top: 2, right: 2,
              background: '#f59e0b', color: 'white', fontSize: '0.6rem',
              width: 14, height: 14, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700,
            }}>5</span>
          </button>

          <div style={{ width: 1, height: 28, background: '#e2e8f0' }} />

          <Link to="/profile/b1" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none', padding: '6px 10px', borderRadius: 8, border: '1px solid #e2e8f0', transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'linear-gradient(135deg,#2563eb,#1e3a5f)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={14} color="white" />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>Rajkot Steel</span>
            <ChevronDown size={14} color="#64748b" />
          </Link>

          {/* Mobile hamburger */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 6, color: '#374151', display: 'none' }}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{
          background: 'white',
          borderTop: '1px solid #e2e8f0',
          padding: '12px 24px 20px',
          animation: 'fadeInUp 0.2s ease',
        }}>
          {navLinks.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              style={({ isActive }) => ({
                display: 'block',
                color: isActive ? '#2563eb' : '#374151',
                textDecoration: 'none',
                fontWeight: isActive ? 600 : 500,
                padding: '10px 0',
                borderBottom: '1px solid #f1f5f9',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
