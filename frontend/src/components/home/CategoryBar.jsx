import React, { useRef } from 'react';
import { CATEGORIES } from '../../data/categories';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Waves,
  Home,
  Mountain,
  Building2,
  Trees,
  Anchor,
  Crown,
  Compass,
  Palmtree,
  Snowflake,
  Sun,
  Flame,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

const ICON_MAP = {
  Sparkles,
  Waves,
  Home,
  Mountain,
  Building2,
  Trees,
  Anchor,
  Crown,
  Compass,
  Palmtree,
  Snowflake,
  Sun,
  Flame,
};

export const CategoryBar = ({ onOpenFilterModal }) => {
  const { searchParams, updateSearchFilter, showTotalWithTaxes, setShowTotalWithTaxes } = useApp();
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryId) => {
    updateSearchFilter('category', categoryId);
  };

  return (
    <div className="relative border-b border-neutral-100 bg-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="hidden md:flex p-1.5 rounded-full border border-neutral-200 bg-white hover:scale-105 shadow-sm text-neutral-600 transition-all shrink-0 z-10"
          aria-label="Scroll categories left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Categories Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-8 overflow-x-auto no-scrollbar scroll-smooth py-1"
        >
          {CATEGORIES.map((cat) => {
            const IconComponent = ICON_MAP[cat.icon] || Compass;
            const isSelected = (searchParams.category || 'all') === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`flex flex-col items-center gap-2 pb-2 border-b-2 transition-all whitespace-nowrap shrink-0 group ${
                  isSelected
                    ? 'border-neutral-900 text-neutral-900 font-bold'
                    : 'border-transparent text-neutral-500 hover:text-neutral-800 hover:border-neutral-300'
                }`}
              >
                <IconComponent
                  className={`w-6 h-6 transition-transform group-hover:scale-110 ${
                    isSelected ? 'text-brand-coral stroke-[2.2]' : 'text-neutral-500'
                  }`}
                />
                <span className="text-xs tracking-tight">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="hidden md:flex p-1.5 rounded-full border border-neutral-200 bg-white hover:scale-105 shadow-sm text-neutral-600 transition-all shrink-0 z-10"
          aria-label="Scroll categories right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Right Utility: Filters & Total Price Toggle */}
        <div className="hidden lg:flex items-center gap-3 shrink-0 pl-2">
          {/* Filters Modal Trigger */}
          <button
            onClick={onOpenFilterModal}
            className="flex items-center gap-2 border border-neutral-200 hover:border-neutral-800 rounded-xl px-4 py-2.5 text-xs font-bold text-neutral-800 hover:shadow-sm transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>

          {/* Display Total Before Taxes Toggle */}
          <div className="flex items-center gap-3 border border-neutral-200 rounded-xl px-4 py-2 text-xs font-bold text-neutral-800">
            <span className="whitespace-nowrap">Display total before taxes</span>
            <button
              role="switch"
              aria-checked={showTotalWithTaxes}
              onClick={() => setShowTotalWithTaxes(!showTotalWithTaxes)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                showTotalWithTaxes ? 'bg-neutral-900' : 'bg-neutral-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showTotalWithTaxes ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
