import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  MapPin, Package, Tag, Calendar, Eye, MessageSquare, Heart,
  Shield, Star, ChevronLeft, TrendingDown, ExternalLink, CheckCircle,
  Building2, Phone, Mail, ArrowRight,
} from 'lucide-react';
import { listings } from '../data/listings';
import { businesses } from '../data/businesses';
import { formatPrice, formatDate, getConditionBadgeClass, getDiscount } from '../utils/helpers';
import Modal from '../components/Modal';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [interestModal, setInterestModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ quantity: '', offerPrice: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  if (!listing) return (
    <div style={{ textAlign: 'center', padding: '100px 24px' }}>
      <h2>Listing not found</h2>
      <Link to="/marketplace" className="btn-primary" style={{ textDecoration: 'none', marginTop: 20, display: 'inline-flex' }}>
        Back to Marketplace
      </Link>
    </div>
  );

  const seller = businesses.find(b => b.id === listing.sellerId);
  const discount = getDiscount(listing.askingPrice, listing.mrp);
  const total = listing.askingPrice * (Number(form.quantity) || listing.minOrderQty);
  const similarListings = listings.filter(l => l.category === listing.category && l.id !== listing.id).slice(0, 4);

  const handleSubmitInterest = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setInterestModal(false); setSubmitted(false); setForm({ quantity: '', offerPrice: '', message: '' }); }, 2000);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24, fontSize: '0.85rem', color: '#64748b' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, color: '#64748b', fontWeight: 500 }}>
            <ChevronLeft size={16} /> Back
          </button>
          <span>/</span>
          <Link to="/marketplace" style={{ color: '#64748b', textDecoration: 'none' }}>Marketplace</Link>
          <span>/</span>
          <Link to={`/marketplace?category=${listing.category}`} style={{ color: '#64748b', textDecoration: 'none' }}>{listing.category}</Link>
          <span>/</span>
          <span style={{ color: '#374151', fontWeight: 500 }}>{listing.title.substring(0, 40)}...</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 32, alignItems: 'flex-start' }}>
          {/* Left: Images + Details */}
          <div>
            {/* Image gallery */}
            <div style={{ background: 'white', borderRadius: 14, overflow: 'hidden', border: '1px solid #e2e8f0', marginBottom: 24 }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={listing.images[activeImg]}
                  alt={listing.title}
                  style={{ width: '100%', height: 400, objectFit: 'cover', display: 'block' }}
                />
                {discount > 0 && (
                  <div style={{ position: 'absolute', top: 16, left: 16, background: '#16a34a', color: 'white', padding: '6px 14px', borderRadius: 20, fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <TrendingDown size={14} /> {discount}% OFF MRP
                  </div>
                )}
                <span className={getConditionBadgeClass(listing.condition)} style={{ position: 'absolute', top: 16, right: 16 }}>
                  {listing.condition}
                </span>
              </div>
              {listing.images.length > 1 && (
                <div style={{ display: 'flex', gap: 10, padding: 16 }}>
                  {listing.images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} style={{ border: `2px solid ${activeImg === i ? '#2563eb' : '#e2e8f0'}`, borderRadius: 8, overflow: 'hidden', cursor: 'pointer', padding: 0, width: 72, height: 54 }}>
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{ background: 'white', borderRadius: 14, padding: 28, border: '1px solid #e2e8f0', marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 700, background: '#eff6ff', padding: '3px 10px', borderRadius: 12 }}>{listing.category}</span>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', marginTop: 10, lineHeight: 1.3 }}>{listing.title}</h1>
                </div>
                <button onClick={() => setSaved(!saved)} style={{ background: saved ? '#fef2f2' : '#f8fafc', border: `1px solid ${saved ? '#fecaca' : '#e2e8f0'}`, borderRadius: 10, padding: '10px 14px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', fontWeight: 500, color: saved ? '#dc2626' : '#64748b' }}>
                  <Heart size={16} fill={saved ? '#dc2626' : 'none'} color={saved ? '#dc2626' : '#94a3b8'} />
                  {saved ? 'Saved' : 'Save'}
                </button>
              </div>

              <div style={{ display: 'flex', gap: 20, marginBottom: 20, flexWrap: 'wrap' }}>
                {[
                  { icon: Eye, label: `${listing.views} views` },
                  { icon: MessageSquare, label: `${listing.inquiries} inquiries` },
                  { icon: Calendar, label: `Posted ${formatDate(listing.postedDate)}` },
                  { icon: MapPin, label: `${listing.city}, Gujarat` },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#64748b' }}>
                    <Icon size={14} /> {label}
                  </div>
                ))}
              </div>

              <p style={{ color: '#374151', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: 24 }}>{listing.description}</p>

              {/* Quick stats */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 }}>
                {[
                  { label: 'Available Qty', value: `${listing.quantity.toLocaleString()} ${listing.unit}` },
                  { label: 'Min. Order', value: `${listing.minOrderQty} ${listing.unit}` },
                  { label: 'Brand', value: listing.brand },
                  { label: 'Expires', value: formatDate(listing.expiryDate) },
                ].map(item => (
                  <div key={item.label} style={{ background: '#f8fafc', borderRadius: 10, padding: '12px 14px', border: '1px solid #f1f5f9' }}>
                    <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div style={{ background: 'white', borderRadius: 14, padding: 28, border: '1px solid #e2e8f0', marginBottom: 24 }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: 18 }}>Specifications</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                {Object.entries(listing.specifications).map(([key, val], i) => (
                  <div key={key} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 500 }}>{key}</span>
                    <span style={{ fontSize: '0.85rem', color: '#0f172a', fontWeight: 600, textAlign: 'right' }}>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Price + Seller */}
          <div>
            {/* Price card */}
            <div style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0', marginBottom: 16, position: 'sticky', top: 84 }}>
              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                  <span style={{ fontSize: '2rem', fontWeight: 900, color: '#16a34a' }}>{formatPrice(listing.askingPrice)}</span>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{listing.priceUnit}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 4 }}>
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8', textDecoration: 'line-through' }}>{formatPrice(listing.mrp)} MRP</span>
                  {discount > 0 && <span style={{ color: '#16a34a', fontWeight: 700, fontSize: '0.85rem' }}>Save {discount}%</span>}
                </div>
              </div>

              {/* Estimated total */}
              <div style={{ background: '#f0fdf4', borderRadius: 10, padding: '14px 16px', border: '1px solid #bbf7d0', marginBottom: 20 }}>
                <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600, marginBottom: 4 }}>Estimated Total (Min. Order)</div>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#15803d' }}>
                  {formatPrice(listing.askingPrice * listing.minOrderQty)}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#16a34a', marginTop: 2 }}>for {listing.minOrderQty} {listing.unit}</div>
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 10, padding: '14px' }} onClick={() => setInterestModal(true)}>
                <MessageSquare size={17} /> Express Interest
              </button>
              <Link to="/messages" className="btn-secondary" style={{ width: '100%', justifyContent: 'center', display: 'flex', textDecoration: 'none', padding: '12px' }}>
                Send Message
              </Link>

              <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { icon: Shield, text: 'Verified seller • GST registered' },
                  { icon: CheckCircle, text: 'Safe transaction tips available' },
                  { icon: Package, text: `${listing.quantity} ${listing.unit} in stock` },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.78rem', color: '#64748b' }}>
                    <Icon size={13} color="#16a34a" /> {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Seller card */}
            {seller && (
              <div style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', marginBottom: 16 }}>About the Seller</h3>
                <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                  <img src={seller.logo} alt={seller.name} style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover' }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{seller.name}</div>
                    {seller.verified && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#16a34a', fontSize: '0.75rem', fontWeight: 600, marginTop: 3 }}>
                        <Shield size={12} /> GST Verified
                      </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                      <Star size={12} fill="#f59e0b" color="#f59e0b" />
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#374151' }}>{seller.rating}</span>
                      <span style={{ fontSize: '0.75rem', color: '#64748b' }}>({seller.totalReviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  {[
                    { icon: MapPin, text: `${seller.city}, ${seller.state}` },
                    { icon: Building2, text: seller.category },
                    { icon: Calendar, text: `Member since ${seller.joinedYear}` },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: '#64748b' }}>
                      <Icon size={13} /> {text}
                    </div>
                  ))}
                </div>
                <Link to={`/profile/${seller.id}`} className="btn-secondary" style={{ textDecoration: 'none', display: 'flex', justifyContent: 'center', padding: '10px', width: '100%' }}>
                  <ExternalLink size={14} /> View Full Profile
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Similar listings */}
        {similarListings.length > 0 && (
          <section style={{ marginTop: 48, marginBottom: 48 }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: 24 }}>Similar Listings</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {similarListings.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          </section>
        )}
      </div>

      {/* Express Interest Modal */}
      <Modal isOpen={interestModal} onClose={() => setInterestModal(false)} title="Express Interest">
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <CheckCircle size={32} color="#16a34a" />
            </div>
            <h3 style={{ fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Request Sent!</h3>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>The seller will respond to your inquiry soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmitInterest}>
            <div style={{ background: '#f8fafc', borderRadius: 10, padding: '12px 16px', marginBottom: 20, border: '1px solid #e2e8f0' }}>
              <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: 4 }}>Enquiring about:</div>
              <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>{listing.title}</div>
              <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 600, marginTop: 2 }}>
                {formatPrice(listing.askingPrice)} {listing.priceUnit}
              </div>
            </div>
            <div className="form-group">
              <label className="label">Quantity Required ({listing.unit}) *</label>
              <input
                type="number"
                className="input"
                placeholder={`Min. ${listing.minOrderQty} ${listing.unit}`}
                min={listing.minOrderQty}
                value={form.quantity}
                onChange={e => setForm({ ...form, quantity: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="label">Your Offer Price (₹ {listing.priceUnit})</label>
              <input
                type="number"
                className="input"
                placeholder={`Listed at ₹${listing.askingPrice}`}
                value={form.offerPrice}
                onChange={e => setForm({ ...form, offerPrice: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="label">Message to Seller *</label>
              <textarea
                className="input"
                rows={4}
                placeholder="Introduce your company, explain your requirement, delivery preferences..."
                value={form.message}
                onChange={e => setForm({ ...form, message: e.target.value })}
                required
                style={{ resize: 'vertical' }}
              />
            </div>
            {form.quantity && (
              <div style={{ background: '#f0fdf4', borderRadius: 10, padding: '12px 16px', marginBottom: 20, border: '1px solid #bbf7d0' }}>
                <div style={{ fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>Estimated Order Value</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#15803d' }}>
                  {formatPrice((form.offerPrice || listing.askingPrice) * form.quantity)}
                </div>
              </div>
            )}
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '14px' }}>
              <MessageSquare size={16} /> Send Inquiry
            </button>
          </form>
        )}
      </Modal>

      <Footer />
    </div>
  );
}
