import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { formatCurrency } from '../../utils/formatters';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const PropertyCard = ({ property }) => {
  const { wishlist, toggleWishlist, showTotalWithTaxes } = useApp();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = wishlist.includes(property.id);
  const images = property.images && property.images.length > 0
    ? property.images
    : ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"];

  const nextImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(property.id);
  };

  // Estimated 5-night total price calculation
  const nights = 5;
  const totalPrice = property.price * nights + (property.cleaningFee || 100);

  return (
    <Link
      to={`/property/${property.id}`}
      className="group flex flex-col cursor-pointer transition-transform duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Carousel Container */}
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-neutral-100 shadow-sm">
        <img
          src={images[currentImageIndex]}
          alt={property.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Guest Favourite Badge */}
        {property.isGuestFavorite && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full shadow-sm">
            <span className="text-[11px] font-extrabold text-neutral-900 tracking-tight">
              Guest favourite
            </span>
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 p-2 rounded-full hover:scale-110 active:scale-90 transition-transform z-10"
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            className={`w-6 h-6 drop-shadow-md transition-colors ${
              isSaved
                ? 'fill-brand-coral text-brand-coral'
                : 'fill-black/30 text-white hover:fill-black/50'
            }`}
          />
        </button>

        {/* Carousel Next / Prev Controls (Visible on hover and multiple images) */}
        {images.length > 1 && isHovered && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md hover:scale-105 transition-all z-10"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center shadow-md hover:scale-105 transition-all z-10"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Carousel Dot Indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
            {images.slice(0, 5).map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentImageIndex === idx ? 'w-4 bg-white shadow-sm' : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Property Details */}
      <div className="mt-3 flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-neutral-900 truncate">
            {property.location || property.city}
          </h3>
          <div className="flex items-center gap-1 text-xs font-semibold text-neutral-900">
            <Star className="w-3.5 h-3.5 fill-current text-amber-500" />
            <span>{property.rating ? property.rating.toFixed(2) : 'New'}</span>
          </div>
        </div>

        <p className="text-xs text-neutral-500 truncate">{property.distance || property.title}</p>
        <p className="text-xs text-neutral-500">{property.datesAvailable || 'Available anytime'}</p>

        {/* Pricing */}
        <div className="mt-1.5 flex items-baseline gap-1 text-sm">
          {showTotalWithTaxes ? (
            <>
              <span className="font-extrabold text-neutral-900">
                {formatCurrency(totalPrice)}
              </span>
              <span className="text-xs text-neutral-500">total for 5 nights</span>
            </>
          ) : (
            <>
              <span className="font-extrabold text-neutral-900">
                {formatCurrency(property.price)}
              </span>
              <span className="text-xs text-neutral-600">night</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};
