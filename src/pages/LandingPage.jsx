import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search, ArrowRight, TrendingDown, Building2, Package,
  Shield, Zap, Users, Star, ChevronRight, CheckCircle, BarChart2,
} from 'lucide-react';
import { listings } from '../data/listings';
import { businesses } from '../data/businesses';
import { formatPrice, getDiscount } from '../utils/helpers';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

const stats = [
  { label: 'Active Listings', value: '1,200+', icon: Package, color: '#2563eb' },
  { label: 'Registered Businesses', value: '350+', icon: Building2, color: '#7c3aed' },
  { label: 'Value Recovered', value: '₹4.5 Cr', icon: TrendingDown, color: '#16a34a' },
  { label: 'Avg. Discount', value: '38%', icon: BarChart2, color: '#f59e0b' },
];

const steps = [
  {
    step: '01', icon: Package, title: 'List Surplus Stock',
    desc: 'Upload your surplus inventory in minutes. Add photos, description, quantity, and set your price.',
    color: '#2563eb',
  },
  {
    step: '02', icon: Zap, title: 'AI-Powered Matching',
    desc: 'Our smart algorithm connects you with verified buyers who need exactly what you have.',
    color: '#7c3aed',
  },
  {
    step: '03', icon: TrendingDown, title: 'Sell & Recover Capital',
    desc: 'Negotiate, agree, and complete the transaction. Turn dead stock into working capital.',
    color: '#16a34a',
  },
];

const testimonials = [
  {
    name: 'Ramesh Patel', company: 'Vadodara Electronics', text: 'We recovered ₹12 lakh worth of idle LED fixtures within 2 weeks. StockBridge is a game-changer for B2B!',
    rating: 5, avatar: 'RP',
  },
  {
    name: 'Sonal Mehta', company: 'Ahmedabad Textiles', text: 'The buyer matching is incredibly accurate. We found the perfect industrial buyer for our surplus fabric without cold-calling anyone.',
    rating: 5, avatar: 'SM',
  },
  {
    name: 'Amit Shah', company: 'Surat Packaging', text: 'Simple interface, verified buyers, and transparent pricing. This is exactly what the B2B market needed in Gujarat.',
    rating: 4, avatar: 'AS',
  },
];

const categories = [
  { name: 'Electronics', icon: '💻', count: 4, color: '#eff6ff' },
  { name: 'Textiles', icon: '🧵', count: 2, color: '#f5f3ff' },
  { name: 'Hardware', icon: '🔧', count: 4, color: '#fff7ed' },
  { name: 'Packaging', icon: '📦', count: 2, color: '#f0fdf4' },
  { name: 'Food & Beverage', icon: '🌾', count: 3, color: '#fef3c7' },
  { name: 'Industrial Parts', icon: '⚙️', count: 3, color: '#fdf2f8' },
  { name: 'Stationery', icon: '📝', count: 2, color: '#ecfdf5' },
];

