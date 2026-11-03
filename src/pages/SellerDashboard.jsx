import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package, DollarSign, MessageSquare, TrendingUp, Edit, Trash2,
  Plus, Eye, CheckCircle, XCircle, Clock, Sparkles, Target, Award,
  BarChart2, AlertCircle,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend,
} from 'recharts';
import { listings } from '../data/listings';
import { businesses, currentBusiness } from '../data/businesses';
import { requests } from '../data/requests';
import { formatPrice, formatPriceCompact, getStatusClass, computeMatchScore, formatDate } from '../utils/helpers';
import StatCard from '../components/StatCard';
import Modal from '../components/Modal';
import Footer from '../components/Footer';

const myListings = listings.filter(l => l.sellerId === 'b1');
const myRequests = requests.filter(r => r.sellerId === 'b1');

const categoryData = Object.entries(
  myListings.reduce((acc, l) => { acc[l.category] = (acc[l.category] || 0) + 1; return acc; }, {})
).map(([name, value]) => ({ name, value }));

const categoryColors = ['#2563eb', '#7c3aed', '#16a34a', '#f59e0b', '#ef4444'];

const inventoryValueData = myListings.map(l => ({
  name: l.title.split(' ').slice(0, 3).join(' ') + '...',
  value: l.askingPrice * l.quantity,
  mrpValue: l.mrp * l.quantity,
}));

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedListing, setSelectedListing] = useState(myListings[0]);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  const totalValue = myListings.reduce((sum, l) => sum + l.askingPrice * l.quantity, 0);
  const pendingReqs = myRequests.filter(r => r.status === 'Pending').length;

  const buyers = businesses.filter(b => b.id !== 'b1');
  const matchedBuyers = buyers.map(buyer => ({
    ...buyer,
    ...computeMatchScore(selectedListing, buyer),
  })).sort((a, b) => b.score - a.score);

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'listings', label: 'My Listings' },
    { id: 'requests', label: `Requests (${pendingReqs} new)` },
    { id: 'ai-matches', label: '✨ AI Matches' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #2563eb)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#93c5fd', fontWeight: 600, marginBottom: 6 }}>Seller Dashboard</div>
              <h1 style={{ color: 'white', fontWeight: 800, fontSize: '1.6rem' }}>Welcome back, Rajkot Steel! 👋</h1>
              <p style={{ color: '#bfdbfe', fontSize: '0.875rem', marginTop: 4 }}>Here's what's happening with your inventory today.</p>
            </div>
            <Link to="/add-listing" className="btn-accent" style={{ textDecoration: 'none' }}>
              <Plus size={16} /> Add New Listing
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, background: 'white', padding: 4, borderRadius: 10, border: '1px solid #e2e8f0', marginBottom: 28, overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', whiteSpace: 'nowrap',
                background: activeTab === tab.id ? '#2563eb' : 'transparent',
                color: activeTab === tab.id ? 'white' : '#64748b',
                transition: 'all 0.2s',
              }}
            >{tab.label}</button>
          ))}
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="animate-fade-in">
            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 28 }}>
              <StatCard icon={Package} label="Active Listings" value={myListings.length} sub="All in active status" color="#2563eb" bgColor="#eff6ff" />
              <StatCard icon={DollarSign} label="Total Inventory Value" value={formatPriceCompact(totalValue)} sub="At asking price" color="#16a34a" bgColor="#f0fdf4" />
              <StatCard icon={MessageSquare} label="Inquiries Received" value={myRequests.length} sub={`${pendingReqs} pending review`} color="#7c3aed" bgColor="#f5f3ff" />
              <StatCard icon={TrendingUp} label="Capital Recovered" value={formatPriceCompact(currentBusiness.recoveredValue)} sub="From completed sales" color="#f59e0b" bgColor="#fffbeb" />
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              {/* Pie chart */}
              <div style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: 20 }}>Listings by Category</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {categoryData.map((_, i) => <Cell key={i} fill={categoryColors[i % categoryColors.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Bar chart */}
              <div style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: 20 }}>Inventory Value by Listing</h3>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={inventoryValueData.slice(0, 4)} barSize={28}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(v) => formatPrice(v)} />
                    <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} name="Asking Price Value" />
                    <Bar dataKey="mrpValue" fill="#bbf7d0" radius={[4, 4, 0, 0]} name="MRP Value" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent requests */}
            <div style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>Recent Requests</h3>
                <button onClick={() => setActiveTab('requests')} style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button>
              </div>
              {myRequests.slice(0, 3).map(req => {
                const buyer = businesses.find(b => b.id === req.buyerId);
                const listing = listings.find(l => l.id === req.listingId);
                return (
                  <div key={req.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img src={buyer?.logo} alt="" style={{ width: 36, height: 36, borderRadius: 8, objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>{buyer?.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{listing?.title?.substring(0, 35)}...</div>
                      </div>
                    </div>
                    <span className={getStatusClass(req.status)}>{req.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* LISTINGS TAB */}
        {activeTab === 'listings' && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <Link to="/add-listing" className="btn-primary" style={{ textDecoration: 'none' }}>
                <Plus size={15} /> New Listing
              </Link>
            </div>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Views</th>
                    <th>Inquiries</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {myListings.map(listing => (
                    <tr key={listing.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <img src={listing.images[0]} alt="" style={{ width: 40, height: 32, borderRadius: 6, objectFit: 'cover' }} />
                          <span style={{ fontWeight: 600, fontSize: '0.85rem', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {listing.title}
                          </span>
                        </div>
                      </td>
                      <td><span style={{ fontSize: '0.78rem', background: '#eff6ff', color: '#2563eb', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>{listing.category}</span></td>
                      <td style={{ fontSize: '0.85rem', fontWeight: 600 }}>{listing.quantity.toLocaleString()} {listing.unit}</td>
                      <td style={{ color: '#16a34a', fontWeight: 700 }}>{formatPrice(listing.askingPrice)}</td>
                      <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{listing.views}</td>
                      <td style={{ color: '#64748b', fontSize: '0.85rem' }}>{listing.inquiries}</td>
                      <td><span className="badge badge-new">Active</span></td>
                      <td>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <Link to={`/listing/${listing.id}`} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 6, padding: '5px 8px', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="View">
                            <Eye size={14} />
                          </Link>
                          <Link to={`/edit-listing/${listing.id}`} style={{ background: '#eff6ff', border: '1px solid #dbeafe', borderRadius: 6, padding: '5px 8px', color: '#2563eb', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Edit">
                            <Edit size={14} />
                          </Link>
                          <button onClick={() => setDeleteConfirm(listing.id)} style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 6, padding: '5px 8px', color: '#dc2626', cursor: 'pointer', display: 'flex', alignItems: 'center' }} title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REQUESTS TAB */}
        {activeTab === 'requests' && (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {myRequests.map(req => {
                const buyer = businesses.find(b => b.id === req.buyerId);
                const listingData = listings.find(l => l.id === req.listingId);
                return (
                  <div key={req.id} style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
                      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                        <img src={buyer?.logo} alt="" style={{ width: 48, height: 48, borderRadius: 10, objectFit: 'cover' }} />
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                            <span style={{ fontWeight: 700, color: '#0f172a' }}>{buyer?.name}</span>
                            <span className={getStatusClass(req.status)}>{req.status}</span>
                          </div>
                          <div style={{ fontSize: '0.82rem', color: '#64748b', marginBottom: 6 }}>{buyer?.city} • {buyer?.category}</div>
                          <div style={{ fontSize: '0.85rem', color: '#374151', fontWeight: 500 }}>
                            Re: {listingData?.title}
                          </div>
                          <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: 4 }}>
                            Qty: <strong>{req.quantity} {listingData?.unit}</strong>
                            {req.offerPrice && <> • Offer: <strong style={{ color: '#16a34a' }}>{formatPrice(req.offerPrice)}/{listingData?.priceUnit?.replace('per ', '')}</strong></>}
                          </div>
                          <div style={{ marginTop: 10, background: '#f8fafc', borderRadius: 8, padding: '10px 14px', fontSize: '0.82rem', color: '#374151', borderLeft: '3px solid #2563eb', maxWidth: 480 }}>
                            "{req.message}"
                          </div>
                        </div>
                      </div>
                      {req.status === 'Pending' && (
                        <div style={{ display: 'flex', gap: 10 }}>
                          <button className="btn-accent btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <CheckCircle size={14} /> Accept
                          </button>
                          <button className="btn-danger" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <XCircle size={14} /> Reject
                          </button>
                          <Link to="/messages" className="btn-secondary btn-sm" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <MessageSquare size={14} /> Chat
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              {myRequests.length === 0 && (
                <div style={{ textAlign: 'center', padding: 60, background: 'white', borderRadius: 14, border: '1px solid #e2e8f0' }}>
                  <Clock size={40} color="#cbd5e1" style={{ marginBottom: 12 }} />
                  <p style={{ color: '#94a3b8' }}>No requests yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* AI MATCHES TAB */}
        {activeTab === 'ai-matches' && (
          <div className="animate-fade-in">
            <div style={{ background: 'linear-gradient(135deg, #1e3a5f, #7c3aed)', borderRadius: 14, padding: '20px 24px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 14 }}>
              <Sparkles size={28} color="#fbbf24" />
              <div>
                <div style={{ color: 'white', fontWeight: 700, fontSize: '1rem' }}>AI-Assisted Buyer Matching (Prototype)</div>
                <div style={{ color: '#c4b5fd', fontSize: '0.82rem', marginTop: 2 }}>Suggested buyers are ranked by category match, proximity, purchase history, and verification status.</div>
              </div>
              <div style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '4px 12px', color: '#fbbf24', fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap' }}>
                PROTOTYPE
              </div>
            </div>

            {/* Select listing */}
            <div style={{ background: 'white', borderRadius: 14, padding: 20, border: '1px solid #e2e8f0', marginBottom: 20 }}>
              <label className="label">Select Listing to Find Matches:</label>
              <select
                className="input select"
                value={selectedListing?.id || ''}
                onChange={e => setSelectedListing(myListings.find(l => l.id === e.target.value))}
                style={{ maxWidth: 480 }}
              >
                {myListings.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}
              </select>
            </div>

            {/* Matched buyers */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {matchedBuyers.map((buyer, i) => (
                <div key={buyer.id} style={{ background: 'white', borderRadius: 14, padding: 20, border: `1px solid ${i === 0 ? '#7c3aed' : '#e2e8f0'}`, position: 'relative', overflow: 'hidden' }}>
                  {i === 0 && (
                    <div style={{ position: 'absolute', top: 0, left: 0, background: 'linear-gradient(90deg, #7c3aed, #2563eb)', color: 'white', fontSize: '0.65rem', fontWeight: 700, padding: '3px 12px', borderRadius: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Award size={10} /> TOP MATCH
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: i === 0 ? 12 : 0 }}>
                    <div className={`match-ring ${buyer.score >= 75 ? 'match-high' : buyer.score >= 50 ? 'match-medium' : 'match-low'}`}>
                      {buyer.score}%
                    </div>
                    <img src={buyer.logo} alt="" style={{ width: 44, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontWeight: 700, color: '#0f172a' }}>{buyer.name}</span>
                        {buyer.verified && <span className="badge badge-verified" style={{ fontSize: '0.65rem' }}>✓ Verified</span>}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: 3 }}>{buyer.city} • {buyer.category}</div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
                        {buyer.reasons.map(r => (
                          <span key={r} style={{ background: '#f0fdf4', color: '#16a34a', fontSize: '0.72rem', fontWeight: 600, padding: '2px 10px', borderRadius: 12, border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Target size={10} /> {r}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <Link to="/messages" className="btn-primary btn-sm" style={{ textDecoration: 'none' }}>
                        <MessageSquare size={13} /> Contact
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete confirm modal */}
      <Modal isOpen={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Listing?" maxWidth={420}>
        <div style={{ textAlign: 'center', padding: '10px 0 20px' }}>
          <AlertCircle size={48} color="#ef4444" style={{ margin: '0 auto 16px' }} />
          <p style={{ color: '#374151', marginBottom: 24 }}>Are you sure you want to delete this listing? This action cannot be undone.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            <button className="btn-danger" style={{ padding: '10px 24px', fontSize: '0.9rem', fontWeight: 600 }} onClick={() => setDeleteConfirm(null)}>Delete</button>
          </div>
        </div>
      </Modal>

      <Footer />
    </div>
  );
}
