import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  formatCurrency,
  calculateNights,
  calculateBookingPrice
} from '../../utils/formatters';
import { Star, ShieldCheck, ChevronDown, Plus, Minus, Info } from 'lucide-react';

export const BookingCard = ({ property }) => {
  const navigate = useNavigate();

  // Initial demo dates
  const [checkIn, setCheckIn] = useState('2026-11-12');
  const [checkOut, setCheckOut] = useState('2026-11-17');
  const [isGuestDropdownOpen, setIsGuestDropdownOpen] = useState(false);
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    infants: 0,
    pets: 0
  });

  const nights = calculateNights(checkIn, checkOut);
  const priceDetails = calculateBookingPrice(
    property.price,
    nights,
    property.cleaningFee || 100,
    property.serviceFeePercent || 0.12
  );

  const totalGuests = guests.adults + guests.children;
  const maxGuests = property.capacity?.guests || 6;

  const updateGuests = (type, delta) => {
    setGuests((prev) => {
      const current = prev[type];
      const next = Math.max(type === 'adults' ? 1 : 0, current + delta);
      // Ensure we don't exceed maxGuests
      const futureTotal =
        (type === 'adults' ? next : prev.adults) +
        (type === 'children' ? next : prev.children);
      if (futureTotal > maxGuests) return prev;
      return { ...prev, [type]: next };
    });
  };

  const handleReserve = () => {
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      adults: guests.adults.toString(),
      children: guests.children.toString(),
      infants: guests.infants.toString(),
      pets: guests.pets.toString()
    });
    navigate(`/book/${property.id}?${params.toString()}`);
  };

  return (
    <div className="sticky top-28 bg-white rounded-3xl border border-neutral-200 shadow-float p-6 w-full">
      {/* Header */}
      <div className="flex items-baseline justify-between mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-neutral-900">
            {formatCurrency(property.price)}
          </span>
          <span className="text-sm font-semibold text-neutral-500">/ night</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-bold text-neutral-800">
          <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
          <span>{property.rating ? property.rating.toFixed(2) : '5.0'}</span>
          <span className="text-neutral-400">&middot;</span>
          <span className="underline text-neutral-500">{property.reviewCount || 0} reviews</span>
        </div>
      </div>

      {/* Date & Guest Inputs */}
      <div className="border border-neutral-300 rounded-2xl overflow-hidden mb-4 divide-y divide-neutral-300">
        <div className="grid grid-cols-2 divide-x divide-neutral-300">
          <div className="p-3">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-800">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-xs font-semibold text-neutral-800 bg-transparent outline-none mt-0.5 cursor-pointer"
            />
          </div>
          <div className="p-3">
            <label className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-800">
              Checkout
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-xs font-semibold text-neutral-800 bg-transparent outline-none mt-0.5 cursor-pointer"
            />
          </div>
        </div>

        {/* Guest Selector */}
        <div className="relative p-3">
          <div
            onClick={() => setIsGuestDropdownOpen(!isGuestDropdownOpen)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div>
              <span className="block text-[10px] font-extrabold uppercase tracking-wider text-neutral-800">
                Guests
              </span>
              <span className="text-xs font-semibold text-neutral-800">
                {totalGuests} guest{totalGuests > 1 ? 's' : ''}
                {guests.infants > 0 && `, ${guests.infants} infant`}
                {guests.pets > 0 && `, ${guests.pets} pet`}
              </span>
            </div>
            <ChevronDown
              className={`w-4 h-4 text-neutral-500 transition-transform ${
                isGuestDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </div>

          {/* Guest Selector Dropdown */}
          {isGuestDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-float border border-neutral-200 p-4 z-30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-800">Adults</p>
                  <p className="text-[10px] text-neutral-400">Age 13+</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={guests.adults <= 1}
                    onClick={() => updateGuests('adults', -1)}
                    className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-xs disabled:opacity-30"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{guests.adults}</span>
                  <button
                    disabled={totalGuests >= maxGuests}
                    onClick={() => updateGuests('adults', 1)}
                    className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-xs disabled:opacity-30"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-800">Children</p>
                  <p className="text-[10px] text-neutral-400">Ages 2–12</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={guests.children <= 0}
                    onClick={() => updateGuests('children', -1)}
                    className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-xs disabled:opacity-30"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{guests.children}</span>
                  <button
                    disabled={totalGuests >= maxGuests}
                    onClick={() => updateGuests('children', 1)}
                    className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-xs disabled:opacity-30"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-neutral-800">Pets</p>
                  <p className="text-[10px] text-neutral-400">Service animals</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={guests.pets <= 0}
                    onClick={() => updateGuests('pets', -1)}
                    className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-xs disabled:opacity-30"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{guests.pets}</span>
                  <button
                    onClick={() => updateGuests('pets', 1)}
                    className="w-7 h-7 rounded-full border border-neutral-300 flex items-center justify-center text-xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <div className="pt-2 text-right">
                <button
                  type="button"
                  onClick={() => setIsGuestDropdownOpen(false)}
                  className="text-xs font-bold text-neutral-900 underline hover:text-black"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reserve CTA */}
      <button
        onClick={handleReserve}
        className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-brand-coral to-rose-600 hover:from-brand-coral-dark hover:to-rose-700 text-white font-bold text-base shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
      >
        Reserve Demo Stay
      </button>

      <p className="text-center text-xs text-neutral-500 mt-3">You won't be charged yet</p>

      {/* Pricing Breakdown */}
      <div className="mt-6 space-y-3 divide-y divide-neutral-100 text-sm">
        <div className="flex justify-between items-center text-neutral-600 pt-2">
          <span className="underline">
            {formatCurrency(property.price)} x {priceDetails.nights} nights
          </span>
          <span className="font-semibold text-neutral-900">
            {formatCurrency(priceDetails.stayCost)}
          </span>
        </div>

        <div className="flex justify-between items-center text-neutral-600 pt-3">
          <span className="underline">Cleaning fee</span>
          <span className="font-semibold text-neutral-900">
            {formatCurrency(priceDetails.cleaningFee)}
          </span>
        </div>

        <div className="flex justify-between items-center text-neutral-600 pt-3">
          <span className="underline">HavenStay service fee</span>
          <span className="font-semibold text-neutral-900">
            {formatCurrency(priceDetails.serviceFee)}
          </span>
        </div>

        <div className="flex justify-between items-center text-neutral-600 pt-3">
          <span className="underline">Occupancy taxes & fees</span>
          <span className="font-semibold text-neutral-900">
            {formatCurrency(priceDetails.occupancyTaxes)}
          </span>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-4 text-base font-extrabold text-neutral-900">
          <span>Total before taxes</span>
          <span className="text-lg font-black text-brand-coral">
            {formatCurrency(priceDetails.total)}
          </span>
        </div>
      </div>

      {/* Superhost / Protection Guarantee Note */}
      <div className="mt-6 p-3 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center gap-3 text-xs text-neutral-600">
        <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
        <span>
          Every booking includes <strong>HavenStay Cover</strong>: comprehensive damage protection & host cancellation safety.
        </span>
      </div>
    </div>
  );
};
