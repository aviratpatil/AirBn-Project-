import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { Modal } from '../components/common/Modal';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  User,
  Printer,
  ChevronRight,
  ShieldCheck,
  Compass,
  Clock,
  Phone,
  Mail,
  Home,
  CreditCard,
  Users,
  FileText
} from 'lucide-react';

// Initials helper (no avatar)
const Initials = ({ name, className = '' }) => {
  const letters = (name || 'G').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <div className={`rounded-full bg-gradient-to-br from-brand-coral to-rose-500 text-white flex items-center justify-center font-black select-none ${className}`}>
      {letters}
    </div>
  );
};

export const BookingConfirmationPage = () => {
  const { bookingId } = useParams();
  const { bookings, hostBookings } = useApp();
  const [selectedIdPhoto, setSelectedIdPhoto] = useState(null);

  const booking = useMemo(() => {
    // 1. Check current user's personal bookings and host incoming bookings
    const combined = [...(bookings || []), ...(hostBookings || [])];
    const found = combined.find((b) => b.id === bookingId);
    if (found) return found;

    // 2. Fallback search through all havenstay_*_bookings in localStorage
    if (bookingId && typeof window !== 'undefined' && window.localStorage) {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('havenstay_') && key.endsWith('_bookings')) {
          try {
            const list = JSON.parse(localStorage.getItem(key) || '[]');
            const match = list.find((item) => item.id === bookingId);
            if (match) return match;
          } catch { /* skip */ }
        }
      }
    }
    return combined[0] || null;
  }, [bookingId, bookings, hostBookings]);

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Reservation not found</h2>
          <Link to="/" className="text-brand-coral font-bold underline">Return to Explore</Link>
        </div>
      </div>
    );
  }

  const guestDetails = booking.guestDetails || [];
  const priceDetails = booking.priceDetails || {};

  return (
    <>
      {/* ── Screen view ─────────────────────────────────────────────────── */}
      <div className="min-h-screen bg-neutral-50/60 py-12 print:hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Success banner */}
          <div className="bg-white rounded-3xl border border-neutral-200 shadow-float p-6 sm:p-10 text-center mb-8">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-bounce">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>
            <span className="inline-block px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-mono font-bold tracking-wider mb-2">
              RESERVATION #{booking.id}
            </span>
            <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-2">Your Stay is Confirmed!</h1>
            <p className="text-sm text-neutral-500 max-w-md mx-auto mb-6 leading-relaxed">
              A confirmation has been issued for{' '}
              <strong className="text-neutral-800">{booking.guestName}</strong>. Host{' '}
              <strong className="text-neutral-800">{booking.hostName}</strong> is ready to welcome you.
            </p>

            {/* Quick details strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              {[
                { label: 'Check-in', value: `${booking.checkIn}${booking.checkInTime ? ' at ' + booking.checkInTime : ''}`, icon: Calendar },
                { label: 'Check-out', value: `${booking.checkOut}${booking.checkOutTime ? ' at ' + booking.checkOutTime : ''}`, icon: Calendar },
                { label: 'Guests', value: `${booking.guestCount || 1} guest${(booking.guestCount || 1) > 1 ? 's' : ''}`, icon: Users },
                { label: 'Total Paid', value: formatCurrency(booking.totalPrice), icon: CreditCard }
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100 text-left">
                  <Icon className="w-4 h-4 text-brand-coral mb-1.5" />
                  <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">{label}</p>
                  <p className="text-xs font-bold text-neutral-800 mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/trips"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
              <span>View in My Trips</span><ChevronRight className="w-4 h-4" />
            </Link>
            <button onClick={() => window.print()}
              className="w-full sm:w-auto px-5 py-3 rounded-xl border border-neutral-300 hover:bg-neutral-50 text-neutral-800 text-xs font-bold transition-all flex items-center justify-center gap-2">
              <Printer className="w-4 h-4" /><span>Print / Download Bill</span>
            </button>
            <Link to="/"
              className="w-full sm:w-auto px-5 py-3 rounded-xl text-neutral-600 hover:text-neutral-900 text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
              <Compass className="w-4 h-4" /><span>Explore More Stays</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Printable Bill ──────────────────────────────────────────────── */}
      <div className="hidden print:block" id="print-bill">
        <style>{`
          @page { size: A4 portrait; margin: 12mm 14mm; }
          @media print {
            body { -webkit-print-color-adjust: exact; print-color-adjust: exact; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #111; }
          }
          .bill-tbl { width: 100%; border-collapse: collapse; margin-bottom: 14px; table-layout: fixed; }
          .bill-tbl th { background-color: #f4f4f5; text-align: left; padding: 7px 10px; font-size: 10px; text-transform: uppercase; font-weight: 700; color: #52525b; border: 1px solid #e4e4e7; }
          .bill-tbl td { padding: 7px 10px; font-size: 11px; color: #18181b; border: 1px solid #e4e4e7; vertical-align: top; word-break: break-word; }
          .section-heading { font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; color: #18181b; margin-top: 14px; margin-bottom: 6px; border-bottom: 2px solid #FF385C; padding-bottom: 3px; display: inline-block; }
          .watermark { position: fixed; top: 45%; left: 50%; transform: translate(-50%,-50%) rotate(-30deg); font-size: 85px; font-weight: 900; color: rgba(255,56,92,0.035); pointer-events: none; z-index: 0; letter-spacing: 12px; }
        `}</style>

        <div className="watermark">HAVENSTAY</div>

        {/* Header Block */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 18, borderBottom: '3px solid #18181b', paddingBottom: 12 }}>
          <tbody>
            <tr>
              <td style={{ verticalAlign: 'top', width: '55%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 6 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 6, background: '#FF385C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>
                  </div>
                  <div>
                    <span style={{ fontSize: 20, fontWeight: 900, color: '#18181b', letterSpacing: '-0.5px' }}>HavenStay</span>
                    <span style={{ display: 'block', fontSize: 9, color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Official Accommodation Folio</span>
                  </div>
                </div>
                <div style={{ fontSize: 10, color: '#52525b', lineHeight: 1.4 }}>
                  <strong>Platform:</strong> HavenStay Stays &amp; Resorts Network<br />
                  <strong>Support:</strong> reservations@havenstay.demo · www.havenstay.demo
                </div>
              </td>
              <td style={{ verticalAlign: 'top', textAlign: 'right', width: '45%' }}>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#FF385C', letterSpacing: '-0.5px' }}>HOTEL INVOICE / RECEIPT</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#18181b', marginTop: 2 }}>Booking Ref: #{booking.id}</div>
                <div style={{ fontSize: 10, color: '#71717a', marginTop: 2 }}>Date of Issue: {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Today'}</div>
                <div style={{ marginTop: 6, display: 'inline-block', padding: '3px 10px', background: '#ecfdf5', border: '1px solid #10b981', borderRadius: 12, color: '#047857', fontSize: 10, fontWeight: 800 }}>
                  ✓ PAID IN FULL · CONFIRMED
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Hotel & Stay Information Table */}
        <div className="section-heading">1. Hotel &amp; Stay Specifications</div>
        <table className="bill-tbl">
          <tbody>
            <tr>
              <td style={{ width: '18%', fontWeight: 700, backgroundColor: '#fafafa' }}>Hotel / Property</td>
              <td style={{ width: '32%', fontWeight: 600 }}>{booking.propertyTitle}</td>
              <td style={{ width: '18%', fontWeight: 700, backgroundColor: '#fafafa' }}>Location / City</td>
              <td style={{ width: '32%' }}>{booking.propertyLocation}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700, backgroundColor: '#fafafa' }}>Hotel Manager / Host</td>
              <td>{booking.hostName} ({booking.hostEmail || 'host@havenstay.demo'})</td>
              <td style={{ fontWeight: 700, backgroundColor: '#fafafa' }}>Property Type</td>
              <td>{booking.propertyType || 'Hotel Room / Villa'}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700, backgroundColor: '#fafafa' }}>Check-in Date &amp; Time</td>
              <td><strong>{booking.checkIn}</strong> at <strong>{booking.checkInTime || '15:00'}</strong></td>
              <td style={{ fontWeight: 700, backgroundColor: '#fafafa' }}>Check-out Date &amp; Time</td>
              <td><strong>{booking.checkOut}</strong> at <strong>{booking.checkOutTime || '11:00'}</strong></td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700, backgroundColor: '#fafafa' }}>Length of Stay</td>
              <td><strong>{booking.nights} night{booking.nights > 1 ? 's' : ''}</strong></td>
              <td style={{ fontWeight: 700, backgroundColor: '#fafafa' }}>Room Occupancy</td>
              <td><strong>{booking.guestCount || 1} guest{(booking.guestCount || 1) > 1 ? 's' : ''}</strong> (Room Capacity: max 4 guests)</td>
            </tr>
          </tbody>
        </table>

        {/* Registered Guests Detailed Table */}
        <div className="section-heading">2. Registered Guest Information ({guestDetails.length} Person{guestDetails.length > 1 ? 's' : ''})</div>
        <table className="bill-tbl">
          <thead>
            <tr>
              <th style={{ width: '5%' }}>#</th>
              <th style={{ width: '22%' }}>Full Name</th>
              <th style={{ width: '12%' }}>Age &amp; Gender</th>
              <th style={{ width: '22%' }}>Contact (Email &amp; Phone)</th>
              <th style={{ width: '15%' }}>Check-in / Out Time</th>
              <th style={{ width: '14%' }}>Home Address</th>
              <th style={{ width: '10%' }}>Photo ID Proof</th>
            </tr>
          </thead>
          <tbody>
            {guestDetails.length > 0 ? (
              guestDetails.map((g, idx) => (
                <tr key={idx}>
                  <td style={{ textAlign: 'center', fontWeight: 700 }}>{idx + 1}</td>
                  <td>
                    <strong>{g.fullName || '—'}</strong>
                    {idx === 0 && <span style={{ display: 'block', fontSize: 9, color: '#FF385C', fontWeight: 700 }}>Primary Guest</span>}
                  </td>
                  <td>{g.age ? `${g.age} yrs` : '—'} · {g.gender || '—'}</td>
                  <td style={{ fontSize: 10 }}>
                    <div>✉ {g.email || '—'}</div>
                    <div style={{ marginTop: 2 }}>☎ {g.phone || '—'}</div>
                  </td>
                  <td style={{ fontSize: 10 }}>
                    <div>In: <strong>{g.checkInTime || booking.checkInTime || '15:00'}</strong></div>
                    <div>Out: <strong>{g.checkOutTime || booking.checkOutTime || '11:00'}</strong></div>
                  </td>
                  <td style={{ fontSize: 10 }}>{g.address || '—'}</td>
                  <td>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#047857', background: '#ecfdf5', padding: '2px 5px', borderRadius: 4, display: 'inline-block' }}>
                      ✓ {(g.idProofType || 'Govt').toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ textAlign: 'center', fontWeight: 700 }}>1</td>
                <td><strong>{booking.guestName}</strong></td>
                <td>—</td>
                <td>{booking.guestEmail}</td>
                <td>{booking.checkInTime || '15:00'} / {booking.checkOutTime || '11:00'}</td>
                <td>—</td>
                <td>✓ VERIFIED</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Itemized Price Calculation Table */}
        <div className="section-heading">3. Itemized Accounting &amp; Charges Breakdown</div>
        <table className="bill-tbl">
          <thead>
            <tr>
              <th style={{ width: '65%' }}>Charge Description</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Rate / Calc</th>
              <th style={{ width: '20%', textAlign: 'right' }}>Amount (USD)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>Room Accommodation Fee</strong>
                <div style={{ fontSize: 10, color: '#71717a' }}>{booking.propertyTitle} — {booking.nights} night(s) stay</div>
              </td>
              <td style={{ textAlign: 'center', fontSize: 10 }}>
                {formatCurrency(priceDetails.nightlyRate || (booking.totalPrice / (booking.nights || 1)))} / night
              </td>
              <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatCurrency(priceDetails.stayCost || booking.totalPrice)}</td>
            </tr>
            <tr>
              <td>
                <strong>Hotel Sanitization &amp; Cleaning Fee</strong>
                <div style={{ fontSize: 10, color: '#71717a' }}>Standard turnover and room preparation</div>
              </td>
              <td style={{ textAlign: 'center', fontSize: 10 }}>Fixed</td>
              <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatCurrency(priceDetails.cleaningFee || 0)}</td>
            </tr>
            <tr>
              <td>
                <strong>Guest Reservation Service Fee</strong>
                <div style={{ fontSize: 10, color: '#71717a' }}>Platform reservation, security and 24/7 guest support</div>
              </td>
              <td style={{ textAlign: 'center', fontSize: 10 }}>12%</td>
              <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatCurrency(priceDetails.serviceFee || 0)}</td>
            </tr>
            <tr>
              <td>
                <strong>Municipal Occupancy &amp; Hotel Tourism Taxes</strong>
                <div style={{ fontSize: 10, color: '#71717a' }}>Mandatory local authority tourist tax remittance</div>
              </td>
              <td style={{ textAlign: 'center', fontSize: 10 }}>Local Govt</td>
              <td style={{ textAlign: 'right', fontWeight: 600 }}>{formatCurrency(priceDetails.occupancyTaxes || 0)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr style={{ backgroundColor: '#18181b', color: '#ffffff' }}>
              <td colSpan={2} style={{ padding: '9px 12px', fontSize: 13, fontWeight: 900, color: '#ffffff' }}>
                TOTAL AMOUNT CHARGED (USD)
              </td>
              <td style={{ padding: '9px 12px', fontSize: 15, fontWeight: 900, color: '#FF385C', textAlign: 'right' }}>
                {formatCurrency(booking.totalPrice)}
              </td>
            </tr>
            <tr style={{ backgroundColor: '#f4f4f5' }}>
              <td colSpan={2} style={{ fontSize: 11, fontWeight: 700, color: '#18181b' }}>
                OUTSTANDING BALANCE DUE:
              </td>
              <td style={{ fontSize: 12, fontWeight: 800, color: '#047857', textAlign: 'right' }}>
                $0.00 (PAID IN FULL)
              </td>
            </tr>
          </tfoot>
        </table>

        {/* Payment & Verification Summary Table */}
        <div className="section-heading">4. Settlement &amp; Payment Audit</div>
        <table className="bill-tbl">
          <tbody>
            <tr>
              <td style={{ width: '25%', fontWeight: 700, backgroundColor: '#fafafa' }}>Payment Method</td>
              <td style={{ width: '25%' }}>{booking.paymentMethod || 'Credit Card'}</td>
              <td style={{ width: '25%', fontWeight: 700, backgroundColor: '#fafafa' }}>Payment Status</td>
              <td style={{ width: '25%', color: '#047857', fontWeight: 700 }}>✓ Completed &amp; Cleared</td>
            </tr>
            <tr>
              <td style={{ fontWeight: 700, backgroundColor: '#fafafa' }}>Booked By</td>
              <td>{booking.guestName} ({booking.guestEmail})</td>
              <td style={{ fontWeight: 700, backgroundColor: '#fafafa' }}>Cancellation Policy</td>
              <td>100% Refundable up to 48 hours prior to check-in</td>
            </tr>
          </tbody>
        </table>

        {/* Footer */}
        <div style={{ borderTop: '2px solid #e4e4e7', paddingTop: 10, marginTop: 16, textAlign: 'center', fontSize: 9, color: '#71717a', lineHeight: 1.4 }}>
          <p><strong>HavenStay Hospitality Platform</strong> · Official Guest Folio and Tax Receipt · Computer-generated document</p>
          <p>This document serves as proof of reservation and payment. Please present valid photo ID during check-in at the property.</p>
          <p style={{ marginTop: 2 }}>Thank you for booking with HavenStay. Have a safe and pleasant journey!</p>
        </div>
      </div>

      {/* Also show bill on screen for preview */}
      <div className="print:hidden max-w-3xl mx-auto px-4 sm:px-6 pb-16 mt-0">
        <div className="bg-white rounded-3xl border border-neutral-200 shadow-sm overflow-hidden">
          {/* Bill header */}
          <div className="bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-6 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg bg-brand-coral flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>
                </div>
                <span className="text-lg font-black">HavenStay</span>
              </div>
              <p className="text-xs text-neutral-400">Booking Receipt / Bill</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-black text-brand-coral">#{booking.id}</p>
              <p className="text-xs text-neutral-400 mt-1">Issued {booking.createdAt}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                ✓ CONFIRMED
              </span>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Property & Stay Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-brand-coral flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Property
                </h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-neutral-500 w-28">Name</span><span className="font-semibold text-neutral-800 text-right flex-1">{booking.propertyTitle}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500 w-28">Location</span><span className="font-semibold text-neutral-800 text-right flex-1">{booking.propertyLocation}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500 w-28">Host</span><span className="font-semibold text-neutral-800">{booking.hostName}</span></div>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-brand-coral flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Stay Details
                </h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span className="text-neutral-500 w-28">Check-in</span><span className="font-semibold text-neutral-800">{booking.checkIn} at {booking.checkInTime || '15:00'}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500 w-28">Check-out</span><span className="font-semibold text-neutral-800">{booking.checkOut} at {booking.checkOutTime || '11:00'}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500 w-28">Nights</span><span className="font-semibold text-neutral-800">{booking.nights}</span></div>
                  <div className="flex justify-between"><span className="text-neutral-500 w-28">Guests</span><span className="font-semibold text-neutral-800">{booking.guestCount || 1}</span></div>
                </div>
              </div>
            </div>

            {/* Guest Details */}
            {guestDetails.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-brand-coral flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" /> Guest Details ({guestDetails.length} Registered)
                </h3>
                <div className="space-y-3">
                  {guestDetails.map((g, idx) => (
                    <div key={idx} className="bg-neutral-50 rounded-2xl p-4 border border-neutral-100">
                      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                        <div className="flex items-center gap-2">
                          <Initials name={g.fullName} className="w-8 h-8 text-xs" />
                          <div>
                            <p className="text-xs font-bold text-neutral-800">
                              {g.fullName || `Guest ${idx + 1}`}
                            </p>
                            <span className="text-[10px] text-neutral-500 font-medium">
                              {idx === 0 ? 'Primary Reservation Contact' : `Additional Guest #${idx + 1}`}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ✓ Verified Guest
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-2 text-xs">
                        {[
                          ['Age', g.age ? `${g.age} yrs` : '—'],
                          ['Gender', g.gender || '—'],
                          ['Expected In', g.checkInTime || booking.checkInTime || '15:00'],
                          ['Expected Out', g.checkOutTime || booking.checkOutTime || '11:00'],
                          ['Email', g.email || '—'],
                          ['Phone', g.phone || '—'],
                          ['ID Type', (g.idProofType || 'Govt').replace('_', ' ')],
                          ['Address', g.address || '—'],
                        ].map(([label, val]) => val ? (
                          <div key={label} className={label === 'Address' || label === 'Email' ? 'col-span-2' : ''}>
                            <span className="text-neutral-400 block text-[10px] uppercase tracking-wider">{label}</span>
                            <span className="font-semibold text-neutral-800 break-words">{val}</span>
                          </div>
                        ) : null)}
                      </div>

                      {/* Photo ID Proof Preview */}
                      {(g.idProofPreview || g.idProofFileName) && (
                        <div className="mt-3 pt-3 border-t border-neutral-200/60 flex items-center justify-between gap-3 bg-white p-2.5 rounded-xl border border-neutral-100">
                          <div className="flex items-center gap-3">
                            {g.idProofPreview ? (
                              <img
                                src={g.idProofPreview}
                                alt="Photo ID Proof"
                                onClick={() => setSelectedIdPhoto({ src: g.idProofPreview, name: g.fullName, type: g.idProofType })}
                                className="w-16 h-11 object-cover rounded-lg border border-neutral-200 cursor-pointer hover:opacity-90 shadow-2xs transition-opacity"
                              />
                            ) : (
                              <div className="w-16 h-11 bg-neutral-100 rounded-lg flex items-center justify-center text-[10px] font-bold text-neutral-500">
                                ID DOC
                              </div>
                            )}
                            <div>
                              <p className="text-xs font-bold text-neutral-800 flex items-center gap-1">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                                <span>Photo ID Proof Document</span>
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
                              className="text-[11px] font-bold text-brand-coral hover:underline"
                            >
                              View ID &rarr;
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-brand-coral flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" /> Price Breakdown
              </h3>
              <div className="rounded-2xl border border-neutral-200 overflow-hidden">
                <table className="w-full text-xs">
                  <tbody className="divide-y divide-neutral-100">
                    {[
                      [`Room Rate (${formatCurrency(priceDetails.nightlyRate || booking.totalPrice / (booking.nights || 1))} × ${booking.nights} nights)`, priceDetails.stayCost],
                      ['Cleaning Fee', priceDetails.cleaningFee],
                      ['Service Fee', priceDetails.serviceFee],
                      ['Taxes & Fees', priceDetails.occupancyTaxes],
                    ].map(([label, val]) => (
                      <tr key={label} className="hover:bg-neutral-50">
                        <td className="py-3 px-4 text-neutral-600">{label}</td>
                        <td className="py-3 px-4 font-semibold text-neutral-800 text-right">{formatCurrency(val || 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-neutral-900 text-white">
                    <tr>
                      <td className="py-4 px-4 font-black text-sm">Total (USD)</td>
                      <td className="py-4 px-4 font-black text-xl text-brand-coral text-right">{formatCurrency(booking.totalPrice)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Payment row */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-neutral-50 rounded-2xl border border-neutral-100 text-xs">
              <div><span className="text-neutral-400 block text-[10px] uppercase tracking-wider mb-0.5">Payment Status</span><span className="font-bold text-emerald-600">✓ Paid (Demo)</span></div>
              <div><span className="text-neutral-400 block text-[10px] uppercase tracking-wider mb-0.5">Method</span><span className="font-semibold text-neutral-800">{booking.paymentMethod || 'Credit Card'}</span></div>
              <div><span className="text-neutral-400 block text-[10px] uppercase tracking-wider mb-0.5">Cancellation</span><span className="font-semibold text-neutral-800">Free within 48h</span></div>
              <div><span className="text-neutral-400 block text-[10px] uppercase tracking-wider mb-0.5">Booked By</span><span className="font-semibold text-neutral-800">{booking.guestName}</span></div>
            </div>
          </div>

          {/* Bill footer */}
          <div className="bg-neutral-50 border-t border-neutral-100 p-4 text-center text-[10px] text-neutral-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500 mx-auto mb-1.5" />
            Computer-generated receipt · HavenStay Demo Platform · Thank you for your booking!
          </div>
        </div>
      </div>

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
    </>
  );
};
