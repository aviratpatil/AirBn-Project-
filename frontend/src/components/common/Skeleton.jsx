import React from 'react';

export const PropertyCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {/* Image Skeleton */}
      <div className="w-full aspect-square rounded-2xl bg-neutral-200" />

      {/* Info Skeleton */}
      <div className="flex justify-between items-start pt-1">
        <div className="w-2/3 h-4 bg-neutral-200 rounded" />
        <div className="w-10 h-4 bg-neutral-200 rounded" />
      </div>
      <div className="w-1/2 h-3.5 bg-neutral-100 rounded" />
      <div className="w-1/3 h-3.5 bg-neutral-100 rounded" />
      <div className="w-1/4 h-4 bg-neutral-200 rounded mt-1" />
    </div>
  );
};

export const PropertyGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <PropertyCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const PropertyDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
      <div className="h-8 w-2/3 bg-neutral-200 rounded mb-4" />
      <div className="h-4 w-1/3 bg-neutral-100 rounded mb-6" />
      <div className="w-full h-96 bg-neutral-200 rounded-3xl mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-6 w-1/2 bg-neutral-200 rounded" />
          <div className="h-24 bg-neutral-100 rounded-2xl" />
          <div className="h-48 bg-neutral-100 rounded-2xl" />
        </div>
        <div className="h-96 bg-neutral-100 rounded-3xl" />
      </div>
    </div>
  );
};
