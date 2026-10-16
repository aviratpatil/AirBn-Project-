import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { SearchBar } from '../components/home/SearchBar';
import { CategoryBar } from '../components/home/CategoryBar';
import { PropertyGrid } from '../components/property/PropertyGrid';
import { FilterModal } from '../components/search/FilterModal';
import { ActiveFilterChips } from '../components/search/ActiveFilterChips';
import { Sparkles, ShieldCheck, Award, Compass } from 'lucide-react';

export const HomePage = () => {
  const {
    properties,
    searchParams,
    setSearchParams,
    updateSearchFilter,
    resetFilters
  } = useApp();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter properties based on active category and any search filters
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Category filter
      if (searchParams.category && searchParams.category !== 'all') {
        if (prop.category !== searchParams.category) return false;
      }
      // Destination filter
      if (searchParams.destination) {
        const dest = searchParams.destination.toLowerCase();
        const matchesCity = prop.city?.toLowerCase().includes(dest);
        const matchesCountry = prop.country?.toLowerCase().includes(dest);
        const matchesLocation = prop.location?.toLowerCase().includes(dest);
        if (!matchesCity && !matchesCountry && !matchesLocation) return false;
      }
      // Price filter
      if (searchParams.minPrice && prop.price < searchParams.minPrice) return false;
      if (searchParams.maxPrice && prop.price > searchParams.maxPrice) return false;
      // Property type
      if (searchParams.propertyType && searchParams.propertyType !== 'all') {
        if (!prop.propertyType?.toLowerCase().includes(searchParams.propertyType.toLowerCase())) {
          return false;
        }
      }
      // Rating filter
      if (searchParams.minRating && (prop.rating || 0) < searchParams.minRating) return false;
      // Superhost filter
      if (searchParams.superhostOnly && !prop.isSuperhost) return false;
      // Amenities filter
      if (searchParams.amenities && searchParams.amenities.length > 0) {
        const hasAllAmenities = searchParams.amenities.every((amenity) =>
          prop.amenities?.some((a) => a.toLowerCase().includes(amenity.toLowerCase()))
        );
        if (!hasAllAmenities) return false;
      }

      return true;
    });
  }, [properties, searchParams]);

  const handleApplyFilters = (newFilters) => {
    setIsLoading(true);
    setSearchParams((prev) => ({ ...prev, ...newFilters }));
    setTimeout(() => setIsLoading(false), 250);
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
      {/* Hero Search Section */}
      <section className="bg-gradient-to-b from-neutral-50 to-white pt-8 pb-10 border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-coral text-xs font-bold mb-4 shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Luxury Stays & Hidden Gems</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight max-w-2xl mx-auto mb-3">
            Find places to stay that feel like <span className="text-brand-coral">paradise</span>
          </h1>
          <p className="text-neutral-500 text-sm sm:text-base max-w-xl mx-auto mb-8 font-normal">
            Discover architectural chalets, beachfront pavilions, and historic villas vetted for design and comfort.
          </p>

          {/* Main Interactive Search Bar */}
          <SearchBar />
        </div>
      </section>

      {/* Category Scroll Filter Bar */}
      <CategoryBar onOpenFilterModal={() => setIsFilterModalOpen(true)} />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Filter Chips */}
        <ActiveFilterChips
          filters={searchParams}
          onRemoveFilter={handleRemoveFilter}
          onResetAll={resetFilters}
        />

        {/* Results Count & Quick Status */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
            {filteredProperties.length} {filteredProperties.length === 1 ? 'exceptional place' : 'exceptional places'} available
          </p>

          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="lg:hidden text-xs font-bold text-neutral-800 border border-neutral-300 rounded-full px-3 py-1.5 hover:border-black"
          >
            Filters
          </button>
        </div>

        {/* Property Grid */}
        <PropertyGrid
          properties={filteredProperties}
          isLoading={isLoading}
          onResetFilters={resetFilters}
        />

        {/* Why Book With HavenStay Banner */}
        <section className="mt-20 p-8 sm:p-12 rounded-3xl bg-neutral-50 border border-neutral-200">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mb-2">
              The HavenStay Standard
            </h2>
            <p className="text-sm text-neutral-500">
              Every home in our collection meets rigorous standards of cleanliness, architectural beauty, and guest hospitality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-coral mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-1">HavenCover Protection</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Comprehensive booking protection including alternative stay rebooking and 24/7 guest support.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-coral mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-1">Superhost Certified</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Stay with our highest-rated hosts committed to extraordinary hospitality and local insider guidance.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand-coral mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 mb-1">Architectural Excellence</h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Hand-picked stays designed by world-renowned architects, timber craftsmen, and interior stylists.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Filter Modal */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={searchParams}
        onApplyFilters={handleApplyFilters}
        onResetFilters={resetFilters}
        totalMatchingCount={filteredProperties.length}
      />
    </div>
  );
};
