import React from 'react';
import { PropertyCard } from './PropertyCard';
import { PropertyGridSkeleton } from '../common/Skeleton';
import { EmptyState } from '../common/EmptyState';
import { Compass } from 'lucide-react';

export const PropertyGrid = ({ properties, isLoading, onResetFilters }) => {
  if (isLoading) {
    return <PropertyGridSkeleton count={8} />;
  }

  if (!properties || properties.length === 0) {
    return (
      <EmptyState
        icon={Compass}
        title="No exact matches found"
        description="Try changing or clearing some of your filters, or search for another destination to find available stays."
        actionLabel="Clear all filters"
        onAction={onResetFilters}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
};