export default function LandingPage() {
  const [searchQ, setSearchQ] = useState('');
  const navigate = useNavigate();
  const featuredListings = listings.slice(0, 6);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/marketplace?q=${encodeURIComponent(searchQ)}`);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 45%, #1e40af 100%)',
        padding: '80px 24px 100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background pattern */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'radial-gradient(circle at 25% 35%, white 1px, transparent 1px), radial-gradient(circle at 75% 65%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div style={{
          position: 'absolute', top: -100, right: -100, width: 500, height: 500,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.15), transparent)',
        }} />

        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.08)', borderRadius: 24, padding: '6px 16px',
            marginBottom: 24, border: '1px solid rgba(255,255,255,0.12)',
          }}>
            <Zap size={14} color="#fbbf24" fill="#fbbf24" />
            <span style={{ fontSize: '0.82rem', color: '#e2e8f0', fontWeight: 500 }}>
              AI-Assisted Matching • Gujarat's B2B Surplus Marketplace
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, color: 'white',
            lineHeight: 1.15, marginBottom: 20, letterSpacing: '-1px',
          }}>
            Turn Surplus Stock Into
            <br />
            <span style={{ background: 'linear-gradient(90deg, #60a5fa, #34d399)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Working Capital
            </span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94a3b8', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7 }}>
            StockBridge connects B2B sellers of surplus and slow-moving inventory with verified buyers across Gujarat — intelligently, securely, and efficiently.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} style={{ display: 'flex', maxWidth: 620, margin: '0 auto 36px', gap: 0 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search products, categories, businesses..."
                style={{
                  width: '100%', padding: '16px 16px 16px 48px', fontSize: '0.95rem',
                  border: 'none', borderRadius: '12px 0 0 12px', outline: 'none',
                  fontFamily: 'inherit', background: 'rgba(255,255,255,0.97)',
                }}
              />
            </div>
            <button type="submit" className="btn-primary" style={{ borderRadius: '0 12px 12px 0', padding: '16px 24px', whiteSpace: 'nowrap' }}>
              Search <ArrowRight size={16} />
            </button>
          </form>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
            {['Electronics', 'Textiles', 'Hardware', 'Packaging'].map(cat => (
              <Link key={cat} to={`/marketplace?category=${cat}`} style={{
                fontSize: '0.82rem', color: '#cbd5e1', textDecoration: 'none', padding: '4px 14px',
                background: 'rgba(255,255,255,0.07)', borderRadius: 20, border: '1px solid rgba(255,255,255,0.12)',
                transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.color = '#cbd5e1'; }}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section style={{ background: '#1e3a5f', padding: '28px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 0 }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              textAlign: 'center', padding: '8px 24px',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'white', letterSpacing: '-1px' }}>{s.value}</div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: 4, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Main content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

        {/* Categories */}
        <section style={{ padding: '72px 0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Browse by</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: 8 }}>Product Categories</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 16 }}>
            {categories.map(cat => (
              <Link key={cat.name} to={`/marketplace?category=${cat.name}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: cat.color, borderRadius: 14, padding: '24px 16px', textAlign: 'center',
                  border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.10)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{ fontSize: '2rem', marginBottom: 10 }}>{cat.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a', marginBottom: 4 }}>{cat.name}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{cat.count} listings</div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section style={{ padding: '60px 0', background: 'linear-gradient(135deg, #f8fafc, #eff6ff)', borderRadius: 20, margin: '0 -8px 60px', padding: '60px 32px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Simple & Fast</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: 8 }}>How StockBridge Works</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 32 }}>
            {steps.map((step, i) => (
              <div key={step.step} style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: `${step.color}15`, border: `2px solid ${step.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <step.icon size={30} color={step.color} />
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: step.color, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Step {step.step}</div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>{step.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.7, maxWidth: 280, margin: '0 auto' }}>{step.desc}</p>
                {i < steps.length - 1 && (
                  <ChevronRight size={24} color="#cbd5e1" style={{ position: 'absolute', right: -16, top: 24, display: 'none' }} />
                )}
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/marketplace" className="btn-primary" style={{ textDecoration: 'none' }}>
              Start Browsing Listings <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Featured listings */}
        <section style={{ paddingBottom: 80 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Fresh Stock</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: 4 }}>Featured Listings</h2>
            </div>
            <Link to="/marketplace" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#2563eb', fontWeight: 600, fontSize: '0.9rem', textDecoration: 'none' }}>
              View all listings <ArrowRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 24 }}>
            {featuredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ paddingBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Trusted by businesses</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginTop: 8 }}>What our members say</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {testimonials.map(t => (
              <div key={t.name} className="card" style={{ padding: 28 }}>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.7, marginBottom: 20 }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #2563eb, #1e3a5f)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '0.85rem',
                  }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0f172a' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{t.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #1e3a5f, #2563eb)',
          borderRadius: 20, padding: '60px 40px', textAlign: 'center', marginBottom: 80,
        }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'white', marginBottom: 16 }}>
            Ready to clear your surplus inventory?
          </h2>
          <p style={{ color: '#bfdbfe', marginBottom: 32, maxWidth: 500, margin: '0 auto 32px', lineHeight: 1.7 }}>
            Join 350+ businesses in Gujarat who are already recovering working capital from surplus stock.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/add-listing" className="btn-accent" style={{ textDecoration: 'none', padding: '14px 32px', fontSize: '1rem' }}>
              Post a Listing Free <ArrowRight size={18} />
            </Link>
            <Link to="/marketplace" style={{ textDecoration: 'none', color: 'white', fontWeight: 600, padding: '14px 32px', border: '2px solid rgba(255,255,255,0.4)', borderRadius: 8, fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Browse Listings
            </Link>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
