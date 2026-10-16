import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { formatCurrency } from '../../utils/formatters';
import {
  Wifi,
  Waves,
  Car,
  Tv,
  Utensils,
  Wind,
  Briefcase,
  Flame,
  Zap,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

const AMENITY_OPTIONS = [
  { id: 'Fast Wifi', label: 'Fast Wifi', icon: Wifi },
  { id: 'pool', label: 'Pool', icon: Waves },
  { id: 'hot tub', label: 'Hot tub', icon: Flame },
  { id: 'parking', label: 'Free parking', icon: Car },
  { id: 'kitchen', label: 'Kitchen', icon: Utensils },
  { id: 'air conditioning', label: 'Air conditioning', icon: Wind },
  { id: 'workspace', label: 'Dedicated workspace', icon: Briefcase },
  { id: 'EV charger', label: 'EV charger', icon: Zap },
  { id: 'sauna', label: 'Sauna', icon: Sparkles }
];

export const FilterModal = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
  totalMatchingCount
}) => {
  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice || 0);
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice || 1200);
  const [localPropertyType, setLocalPropertyType] = useState(filters.propertyType || 'all');
  const [localRating, setLocalRating] = useState(filters.minRating || 0);
  const [localAmenities, setLocalAmenities] = useState(filters.amenities || []);
  const [superhostOnly, setSuperhostOnly] = useState(filters.superhostOnly || false);

  const toggleAmenity = (id) => {
    setLocalAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const handleApply = () => {
    onApplyFilters({
      minPrice: Number(localMinPrice),
      maxPrice: Number(localMaxPrice),
      propertyType: localPropertyType,
      minRating: Number(localRating),
      amenities: localAmenities,
      superhostOnly
    });
    onClose();
  };

  const handleReset = () => {
    setLocalMinPrice(0);
    setLocalMaxPrice(1500);
    setLocalPropertyType('all');
    setLocalRating(0);
    setLocalAmenities([]);
    setSuperhostOnly(false);
    onResetFilters();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Filters" maxWidth="max-w-2xl">
      <div className="space-y-8 divide-y divide-neutral-100">
        {/* Price Range */}
        <div className="pt-2">
          <h4 className="text-base font-bold text-neutral-900 mb-1">Price range</h4>
          <p className="text-xs text-neutral-500 mb-4">Nightly prices before taxes and fees</p>

          <div className="flex items-center gap-4">
            <div className="flex-1 border border-neutral-300 rounded-2xl p-3 focus-within:ring-2 focus-within:ring-neutral-900">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                Minimum
              </label>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-sm font-semibold text-neutral-500">$</span>
                <input
                  type="number"
                  min="0"
                  max={localMaxPrice}
                  value={localMinPrice}
                  onChange={(e) => setLocalMinPrice(Number(e.target.value))}
                  className="w-full text-sm font-bold text-neutral-900 outline-none"
                />
              </div>
            </div>

            <div className="text-neutral-400 font-bold">—</div>

            <div className="flex-1 border border-neutral-300 rounded-2xl p-3 focus-within:ring-2 focus-within:ring-neutral-900">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                Maximum
              </label>
              <div className="flex items-center gap-1 mt-0.5">
                <span className="text-sm font-semibold text-neutral-500">$</span>
                <input
                  type="number"
                  min={localMinPrice}
                  max="2000"
                  value={localMaxPrice}
                  onChange={(e) => setLocalMaxPrice(Number(e.target.value))}
                  className="w-full text-sm font-bold text-neutral-900 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Type of Place */}
        <div className="pt-6">
          <h4 className="text-base font-bold text-neutral-900 mb-4">Type of place</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'all', label: 'Any type' },
              { id: 'Entire', label: 'Entire place' },
              { id: 'villa', label: 'Villa' },
              { id: 'cabin', label: 'Cabin' }
            ].map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setLocalPropertyType(type.id)}
                className={`py-3 px-3 rounded-2xl border text-xs font-bold transition-all text-center ${
                  localPropertyType === type.id
                    ? 'border-neutral-900 bg-neutral-900 text-white shadow-sm'
                    : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Guest Rating Filter */}
        <div className="pt-6">
          <h4 className="text-base font-bold text-neutral-900 mb-4">Minimum rating</h4>
          <div className="flex flex-wrap gap-2">
            {[
              { val: 0, label: 'Any' },
              { val: 4.5, label: '4.5★ +' },
              { val: 4.8, label: '4.8★ +' },
              { val: 4.95, label: 'Top rated (4.95★ +)' }
            ].map((rating) => (
              <button
                key={rating.val}
                type="button"
                onClick={() => setLocalRating(rating.val)}
                className={`py-2 px-4 rounded-full border text-xs font-bold transition-all ${
                  localRating === rating.val
                    ? 'border-brand-coral bg-brand-50 text-brand-coral'
                    : 'border-neutral-200 text-neutral-700 hover:border-neutral-400'
                }`}
              >
                {rating.label}
              </button>
            ))}
          </div>
        </div>

        {/* Amenities Selection */}
        <div className="pt-6">
          <h4 className="text-base font-bold text-neutral-900 mb-4">Amenities</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {AMENITY_OPTIONS.map((item) => {
              const Icon = item.icon;
              const isChecked = localAmenities.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => toggleAmenity(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                    isChecked
                      ? 'border-brand-coral bg-brand-50/50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}}
                    className="w-4 h-4 text-brand-coral rounded border-neutral-300 focus:ring-brand-coral"
                  />
                  <Icon className="w-4 h-4 text-neutral-600" />
                  <span className="text-xs font-semibold text-neutral-800">{item.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Superhost Filter */}
        <div className="pt-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-coral" />
              <h4 className="text-sm font-bold text-neutral-900">Superhost only</h4>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Stay with recognized, experienced hosts
            </p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={superhostOnly}
            onClick={() => setSuperhostOnly(!superhostOnly)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
              superhostOnly ? 'bg-neutral-900' : 'bg-neutral-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                superhostOnly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 flex items-center justify-between">
          <button
            type="button"
            onClick={handleReset}
            className="text-sm font-bold text-neutral-800 underline hover:text-black transition-colors"
          >
            Clear all
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="px-6 py-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-sm font-bold shadow-md active:scale-95 transition-all"
          >
            Show {totalMatchingCount !== undefined ? `${totalMatchingCount} stays` : 'results'}
          </button>
        </div>
      </div>
    </Modal>
  );
};
