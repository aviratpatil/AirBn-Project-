import React from 'react';
import { X } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const ActiveFilterChips = ({ filters, onRemoveFilter, onResetAll }) => {
  const chips = [];

  if (filters.destination) {
    chips.push({ key: 'destination', label: `Location: ${filters.destination}` });
  }
  if (filters.category && filters.category !== 'all') {
    chips.push({ key: 'category', label: `Category: ${filters.category}` });
  }
  if (filters.minPrice > 0) {
    chips.push({ key: 'minPrice', label: `Min: ${formatCurrency(filters.minPrice)}` });
  }
  if (filters.maxPrice < 1500) {
    chips.push({ key: 'maxPrice', label: `Max: ${formatCurrency(filters.maxPrice)}` });
  }
  if (filters.propertyType && filters.propertyType !== 'all') {
    chips.push({ key: 'propertyType', label: `Type: ${filters.propertyType}` });
  }
  if (filters.minRating > 0) {
    chips.push({ key: 'minRating', label: `${filters.minRating}★+` });
  }
  if (filters.superhostOnly) {
    chips.push({ key: 'superhostOnly', label: 'Superhost' });
  }
  if (filters.amenities && filters.amenities.length > 0) {
    filters.amenities.forEach((amenity) => {
      chips.push({ key: `amenity-${amenity}`, label: amenity, isAmenity: true, amenityVal: amenity });
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-3">
      <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider mr-1">
        Active Filters:
      </span>
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-colors"
        >
          <span>{chip.label}</span>
          <button
            onClick={() => onRemoveFilter(chip)}
            className="hover:text-brand-coral transition-colors"
            aria-label={`Remove filter ${chip.label}`}
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </span>
      ))}
      <button
        onClick={onResetAll}
        className="text-xs font-bold text-brand-coral hover:underline ml-2"
      >
        Clear all
      </button>
    </div>
  );
};
