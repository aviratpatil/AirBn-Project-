import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PropertyGrid } from '../components/property/PropertyGrid';
import { FilterModal } from '../components/search/FilterModal';
import { ActiveFilterChips } from '../components/search/ActiveFilterChips';
import { SearchBar } from '../components/home/SearchBar';
import {
  SlidersHorizontal,
  ArrowUpDown,
  MapPin,
  Map,
  Grid,
  ChevronRight
} from 'lucide-react';

export const SearchResultsPage = () => {
  const [urlParams] = useSearchParams();
  const { properties, searchParams, setSearchParams, updateSearchFilter, resetFilters } = useApp();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'split'

  // Sync URL search params with context state on load
  useEffect(() => {
    const destination = urlParams.get('destination');
    const checkIn = urlParams.get('checkIn');
    const checkOut = urlParams.get('checkOut');
    const category = urlParams.get('category');

    if (destination !== null) updateSearchFilter('destination', destination);
    if (checkIn !== null) updateSearchFilter('checkIn', checkIn);
    if (checkOut !== null) updateSearchFilter('checkOut', checkOut);
    if (category !== null) updateSearchFilter('category', category);
  }, [urlParams]);

  // Filter properties
  const filteredAndSortedProperties = useMemo(() => {
    let result = properties.filter((prop) => {
      // Destination
      if (searchParams.destination) {
        const dest = searchParams.destination.toLowerCase();
        const matchesCity = prop.city?.toLowerCase().includes(dest);
        const matchesCountry = prop.country?.toLowerCase().includes(dest);
        const matchesLocation = prop.location?.toLowerCase().includes(dest);
        if (!matchesCity && !matchesCountry && !matchesLocation) return false;
      }
      // Category
      if (searchParams.category && searchParams.category !== 'all') {
        if (prop.category !== searchParams.category) return false;
      }
      // Price
      if (searchParams.minPrice && prop.price < searchParams.minPrice) return false;
      if (searchParams.maxPrice && prop.price > searchParams.maxPrice) return false;
      // Property type
      if (searchParams.propertyType && searchParams.propertyType !== 'all') {
        if (!prop.propertyType?.toLowerCase().includes(searchParams.propertyType.toLowerCase())) {
          return false;
        }
      }
      // Rating
      if (searchParams.minRating && (prop.rating || 0) < searchParams.minRating) return false;
      // Superhost
      if (searchParams.superhostOnly && !prop.isSuperhost) return false;
      // Amenities
      if (searchParams.amenities && searchParams.amenities.length > 0) {
        const hasAllAmenities = searchParams.amenities.every((amenity) =>
          prop.amenities?.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'reviews') {
      result.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    return result;
  }, [properties, searchParams, sortBy]);

  const handleApplyFilters = (newFilters) => {
    setSearchParams((prev) => ({ ...prev, ...newFilters }));
  };

  const handleRemoveFilter = (chip) => {
    if (chip.isAmenity) {
      const updated = (searchParams.amenities || []).filter((a) => a !== chip.amenityVal);
      updateSearchFilter('amenities', updated);
    } else if (chip.key === 'destination') {
      updateSearchFilter('destination', '');
    } else if (chip.key === 'category') {
      updateSearchFilter('category', 'all');
    } else if (chip.key === 'minPrice') {
      updateSearchFilter('minPrice', 0);
    } else if (chip.key === 'maxPrice') {
      updateSearchFilter('maxPrice', 1500);
    } else if (chip.key === 'propertyType') {
      updateSearchFilter('propertyType', 'all');
    } else if (chip.key === 'minRating') {
      updateSearchFilter('minRating', 0);
    } else if (chip.key === 'superhostOnly') {
      updateSearchFilter('superhostOnly', false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Search Header Bar */}
      <div className="bg-neutral-50/70 border-b border-neutral-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-neutral-900 font-bold">Search Stays</span>
            {searchParams.destination && (
              <>
                <ChevronRight className="w-3.5 h-3.5" />
                <span className="text-brand-coral font-bold">{searchParams.destination}</span>
              </>
            )}
          </div>

          <SearchBar />
        </div>
      </div>

      {/* Main Results Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header with Sorting and Filter Trigger */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-100">
          <div>
            <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
              {searchParams.destination
                ? `Stays in ${searchParams.destination}`
                : 'All Vacation Rentals Worldwide'}
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Over {filteredAndSortedProperties.length} verified stays available
              {searchParams.checkIn && searchParams.checkOut
                ? ` &middot; ${searchParams.checkIn} to ${searchParams.checkOut}`
                : ''}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 border border-neutral-200 rounded-2xl px-3 py-2 text-xs font-semibold text-neutral-800">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
              <label htmlFor="sort-select" className="sr-only">Sort properties</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent outline-none cursor-pointer font-bold text-neutral-900"
              >
                <option value="recommended">Sort: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>

            {/* Filter Modal Trigger */}
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className="flex items-center gap-2 border border-neutral-200 hover:border-neutral-900 rounded-2xl px-4 py-2 text-xs font-bold text-neutral-800 hover:shadow-xs transition-all"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-brand-coral" />
              <span>Filters</span>
            </button>

            {/* View Mode Toggle (Grid vs Mock Map Split) */}
            <div className="hidden sm:flex items-center border border-neutral-200 rounded-2xl p-1 bg-neutral-50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-xl transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-500'
                }`}
                title="Grid view"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('split')}
                className={`p-1.5 rounded-xl transition-all ${
                  viewMode === 'split' ? 'bg-white shadow-xs text-neutral-900' : 'text-neutral-500'
                }`}
                title="Split map view"
              >
                <Map className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        <ActiveFilterChips
          filters={searchParams}
          onRemoveFilter={handleRemoveFilter}
          onResetAll={resetFilters}
        />

        {/* View Layout (Grid or Split with Map) */}
        {viewMode === 'grid' ? (
          <div className="pt-4">
            <PropertyGrid
              properties={filteredAndSortedProperties}
              onResetFilters={resetFilters}
            />
          </div>
        ) : (
          <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Properties Column */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredAndSortedProperties.map((prop) => (
                  <PropertyCard key={prop.id} property={prop} />
                ))}
              </div>
            </div>

            {/* Right Interactive Mock Map Column */}
            <div className="hidden lg:block lg:col-span-5 sticky top-28 h-[calc(100vh-8rem)] rounded-3xl overflow-hidden border border-neutral-200 shadow-md relative bg-neutral-100">
              {/* Map Canvas Background */}
              <div className="absolute inset-0 bg-[#E8ECE9] flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full opacity-30" viewBox="0 0 400 400">
                  <path d="M 0,100 Q 150,50 200,200 T 400,300" stroke="#87A987" strokeWidth="4" fill="none" />
                  <path d="M 100,0 Q 200,250 350,200 T 400,400" stroke="#7BA0BA" strokeWidth="6" fill="none" />
                  <circle cx="150" cy="180" r="40" fill="#D3E4CD" />
                  <circle cx="280" cy="120" r="60" fill="#E2E7DB" />
                </svg>

                {/* Map Interactive Pins for Properties */}
                {filteredAndSortedProperties.slice(0, 6).map((prop, index) => {
                  const offsets = [
                    { top: '25%', left: '30%' },
                    { top: '45%', left: '60%' },
                    { top: '65%', left: '40%' },
                    { top: '35%', left: '75%' },
                    { top: '75%', left: '20%' },
                    { top: '15%', left: '50%' }
                  ];
                  const pos = offsets[index % offsets.length];

                  return (
                    <Link
                      key={prop.id}
                      to={`/property/${prop.id}`}
                      style={{ top: pos.top, left: pos.left }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group z-20"
                    >
                      <div className="px-3 py-1.5 rounded-full bg-white text-neutral-900 font-extrabold text-xs shadow-lg border border-neutral-300 group-hover:scale-110 group-hover:bg-neutral-900 group-hover:text-white transition-all flex items-center gap-1">
                        <span>${prop.price}</span>
                      </div>
                    </Link>
                  );
                })}

                {/* Map Floating Guide Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-float border border-neutral-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-neutral-900">Interactive Map View</p>
                    <p className="text-[11px] text-neutral-500">
                      Hover over price markers to preview listings
                    </p>
                  </div>
                  <MapPin className="w-5 h-5 text-brand-coral" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={searchParams}
        onApplyFilters={handleApplyFilters}
        onResetFilters={resetFilters}
        totalMatchingCount={filteredAndSortedProperties.length}
      />
    </div>
  );
};
