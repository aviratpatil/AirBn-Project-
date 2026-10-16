import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { PropertyCard } from '../components/property/PropertyCard';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import {
  Calendar,
  Heart,
  User,
  MapPin,
  Clock,
  Trash2,
  Edit3,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Compass,
  Users,
  Phone,
  Mail,
  FileText,
  CreditCard,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

// Initials avatar — no photo
const Initials = ({ name, size = 'lg' }) => {
  const letters = (name || 'G').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  const sizeClass = size === 'lg' ? 'w-16 h-16 sm:w-20 sm:h-20 text-2xl' : 'w-10 h-10 text-sm';
  return (
    <div className={`${sizeClass} rounded-full bg-gradient-to-br from-brand-coral to-rose-500 text-white flex items-center justify-center font-black ring-4 ring-white shadow-md select-none`}>
      {letters}
    </div>
  );
};

export const GuestDashboardPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, bookings, cancelBooking, properties, wishlist, updateUserProfile } = useApp();

  // Route guard
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-black text-neutral-900 mb-2">Sign in to see your trips</h2>
          <p className="text-sm text-neutral-500 mb-6">Your bookings, wishlist and profile are private to your account.</p>
          <button onClick={() => navigate('/login')}
            className="px-6 py-3 rounded-xl bg-brand-coral text-white text-sm font-bold shadow-md hover:bg-brand-coral-dark transition-colors">
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (user.role === 'host') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">🏨</div>
          <h2 className="text-xl font-black text-neutral-900 mb-2">You're signed in as a Hotel Manager</h2>
          <p className="text-sm text-neutral-500 mb-6">Manage your properties from the Manager Dashboard.</p>
          <button onClick={() => navigate('/host')}
            className="px-6 py-3 rounded-xl bg-brand-coral text-white text-sm font-bold shadow-md hover:bg-brand-coral-dark transition-colors">
            Go to Manager Dashboard
          </button>
        </div>
      </div>
    );
  }

  const activeTab = searchParams.get('tab') || 'upcoming';
  const [cancelTargetId, setCancelTargetId] = useState(null);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [selectedIdPhoto, setSelectedIdPhoto] = useState(null);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || ''
      });
    }
  }, [user]);

  const upcomingBookings = bookings.filter((b) => b.status === 'confirmed');
  const pastBookings = bookings.filter((b) => b.status === 'completed' || b.status === 'cancelled');
  const savedProperties = properties.filter((p) => wishlist.includes(p.id));

  const handleProfileSubmit = (e) => { e.preventDefault(); updateUserProfile(profileForm); };
  const handleConfirmCancel = () => { if (cancelTargetId) { cancelBooking(cancelTargetId); setCancelTargetId(null); } };

  // ── Booking card component ──────────────────────────────────────────────
  const BookingCard = ({ booking, isPast }) => {
    const isExpanded = expandedBooking === booking.id;
    const guestDetails = booking.guestDetails || [];

    return (
      <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs overflow-hidden hover:shadow-md transition-shadow">
        {/* Main row */}
        <div className="p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <img
            src={booking.propertyImage}
            alt={booking.propertyTitle}
            className={`w-full sm:w-36 h-28 object-cover rounded-2xl shadow-xs shrink-0 ${isPast ? 'grayscale opacity-80' : ''}`}
          />
          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-mono font-bold bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">#{booking.id}</span>
              {isPast && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${booking.status === 'cancelled' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                  {booking.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                </span>
              )}
              {!isPast && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600">Confirmed</span>
              )}
            </div>
            <h3 className="font-bold text-base text-neutral-900 truncate">{booking.propertyTitle}</h3>
            <p className="text-xs text-neutral-500 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span className="truncate">{booking.propertyLocation}</span>
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-neutral-700 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-coral" />
                {booking.checkIn} → {booking.checkOut} · {booking.nights}n
              </span>
              {booking.checkInTime && (
                <span className="flex items-center gap-1 text-neutral-500">
                  <Clock className="w-3.5 h-3.5" />
                  In: {booking.checkInTime} / Out: {booking.checkOutTime}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-neutral-500" />
                {booking.guestCount || 1} guest{(booking.guestCount || 1) > 1 ? 's' : ''}
              </span>
            </div>
            <p className="text-xs font-black text-brand-coral">
              Total: {formatCurrency(booking.totalPrice)}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <Link to={`/booking/confirmation/${booking.id}`}
              className="px-3 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-black transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-xs">
              <FileText className="w-3.5 h-3.5" />
              <span>Bill / Receipt</span>
            </Link>
            <Link to={`/property/${booking.propertyId}`}
              className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-800 hover:bg-neutral-50 transition-colors whitespace-nowrap">
              View Stay
            </Link>
            {!isPast && (
              <button onClick={() => setCancelTargetId(booking.id)}
                className="px-3 py-2 rounded-xl border border-red-200 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap">
                Cancel
              </button>
            )}
            {isPast && booking.status === 'completed' && (
              <Link to={`/property/${booking.propertyId}`}
                className="px-3 py-2 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-600 hover:bg-neutral-50 transition-colors whitespace-nowrap">
                Book Again
              </Link>
            )}
            <button
              onClick={() => setExpandedBooking(isExpanded ? null : booking.id)}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-neutral-100 text-xs font-bold text-neutral-700 hover:bg-neutral-200 transition-colors"
            >
              {isExpanded ? <><ChevronUp className="w-3.5 h-3.5" /> Less</> : <><ChevronDown className="w-3.5 h-3.5" /> Details</>}
            </button>
          </div>
        </div>

        {/* Expanded guest details */}
        {isExpanded && (
          <div className="border-t border-neutral-100 bg-neutral-50/50 p-5 sm:p-6 space-y-5">
            {/* Stay summary */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Payment', value: booking.paymentMethod || 'Credit Card', icon: CreditCard },
                { label: 'Check-in Time', value: booking.checkInTime || '15:00', icon: Clock },
                { label: 'Check-out Time', value: booking.checkOutTime || '11:00', icon: Clock },
                { label: 'Host', value: booking.hostName, icon: User },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white rounded-xl p-3 border border-neutral-100">
                  <Icon className="w-3.5 h-3.5 text-brand-coral mb-1" />
                  <p className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold">{label}</p>
                  <p className="text-xs font-semibold text-neutral-800 mt-0.5 truncate">{value}</p>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            {booking.priceDetails && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Price Breakdown</p>
                <div className="bg-white rounded-2xl border border-neutral-100 overflow-hidden">
                  <table className="w-full text-xs">
                    <tbody className="divide-y divide-neutral-50">
                      {[
                        [`Room rate (${booking.nights} nights)`, booking.priceDetails.stayCost],
                        ['Cleaning fee', booking.priceDetails.cleaningFee],
                        ['Service fee', booking.priceDetails.serviceFee],
                        ['Taxes', booking.priceDetails.occupancyTaxes],
                      ].map(([label, val]) => (
                        <tr key={label}>
                          <td className="py-2.5 px-4 text-neutral-500">{label}</td>
                          <td className="py-2.5 px-4 font-semibold text-neutral-800 text-right">{formatCurrency(val || 0)}</td>
                        </tr>
                      ))}
                      <tr className="bg-neutral-900 text-white">
                        <td className="py-3 px-4 font-bold">Total</td>
                        <td className="py-3 px-4 font-black text-brand-coral text-right">{formatCurrency(booking.totalPrice)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Guest details */}
            {guestDetails.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Registered Guests
                </p>
                <div className="space-y-3">
                  {guestDetails.map((g, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-neutral-100 p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-coral to-rose-500 text-white flex items-center justify-center text-xs font-black">
                            {(g.fullName || 'G').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-xs font-bold text-neutral-800">
                              Guest {idx + 1} {idx === 0 && <span className="text-brand-coral">(Primary)</span>}
                            </p>
                            <p className="text-[10px] text-neutral-400 capitalize">{g.gender || 'Guest'} · Age: {g.age || '—'}</p>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ✓ Verified Guest
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2.5 text-xs">
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-0.5">Full Name</span>
                          <span className="font-semibold text-neutral-800">{g.fullName || '—'}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-0.5">Email</span>
                          <span className="font-semibold text-neutral-800 truncate block">{g.email || '—'}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-0.5">Phone</span>
                          <span className="font-semibold text-neutral-800">{g.phone || '—'}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-0.5">Check-in Time</span>
                          <span className="font-semibold text-neutral-800">{g.checkInTime || booking.checkInTime || '15:00'}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-0.5">Check-out Time</span>
                          <span className="font-semibold text-neutral-800">{g.checkOutTime || booking.checkOutTime || '11:00'}</span>
                        </div>
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-0.5">ID Type</span>
                          <span className="font-semibold text-neutral-800 capitalize">{(g.idProofType || 'Passport').replace('_', ' ')}</span>
                        </div>
                        {g.address && (
                          <div className="col-span-2 sm:col-span-3">
                            <span className="block text-[10px] uppercase tracking-wider text-neutral-400 mb-0.5">Address</span>
                            <span className="font-semibold text-neutral-800">{g.address}</span>
                          </div>
                        )}
                      </div>

                      {/* Photo ID Proof Image Preview */}
                      {(g.idProofPreview || g.idProofFileName) && (
                        <div className="mt-3 pt-3 border-t border-neutral-100 flex items-center justify-between gap-3 bg-neutral-50/70 p-2.5 rounded-xl">
                          <div className="flex items-center gap-3">
                            {g.idProofPreview ? (
                              <img
                                src={g.idProofPreview}
                                alt="Photo ID Proof"
                                onClick={() => setSelectedIdPhoto({ src: g.idProofPreview, name: g.fullName, type: g.idProofType })}
                                className="w-16 h-11 object-cover rounded-lg border border-neutral-200 cursor-pointer hover:opacity-90 shadow-2xs"
                              />
                            ) : (
                              <div className="w-16 h-11 bg-neutral-200 rounded-lg flex items-center justify-center text-[10px] font-bold text-neutral-500">
                                ID DOC
                              </div>
                            )}
                            <div>
                              <p className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Photo ID Proof Image</span>
                              </p>
                              <p className="text-[10px] text-neutral-500 font-mono">
                                {g.idProofFileName || `${(g.idProofType || 'Govt').toUpperCase()}_ID.png`}
                              </p>
                            </div>
                          </div>
                          {g.idProofPreview && (
                            <button
                              type="button"
                              onClick={() => setSelectedIdPhoto({ src: g.idProofPreview, name: g.fullName, type: g.idProofType })}
                              className="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white text-xs font-bold text-neutral-800 hover:bg-neutral-100 transition-colors"
                            >
                              View Photo ID
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Print bill link */}
            <div className="flex items-center justify-end">
              <Link to={`/booking/confirmation/${booking.id}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-black transition-colors">
                <FileText className="w-3.5 h-3.5" />
                View / Print Full Bill
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* User Greeting — no profile pic */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <Initials name={user?.name} size="lg" />
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                Welcome back, {user?.name || 'Guest'}!
              </h1>
              <p className="text-xs text-neutral-500 mt-1">
                Member since {user?.joinedDate || '2026'} · {user?.location || 'Traveler'}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Account</span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-center border-t md:border-t-0 md:border-l border-neutral-200 pt-4 md:pt-0 md:pl-8 w-full md:w-auto justify-around">
            <div>
              <p className="text-2xl font-black text-neutral-900">{upcomingBookings.length}</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Upcoming Stays</p>
            </div>
            <div>
              <p className="text-2xl font-black text-neutral-900">{pastBookings.length}</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Past Trips</p>
            </div>
            <div>
              <p className="text-2xl font-black text-brand-coral">{savedProperties.length}</p>
              <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">Saved Homes</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-neutral-200 gap-6 mb-8 overflow-x-auto no-scrollbar">
          {[
            { id: 'upcoming', label: `Upcoming (${upcomingBookings.length})`, icon: Calendar },
            { id: 'past', label: `History (${pastBookings.length})`, icon: Clock },
            { id: 'saved', label: `Saved (${savedProperties.length})`, icon: Heart },
            { id: 'profile', label: 'My Profile', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => setSearchParams({ tab: tab.id })}
                className={`flex items-center gap-2 pb-3.5 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${
                  isSelected ? 'border-neutral-900 text-neutral-900' : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-300'
                }`}>
                <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-coral' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Upcoming */}
        {activeTab === 'upcoming' && (
          <div>
            {upcomingBookings.length === 0 ? (
              <EmptyState icon={Calendar} title="No upcoming trips planned yet"
                description="Time to book an unforgettable stay in the mountains, beaches, or historic cities."
                actionLabel="Explore available homes" onAction={() => (window.location.href = '/')} />
            ) : (
              <div className="space-y-6">
                {upcomingBookings.map((b) => <BookingCard key={b.id} booking={b} isPast={false} />)}
              </div>
            )}
          </div>
        )}

        {/* Past / History */}
        {activeTab === 'past' && (
          <div>
            {pastBookings.length === 0 ? (
              <EmptyState icon={Clock} title="No past trips recorded"
                description="Completed and cancelled stays will appear here with all travel details." />
            ) : (
              <div className="space-y-6">
                {pastBookings.map((b) => <BookingCard key={b.id} booking={b} isPast={true} />)}
              </div>
            )}
          </div>
        )}

        {/* Saved Wishlist */}
        {activeTab === 'saved' && (
          <div>
            {savedProperties.length === 0 ? (
              <EmptyState icon={Heart} title="Your wishlist is empty"
                description="Tap the heart icon on any property to save your favorites."
                actionLabel="Discover places to save" onAction={() => (window.location.href = '/')} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {savedProperties.map((prop) => <PropertyCard key={prop.id} property={prop} />)}
              </div>
            )}
          </div>
        )}

        {/* Profile */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs">
            <div className="flex items-center gap-4 mb-6">
              <Initials name={user?.name} size="lg" />
              <div>
                <h2 className="text-xl font-bold text-neutral-900">{user?.name}</h2>
                <p className="text-xs text-neutral-500">{user?.email}</p>
              </div>
            </div>
            <h3 className="text-base font-bold text-neutral-900 mb-1">Profile Information</h3>
            <p className="text-xs text-neutral-500 mb-6">Update your account details below.</p>

            <form onSubmit={handleProfileSubmit} className="space-y-4" autoComplete="off">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">Full Name</label>
                <input type="text" required autoComplete="off" value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">Email</label>
                  <input type="email" required autoComplete="off" value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">Phone</label>
                  <input type="tel" autoComplete="off" value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">Location</label>
                <input type="text" autoComplete="off" value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">Bio</label>
                <textarea rows={3} autoComplete="off" value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full border border-neutral-300 rounded-xl p-3 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral resize-none" />
              </div>
              <div className="pt-4 flex justify-end">
                <button type="submit" className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold shadow-md active:scale-95 transition-all">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Cancel Modal */}
      <Modal isOpen={Boolean(cancelTargetId)} onClose={() => setCancelTargetId(null)} title="Cancel Reservation?" maxWidth="max-w-md">
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-red-50 text-red-800 rounded-2xl">
            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed">
              Are you sure you want to cancel this reservation? Your simulated payment will be refunded immediately.
            </p>
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setCancelTargetId(null)}
              className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-50">
              Keep Reservation
            </button>
            <button onClick={handleConfirmCancel}
              className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md active:scale-95">
              Yes, Cancel Stay
            </button>
          </div>
        </div>
      </Modal>

      {/* Photo ID Full-Size Preview Modal */}
      <Modal
        isOpen={Boolean(selectedIdPhoto)}
        onClose={() => setSelectedIdPhoto(null)}
        title={selectedIdPhoto ? `Photo ID Proof — ${selectedIdPhoto.name || 'Guest'}` : 'Photo ID Proof'}
        maxWidth="max-w-xl"
      >
        {selectedIdPhoto && (
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden border border-neutral-200 bg-neutral-900 flex items-center justify-center p-2">
              <img
                src={selectedIdPhoto.src}
                alt="Full ID Proof"
                className="max-h-[380px] w-auto object-contain rounded-xl"
              />
            </div>
            <div className="flex items-center justify-between text-xs text-neutral-600 bg-neutral-50 p-3 rounded-xl">
              <div>
                <p className="font-bold text-neutral-900">{selectedIdPhoto.name}</p>
                <p className="text-[11px] text-neutral-500 capitalize">{(selectedIdPhoto.type || 'Government ID').replace('_', ' ')} · Verified Identity</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedIdPhoto(null)}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-bold hover:bg-black transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
