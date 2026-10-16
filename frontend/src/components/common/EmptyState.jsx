import React from 'react';
import { Compass } from 'lucide-react';

export const EmptyState = ({
  icon: Icon = Compass,
  title = "No results found",
  description = "Try adjusting your search criteria or clearing filters to find more properties.",
  actionLabel,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center text-brand-coral mb-4">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
      <p className="text-neutral-500 text-sm mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 rounded-full bg-neutral-900 text-white font-medium text-sm hover:bg-neutral-800 transition-colors shadow-sm active:scale-95"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};
