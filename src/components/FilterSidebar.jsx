import { useState } from 'react';
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from 'lucide-react';
import { CATEGORIES, CONDITIONS } from '../data/listings';

export default function FilterSidebar({ filters, onChange }) {
  const [expanded, setExpanded] = useState({
    category: true, condition: true, price: true, quantity: true, city: true,
  });

  const toggle = (key) => setExpanded(p => ({ ...p, [key]: !p[key] }));

  const Section = ({ id, label, children }) => (
    <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: 16, marginBottom: 16 }}>
      <button
        onClick={() => toggle(id)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 10px', fontWeight: 700, fontSize: '0.85rem', color: '#1e3a5f' }}
      >
        {label}
        {expanded[id] ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
      </button>
      {expanded[id] && children}
    </div>
  );

  const hasActiveFilters = filters.category !== 'All Categories' || filters.condition.length > 0 ||
    filters.minPrice || filters.maxPrice || filters.minQty || filters.city;

  return (
    <div style={{ background: 'white', borderRadius: 14, border: '1px solid #e2e8f0', padding: 20, position: 'sticky', top: 84 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <SlidersHorizontal size={16} color="#2563eb" />
          <span style={{ fontWeight: 700, color: '#1e3a5f', fontSize: '0.95rem' }}>Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={() => onChange({
              category: 'All Categories', condition: [], minPrice: '', maxPrice: '', minQty: '', city: '',
            })}
            style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 600, background: '#fee2e2', border: 'none', cursor: 'pointer', padding: '3px 10px', borderRadius: 8 }}
          >
            Clear All
          </button>
        )}
      </div>

      {/* Category */}
      <Section id="category" label="Category">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CATEGORIES.map(cat => (
            <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input
                type="radio"
                name="category"
                checked={filters.category === cat}
                onChange={() => onChange({ ...filters, category: cat })}
                style={{ accentColor: '#2563eb', width: 15, height: 15 }}
              />
              <span style={{ fontSize: '0.85rem', color: filters.category === cat ? '#2563eb' : '#374151', fontWeight: filters.category === cat ? 600 : 400 }}>{cat}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Condition */}
      <Section id="condition" label="Condition">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CONDITIONS.map(cond => (
            <label key={cond} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={filters.condition.includes(cond)}
                onChange={e => {
                  const newConds = e.target.checked
                    ? [...filters.condition, cond]
                    : filters.condition.filter(c => c !== cond);
                  onChange({ ...filters, condition: newConds });
                }}
                style={{ accentColor: '#2563eb', width: 15, height: 15 }}
              />
              <span style={{ fontSize: '0.85rem', color: '#374151' }}>{cond}</span>
            </label>
          ))}
        </div>
      </Section>

      {/* Price range */}
      <Section id="price" label="Price Range (₹)">
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={e => onChange({ ...filters, minPrice: e.target.value })}
            className="input"
            style={{ padding: '8px 10px', fontSize: '0.82rem' }}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={e => onChange({ ...filters, maxPrice: e.target.value })}
            className="input"
            style={{ padding: '8px 10px', fontSize: '0.82rem' }}
          />
        </div>
      </Section>

      {/* Min quantity */}
      <Section id="quantity" label="Min. Quantity">
        <input
          type="number"
          placeholder="e.g. 100"
          value={filters.minQty}
          onChange={e => onChange({ ...filters, minQty: e.target.value })}
          className="input"
          style={{ padding: '8px 10px', fontSize: '0.82rem' }}
        />
      </Section>

      {/* City */}
      <Section id="city" label="City / Location">
        <select
          value={filters.city}
          onChange={e => onChange({ ...filters, city: e.target.value })}
          className="input select"
          style={{ padding: '8px 10px', fontSize: '0.82rem' }}
        >
          <option value="">All Cities</option>
          {['Rajkot', 'Ahmedabad', 'Surat', 'Vadodara', 'Junagadh', 'Anand', 'Bhavnagar', 'Gandhinagar'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </Section>
    </div>
  );
}
