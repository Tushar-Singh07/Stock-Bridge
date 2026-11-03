import { useParams, Link } from 'react-router-dom';
import { MapPin, Shield, Star, Phone, Mail, Calendar, Package, Building2, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { businesses } from '../data/businesses';
import { listings } from '../data/listings';
import { formatPriceCompact, formatPrice } from '../utils/helpers';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

export default function BusinessProfile() {
  const { id } = useParams();
  const business = businesses.find(b => b.id === id);

  if (!business) return (
    <div style={{ textAlign: 'center', padding: 80 }}>
      <h2>Business not found</h2>
      <Link to="/marketplace" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', marginTop: 20 }}>Browse Listings</Link>
    </div>
  );

  const bizListings = listings.filter(l => l.sellerId === business.id);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Hero banner */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #1e40af)', height: 160, position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.06, backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
        {/* Profile card */}
        <div style={{ background: 'white', borderRadius: 16, padding: '24px 32px', border: '1px solid #e2e8f0', marginTop: -60, marginBottom: 28, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <img
              src={business.logo}
              alt={business.name}
              style={{ width: 100, height: 100, borderRadius: 16, objectFit: 'cover', border: '3px solid white', boxShadow: '0 4px 12px rgba(0,0,0,0.12)', marginTop: -40 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>{business.name}</h1>
                {business.verified && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#dcfce7', color: '#16a34a', padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 700 }}>
                    <Shield size={13} /> GST Verified
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
                {[
                  { icon: Building2, text: business.category },
                  { icon: MapPin, text: `${business.city}, ${business.state}` },
                  { icon: Calendar, text: `Member since ${business.joinedYear}` },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem', color: '#64748b' }}>
                    <Icon size={14} /> {text}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill={i < Math.round(business.rating) ? '#f59e0b' : '#e2e8f0'} color={i < Math.round(business.rating) ? '#f59e0b' : '#e2e8f0'} />
                ))}
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a' }}>{business.rating}</span>
                <span style={{ color: '#64748b', fontSize: '0.82rem' }}>({business.totalReviews} reviews)</span>
              </div>

              <p style={{ color: '#64748b', fontSize: '0.875rem', maxWidth: 600, lineHeight: 1.7 }}>{business.description}</p>
            </div>

            {/* Contact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href={`tel:${business.phone}`} className="btn-primary btn-sm" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Phone size={13} /> Call Now
              </a>
              <a href={`mailto:${business.email}`} className="btn-secondary btn-sm" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={13} /> Email
              </a>
              <Link to="/messages" className="btn-secondary btn-sm" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                💬 Message
              </Link>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
          {[
            { icon: Package, label: 'Active Listings', value: business.totalListings, color: '#2563eb', bg: '#eff6ff' },
            { icon: CheckCircle, label: 'Completed Sales', value: business.totalSales, color: '#16a34a', bg: '#f0fdf4' },
            { icon: TrendingUp, label: 'Capital Recovered', value: formatPriceCompact(business.recoveredValue), color: '#f59e0b', bg: '#fffbeb' },
            { icon: Star, label: 'Rating', value: `${business.rating}/5`, color: '#7c3aed', bg: '#f5f3ff' },
          ].map(item => (
            <div key={item.label} style={{ background: 'white', borderRadius: 12, padding: '18px 20px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ background: item.bg, borderRadius: 10, padding: 10 }}>
                <item.icon size={20} color={item.color} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.4rem', color: '#0f172a' }}>{item.value}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 500 }}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Business info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
          <div style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: 16 }}>Contact Information</h2>
            {[
              { icon: Phone, label: 'Phone', value: business.phone },
              { icon: Mail, label: 'Email', value: business.email },
              { icon: MapPin, label: 'Address', value: business.address },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <Icon size={15} color="#2563eb" style={{ marginTop: 2, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600 }}>{label}</div>
                  <div style={{ fontSize: '0.875rem', color: '#374151', fontWeight: 500, marginTop: 1 }}>{value}</div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: 16 }}>Business Details</h2>
            {[
              { label: 'GST Number', value: business.gst },
              { label: 'Business Type', value: business.category },
              { label: 'City', value: `${business.city}, ${business.state}` },
              { label: 'Member Since', value: business.joinedYear },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: '0.82rem', color: '#64748b' }}>{label}</span>
                <span style={{ fontSize: '0.82rem', color: '#0f172a', fontWeight: 600 }}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active listings */}
        {bizListings.length > 0 && (
          <div style={{ marginBottom: 48 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h2 style={{ fontWeight: 700, fontSize: '1.2rem', color: '#0f172a' }}>Active Listings ({bizListings.length})</h2>
              <Link to={`/marketplace?seller=${business.id}`} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#2563eb', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {bizListings.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
