import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Clock, CheckCircle, XCircle, Package, MessageSquare, Eye } from 'lucide-react';
import { requests, savedListings } from '../data/requests';
import { listings } from '../data/listings';
import { businesses } from '../data/businesses';
import { formatPrice, getStatusClass, formatDate, formatDateTime } from '../utils/helpers';
import ListingCard from '../components/ListingCard';
import Footer from '../components/Footer';

const myRequests = requests.filter(r => r.buyerId === 'b2');

const statusSteps = {
  'Pending': 1,
  'Accepted': 2,
  'Completed': 3,
  'Rejected': -1,
};

function StatusTimeline({ status }) {
  const steps = ['Submitted', 'Reviewed', 'Accepted', 'Completed'];
  const current = statusSteps[status] ?? 1;
  const isRejected = status === 'Rejected';

  return (
    <div style={{ display: 'flex', gap: 0, alignItems: 'center', marginTop: 12 }}>
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current - 1;
        const rejected = isRejected && i === 1;

        return (
          <div key={step} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: rejected && i >= 1 ? '#fee2e2' : done ? '#dcfce7' : '#f1f5f9',
                border: `2px solid ${rejected && i >= 1 ? '#ef4444' : done ? '#16a34a' : '#e2e8f0'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {rejected && i === 1 ? <XCircle size={13} color="#ef4444" /> :
                  done ? <CheckCircle size={13} color="#16a34a" /> :
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#cbd5e1' }} />
                }
              </div>
              <span style={{ fontSize: '0.65rem', color: done ? '#15803d' : '#94a3b8', fontWeight: 600, whiteSpace: 'nowrap' }}>{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 2, background: done && !isRejected ? '#16a34a' : '#e2e8f0', marginBottom: 18, transition: 'all 0.3s' }} />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('requests');
  const savedListingData = listings.filter(l => savedListings.includes(l.id));

  const tabs = [
    { id: 'requests', label: 'My Requests' },
    { id: 'saved', label: `Saved Listings (${savedListingData.length})` },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e3a5f)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ fontSize: '0.8rem', color: '#93c5fd', fontWeight: 600, marginBottom: 6 }}>Buyer Dashboard</div>
          <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.6rem' }}>Ahmedabad Textiles Co. 🛍️</h1>
          <p style={{ color: '#bfdbfe', fontSize: '0.875rem', marginTop: 4 }}>Track your purchase requests and saved listings.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '24px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, background: 'white', padding: 4, borderRadius: 10, border: '1px solid #e2e8f0', marginBottom: 28, width: 'fit-content' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                background: activeTab === tab.id ? '#2563eb' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#64748b',
                transition: 'all 0.2s',
              }}
            >{tab.label}</button>
          ))}
        </div>

        {/* REQUESTS TAB */}
        {activeTab === 'requests' && (
          <div className="animate-fade-in">
            {myRequests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, background: 'white', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <Package size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
                <p style={{ color: '#94a3b8' }}>No requests sent yet. Browse listings to get started!</p>
                <Link to="/marketplace" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-flex', marginTop: 16 }}>Browse Listings</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {myRequests.map(req => {
                  const listing = listings.find(l => l.id === req.listingId);
                  const seller = businesses.find(b => b.id === req.sellerId);

                  return (
                    <div key={req.id} style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0' }}>
                      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        {listing && (
                          <img src={listing.images[0]} alt="" style={{ width: 80, height: 64, borderRadius: 10, objectFit: 'cover', flexShrink: 0 }} />
                        )}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                            <div>
                              <Link to={`/listing/${listing?.id}`} style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', textDecoration: 'none', display: 'block', marginBottom: 4 }}>
                                {listing?.title}
                              </Link>
                              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>
                                Seller: <strong>{seller?.name}</strong> • {seller?.city}
                              </div>
                            </div>
                            <span className={getStatusClass(req.status)} style={{ flexShrink: 0 }}>{req.status}</span>
                          </div>

                          <div style={{ display: 'flex', gap: 20, marginBottom: 12, flexWrap: 'wrap' }}>
                            <div style={{ fontSize: '0.82rem', color: '#374151' }}>
                              Qty: <strong>{req.quantity} {listing?.unit}</strong>
                            </div>
                            <div style={{ fontSize: '0.82rem', color: '#374151' }}>
                              Offer: <strong style={{ color: '#16a34a' }}>{formatPrice(req.offerPrice)}/{listing?.priceUnit?.replace('per ', '')}</strong>
                            </div>
                            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                              Submitted: {formatDate(req.createdAt)}
                            </div>
                          </div>

                          <div style={{ background: '#f8fafc', borderRadius: 8, padding: '10px 14px', fontSize: '0.82rem', color: '#64748b', marginBottom: 12, borderLeft: '3px solid #e2e8f0' }}>
                            Your message: "{req.message}"
                          </div>

                          {req.notes && (
                            <div style={{ background: req.status === 'Accepted' ? '#f0fdf4' : '#fef2f2', borderRadius: 8, padding: '10px 14px', fontSize: '0.82rem', color: req.status === 'Accepted' ? '#15803d' : '#dc2626', borderLeft: `3px solid ${req.status === 'Accepted' ? '#16a34a' : '#ef4444'}`, marginBottom: 12 }}>
                              Seller response: "{req.notes}"
                            </div>
                          )}

                          {/* Status timeline */}
                          <StatusTimeline status={req.status} />

                          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
                            <Link to="/messages" className="btn-secondary btn-sm" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                              <MessageSquare size={13} /> Message Seller
                            </Link>
                            <Link to={`/listing/${listing?.id}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: '#64748b', padding: '6px 12px', border: '1px solid #e2e8f0', borderRadius: 6, background: 'white' }}>
                              <Eye size={13} /> View Listing
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* SAVED LISTINGS TAB */}
        {activeTab === 'saved' && (
          <div className="animate-fade-in">
            {savedListingData.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 60, background: 'white', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                <Heart size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
                <p style={{ color: '#94a3b8' }}>No saved listings. Click the heart icon on any listing to save it!</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
                {savedListingData.map(listing => (
                  <ListingCard key={listing.id} listing={listing} saved={true} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
