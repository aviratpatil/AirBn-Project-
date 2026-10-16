import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Share2, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ImageGalleryModal = ({ isOpen, onClose, images, propertyTitle, propertyId }) => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  const { wishlist, toggleWishlist, showToast } = useApp();

  if (!isOpen) return null;

  const isSaved = wishlist.includes(propertyId);

  const handleNext = () => {
    setSelectedPhotoIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedPhotoIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link copied to clipboard!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 text-white flex flex-col animate-in fade-in">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-white/10 text-sm font-semibold transition-colors"
        >
          <X className="w-5 h-5" />
          <span>Close gallery</span>
        </button>

        <span className="text-xs font-semibold text-neutral-400">
          {selectedPhotoIndex + 1} / {images.length} — {propertyTitle}
        </span>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button
            onClick={() => toggleWishlist(propertyId)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            title="Save"
          >
            <Heart
              className={`w-5 h-5 ${
                isSaved ? 'fill-brand-coral text-brand-coral' : 'text-white'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main Image Showcase */}
      <div className="relative flex-1 flex items-center justify-center p-4 md:p-12 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Selected Image */}
        <img
          src={images[selectedPhotoIndex]}
          alt={`${propertyTitle} photo ${selectedPhotoIndex + 1}`}
          className="max-h-[75vh] max-w-full object-contain rounded-2xl shadow-2xl transition-all duration-300"
        />

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all hover:scale-110"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Thumbnails Row */}
      <div className="px-6 py-4 bg-black/60 border-t border-white/10 overflow-x-auto no-scrollbar flex items-center justify-center gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedPhotoIndex(index)}
            className={`relative rounded-xl overflow-hidden shrink-0 transition-all ${
              selectedPhotoIndex === index
                ? 'ring-2 ring-brand-coral scale-105'
                : 'opacity-50 hover:opacity-100'
            }`}
          >
            <img src={img} alt={`Thumb ${index + 1}`} className="w-16 h-12 object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
