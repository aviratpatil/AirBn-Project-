import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { Modal } from '../components/common/Modal';
import { CATEGORIES } from '../data/categories';
import {
  Building2,
  DollarSign,
  Star,
  Users,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Upload,
  Calendar,
  CheckCircle,
  XCircle,
  TrendingUp,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Mail,
  Phone,
  Clock,
  FileText,
  User as UserIcon
} from 'lucide-react';

export const HostDashboardPage = () => {
  const navigate = useNavigate();
  const {
    user,
    hostProperties,
    hostBookings,
    addProperty,
    updateProperty,
    deleteProperty,
    cancelBooking,
    showToast
  } = useApp();

  // ── Route Guard ────────────────────────────────────────────────────────
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-xl font-black text-neutral-900 mb-2">Sign in required</h2>
          <p className="text-sm text-neutral-500 mb-6">Please sign in to access your manager dashboard.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 rounded-xl bg-brand-coral text-white text-sm font-bold shadow-md hover:bg-brand-coral-dark transition-colors"
          >
            Go to Sign In
          </button>
        </div>
      </div>
    );
  }

  if (user.role !== 'host') {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">🏠</div>
          <h2 className="text-xl font-black text-neutral-900 mb-2">Manager access only</h2>
          <p className="text-sm text-neutral-500 mb-6">This dashboard is for hotel managers. Guests can browse properties and manage their bookings from their personal dashboard.</p>
          <button
            onClick={() => navigate('/trips')}
            className="px-6 py-3 rounded-xl bg-brand-coral text-white text-sm font-bold shadow-md hover:bg-brand-coral-dark transition-colors"
          >
            Go to My Trips
          </button>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState('listings'); // 'listings' | 'reservations' | 'earnings'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [expandedBooking, setExpandedBooking] = useState(null);
  const [selectedIdPhoto, setSelectedIdPhoto] = useState(null);

  // New / Edit Listing form state
  const [listingForm, setListingForm] = useState({
    title: '',
    category: 'amazing-views',
    propertyType: 'Entire villa',
    city: '',
    country: '',
    location: '',
    price: 350,
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    description: '',
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    localImagePreview: null,
    amenities: ['Fast Wifi', 'Pool', 'Air conditioning', 'Kitchen']
  });

  const handleOpenCreateModal = () => {
    setEditingPropertyId(null);
    setListingForm({
      title: '',
      category: 'amazing-views',
      propertyType: 'Entire luxury villa',
      city: 'Positano',
      country: 'Italy',
      location: 'Positano, Amalfi Coast, Italy',
      price: 380,
      guests: 6,
      bedrooms: 3,
      bathrooms: 2.5,
      description: 'A breathtaking sanctuary with panoramic coastal vistas, sunlit terraces, and modern amenities.',
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
      localImagePreview: null,
      amenities: ['Fast Wifi', 'Pool', 'Air conditioning', 'Kitchen', 'Free parking']
    });
    setIsCreateModalOpen(true);
  };

  const handleOpenEditModal = (prop) => {
    setEditingPropertyId(prop.id);
    setListingForm({
      title: prop.title,
      category: prop.category || 'amazing-views',
      propertyType: prop.propertyType || 'Entire villa',
      city: prop.city || '',
      country: prop.country || '',
      location: prop.location || '',
      price: prop.price || 300,
      guests: prop.capacity?.guests || 4,
      bedrooms: prop.capacity?.bedrooms || 2,
      bathrooms: prop.capacity?.bathrooms || 2,
      description: prop.description || '',
      imageUrl: prop.images?.[0] || '',
      localImagePreview: null,
      amenities: prop.amenities || ['Fast Wifi']
    });
    setIsCreateModalOpen(true);
  };

  const handleLocalImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setListingForm((prev) => ({
        ...prev,
        localImagePreview: previewUrl,
        imageUrl: previewUrl
      }));
      showToast('Local image selected and previewed!', 'info');
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const finalImage = listingForm.localImagePreview || listingForm.imageUrl;

    if (editingPropertyId) {
      updateProperty(editingPropertyId, {
        title: listingForm.title,
        category: listingForm.category,
        propertyType: listingForm.propertyType,
        city: listingForm.city,
        country: listingForm.country,
        location: listingForm.location,
        price: Number(listingForm.price),
        capacity: {
          guests: Number(listingForm.guests),
          bedrooms: Number(listingForm.bedrooms),
          beds: Number(listingForm.bedrooms),
          bathrooms: Number(listingForm.bathrooms)
        },
        description: listingForm.description,
        amenities: listingForm.amenities,
        images: [finalImage, ...(hostProperties.find((p) => p.id === editingPropertyId)?.images?.slice(1) || [])]
      });
    } else {
      addProperty({
        title: listingForm.title,
        category: listingForm.category,
        propertyType: listingForm.propertyType,
        city: listingForm.city,
        country: listingForm.country,
        location: listingForm.location,
        distance: 'Direct mountain / sea views',
        datesAvailable: 'Available year-round',
        price: Number(listingForm.price),
        capacity: {
          guests: Number(listingForm.guests),
          bedrooms: Number(listingForm.bedrooms),
          beds: Number(listingForm.bedrooms),
          bathrooms: Number(listingForm.bathrooms)
        },
        description: listingForm.description,
        amenities: listingForm.amenities,
        cleaningFee: 120,
        serviceFeePercent: 0.12,
        images: [
          finalImage,
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
        ]
      });
    }

    setIsCreateModalOpen(false);
  };

  const toggleFormAmenity = (name) => {
    setListingForm((prev) => {
      const exists = prev.amenities.includes(name);
      return {
        ...prev,
        amenities: exists
          ? prev.amenities.filter((a) => a !== name)
          : [...prev.amenities, name]
      };
    });
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & New Listing CTA */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Host Dashboard
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              Manage your property listings, review reservations, and analyze host earnings.
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-brand-coral to-rose-600 hover:from-brand-coral-dark hover:to-rose-700 text-white font-bold text-xs shadow-md hover:shadow-lg transition-all active:scale-95 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Listing</span>
          </button>
        </div>

        {/* Host Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xs">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider">30-Day Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <p className="text-2xl font-black text-neutral-900">$14,820</p>
            <p className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% from last month</span>
            </p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xs">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider">Active Listings</span>
              <Building2 className="w-4 h-4 text-brand-coral" />
            </div>
            <p className="text-2xl font-black text-neutral-900">{hostProperties.length}</p>
            <p className="text-[11px] font-medium text-neutral-500 mt-1">All in active booking status</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xs">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider">Occupancy Rate</span>
              <Calendar className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-2xl font-black text-neutral-900">92%</p>
            <p className="text-[11px] font-semibold text-emerald-600 mt-1">+4.2% above market average</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-neutral-200 shadow-xs">
            <div className="flex items-center justify-between text-neutral-400 mb-2">
              <span className="text-[10px] font-bold uppercase tracking-wider">Average Rating</span>
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-neutral-900">4.98 ★</p>
            <p className="text-[11px] font-medium text-neutral-500 mt-1">Superhost certified</p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-neutral-200 gap-8 mb-8">
          {[
            { id: 'listings', label: `Manage Listings (${hostProperties.length})`, icon: Building2 },
            { id: 'reservations', label: `Guest Reservations (${hostBookings.length})`, icon: Calendar },
            { id: 'earnings', label: 'Sample Earnings', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 pb-3.5 text-sm font-bold border-b-2 transition-all ${
                  isSelected
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-brand-coral' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Manage Listings */}
        {activeTab === 'listings' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-neutral-50 border-b border-neutral-200 uppercase font-bold text-neutral-400 text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-6">Listing</th>
                      <th className="py-3 px-6">Status</th>
                      <th className="py-3 px-6">Nightly Rate</th>
                      <th className="py-3 px-6">Rating</th>
                      <th className="py-3 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {hostProperties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-neutral-50/70 transition-colors">
                        <td className="py-4 px-6 flex items-center gap-3">
                          <img
                            src={prop.images?.[0]}
                            alt={prop.title}
                            className="w-14 h-12 object-cover rounded-xl shadow-xs shrink-0"
                          />
                          <div>
                            <Link
                              to={`/property/${prop.id}`}
                              className="font-bold text-neutral-900 hover:underline hover:text-brand-coral truncate block max-w-xs"
                            >
                              {prop.title}
                            </Link>
                            <span className="text-[11px] text-neutral-400">{prop.location}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            <span>Active</span>
                          </span>
                        </td>
                        <td className="py-4 px-6 font-bold text-neutral-900">
                          {formatCurrency(prop.price)}
                        </td>
                        <td className="py-4 px-6 font-semibold text-neutral-700">
                          {prop.rating ? `${prop.rating.toFixed(2)} ★` : '5.0 ★'} ({prop.reviewCount || 0})
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => handleOpenEditModal(prop)}
                            className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-100 transition-colors"
                            title="Edit Listing"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <Link
                            to={`/property/${prop.id}`}
                            className="p-1.5 rounded-lg border border-neutral-200 text-neutral-600 hover:bg-neutral-100 inline-block transition-colors"
                            title="Preview Listing"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => deleteProperty(prop.id)}
                            className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                            title="Delete Listing"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Reservations */}
        {activeTab === 'reservations' && (
          <div className="space-y-4">
            <div className="bg-white rounded-3xl border border-neutral-200 shadow-xs overflow-hidden">
              {hostBookings.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
                    <Calendar className="w-8 h-8" />
                  </div>
                  <h3 className="text-base font-bold text-neutral-900 mb-1">No Guest Reservations Yet</h3>
                  <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                    When guests book stays at your hotels, their full reservation details, registered guest information, check-in times, and photo IDs will appear here.
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-50 border-b border-neutral-200 uppercase font-bold text-neutral-400 text-[10px] tracking-wider">
                      <tr>
                        <th className="py-3 px-6">Reservation</th>
                        <th className="py-3 px-6">Primary Guest</th>
                        <th className="py-3 px-6">Dates &amp; Times</th>
                        <th className="py-3 px-6">Guests</th>
                        <th className="py-3 px-6">Status</th>
                        <th className="py-3 px-6">Payout</th>
                        <th className="py-3 px-6 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {hostBookings.map((b) => {
                        const isExpanded = expandedBooking === b.id;
                        const guests = b.guestDetails || [];
                        return (
                          <React.Fragment key={b.id}>
                            <tr className={`hover:bg-neutral-50/70 transition-colors ${isExpanded ? 'bg-neutral-50/50' : ''}`}>
                              <td className="py-4 px-6">
                                <span className="font-mono font-bold text-neutral-800">#{b.id}</span>
                                <p className="text-[11px] text-neutral-500 truncate max-w-xs">{b.propertyTitle}</p>
                              </td>
                              <td className="py-4 px-6">
                                <p className="font-bold text-neutral-900">{b.guestName}</p>
                                <p className="text-[11px] text-neutral-400">{b.guestEmail}</p>
                              </td>
                              <td className="py-4 px-6">
                                <div className="font-medium text-neutral-800">{b.checkIn} &rarr; {b.checkOut}</div>
                                <div className="text-[10px] text-neutral-400 font-mono mt-0.5">
                                  In: {b.checkInTime || '15:00'} · Out: {b.checkOutTime || '11:00'}
                                </div>
                              </td>
                              <td className="py-4 px-6">
                                <span className="inline-flex items-center gap-1 font-semibold text-neutral-700">
                                  <Users className="w-3.5 h-3.5 text-neutral-400" />
                                  <span>{b.guestCount || guests.length || 1} guest{(b.guestCount || guests.length || 1) > 1 ? 's' : ''}</span>
                                </span>
                              </td>
                              <td className="py-4 px-6">
                                <span
                                  className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                                    b.status === 'confirmed'
                                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                      : 'bg-neutral-100 text-neutral-600'
                                  }`}
                                >
                                  {b.status}
                                </span>
                              </td>
                              <td className="py-4 px-6 font-bold text-neutral-900">
                                {formatCurrency(b.totalPrice)}
                              </td>
                              <td className="py-4 px-6 text-right whitespace-nowrap space-x-2">
                                <button
                                  type="button"
                                  onClick={() => setExpandedBooking(isExpanded ? null : b.id)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
                                >
                                  <span>{isExpanded ? 'Hide Details' : 'View Guests & ID'}</span>
                                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                                </button>
                                <Link
                                  to={`/booking/confirmation/${b.id}`}
                                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-900 text-white text-xs font-bold hover:bg-black transition-colors"
                                >
                                  <FileText className="w-3.5 h-3.5" />
                                  <span>Print Bill</span>
                                </Link>
                                {b.status === 'confirmed' && (
                                  <button
                                    onClick={() => cancelBooking(b.id)}
                                    className="text-xs text-red-600 font-bold hover:underline ml-2"
                                  >
                                    Cancel
                                  </button>
                                )}
                              </td>
                            </tr>

                            {/* Expanded guest details view */}
                            {isExpanded && (
                              <tr>
                                <td colSpan={7} className="px-6 py-5 bg-neutral-50/90 border-t border-b border-neutral-200">
                                  <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 flex items-center gap-1.5">
                                        <Users className="w-4 h-4 text-brand-coral" />
                                        <span>Registered Guest Registry &amp; Verification Details ({guests.length || 1} Person{(guests.length || 1) > 1 ? 's' : ''})</span>
                                      </h4>
                                      <span className="text-[11px] text-neutral-500 font-medium">Room Capacity: Max 4 guests</span>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      {guests.length > 0 ? (
                                        guests.map((g, idx) => (
                                          <div key={idx} className="bg-white rounded-2xl p-4 border border-neutral-200/80 shadow-2xs space-y-3">
                                            <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-neutral-100 text-neutral-700 font-black text-xs flex items-center justify-center">
                                                  {idx + 1}
                                                </div>
                                                <div>
                                                  <p className="text-xs font-bold text-neutral-900">{g.fullName || 'Guest'}</p>
                                                  <p className="text-[10px] text-neutral-400 capitalize">{idx === 0 ? 'Primary Booking Contact' : `Guest #${idx + 1}`}</p>
                                                </div>
                                              </div>
                                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                                                ✓ Verified
                                              </span>
                                            </div>

                                            <div className="grid grid-cols-2 gap-2 text-[11px]">
                                              <div>
                                                <span className="text-neutral-400 block text-[9px] uppercase tracking-wider">Age &amp; Gender</span>
                                                <span className="font-semibold text-neutral-800">{g.age ? `${g.age} yrs` : '—'} · {g.gender || '—'}</span>
                                              </div>
                                              <div>
                                                <span className="text-neutral-400 block text-[9px] uppercase tracking-wider">Stay Times</span>
                                                <span className="font-semibold text-neutral-800">In: {g.checkInTime || b.checkInTime || '15:00'} · Out: {g.checkOutTime || b.checkOutTime || '11:00'}</span>
                                              </div>
                                              <div>
                                                <span className="text-neutral-400 block text-[9px] uppercase tracking-wider">Email</span>
                                                <span className="font-semibold text-neutral-800 truncate block">{g.email || '—'}</span>
                                              </div>
                                              <div>
                                                <span className="text-neutral-400 block text-[9px] uppercase tracking-wider">Phone</span>
                                                <span className="font-semibold text-neutral-800">{g.phone || '—'}</span>
                                              </div>
                                              <div className="col-span-2">
                                                <span className="text-neutral-400 block text-[9px] uppercase tracking-wider">Home Address</span>
                                                <span className="font-semibold text-neutral-800">{g.address || '—'}</span>
                                              </div>
                                            </div>

                                            {/* Photo ID Proof Preview */}
                                            {(g.idProofPreview || g.idProofFileName) && (
                                              <div className="pt-2.5 border-t border-neutral-100 flex items-center justify-between gap-3 bg-neutral-50 p-2.5 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                  {g.idProofPreview ? (
                                                    <img
                                                      src={g.idProofPreview}
                                                      alt="Photo ID Proof"
                                                      onClick={() => setSelectedIdPhoto({ src: g.idProofPreview, name: g.fullName, type: g.idProofType })}
                                                      className="w-14 h-10 object-cover rounded-lg border border-neutral-200 cursor-pointer hover:opacity-90 shadow-2xs"
                                                    />
                                                  ) : (
                                                    <div className="w-14 h-10 bg-neutral-200 rounded-lg flex items-center justify-center text-[9px] font-bold text-neutral-500">
                                                      ID DOC
                                                    </div>
                                                  )}
                                                  <div>
                                                    <p className="text-[11px] font-bold text-neutral-800 flex items-center gap-1">
                                                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                                      <span>Photo ID Proof Document</span>
                                                    </p>
                                                    <p className="text-[10px] text-neutral-500 font-mono">
                                                      {(g.idProofType || 'Govt').toUpperCase()}_ID.png
                                                    </p>
                                                  </div>
                                                </div>
                                                {g.idProofPreview && (
                                                  <button
                                                    type="button"
                                                    onClick={() => setSelectedIdPhoto({ src: g.idProofPreview, name: g.fullName, type: g.idProofType })}
                                                    className="text-[10px] font-bold text-brand-coral hover:underline"
                                                  >
                                                    Inspect ID &rarr;
                                                  </button>
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        ))
                                      ) : (
                                        <div className="bg-white rounded-2xl p-4 border border-neutral-200 text-xs text-neutral-500">
                                          <p><strong>Primary Guest:</strong> {b.guestName} ({b.guestEmail})</p>
                                          <p className="mt-1">Check-in: {b.checkIn} at {b.checkInTime || '15:00'} · Check-out: {b.checkOut} at {b.checkOutTime || '11:00'}</p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Earnings */}
        {activeTab === 'earnings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-neutral-900">Earnings Breakdown</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <p className="text-xs text-neutral-500">Gross Earnings (YTD)</p>
                <p className="text-2xl font-black text-neutral-900 mt-1">$68,400</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <p className="text-xs text-neutral-500">Cleaning Fees Collected</p>
                <p className="text-2xl font-black text-neutral-900 mt-1">$4,250</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                <p className="text-xs text-neutral-500">Pending Payouts</p>
                <p className="text-2xl font-black text-brand-coral mt-1">$3,120</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Create / Edit Listing Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title={editingPropertyId ? 'Edit Property Listing' : 'Create New Property Listing'}
        maxWidth="max-w-3xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Property Title
              </label>
              <input
                type="text"
                required
                value={listingForm.title}
                onChange={(e) => setListingForm({ ...listingForm, title: e.target.value })}
                placeholder="E.g., Amalfi Cliffside Villa with Ocean Infinity Pool"
                className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Category
                </label>
                <select
                  value={listingForm.category}
                  onChange={(e) => setListingForm({ ...listingForm, category: e.target.value })}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral bg-white"
                >
                  {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Property Type
                </label>
                <input
                  type="text"
                  required
                  value={listingForm.propertyType}
                  onChange={(e) => setListingForm({ ...listingForm, propertyType: e.target.value })}
                  placeholder="Entire luxury villa, Architectural cabin..."
                  className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={listingForm.city}
                  onChange={(e) => setListingForm({ ...listingForm, city: e.target.value })}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={listingForm.country}
                  onChange={(e) => setListingForm({ ...listingForm, country: e.target.value })}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Nightly Price ($ USD)
                </label>
                <input
                  type="number"
                  min="20"
                  required
                  value={listingForm.price}
                  onChange={(e) => setListingForm({ ...listingForm, price: Number(e.target.value) })}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral"
                />
              </div>
            </div>

            {/* Capacity */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Max Guests
                </label>
                <input
                  type="number"
                  min="1"
                  value={listingForm.guests}
                  onChange={(e) => setListingForm({ ...listingForm, guests: Number(e.target.value) })}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-2 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Bedrooms
                </label>
                <input
                  type="number"
                  min="1"
                  value={listingForm.bedrooms}
                  onChange={(e) => setListingForm({ ...listingForm, bedrooms: Number(e.target.value) })}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-2 text-sm font-semibold"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Bathrooms
                </label>
                <input
                  type="number"
                  min="1"
                  step="0.5"
                  value={listingForm.bathrooms}
                  onChange={(e) => setListingForm({ ...listingForm, bathrooms: Number(e.target.value) })}
                  className="w-full border border-neutral-300 rounded-xl px-4 py-2 text-sm font-semibold"
                />
              </div>
            </div>

            {/* Image Preview & Local File Upload */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Property Image (URL or Local File Selection)
              </label>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={listingForm.imageUrl}
                  onChange={(e) =>
                    setListingForm({ ...listingForm, imageUrl: e.target.value, localImagePreview: null })
                  }
                  className="flex-1 w-full border border-neutral-300 rounded-xl px-4 py-2.5 text-xs text-neutral-800"
                />

                <label className="cursor-pointer shrink-0 px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-xs font-bold text-neutral-700 flex items-center gap-2">
                  <Upload className="w-3.5 h-3.5 text-brand-coral" />
                  <span>Choose Local File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLocalImageChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Instant Image Preview */}
              {(listingForm.localImagePreview || listingForm.imageUrl) && (
                <div className="mt-3 relative w-full h-40 rounded-2xl overflow-hidden border border-neutral-200">
                  <img
                    src={listingForm.localImagePreview || listingForm.imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 bg-black/70 text-white rounded-lg text-[10px] font-bold">
                    {listingForm.localImagePreview ? 'Local File Preview' : 'Web Image Preview'}
                  </div>
                </div>
              )}
            </div>

            {/* Amenities Checkboxes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-2">
                Amenities Included
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Fast Wifi',
                  'Pool',
                  'Hot tub',
                  'Kitchen',
                  'Air conditioning',
                  'Free parking',
                  'EV charger',
                  'Sauna',
                  'Dedicated workspace'
                ].map((amenity) => {
                  const checked = listingForm.amenities.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() => toggleFormAmenity(amenity)}
                      className={`p-2 rounded-xl border text-xs font-semibold text-left flex items-center gap-2 transition-all ${
                        checked
                          ? 'border-brand-coral bg-brand-50/50 text-brand-coral'
                          : 'border-neutral-200 text-neutral-700'
                      }`}
                    >
                      <input type="checkbox" checked={checked} readOnly className="rounded text-brand-coral" />
                      <span>{amenity}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Description
              </label>
              <textarea
                rows={3}
                required
                value={listingForm.description}
                onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
                className="w-full border border-neutral-300 rounded-xl p-3 text-xs text-neutral-800 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold shadow-md active:scale-95 transition-all"
            >
              {editingPropertyId ? 'Update Listing' : 'Publish Listing'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Photo ID Full-Size Preview Modal for Host */}
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
