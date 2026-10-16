import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { formatCurrency } from '../utils/formatters';
import { BookingCard } from '../components/property/BookingCard';
import { ReviewsSection } from '../components/property/ReviewsSection';
import { ImageGalleryModal } from '../components/property/ImageGalleryModal';
import { Modal } from '../components/common/Modal';
import {
  Star,
  Heart,
  Share2,
  ChevronRight,
  ShieldCheck,
  Award,
  Key,
  Wifi,
  Sparkles,
  Bed,
  MapPin,
  Calendar,
  Grid,
  Check,
  MessageSquare
} from 'lucide-react';

export const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, wishlist, toggleWishlist, showToast } = useApp();

  const property = properties.find((p) => p.id === id) || properties[0];

  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const [isContactHostOpen, setIsContactHostOpen] = useState(false);
  const [hostMessage, setHostMessage] = useState('');
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Property not found</h2>
          <Link to="/" className="text-brand-coral font-bold underline">
            Return to Explore
          </Link>
        </div>
      </div>
    );
  }

  const isSaved = wishlist.includes(property.id);
  const images = property.images && property.images.length > 0 ? property.images : [];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Link copied to clipboard!', 'info');
  };

  const handleSendMessageToHost = (e) => {
    e.preventDefault();
    if (!hostMessage.trim()) return;
    showToast(`Message sent to ${property.host?.name || 'host'}!`, 'success');
    setHostMessage('');
    setIsContactHostOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Breadcrumb & Share/Save Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500 mb-3">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/search" className="hover:underline">
            Vacation Stays
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-neutral-900 font-bold truncate max-w-xs">{property.city}</span>
        </div>

        {/* Title and Action Buttons */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              {property.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-neutral-800 mt-2">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-current text-amber-500" />
                <span>{property.rating ? property.rating.toFixed(2) : '5.0'}</span>
              </span>
              <span>&middot;</span>
              <span className="underline">{property.reviewCount || 0} reviews</span>
              {property.isSuperhost && (
                <>
                  <span>&middot;</span>
                  <span className="inline-flex items-center gap-1 text-neutral-700">
                    <Award className="w-3.5 h-3.5 text-brand-coral" />
                    <span>Superhost</span>
                  </span>
                </>
              )}
              <span>&middot;</span>
              <span className="underline text-neutral-600 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                {property.location}
              </span>
            </div>
          </div>

          {/* Share & Save Buttons */}
          <div className="flex items-center gap-3 self-start md:self-auto shrink-0">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs font-bold text-neutral-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span className="underline">Share</span>
            </button>
            <button
              onClick={() => toggleWishlist(property.id)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-neutral-100 text-xs font-bold text-neutral-800 transition-colors"
            >
              <Heart
                className={`w-4 h-4 ${
                  isSaved ? 'fill-brand-coral text-brand-coral' : 'text-neutral-800'
                }`}
              />
              <span className="underline">{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>

        {/* 5-Photo Gallery Grid */}
        <div className="mt-6 relative rounded-3xl overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-80 sm:h-[460px]">
            {/* Main Hero Photo (Takes 2 columns) */}
            <div
              onClick={() => setIsGalleryOpen(true)}
              className="md:col-span-2 h-full cursor-pointer relative group overflow-hidden"
            >
              <img
                src={images[0]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Sub photos 1 & 2 */}
            <div className="hidden md:flex flex-col gap-2 h-full">
              <div
                onClick={() => setIsGalleryOpen(true)}
                className="flex-1 cursor-pointer relative group overflow-hidden"
              >
                <img
                  src={images[1] || images[0]}
                  alt="Interior photo 1"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div
                onClick={() => setIsGalleryOpen(true)}
                className="flex-1 cursor-pointer relative group overflow-hidden"
              >
                <img
                  src={images[2] || images[0]}
                  alt="Interior photo 2"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Sub photos 3 & 4 */}
            <div className="hidden md:flex flex-col gap-2 h-full">
              <div
                onClick={() => setIsGalleryOpen(true)}
                className="flex-1 cursor-pointer relative group overflow-hidden"
              >
                <img
                  src={images[3] || images[0]}
                  alt="Interior photo 3"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div
                onClick={() => setIsGalleryOpen(true)}
                className="flex-1 cursor-pointer relative group overflow-hidden"
              >
                <img
                  src={images[4] || images[0]}
                  alt="Interior photo 4"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>

          {/* Show All Photos Button */}
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="absolute bottom-5 right-5 flex items-center gap-2 bg-white/95 hover:bg-white text-neutral-900 px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:scale-105 transition-all"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Show all {images.length} photos</span>
          </button>
        </div>

        {/* Content Layout: 2 Columns (Details left, Sticky Booking right) */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Details */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-10">
            {/* Host & Capacity Overview */}
            <div className="flex items-start justify-between pb-8 border-b border-neutral-200">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight">
                  {property.propertyType} hosted by {property.host?.name || 'Local Host'}
                </h2>
                <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-600 mt-1 font-medium">
                  <span>{property.capacity?.guests || 4} guests</span>
                  <span>&middot;</span>
                  <span>{property.capacity?.bedrooms || 2} bedrooms</span>
                  <span>&middot;</span>
                  <span>{property.capacity?.beds || 3} beds</span>
                  <span>&middot;</span>
                  <span>{property.capacity?.bathrooms || 2} baths</span>
                </div>
              </div>

              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-coral to-rose-500 text-white flex items-center justify-center font-black text-base select-none ring-2 ring-brand-coral/20">
                  {(property.host?.name || 'H').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                </div>
                {property.host?.isSuperhost && (
                  <div className="absolute -bottom-1 -right-1 bg-brand-coral text-white p-1 rounded-full shadow-xs">
                    <Award className="w-3 h-3" />
                  </div>
                )}
              </div>
            </div>

            {/* Key Highlights */}
            <div className="space-y-6 pb-8 border-b border-neutral-200">
              <div className="flex items-start gap-4">
                <Key className="w-6 h-6 text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Self check-in</h4>
                  <p className="text-xs text-neutral-500">
                    Check yourself in effortlessly with the secure smart lock keypad.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Award className="w-6 h-6 text-brand-coral shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Experienced Superhost</h4>
                  <p className="text-xs text-neutral-500">
                    {property.host?.name} has {property.host?.yearsHosting || 5} years of hosting
                    experience and a 100% response rate.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Calendar className="w-6 h-6 text-neutral-800 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">Free cancellation</h4>
                  <p className="text-xs text-neutral-500">
                    Cancel up to 48 hours before check-in for a full demo refund.
                  </p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="pb-8 border-b border-neutral-200">
              <h3 className="text-lg font-bold text-neutral-900 mb-3">About this space</h3>
              <p
                className={`text-sm text-neutral-700 leading-relaxed ${
                  !isDescriptionExpanded ? 'line-clamp-4' : ''
                }`}
              >
                {property.description}
              </p>
              <button
                onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                className="mt-3 text-xs font-bold text-neutral-900 underline hover:text-black flex items-center gap-1"
              >
                <span>{isDescriptionExpanded ? 'Show less' : 'Show more'}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isDescriptionExpanded ? '-rotate-90' : 'rotate-90'
                  }`}
                />
              </button>
            </div>

            {/* Sleeping Arrangements */}
            {property.bedroomsList && property.bedroomsList.length > 0 && (
              <div className="pb-8 border-b border-neutral-200">
                <h3 className="text-lg font-bold text-neutral-900 mb-4">Where you'll sleep</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {property.bedroomsList.map((room, idx) => (
                    <div
                      key={idx}
                      className="border border-neutral-200 rounded-2xl p-5 flex flex-col gap-2 bg-neutral-50/50"
                    >
                      <Bed className="w-6 h-6 text-neutral-700" />
                      <div>
                        <h4 className="text-sm font-bold text-neutral-900">{room.name}</h4>
                        <p className="text-xs font-semibold text-neutral-600">{room.bedType}</p>
                        <p className="text-[11px] text-neutral-400 mt-1">{room.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Amenities Grid */}
            <div className="pb-8 border-b border-neutral-200">
              <h3 className="text-lg font-bold text-neutral-900 mb-4">What this place offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                {(property.amenities || []).slice(0, 8).map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-neutral-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>

              {(property.amenities || []).length > 8 && (
                <button
                  onClick={() => setIsAmenitiesModalOpen(true)}
                  className="mt-6 px-5 py-2.5 rounded-xl border border-neutral-800 text-xs font-bold text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all active:scale-95"
                >
                  Show all {property.amenities.length} amenities
                </button>
              )}
            </div>

            {/* Meet Your Host Card */}
            <div className="p-6 rounded-3xl bg-neutral-50 border border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-coral to-rose-500 text-white flex items-center justify-center font-black text-lg select-none ring-2 ring-white shadow-sm shrink-0">
                    {(property.host?.name || 'H').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">
                      Hosted by {property.host?.name}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Superhost &middot; {property.host?.yearsHosting || 5} years hosting
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsContactHostOpen(true)}
                  className="px-5 py-2.5 rounded-xl border border-neutral-800 bg-white hover:bg-neutral-900 hover:text-white text-xs font-bold text-neutral-900 transition-all shadow-xs self-start sm:self-auto"
                >
                  Contact Host
                </button>
              </div>

              <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                {property.host?.bio}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-neutral-700 border-t border-neutral-200/60 pt-3">
                <span>Response rate: {property.host?.responseRate || '100%'}</span>
                <span>&middot;</span>
                <span>Response time: {property.host?.responseTime || 'within an hour'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Card on Desktop */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
            <BookingCard property={property} />
          </div>
        </div>

        {/* Full-width Reviews Section */}
        <ReviewsSection property={property} />

        {/* Location & Neighborhood Guide */}
        <div className="py-10 border-t border-neutral-200">
          <h3 className="text-xl font-bold text-neutral-900 mb-3">Where you'll be</h3>
          <p className="text-sm text-neutral-600 mb-6">{property.location}</p>

          <div className="w-full h-80 rounded-3xl overflow-hidden border border-neutral-200 bg-neutral-100 relative">
            <div className="absolute inset-0 bg-[#E5E9E7] flex items-center justify-center">
              <div className="p-4 rounded-full bg-brand-coral/20 animate-ping absolute" />
              <div className="relative p-3 rounded-full bg-brand-coral text-white shadow-xl flex items-center gap-2">
                <MapPin className="w-5 h-5 fill-current" />
                <span className="text-xs font-bold pr-1">{property.city}</span>
              </div>
            </div>
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3 py-2 rounded-xl text-xs font-bold shadow-sm">
              Exact location provided upon booking confirmation
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom Booking Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-200 p-4 z-40 flex items-center justify-between shadow-float">
        <div>
          <span className="text-lg font-black text-neutral-900">
            {formatCurrency(property.price)}
          </span>
          <span className="text-xs text-neutral-500 font-semibold"> / night</span>
          <p className="text-[10px] text-neutral-400 font-medium">{property.datesAvailable}</p>
        </div>

        <button
          onClick={() => {
            navigate(`/book/${property.id}`);
          }}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-coral to-rose-600 text-white font-bold text-sm shadow-md active:scale-95"
        >
          Reserve
        </button>
      </div>

      {/* Full-Screen Gallery Modal */}
      <ImageGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        images={images}
        propertyTitle={property.title}
        propertyId={property.id}
      />

      {/* All Amenities Modal */}
      <Modal
        isOpen={isAmenitiesModalOpen}
        onClose={() => setIsAmenitiesModalOpen(false)}
        title="What this place offers"
        maxWidth="max-w-xl"
      >
        <div className="space-y-4">
          <p className="text-xs text-neutral-500">All available amenities and property services:</p>
          <div className="divide-y divide-neutral-100">
            {(property.amenities || []).map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-3 py-3 text-sm text-neutral-800">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Contact Host Modal */}
      <Modal
        isOpen={isContactHostOpen}
        onClose={() => setIsContactHostOpen(false)}
        title={`Message ${property.host?.name || 'Host'}`}
        maxWidth="max-w-md"
      >
        <form onSubmit={handleSendMessageToHost} className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-neutral-50 rounded-2xl">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-coral to-rose-500 text-white flex items-center justify-center font-black text-sm select-none shrink-0">
              {(property.host?.name || 'H').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900">{property.host?.name}</p>
              <p className="text-[11px] text-neutral-500">
                Typically responds in {property.host?.responseTime || 'an hour'}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
              Your message
            </label>
            <textarea
              required
              rows={4}
              value={hostMessage}
              onChange={(e) => setHostMessage(e.target.value)}
              placeholder="Hi! I had a quick question regarding check-in time and parking..."
              className="w-full border border-neutral-300 rounded-xl p-3 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral resize-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsContactHostOpen(false)}
              className="px-4 py-2 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold shadow-md"
            >
              Send Message
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
