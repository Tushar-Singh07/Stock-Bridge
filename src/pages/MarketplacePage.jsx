import { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, SortAsc, Grid3X3, List, Package, SlidersHorizontal } from 'lucide-react';
import { listings } from '../data/listings';
import { businesses } from '../data/businesses';
import ListingCard from '../components/ListingCard';
import FilterSidebar from '../components/FilterSidebar';
import Footer from '../components/Footer';

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'discount', label: 'Highest Discount' },
  { value: 'qty-desc', label: 'Most Quantity' },
];

export default function MarketplacePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const [searchQ, setSearchQ] = useState(params.get('q') || '');
  const [sort, setSort] = useState('newest');
  const [filters, setFilters] = useState({
    category: params.get('category') || 'All Categories',
    condition: [],
    minPrice: '',
    maxPrice: '',
    minQty: '',
    city: '',
  });

  const filteredListings = useMemo(() => {
    let result = [...listings];

    // Search
    if (searchQ.trim()) {
      const q = searchQ.toLowerCase();
      result = result.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Category
    if (filters.category && filters.category !== 'All Categories') {
      result = result.filter(l => l.category === filters.category);
    }

    // Condition
    if (filters.condition.length > 0) {
      result = result.filter(l => filters.condition.includes(l.condition));
    }

    // Price
    if (filters.minPrice) result = result.filter(l => l.askingPrice >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter(l => l.askingPrice <= Number(filters.maxPrice));

    // Min qty
    if (filters.minQty) result = result.filter(l => l.quantity >= Number(filters.minQty));

    // City
    if (filters.city) {
      result = result.filter(l => {
        const seller = businesses.find(b => b.id === l.sellerId);
        return seller?.city === filters.city;
      });
    }

    // Sort
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.askingPrice - b.askingPrice); break;
      case 'price-desc': result.sort((a, b) => b.askingPrice - a.askingPrice); break;
      case 'discount': result.sort((a, b) => ((b.mrp - b.askingPrice) / b.mrp) - ((a.mrp - a.askingPrice) / a.mrp)); break;
      case 'qty-desc': result.sort((a, b) => b.quantity - a.quantity); break;
      case 'newest': result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate)); break;
    }

    return result;
  }, [searchQ, filters, sort]);

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      {/* Page header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '24px 24px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a', marginBottom: 16 }}>
            Browse Surplus Inventory
          </h1>

          {/* Search + Sort row */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
              <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Search listings, categories, keywords..."
                className="input"
                style={{ paddingLeft: 40 }}
              />
            </div>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="input select"
              style={{ width: 'auto', minWidth: 180 }}
            >
              {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <button
              className="btn-secondary btn-sm"
              onClick={() => setShowMobileFilter(!showMobileFilter)}
              style={{ display: 'none' }}
              id="mobile-filter-btn"
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px', display: 'flex', gap: 28, alignItems: 'flex-start' }}>
        {/* Sidebar */}
        <div style={{ width: 260, flexShrink: 0 }} className="filter-sidebar-wrap">
          <FilterSidebar filters={filters} onChange={setFilters} />
        </div>

        {/* Listings grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Results count */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: 500 }}>
              {filteredListings.length === 0 ? 'No listings found' : `Showing ${filteredListings.length} listing${filteredListings.length !== 1 ? 's' : ''}`}
            </span>
            {filters.category !== 'All Categories' && (
              <span style={{ background: '#eff6ff', color: '#2563eb', padding: '4px 12px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600 }}>
                {filters.category}
              </span>
            )}
          </div>

          {filteredListings.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 24px', background: 'white', borderRadius: 14, border: '1px solid #e2e8f0' }}>
              <Package size={48} color="#cbd5e1" style={{ marginBottom: 16 }} />
              <h3 style={{ fontWeight: 700, color: '#374151', marginBottom: 8 }}>No listings found</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 20 }}>
              {filteredListings.map(listing => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .filter-sidebar-wrap { display: none; }
          #mobile-filter-btn { display: flex !important; }
        }
      `}</style>
      <Footer />
    </div>
  );
}
