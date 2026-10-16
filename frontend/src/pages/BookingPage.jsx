import React, { useState, useRef } from 'react';
import { useParams, useSearchParams, useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  formatCurrency,
  calculateNights,
  calculateBookingPrice
} from '../utils/formatters';
import {
  ChevronLeft,
  Star,
  ShieldCheck,
  CreditCard,
  Lock,
  Calendar,
  Users,
  CheckCircle2,
  AlertCircle,
  Plus,
  Minus,
  Upload,
  User,
  Phone,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';

// ── Helper: initials avatar ──────────────────────────────────────────────
const Initials = ({ name, className = '' }) => {
  const letters = (name || 'G')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <div className={`rounded-full bg-gradient-to-br from-brand-coral to-rose-500 text-white flex items-center justify-center font-black ${className}`}>
      {letters}
    </div>
  );
};

// ── Helper: Generate SVG Verified ID Card ───────────────────────────────
const generateSampleIdCard = (name, index, idType = 'passport') => {
  const displayName = name?.trim() || `Guest ${index + 1}`;
  const typeLabel = (idType || 'passport').replace('_', ' ').toUpperCase();
  const idNum = `GOV-${(10000000 + index * 9871).toString()}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="360" height="220" viewBox="0 0 360 220">
    <defs>
      <linearGradient id="idgrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#1e293b"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
    </defs>
    <rect width="360" height="220" rx="14" fill="url(#idgrad)"/>
    <rect x="18" y="18" width="324" height="36" rx="6" fill="#334155"/>
    <text x="30" y="42" fill="#f8fafc" font-size="12" font-family="system-ui, sans-serif" font-weight="bold" letter-spacing="1">OFFICIAL GOVERNMENT PHOTO ID</text>
    <rect x="24" y="70" width="80" height="100" rx="8" fill="#475569" stroke="#64748b" stroke-width="2"/>
    <circle cx="64" cy="105" r="22" fill="#94a3b8"/>
    <path d="M36 155 C36 130 92 130 92 155 Z" fill="#94a3b8"/>
    <text x="120" y="92" fill="#ffffff" font-size="15" font-family="system-ui, sans-serif" font-weight="bold">${displayName}</text>
    <text x="120" y="114" fill="#94a3b8" font-size="11" font-family="monospace">ID: ${idNum}</text>
    <text x="120" y="134" fill="#38bdf8" font-size="11" font-family="system-ui, sans-serif" font-weight="bold">${typeLabel}</text>
    <rect x="120" y="148" width="115" height="22" rx="4" fill="#065f46"/>
    <text x="128" y="163" fill="#34d399" font-size="10" font-family="system-ui, sans-serif" font-weight="bold">✓ PHOTO VERIFIED</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

// ── Empty guest template ──────────────────────────────────────────────────
const emptyGuest = (index, checkIn = '15:00', checkOut = '11:00') => ({
  id: index,
  fullName: '',
  age: '',
  gender: '',
  email: '',
  phone: '',
  address: '',
  checkInTime: checkIn,
  checkOutTime: checkOut,
  idProofType: 'passport',
  idProofFile: null,
  idProofPreview: null
});

export const BookingPage = () => {
  const { propertyId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { properties, user, createBooking, showToast } = useApp();

  const property = properties.find((p) => p.id === propertyId) || properties[0];
  const maxCapacity = property.capacity?.guests || 4;

  const checkIn = searchParams.get('checkIn') || '2026-11-12';
  const checkOut = searchParams.get('checkOut') || '2026-11-17';
  const checkInTime = searchParams.get('checkInTime') || '15:00';
  const checkOutTime = searchParams.get('checkOutTime') || '11:00';

  const nights = calculateNights(checkIn, checkOut);
  const priceDetails = calculateBookingPrice(
    property.price,
    nights,
    property.cleaningFee || 100,
    property.serviceFeePercent || 0.12
  );

  // Initial guest count from URL query or default to 1 (capped at maxCapacity)
  const initialGuestsParam = parseInt(searchParams.get('guests'), 10);
  const initialGuestCount = !isNaN(initialGuestsParam)
    ? Math.max(1, Math.min(maxCapacity, initialGuestsParam))
    : 1;

  // ── Guest count ───────────────────────────────────────────────────────
  const [guestCount, setGuestCount] = useState(initialGuestCount);
  const [guestDetails, setGuestDetails] = useState(
    Array.from({ length: initialGuestCount }, (_, i) => emptyGuest(i, checkInTime, checkOutTime))
  );

  // ── Time selections ───────────────────────────────────────────────────
  const [selectedCheckInTime, setSelectedCheckInTime] = useState(checkInTime);
  const [selectedCheckOutTime, setSelectedCheckOutTime] = useState(checkOutTime);

  // ── Payment ───────────────────────────────────────────────────────────
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // ── Special requests ──────────────────────────────────────────────────
  const [specialRequests, setSpecialRequests] = useState('');

  // ── Guest count change ────────────────────────────────────────────────
  const handleGuestCountChange = (delta) => {
    const newCount = Math.max(1, Math.min(maxCapacity, guestCount + delta));
    setGuestCount(newCount);
    setGuestDetails((prev) => {
      if (newCount > prev.length) {
        const extras = Array.from({ length: newCount - prev.length }, (_, i) =>
          emptyGuest(prev.length + i, selectedCheckInTime, selectedCheckOutTime)
        );
        return [...prev, ...extras];
      }
      return prev.slice(0, newCount);
    });
  };

  // ── Update individual guest field ─────────────────────────────────────
  const updateGuest = (index, field, value) => {
    setGuestDetails((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  // ── Handle ID proof image upload via FileReader (Base64 for persistence) ──
  const handleIdProofUpload = (index, file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setGuestDetails((prev) => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          idProofFile: file.name,
          idProofPreview: dataUrl
        };
        return updated;
      });
      showToast(`ID proof photo uploaded for Guest ${index + 1}`, 'success');
    };
    reader.readAsDataURL(file);
  };

  // ── Attach sample verified ID proof ───────────────────────────────────
  const handleUseSampleId = (index) => {
    const guest = guestDetails[index];
    const preview = generateSampleIdCard(guest?.fullName, index, guest?.idProofType || 'passport');
    setGuestDetails((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        idProofFile: `${(guest?.idProofType || 'Govt').toUpperCase()}_ID_Proof.svg`,
        idProofPreview: preview
      };
      return updated;
    });
    showToast(`Verified photo ID sample attached for Guest ${index + 1}`, 'info');
  };

  // ── Validation ────────────────────────────────────────────────────────
  const validate = () => {
    const errs = {};
    guestDetails.forEach((g, i) => {
      if (!g.fullName.trim()) errs[`${i}_name`] = 'Full name required';
      if (!g.age || isNaN(g.age) || Number(g.age) < 1 || Number(g.age) > 120)
        errs[`${i}_age`] = 'Valid age required';
      if (!g.gender) errs[`${i}_gender`] = 'Gender required';
      if (!g.email.trim() || !/\S+@\S+\.\S+/.test(g.email))
        errs[`${i}_email`] = 'Valid email required';
      if (!g.phone.trim()) errs[`${i}_phone`] = 'Phone required';
      if (!g.address.trim()) errs[`${i}_address`] = 'Address required';
      if (!g.idProofFile && !g.idProofPreview) errs[`${i}_id`] = 'Photo ID proof required';
    });
    if (paymentMethod === 'card') {
      if (!cardNumber.trim()) errs.cardNumber = 'Card number required';
      if (!cardExpiry.trim()) errs.cardExpiry = 'Expiry required';
      if (!cardCvc.trim()) errs.cardCvc = 'CVV required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Submit ─────────────────────────────────────────────────────────────
  const handleConfirmReservation = (e) => {
    e.preventDefault();
    if (!user) { showToast('Please sign in to book', 'error'); navigate('/login'); return; }
    if (!validate()) {
      showToast('Please fill in all required guest details and upload ID proof', 'error');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newBooking = createBooking({
        propertyId: property.id,
        propertyTitle: property.title,
        propertyLocation: property.location,
        propertyImage: property.images?.[0] || '',
        propertyType: property.propertyType,
        hostName: property.host?.name || 'Host',
        hostEmail: property.hostEmail || '',
        checkIn,
        checkOut,
        checkInTime: selectedCheckInTime,
        checkOutTime: selectedCheckOutTime,
        nights,
        guestCount,
        guestDetails: guestDetails.map((g) => ({
          ...g,
          idProofFileName: g.idProofFile || 'Government_ID.png',
          idProofPreview: g.idProofPreview || generateSampleIdCard(g.fullName, g.id, g.idProofType)
        })),
        priceDetails,
        totalPrice: priceDetails.total,
        paymentMethod:
          paymentMethod === 'card'
            ? `Credit Card (ending ${cardNumber.slice(-4) || '****'})`
            : paymentMethod === 'apple' ? 'Apple Pay' : 'PayPal',
        specialRequests
      });
      setIsSubmitting(false);
      if (newBooking) navigate(`/booking/confirmation/${newBooking.id}`);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <div className="flex items-center gap-2 mb-6">
          <Link
            to={`/property/${property.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-neutral-900"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to property</span>
          </Link>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-8">
          Confirm and Pay
        </h1>

        <form onSubmit={handleConfirmReservation} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* ── Left Column ── */}
            <div className="lg:col-span-7 space-y-8">

              {/* Trip Overview */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
                <h2 className="text-lg font-bold text-neutral-900">Your Trip</h2>
                <div className="flex items-center justify-between py-2 border-b border-neutral-100">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">Dates</p>
                    <p className="text-sm font-semibold text-neutral-800">
                      {checkIn} → {checkOut} ({nights} nights)
                    </p>
                  </div>
                  <Link to={`/property/${property.id}`} className="text-xs font-bold text-neutral-800 underline hover:text-black">Edit</Link>
                </div>

                {/* Check-in / Check-out times */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Check-in Time
                    </label>
                    <select
                      value={selectedCheckInTime}
                      onChange={(e) => setSelectedCheckInTime(e.target.value)}
                      className="w-full border border-neutral-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral bg-white"
                    >
                      {['12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Check-out Time
                    </label>
                    <select
                      value={selectedCheckOutTime}
                      onChange={(e) => setSelectedCheckOutTime(e.target.value)}
                      className="w-full border border-neutral-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral bg-white"
                    >
                      {['08:00','09:00','10:00','11:00','12:00','13:00'].map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Guest Count Selector */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-neutral-900">Number of Guests</h2>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Maximum capacity: <span className="font-bold text-brand-coral">{maxCapacity} guests</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleGuestCountChange(-1)}
                      disabled={guestCount <= 1}
                      className="w-9 h-9 rounded-full border-2 border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-neutral-800 disabled:opacity-30 transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-2xl font-black text-neutral-900 w-8 text-center">{guestCount}</span>
                    <button
                      type="button"
                      onClick={() => handleGuestCountChange(1)}
                      disabled={guestCount >= maxCapacity}
                      className="w-9 h-9 rounded-full border-2 border-neutral-300 flex items-center justify-center text-neutral-700 hover:border-neutral-800 disabled:opacity-30 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                {guestCount >= maxCapacity && (
                  <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>Maximum capacity reached for this property.</span>
                  </div>
                )}
              </div>

              {/* Per-Guest Details */}
              {guestDetails.map((guest, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-5">
                  <div className="flex items-center gap-3">
                    <Initials name={guest.fullName || `Guest ${idx + 1}`} className="w-10 h-10 text-sm" />
                    <div>
                      <h2 className="text-base font-bold text-neutral-900">
                        Guest {idx + 1} {idx === 0 && <span className="text-xs text-brand-coral font-semibold">(Primary)</span>}
                      </h2>
                      <p className="text-xs text-neutral-400">All fields are required for check-in</p>
                    </div>
                  </div>

                  {/* Row 1: Name + Age */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={guest.fullName}
                          onChange={(e) => updateGuest(idx, 'fullName', e.target.value)}
                          placeholder="As on government ID"
                          autoComplete="off"
                          className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral ${errors[`${idx}_name`] ? 'border-red-400' : 'border-neutral-300'}`}
                        />
                      </div>
                      {errors[`${idx}_name`] && <p className="text-[11px] text-red-500 mt-1">{errors[`${idx}_name`]}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Age *</label>
                      <input
                        type="number"
                        min="1" max="120"
                        value={guest.age}
                        onChange={(e) => updateGuest(idx, 'age', e.target.value)}
                        placeholder="25"
                        autoComplete="off"
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral ${errors[`${idx}_age`] ? 'border-red-400' : 'border-neutral-300'}`}
                      />
                      {errors[`${idx}_age`] && <p className="text-[11px] text-red-500 mt-1">{errors[`${idx}_age`]}</p>}
                    </div>
                  </div>

                  {/* Row 2: Gender */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-2">Gender *</label>
                    <div className="flex gap-3">
                      {['Male', 'Female', 'Other', 'Prefer not to say'].map((g) => (
                        <label key={g} className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                          guest.gender === g
                            ? 'border-brand-coral bg-rose-50 text-brand-coral'
                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                        }`}>
                          <input
                            type="radio"
                            name={`gender-${idx}`}
                            value={g}
                            checked={guest.gender === g}
                            onChange={() => updateGuest(idx, 'gender', g)}
                            className="sr-only"
                          />
                          {g}
                        </label>
                      ))}
                    </div>
                    {errors[`${idx}_gender`] && <p className="text-[11px] text-red-500 mt-1">{errors[`${idx}_gender`]}</p>}
                  </div>

                  {/* Row 3: Email + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Email *</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={guest.email}
                          onChange={(e) => updateGuest(idx, 'email', e.target.value)}
                          placeholder="guest@email.com"
                          autoComplete="off"
                          className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral ${errors[`${idx}_email`] ? 'border-red-400' : 'border-neutral-300'}`}
                        />
                      </div>
                      {errors[`${idx}_email`] && <p className="text-[11px] text-red-500 mt-1">{errors[`${idx}_email`]}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Phone Number *</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={guest.phone}
                          onChange={(e) => updateGuest(idx, 'phone', e.target.value)}
                          placeholder="+91 98765 43210"
                          autoComplete="off"
                          className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral ${errors[`${idx}_phone`] ? 'border-red-400' : 'border-neutral-300'}`}
                        />
                      </div>
                      {errors[`${idx}_phone`] && <p className="text-[11px] text-red-500 mt-1">{errors[`${idx}_phone`]}</p>}
                    </div>
                  </div>

                  {/* Row 4: Check-in and Check-out Times */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-coral" /> Expected Check-in Time *
                      </label>
                      <select
                        value={guest.checkInTime || selectedCheckInTime}
                        onChange={(e) => updateGuest(idx, 'checkInTime', e.target.value)}
                        className="w-full border border-neutral-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral bg-white"
                      >
                        {['12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-coral" /> Expected Check-out Time *
                      </label>
                      <select
                        value={guest.checkOutTime || selectedCheckOutTime}
                        onChange={(e) => updateGuest(idx, 'checkOutTime', e.target.value)}
                        className="w-full border border-neutral-300 rounded-xl px-3 py-2.5 text-sm font-semibold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral bg-white"
                      >
                        {['08:00','09:00','10:00','11:00','12:00','13:00'].map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 5: Address */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">
                      Home Address *
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
                      <textarea
                        rows={2}
                        value={guest.address}
                        onChange={(e) => updateGuest(idx, 'address', e.target.value)}
                        placeholder="Street, City, State, PIN Code, Country"
                        autoComplete="off"
                        className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral resize-none ${errors[`${idx}_address`] ? 'border-red-400' : 'border-neutral-300'}`}
                      />
                    </div>
                    {errors[`${idx}_address`] && <p className="text-[11px] text-red-500 mt-1">{errors[`${idx}_address`]}</p>}
                  </div>

                  {/* Row 6: ID Proof */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                        Photo ID Proof Image *
                      </label>
                      <button
                        type="button"
                        onClick={() => handleUseSampleId(idx)}
                        className="text-xs font-bold text-brand-coral hover:text-brand-coral-dark hover:underline flex items-center gap-1"
                      >
                        ✨ Use Verified Sample ID
                      </button>
                    </div>
                    <div className="flex gap-3 flex-wrap mb-3">
                      {['passport', 'aadhar', 'driving_license', 'voter_id'].map((t) => (
                        <label key={t} className={`px-3 py-1.5 rounded-xl border cursor-pointer text-xs font-semibold transition-all ${
                          guest.idProofType === t
                            ? 'border-brand-coral bg-rose-50 text-brand-coral'
                            : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                        }`}>
                          <input type="radio" name={`idtype-${idx}`} value={t} checked={guest.idProofType === t}
                            onChange={() => updateGuest(idx, 'idProofType', t)} className="sr-only" />
                          {t === 'passport' ? 'Passport' : t === 'aadhar' ? 'Aadhaar Card' : t === 'driving_license' ? 'Driving License' : 'Voter ID'}
                        </label>
                      ))}
                    </div>
                    <label className={`flex items-center gap-3 p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${
                      guest.idProofPreview ? 'border-emerald-400 bg-emerald-50' : errors[`${idx}_id`] ? 'border-red-300 bg-red-50' : 'border-neutral-300 hover:border-brand-coral hover:bg-rose-50/30'
                    }`}>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleIdProofUpload(idx, e.target.files?.[0])}
                        className="sr-only"
                      />
                      {guest.idProofPreview ? (
                        <>
                          <img src={guest.idProofPreview} alt="ID" className="w-14 h-10 object-cover rounded-lg" />
                          <div>
                            <p className="text-xs font-bold text-emerald-700">✓ ID Uploaded</p>
                            <p className="text-[10px] text-emerald-600">{guest.idProofFile}</p>
                          </div>
                        </>
                      ) : (
                        <>
                          <Upload className="w-5 h-5 text-neutral-400 shrink-0" />
                          <div>
                            <p className="text-xs font-bold text-neutral-700">Upload ID Proof Image</p>
                            <p className="text-[10px] text-neutral-400">JPG, PNG or PDF · Max 5MB</p>
                          </div>
                        </>
                      )}
                    </label>
                    {errors[`${idx}_id`] && <p className="text-[11px] text-red-500 mt-1">{errors[`${idx}_id`]}</p>}
                  </div>
                </div>
              ))}

              {/* Payment */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-neutral-900">Payment</h2>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 font-bold">
                    <Lock className="w-3.5 h-3.5" />
                    <span>256-Bit SSL Demo</span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-2.5 text-xs text-amber-800">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span><strong>Demo Only:</strong> No real payment is processed.</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'card', label: 'Credit Card', icon: CreditCard },
                    { id: 'apple', label: 'Apple Pay', icon: CheckCircle2 },
                    { id: 'paypal', label: 'PayPal', icon: CheckCircle2 }
                  ].map(({ id, label, icon: Icon }) => (
                    <button key={id} type="button" onClick={() => setPaymentMethod(id)}
                      className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl border text-xs font-bold transition-all ${
                        paymentMethod === id ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 text-neutral-700 hover:border-neutral-400 bg-white'
                      }`}>
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Card Number *</label>
                      <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="1234 5678 9012 3456" autoComplete="off"
                        className={`w-full border rounded-xl px-4 py-2.5 text-sm font-mono text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral ${errors.cardNumber ? 'border-red-400' : 'border-neutral-300'}`} />
                      {errors.cardNumber && <p className="text-[11px] text-red-500 mt-1">{errors.cardNumber}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Expiry *</label>
                        <input type="text" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/YY" autoComplete="off"
                          className={`w-full border rounded-xl px-4 py-2.5 text-sm font-mono text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral ${errors.cardExpiry ? 'border-red-400' : 'border-neutral-300'}`} />
                        {errors.cardExpiry && <p className="text-[11px] text-red-500 mt-1">{errors.cardExpiry}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500 mb-1">CVV *</label>
                        <input type="text" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)}
                          placeholder="123" autoComplete="off"
                          className={`w-full border rounded-xl px-4 py-2.5 text-sm font-mono text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral ${errors.cardCvc ? 'border-red-400' : 'border-neutral-300'}`} />
                        {errors.cardCvc && <p className="text-[11px] text-red-500 mt-1">{errors.cardCvc}</p>}
                      </div>
                    </div>
                  </div>
                )}
                {paymentMethod !== 'card' && (
                  <div className="p-4 bg-neutral-50 rounded-2xl text-center text-xs text-neutral-600">
                    You will simulate authorization via {paymentMethod === 'apple' ? 'Apple Pay' : 'PayPal'}.
                  </div>
                )}
              </div>

              {/* Special Requests */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs space-y-3">
                <h2 className="text-base font-bold text-neutral-900">Special Requests (Optional)</h2>
                <textarea rows={3} value={specialRequests} onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="E.g., early check-in, dietary requirements, accessibility needs..."
                  className="w-full border border-neutral-300 rounded-xl p-3 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral resize-none" />
              </div>

              {/* Cancellation */}
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-xs">
                <h3 className="text-sm font-bold text-neutral-900 mb-1">Cancellation Policy</h3>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  Free cancellation up to 48 hours before check-in. Cancel anytime from your Guest Dashboard.
                </p>
              </div>

              {/* Submit */}
              <button type="submit" disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-brand-coral to-rose-600 hover:from-brand-coral-dark hover:to-rose-700 text-white font-extrabold text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 active:scale-[0.99] flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Confirming...</span></>
                ) : (
                  <span>Confirm & Reserve · {formatCurrency(priceDetails.total)}</span>
                )}
              </button>
            </div>

            {/* ── Right: Sticky Summary ── */}
            <div className="lg:col-span-5 sticky top-28">
              <div className="bg-white rounded-3xl p-6 border border-neutral-200 shadow-float space-y-6">
                <div className="flex gap-4 pb-6 border-b border-neutral-200">
                  <img src={property.images?.[0]} alt={property.title}
                    className="w-28 h-24 object-cover rounded-2xl shadow-sm shrink-0" />
                  <div className="flex flex-col justify-between overflow-hidden">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-neutral-400">{property.propertyType}</span>
                      <h3 className="text-sm font-bold text-neutral-900 truncate">{property.title}</h3>
                      <p className="text-xs text-neutral-500 truncate">{property.location}</p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-neutral-800">
                      <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
                      <span>{property.rating ? property.rating.toFixed(2) : '5.0'}</span>
                      <span className="text-neutral-400">({property.reviewCount || 0})</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <h4 className="font-bold text-neutral-900">Price Details</h4>
                  <div className="space-y-2.5">
                    <div className="flex justify-between text-neutral-600">
                      <span>{formatCurrency(property.price)} × {nights} nights</span>
                      <span className="font-semibold text-neutral-900">{formatCurrency(priceDetails.stayCost)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Cleaning fee</span>
                      <span className="font-semibold text-neutral-900">{formatCurrency(priceDetails.cleaningFee)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Service fee</span>
                      <span className="font-semibold text-neutral-900">{formatCurrency(priceDetails.serviceFee)}</span>
                    </div>
                    <div className="flex justify-between text-neutral-600">
                      <span>Taxes</span>
                      <span className="font-semibold text-neutral-900">{formatCurrency(priceDetails.occupancyTaxes)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-neutral-200 text-base font-extrabold text-neutral-900">
                    <span>Total (USD)</span>
                    <span className="text-xl font-black text-brand-coral">{formatCurrency(priceDetails.total)}</span>
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 rounded-2xl border border-neutral-100 flex items-center gap-2.5 text-xs text-neutral-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Protected by HavenCover reservation guarantee.</span>
                </div>

                {/* Capacity reminder */}
                <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100 flex items-center gap-2.5 text-xs text-rose-700">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Capacity: <strong>{guestCount}</strong> of max <strong>{maxCapacity}</strong> guests selected.</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
