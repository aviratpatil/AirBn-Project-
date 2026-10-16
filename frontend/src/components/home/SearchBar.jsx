import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { POPULAR_DESTINATIONS } from '../../data/popularDestinations';
import { Search, MapPin, Calendar, Users, Plus, Minus, X } from 'lucide-react';

export const SearchBar = () => {
  const navigate = useNavigate();
  const { searchParams, updateSearchFilter } = useApp();

  const [activeTab, setActiveTab] = useState(null); // 'where' | 'dates' | 'who' | null
  const [destination, setDestination] = useState(searchParams.destination || '');
  const [checkIn, setCheckIn] = useState(searchParams.checkIn || '');
  const [checkOut, setCheckOut] = useState(searchParams.checkOut || '');
  const [guests, setGuests] = useState(
    searchParams.guests || { adults: 1, children: 0, infants: 0, pets: 0 }
  );

  const containerRef = useRef(null);

  // Close search popovers on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setActiveTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalGuests = guests.adults + guests.children;
  const guestSummary =
    totalGuests > 0
      ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}${
          guests.infants > 0 ? `, ${guests.infants} infant${guests.infants > 1 ? 's' : ''}` : ''
        }${guests.pets > 0 ? `, ${guests.pets} pet${guests.pets > 1 ? 's' : ''}` : ''}`
      : 'Add guests';

  const handleSearch = (e) => {
    e?.preventDefault();
    updateSearchFilter('category', 'all');
    updateSearchFilter('destination', destination);
    updateSearchFilter('checkIn', checkIn);
    updateSearchFilter('checkOut', checkOut);
    updateSearchFilter('guests', guests);

    const query = new URLSearchParams();
    if (destination) query.set('destination', destination);
    if (checkIn) query.set('checkIn', checkIn);
    if (checkOut) query.set('checkOut', checkOut);
    if (totalGuests > 0) query.set('guests', totalGuests.toString());

    setActiveTab(null);
    navigate(`/search?${query.toString()}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  const updateGuestCount = (type, delta) => {
    setGuests((prev) => {
      const current = prev[type];
      const next = Math.max(type === 'adults' ? 1 : 0, current + delta);
      return { ...prev, [type]: next };
    });
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto z-30" ref={containerRef}>
      {/* Outer Search Bar Container */}
      <div
        className={`flex flex-col md:flex-row items-center bg-white rounded-3xl md:rounded-full border border-neutral-200 shadow-search hover:shadow-airbnb-hover transition-all duration-300 p-2 ${
          activeTab ? 'bg-neutral-100 ring-2 ring-neutral-200' : ''
        }`}
      >
        {/* Destination Section */}
        <div
          onClick={() => setActiveTab('where')}
          className={`relative flex-1 w-full md:w-auto px-6 py-3 rounded-full cursor-pointer transition-colors ${
            activeTab === 'where' ? 'bg-white shadow-md' : 'hover:bg-neutral-50 md:hover:bg-neutral-100/60'
          }`}
        >
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">Where</span>
            <input
              type="text"
              placeholder="Search destinations..."
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyDown={handleKeyDown}
              className="text-sm font-semibold text-neutral-800 placeholder:text-neutral-400 bg-transparent outline-none w-full truncate"
            />
          </div>

          {/* Where Popover */}
          {activeTab === 'where' && (
            <div className="absolute top-full left-0 mt-3 w-full md:w-[460px] bg-white rounded-3xl shadow-float border border-neutral-100 p-6 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Search by region or destination
                </span>
                {destination && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDestination('');
                    }}
                    className="text-xs text-neutral-400 hover:text-neutral-800"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto no-scrollbar">
                {POPULAR_DESTINATIONS.map((dest) => (
                  <div
                    key={dest.name}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDestination(dest.location);
                      setActiveTab(null);
                    }}
                    className="flex items-center gap-3 p-2 rounded-2xl hover:bg-neutral-50 cursor-pointer border border-transparent hover:border-neutral-200 transition-all group"
                  >
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-12 h-12 rounded-xl object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="flex flex-col overflow-hidden text-left">
                      <span className="text-xs font-bold text-neutral-800 truncate group-hover:text-brand-coral transition-colors">
                        {dest.name}
                      </span>
                      <span className="text-[11px] text-neutral-400 truncate">{dest.subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:block h-8 w-[1px] bg-neutral-200" />

        {/* Check-in & Check-out Section */}
        <div
          onClick={() => setActiveTab('dates')}
          className={`relative flex-1 w-full md:w-auto px-6 py-3 rounded-full cursor-pointer transition-colors ${
            activeTab === 'dates' ? 'bg-white shadow-md' : 'hover:bg-neutral-50 md:hover:bg-neutral-100/60'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">Check in</span>
              <span className="text-sm font-semibold text-neutral-700 truncate">
                {checkIn ? checkIn : 'Add dates'}
              </span>
            </div>
            <div className="flex flex-col text-left pl-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">Check out</span>
              <span className="text-sm font-semibold text-neutral-700 truncate">
                {checkOut ? checkOut : 'Add dates'}
              </span>
            </div>
          </div>

          {/* Dates Popover */}
          {activeTab === 'dates' && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-full md:w-96 bg-white rounded-3xl shadow-float border border-neutral-100 p-6 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Select your trip dates
                </span>
                {(checkIn || checkOut) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCheckIn('');
                      setCheckOut('');
                    }}
                    className="text-xs text-neutral-400 hover:text-neutral-800"
                  >
                    Reset
                  </button>
                )}
              </div>

              <div className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-coral"
                  />
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveTab('who');
                    }}
                    className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-xs font-semibold hover:bg-neutral-800 transition-colors"
                  >
                    Next: Add Guests
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden md:block h-8 w-[1px] bg-neutral-200" />

        {/* Guests Section */}
        <div
          onClick={() => setActiveTab('who')}
          className={`relative flex-1 w-full md:w-auto px-6 py-3 rounded-full cursor-pointer transition-colors ${
            activeTab === 'who' ? 'bg-white shadow-md' : 'hover:bg-neutral-50 md:hover:bg-neutral-100/60'
          }`}
        >
          <div className="flex flex-col text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-800">Who</span>
            <span className="text-sm font-semibold text-neutral-700 truncate">{guestSummary}</span>
          </div>

          {/* Who Popover */}
          {activeTab === 'who' && (
            <div className="absolute top-full right-0 mt-3 w-full md:w-80 bg-white rounded-3xl shadow-float border border-neutral-100 p-6 z-50 animate-in fade-in zoom-in-95 text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-4">
                Guests
              </span>

              <div className="space-y-4 divide-y divide-neutral-100">
                {/* Adults */}
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <p className="text-sm font-bold text-neutral-800">Adults</p>
                    <p className="text-xs text-neutral-400">Ages 13 or above</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={guests.adults <= 1}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateGuestCount('adults', -1);
                      }}
                      className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-neutral-800"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{guests.adults}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateGuestCount('adults', 1);
                      }}
                      className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-800"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-bold text-neutral-800">Children</p>
                    <p className="text-xs text-neutral-400">Ages 2–12</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={guests.children <= 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateGuestCount('children', -1);
                      }}
                      className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-neutral-800"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{guests.children}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateGuestCount('children', 1);
                      }}
                      className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-800"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Infants */}
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-bold text-neutral-800">Infants</p>
                    <p className="text-xs text-neutral-400">Under 2</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={guests.infants <= 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateGuestCount('infants', -1);
                      }}
                      className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-neutral-800"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{guests.infants}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateGuestCount('infants', 1);
                      }}
                      className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-800"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Pets */}
                <div className="flex items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-bold text-neutral-800">Pets</p>
                    <p className="text-xs text-neutral-400">Bringing a service animal?</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={guests.pets <= 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        updateGuestCount('pets', -1);
                      }}
                      className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed hover:border-neutral-800"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{guests.pets}</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        updateGuestCount('pets', 1);
                      }}
                      className="w-8 h-8 rounded-full border border-neutral-300 flex items-center justify-center text-neutral-600 hover:border-neutral-800"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Submit Button */}
        <div className="p-1 w-full md:w-auto">
          <button
            onClick={handleSearch}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-brand-coral to-rose-600 hover:from-brand-coral-dark hover:to-rose-700 text-white font-bold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
            aria-label="Search"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span className="text-sm">Search</span>
          </button>
        </div>
      </div>
    </div>
  );
};
