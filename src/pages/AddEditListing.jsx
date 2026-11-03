import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, X, Check, Image, AlertCircle } from 'lucide-react';
import { CATEGORIES, CONDITIONS } from '../data/listings';
import { listings } from '../data/listings';
import Footer from '../components/Footer';

const UNITS = ['Kg', 'Pieces', 'Meters', 'Rolls', 'Units', 'Boxes', 'Tins', 'Bags', 'Reams', 'Liters', 'Tablets', 'Sets'];

export default function AddEditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;
  const existing = isEdit ? listings.find(l => l.id === id) : null;

  const [form, setForm] = useState({
    title: existing?.title || '',
    category: existing?.category || '',
    quantity: existing?.quantity || '',
    unit: existing?.unit || 'Pieces',
    condition: existing?.condition || 'New',
    askingPrice: existing?.askingPrice || '',
    mrp: existing?.mrp || '',
    city: existing?.city || '',
    description: existing?.description || '',
    minOrderQty: existing?.minOrderQty || '',
    brand: existing?.brand || '',
    weight: existing?.weight || '',
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState(existing?.images || []);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const update = (key, val) => {
    setForm(p => ({ ...p, [key]: val }));
    if (errors[key]) setErrors(p => { const n = { ...p }; delete n[key]; return n; });
  };

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Product name is required';
    if (!form.category) e.category = 'Category is required';
    if (!form.quantity || form.quantity <= 0) e.quantity = 'Valid quantity required';
    if (!form.askingPrice || form.askingPrice <= 0) e.askingPrice = 'Valid price required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.description.trim()) e.description = 'Description is required';
    return e;
  };

  const handleImageAdd = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImagePreviews(prev => [...prev, ev.target.result]);
      };
      reader.readAsDataURL(file);
    });
    setImageFiles(prev => [...prev, ...files]);
  };

  const removeImage = (i) => {
    setImagePreviews(prev => prev.filter((_, idx) => idx !== i));
    setImageFiles(prev => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    if (Object.keys(e2).length > 0) { setErrors(e2); return; }
    setSubmitted(true);
    setTimeout(() => navigate('/seller-dashboard'), 1500);
  };

  const discount = form.mrp && form.askingPrice ? Math.round(((form.mrp - form.askingPrice) / form.mrp) * 100) : 0;

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: 10, cursor: 'pointer', color: '#64748b' }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0f172a' }}>{isEdit ? 'Edit Listing' : 'Add New Listing'}</h1>
            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Fill in the details below to {isEdit ? 'update your' : 'create a new'} listing</p>
          </div>
        </div>

        {submitted ? (
          <div style={{ background: 'white', borderRadius: 16, padding: '60px 40px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Check size={36} color="#16a34a" />
            </div>
            <h2 style={{ fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Listing {isEdit ? 'Updated' : 'Published'}!</h2>
            <p style={{ color: '#64748b' }}>Redirecting to your dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'flex-start' }}>
              {/* Left column */}
              <div style={{ gridColumn: '1 / -1' }}>
                {/* Image upload */}
                <div style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0', marginBottom: 20 }}>
                  <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: 16 }}>Product Images</h2>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
                    {imagePreviews.map((src, i) => (
                      <div key={i} style={{ position: 'relative', width: 100, height: 80 }}>
                        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, border: '1px solid #e2e8f0' }} />
                        <button type="button" onClick={() => removeImage(i)} style={{ position: 'absolute', top: -6, right: -6, background: '#ef4444', border: 'none', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
                          <X size={11} />
                        </button>
                      </div>
                    ))}
                    <label className="upload-area" style={{ width: 100, height: 80, padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer' }}>
                      <input type="file" accept="image/*" multiple onChange={handleImageAdd} style={{ display: 'none' }} />
                      <Image size={20} color="#94a3b8" />
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8' }}>Add Photo</span>
                    </label>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Upload up to 5 high-quality images. First image will be the cover photo.</p>
                </div>
              </div>

              {/* Product details */}
              <div style={{ background: 'white', borderRadius: 14, padding: 24, border: '1px solid #e2e8f0', gridColumn: '1 / -1' }}>
                <h2 style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: 20 }}>Product Information</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
                    <label className="label">Product Name *</label>
                    <input type="text" className={`input ${errors.title ? 'border-red-400' : ''}`} placeholder="e.g. Surplus Copper Wire Rolls - 2.5mm" value={form.title} onChange={e => update('title', e.target.value)} style={errors.title ? { borderColor: '#ef4444' } : {}} />
                    {errors.title && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.title}</span>}
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="label">Category *</label>
                    <select className="input select" value={form.category} onChange={e => update('category', e.target.value)} style={errors.category ? { borderColor: '#ef4444' } : {}}>
                      <option value="">Select category...</option>
                      {CATEGORIES.filter(c => c !== 'All Categories').map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.category && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.category}</span>}
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="label">Condition *</label>
                    <select className="input select" value={form.condition} onChange={e => update('condition', e.target.value)}>
                      {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="label">Quantity Available *</label>
                    <input type="number" className="input" placeholder="e.g. 500" min="1" value={form.quantity} onChange={e => update('quantity', e.target.value)} style={errors.quantity ? { borderColor: '#ef4444' } : {}} />
                    {errors.quantity && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.quantity}</span>}
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="label">Unit *</label>
                    <select className="input select" value={form.unit} onChange={e => update('unit', e.target.value)}>
                      {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="label">Asking Price (₹ per unit) *</label>
                    <input type="number" className="input" placeholder="e.g. 2800" min="0" value={form.askingPrice} onChange={e => update('askingPrice', e.target.value)} style={errors.askingPrice ? { borderColor: '#ef4444' } : {}} />
                    {errors.askingPrice && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.askingPrice}</span>}
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="label">MRP (₹ per unit)</label>
                    <input type="number" className="input" placeholder="Original MRP" min="0" value={form.mrp} onChange={e => update('mrp', e.target.value)} />
                    {discount > 0 && <span style={{ color: '#16a34a', fontSize: '0.78rem', fontWeight: 600 }}>Discount: {discount}% off MRP</span>}
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="label">Minimum Order Quantity</label>
                    <input type="number" className="input" placeholder="e.g. 10" min="1" value={form.minOrderQty} onChange={e => update('minOrderQty', e.target.value)} />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="label">Brand / Make</label>
                    <input type="text" className="input" placeholder="e.g. Polycab, SAIL, Own Brand" value={form.brand} onChange={e => update('brand', e.target.value)} />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="label">City / Location *</label>
                    <select className="input select" value={form.city} onChange={e => update('city', e.target.value)} style={errors.city ? { borderColor: '#ef4444' } : {}}>
                      <option value="">Select city...</option>
                      {['Rajkot', 'Ahmedabad', 'Surat', 'Vadodara', 'Junagadh', 'Anand', 'Bhavnagar', 'Gandhinagar'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    {errors.city && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.city}</span>}
                  </div>

                  <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
                    <label className="label">Description *</label>
                    <textarea className="input" rows={5} placeholder="Describe your product in detail — quantity, quality, storage conditions, reason for selling, any defects..." value={form.description} onChange={e => update('description', e.target.value)} style={{ resize: 'vertical', ...(errors.description ? { borderColor: '#ef4444' } : {}) }} />
                    {errors.description && <span style={{ color: '#ef4444', fontSize: '0.78rem' }}>{errors.description}</span>}
                    <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: 4 }}>{form.description.length} / 1000 characters</div>
                  </div>
                </div>
              </div>

              {/* Pricing preview */}
              {form.askingPrice && form.quantity && (
                <div style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderRadius: 14, padding: 24, border: '1px solid #bbf7d0', gridColumn: '1 / -1' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: '#15803d', marginBottom: 12 }}>Listing Preview Summary</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
                    {[
                      { label: 'Unit Price', value: `₹${Number(form.askingPrice).toLocaleString()}` },
                      { label: 'Total Qty', value: `${Number(form.quantity).toLocaleString()} ${form.unit}` },
                      { label: 'Total Value', value: `₹${(form.askingPrice * form.quantity).toLocaleString()}` },
                      discount > 0 ? { label: 'Your Discount', value: `${discount}% off MRP` } : null,
                    ].filter(Boolean).map(item => (
                      <div key={item.label} style={{ background: 'white', borderRadius: 8, padding: '10px 14px' }}>
                        <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{item.label}</div>
                        <div style={{ fontWeight: 700, color: '#15803d', fontSize: '1rem', marginTop: 2 }}>{item.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submit */}
              <div style={{ gridColumn: '1 / -1', display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '12px 36px' }}>
                  {isEdit ? <><Check size={16} /> Update Listing</> : <><Upload size={16} /> Publish Listing</>}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
      <Footer />
    </div>
  );
}
