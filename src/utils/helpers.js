// Utility functions

export function formatPrice(price) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceCompact(price) {
  if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`;
  if (price >= 100000) return `₹${(price / 100000).toFixed(1)} L`;
  if (price >= 1000) return `₹${(price / 1000).toFixed(1)}K`;
  return `₹${price}`;
}

export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatDateTime(dateStr) {
  return new Date(dateStr).toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function timeAgo(dateStr) {
  const now = new Date();
  const then = new Date(dateStr);
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function getConditionBadgeClass(condition) {
  switch (condition) {
    case 'New': return 'badge badge-new';
    case 'Like New': return 'badge badge-likenew';
    case 'Used': return 'badge badge-used';
    default: return 'badge';
  }
}

export function getStatusClass(status) {
  switch (status) {
    case 'Pending': return 'badge status-pending';
    case 'Accepted': return 'badge status-accepted';
    case 'Rejected': return 'badge status-rejected';
    case 'Completed': return 'badge status-completed';
    default: return 'badge';
  }
}

export function getDiscount(askingPrice, mrp) {
  return Math.round(((mrp - askingPrice) / mrp) * 100);
}

export function computeMatchScore(listing, buyer) {
  let score = 0;
  const reasons = [];

  // Category match
  if (buyer.category && listing.category && 
      (buyer.category.toLowerCase().includes(listing.category.toLowerCase()) ||
       listing.category.toLowerCase().includes(buyer.category.toLowerCase()))) {
    score += 35;
    reasons.push('Category match');
  } else {
    score += 10;
  }

  // Location proximity (simple city-based)
  const distanceMap = {
    'Rajkot-Rajkot': 0, 'Ahmedabad-Ahmedabad': 0,
    'Rajkot-Ahmedabad': 216, 'Ahmedabad-Rajkot': 216,
    'Surat-Ahmedabad': 265, 'Ahmedabad-Surat': 265,
    'Vadodara-Ahmedabad': 110, 'Ahmedabad-Vadodara': 110,
    'Gandhinagar-Ahmedabad': 28, 'Ahmedabad-Gandhinagar': 28,
    'Anand-Ahmedabad': 82, 'Ahmedabad-Anand': 82,
    'Junagadh-Rajkot': 100, 'Rajkot-Junagadh': 100,
    'Bhavnagar-Rajkot': 190, 'Rajkot-Bhavnagar': 190,
  };
  const key = `${buyer.city}-${listing.city}`;
  const dist = distanceMap[key] ?? 300;
  if (dist < 100) { score += 30; reasons.push('Very nearby (<100km)'); }
  else if (dist < 250) { score += 20; reasons.push('Within 250km'); }
  else { score += 5; }

  // Buyer has past purchases (mock)
  if (buyer.totalSales > 50) { score += 20; reasons.push('Active buyer (50+ transactions)'); }
  else if (buyer.totalSales > 20) { score += 12; reasons.push('Moderate buyer activity'); }
  else { score += 5; }

  // Verified badge
  if (buyer.verified) { score += 15; reasons.push('GST-verified business'); }
  else { score += 5; }

  return { score: Math.min(score, 100), reasons };
}
