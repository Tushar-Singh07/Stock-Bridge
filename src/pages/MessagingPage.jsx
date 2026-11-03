import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Search, ArrowLeft, MoreVertical, Phone, CheckCheck, Package, Shield } from 'lucide-react';
import { businesses } from '../data/businesses';
import { requests, messages as allMessages } from '../data/requests';
import { listings } from '../data/listings';
import { formatDateTime, timeAgo } from '../utils/helpers';

// Conversations derived from requests with messages
const conversations = [
  { reqId: 'r1', buyerId: 'b2', sellerId: 'b1', listingId: 'l5' },
  { reqId: 'r2', buyerId: 'b3', sellerId: 'b1', listingId: 'l11' },
  { reqId: 'r6', buyerId: 'b7', sellerId: 'b2', listingId: 'l2' },
];

const currentUserId = 'b1';

export default function MessagingPage() {
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState(allMessages);
  const messagesEndRef = useRef(null);

  const currentMessages = localMessages[selectedConv?.reqId] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages.length, selectedConv]);

  const getOtherParty = (conv) => {
    const otherId = conv.sellerId === currentUserId ? conv.buyerId : conv.sellerId;
    return businesses.find(b => b.id === otherId);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const msg = {
      id: `msg_${Date.now()}`,
      senderId: currentUserId,
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setLocalMessages(prev => ({
      ...prev,
      [selectedConv.reqId]: [...(prev[selectedConv.reqId] || []), msg],
    }));
    setNewMessage('');
  };

  return (
    <div style={{ height: 'calc(100vh - 64px)', display: 'flex', background: '#f8fafc', overflow: 'hidden' }}>
      {/* Conversations sidebar */}
      <div style={{ width: 320, background: 'white', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {/* Header */}
        <div style={{ padding: '20px 16px', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a', marginBottom: 12 }}>Messages</h2>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="#94a3b8" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
            <input type="text" placeholder="Search conversations..." className="input" style={{ paddingLeft: 32, fontSize: '0.82rem', padding: '8px 8px 8px 32px' }} />
          </div>
        </div>

        {/* Conversation list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {conversations.map(conv => {
            const other = getOtherParty(conv);
            const listing = listings.find(l => l.id === conv.listingId);
            const convMessages = localMessages[conv.reqId] || [];
            const lastMsg = convMessages[convMessages.length - 1];
            const isSelected = selectedConv?.reqId === conv.reqId;
            const req = requests.find(r => r.id === conv.reqId);

            return (
              <div
                key={conv.reqId}
                onClick={() => setSelectedConv(conv)}
                style={{
                  display: 'flex', gap: 12, padding: '14px 16px', cursor: 'pointer',
                  background: isSelected ? '#eff6ff' : 'transparent',
                  borderLeft: isSelected ? '3px solid #2563eb' : '3px solid transparent',
                  borderBottom: '1px solid #f1f5f9',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={other?.logo} alt="" style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 12, height: 12, borderRadius: '50%', background: '#22c55e', border: '2px solid white' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {other?.name?.split(' ').slice(0, 2).join(' ')}
                    </span>
                    {lastMsg && <span style={{ fontSize: '0.7rem', color: '#94a3b8', flexShrink: 0 }}>{timeAgo(lastMsg.timestamp)}</span>}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 3 }}>
                    Re: {listing?.title?.split(' ').slice(0, 4).join(' ')}...
                  </div>
                  {lastMsg && (
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lastMsg.senderId === currentUserId ? 'You: ' : ''}{lastMsg.text}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chat area */}
      {selectedConv ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Chat header */}
          {(() => {
            const other = getOtherParty(selectedConv);
            const listing = listings.find(l => l.id === selectedConv.listingId);
            const req = requests.find(r => r.id === selectedConv.reqId);
            return (
              <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                <img src={other?.logo} alt="" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8 }}>
                    {other?.name}
                    {other?.verified && <Shield size={13} color="#16a34a" />}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                    Re: <strong>{listing?.title?.substring(0, 45)}...</strong>
                    {req && <span style={{ marginLeft: 8, background: '#f0fdf4', color: '#16a34a', padding: '1px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 600 }}>{req.status}</span>}
                  </div>
                </div>
                <Link to={`/listing/${listing?.id}`} style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#2563eb', fontSize: '0.8rem', fontWeight: 600, textDecoration: 'none', background: '#eff6ff', padding: '6px 12px', borderRadius: 8 }}>
                  <Package size={13} /> View Listing
                </Link>
              </div>
            );
          })()}

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, background: '#f8fafc' }}>
            {/* Date separator */}
            <div style={{ textAlign: 'center' }}>
              <span style={{ background: '#e2e8f0', color: '#64748b', fontSize: '0.72rem', padding: '3px 12px', borderRadius: 12, fontWeight: 500 }}>Oct 10, 2026</span>
            </div>

            {currentMessages.map(msg => {
              const isMine = msg.senderId === currentUserId;
              const sender = businesses.find(b => b.id === msg.senderId);
              return (
                <div key={msg.id} style={{ display: 'flex', flexDirection: 'column', alignItems: isMine ? 'flex-end' : 'flex-start' }}>
                  {!isMine && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <img src={sender?.logo} alt="" style={{ width: 20, height: 20, borderRadius: '50%', objectFit: 'cover' }} />
                      <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>{sender?.name?.split(' ')[0]}</span>
                    </div>
                  )}
                  <div className={isMine ? 'chat-bubble-sent' : 'chat-bubble-received'} style={{ maxWidth: '70%' }}>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.5, margin: 0 }}>{msg.text}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{timeAgo(msg.timestamp)}</span>
                    {isMine && <CheckCheck size={12} color="#60a5fa" />}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} style={{ background: 'white', borderTop: '1px solid #e2e8f0', padding: '14px 20px', display: 'flex', gap: 12, alignItems: 'center' }}>
            <input
              type="text"
              value={newMessage}
              onChange={e => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="input"
              style={{ flex: 1 }}
              autoFocus
            />
            <button type="submit" className="btn-primary" style={{ padding: '10px 16px', flexShrink: 0 }} disabled={!newMessage.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      ) : (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8' }}>
          Select a conversation
        </div>
      )}
    </div>
  );
}
