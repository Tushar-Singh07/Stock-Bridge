import { Link } from 'react-router-dom';
import { MapPin, Package, Tag, TrendingDown, Heart } from 'lucide-react';
import { formatPrice, getConditionBadgeClass, getDiscount } from '../utils/helpers';
import { businesses } from '../data/businesses';
import { useState } from 'react';

export default function ListingCard({ listing, onSave, saved = false }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(saved);
  const seller = businesses.find(b => b.id === listing.sellerId);
  const discount = getDiscount(listing.askingPrice, listing.mrp);

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    onSave && onSave(listing.id, !isSaved);
  };

  return (
    <Link to={`/listing/${listing.id}`} style={{ textDecoration: 'none' }}>
      <div
        style={{
          background: 'white',
          borderRadius: 14,
          overflow: 'hidden',
          border: '1px solid #e2e8f0',
          boxShadow: isHovered ? '0 8px 24px rgba(0,0,0,0.12)' : '0 1px 4px rgba(0,0,0,0.06)',
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.25s ease',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden', height: 180 }}>
          <img
            src={listing.images[0]}
            alt={listing.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}
            loading="lazy"
          />
          {/* Discount badge */}
          {discount > 0 && (
            <div style={{
              position: 'absolute', top: 10, left: 10,
              background: '#16a34a', color: 'white',
              padding: '3px 10px', borderRadius: 20,
              fontSize: '0.72rem', fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              <TrendingDown size={11} />
              {discount}% OFF
            </div>
          )}
          {/* Condition */}
          <div style={{ position: 'absolute', top: 10, right: 10 }}>
            <span className={getConditionBadgeClass(listing.condition)} style={{ fontSize: '0.7rem' }}>
              {listing.condition}
            </span>
          </div>
          {/* Save */}
          <button
            onClick={handleSave}
            style={{
              position: 'absolute', bottom: 10, right: 10,
              background: 'rgba(255,255,255,0.92)', border: 'none', cursor: 'pointer',
              borderRadius: '50%', width: 34, height: 34,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              transition: 'all 0.2s',
            }}
          >
            <Heart size={16} fill={isSaved ? '#ef4444' : 'none'} color={isSaved ? '#ef4444' : '#64748b'} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
            <span style={{ fontSize: '0.72rem', color: '#2563eb', fontWeight: 600, background: '#eff6ff', padding: '2px 8px', borderRadius: 12 }}>
              {listing.category}
            </span>
          </div>

          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: 10, lineHeight: 1.4, flex: 1 }}>
            {listing.title}
          </h3>

          {/* Price */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16a34a' }}>
                {formatPrice(listing.askingPrice)}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                {formatPrice(listing.mrp)}
              </span>
            </div>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>{listing.priceUnit}</span>
          </div>

          {/* Meta */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#64748b' }}>
              <Package size={12} />
              <span>Qty: <strong>{listing.quantity.toLocaleString()} {listing.unit}</strong></span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span>Min: {listing.minOrderQty}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: '#64748b' }}>
              <MapPin size={12} />
              <span>{seller?.city}, {seller?.state}</span>
              {seller?.verified && (
                <span style={{ marginLeft: 4, background: '#dcfce7', color: '#16a34a', fontSize: '0.65rem', padding: '1px 6px', borderRadius: 10, fontWeight: 600 }}>
                  ✓ Verified
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
