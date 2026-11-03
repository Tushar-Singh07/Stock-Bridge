import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import MarketplacePage from './pages/MarketplacePage';
import ListingDetailPage from './pages/ListingDetailPage';
import SellerDashboard from './pages/SellerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import AddEditListing from './pages/AddEditListing';
import BusinessProfile from './pages/BusinessProfile';
import MessagingPage from './pages/MessagingPage';

export default function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/listing/:id" element={<ListingDetailPage />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
            <Route path="/add-listing" element={<AddEditListing />} />
            <Route path="/edit-listing/:id" element={<AddEditListing />} />
            <Route path="/profile/:id" element={<BusinessProfile />} />
            <Route path="/messages" element={<MessagingPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
