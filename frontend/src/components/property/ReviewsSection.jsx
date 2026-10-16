import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Star, Search, ThumbsUp, Sparkles, MessageSquare } from 'lucide-react';

export const ReviewsSection = ({ property }) => {
  const { addReview, user } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');

  const reviews = property.reviews || [];
  const ratingsBreakdown = property.ratingsBreakdown || {
    cleanliness: 5.0,
    accuracy: 4.9,
    communication: 5.0,
    location: 5.0,
    checkIn: 5.0,
    value: 4.8
  };

  const filteredReviews = reviews.filter((r) =>
    r.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    addReview(property.id, {
      rating: Number(newRating),
      comment: newComment.trim()
    });

    setNewComment('');
    setNewRating(5);
    setIsWriteReviewOpen(false);
  };

  return (
    <div className="py-10 border-t border-neutral-200">
      {/* Overall Score Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <Star className="w-7 h-7 fill-current text-amber-500" />
          <h3 className="text-2xl font-black text-neutral-900 tracking-tight">
            {property.rating ? property.rating.toFixed(2) : '5.0'} &middot; {reviews.length} reviews
          </h3>
        </div>

        <button
          onClick={() => setIsWriteReviewOpen(true)}
          className="flex items-center gap-2 self-start sm:self-auto px-5 py-2.5 rounded-full border border-neutral-800 text-neutral-900 text-xs font-bold hover:bg-neutral-900 hover:text-white transition-all active:scale-95 shadow-sm"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Write a Review</span>
        </button>
      </div>

      {/* Ratings Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 mb-10 pb-8 border-b border-neutral-100">
        {[
          { label: 'Cleanliness', score: ratingsBreakdown.cleanliness || 4.9 },
          { label: 'Accuracy', score: ratingsBreakdown.accuracy || 5.0 },
          { label: 'Communication', score: ratingsBreakdown.communication || 5.0 },
          { label: 'Location', score: ratingsBreakdown.location || 4.9 },
          { label: 'Check-in', score: ratingsBreakdown.checkIn || 5.0 },
          { label: 'Value', score: ratingsBreakdown.value || 4.8 }
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-neutral-700">{item.label}</span>
            <div className="flex items-center gap-3 w-44">
              <div className="flex-1 h-1 bg-neutral-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-neutral-900 rounded-full"
                  style={{ width: `${(item.score / 5) * 100}%` }}
                />
              </div>
              <span className="text-xs font-bold text-neutral-900 w-6 text-right">
                {item.score.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Search Reviews Input */}
      <div className="mb-8 max-w-md">
        <div className="flex items-center gap-2 bg-neutral-100 rounded-full px-4 py-2 border border-neutral-200 focus-within:ring-2 focus-within:ring-neutral-900">
          <Search className="w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Search reviews (e.g. pool, sunset, host)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-xs font-medium text-neutral-800 placeholder:text-neutral-400 outline-none w-full"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-xs font-bold text-neutral-400 hover:text-neutral-800"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredReviews.length === 0 ? (
          <p className="text-sm text-neutral-500 italic col-span-2">
            No reviews match your search "{searchTerm}".
          </p>
        ) : (
          filteredReviews.map((rev) => (
            <div key={rev.id} className="flex flex-col gap-3">
              {/* Reviewer info */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-brand-coral to-rose-500 text-white flex items-center justify-center font-black text-xs select-none ring-1 ring-neutral-200 shrink-0">
                  {(rev.author || 'G').split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-neutral-900">{rev.author}</h4>
                  <div className="flex items-center gap-2 text-xs text-neutral-500">
                    <span>{rev.date}</span>
                    <span>&middot;</span>
                    <span className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: rev.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Comment */}
              <p className="text-sm text-neutral-700 leading-relaxed">{rev.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* Write Review Modal */}
      <Modal
        isOpen={isWriteReviewOpen}
        onClose={() => setIsWriteReviewOpen(false)}
        title="Leave a Review"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSubmitReview} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Overall Rating
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNewRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-7 h-7 ${
                      star <= newRating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-neutral-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-3 text-sm font-bold text-neutral-800">
                {newRating} out of 5 stars
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Your Experience
            </label>
            <textarea
              required
              rows={4}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What did you love about staying here? How was the host, location, and amenities?"
              className="w-full border border-neutral-300 rounded-2xl p-4 text-sm text-neutral-800 focus:outline-none focus:ring-2 focus:ring-brand-coral resize-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setIsWriteReviewOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-black text-white text-xs font-bold shadow-md active:scale-95 transition-all"
            >
              Publish Review
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
