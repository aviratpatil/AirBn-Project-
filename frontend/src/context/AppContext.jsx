import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PROPERTIES } from '../data/mockProperties';
import { SEED_ACCOUNTS, findAccountByEmail } from '../data/seedAccounts';
import { generateBookingId } from '../utils/formatters';

const AppContext = createContext();

// ─── Helpers ───────────────────────────────────────────────────────────────
/** Build localStorage key scoped to a user's email */
const userKey = (email, suffix) => `havenstay_${email}_${suffix}`;

/** Get the master property list from storage or fall back to MOCK_PROPERTIES */
const getMasterProperties = () => {
  try {
    const saved = localStorage.getItem('havenstay_properties');
    return saved ? JSON.parse(saved) : MOCK_PROPERTIES;
  } catch {
    return MOCK_PROPERTIES;
  }
};

/** Load per-user data from localStorage */
const loadUserData = (email) => {
  if (!email) return { bookings: [], wishlist: [] };
  try {
    return {
      bookings: JSON.parse(localStorage.getItem(userKey(email, 'bookings')) || '[]'),
      wishlist: JSON.parse(localStorage.getItem(userKey(email, 'wishlist')) || '[]'),
    };
  } catch {
    return { bookings: [], wishlist: [] };
  }
};

/** Get all registered user accounts from localStorage (merged with seeds) */
const getAllAccounts = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('havenstay_accounts') || '[]');
    // Merge: stored takes priority over seeds (for profile updates)
    const merged = [...SEED_ACCOUNTS];
    for (const acc of stored) {
      const idx = merged.findIndex((s) => s.email.toLowerCase() === acc.email.toLowerCase());
      if (idx >= 0) {
        merged[idx] = { ...merged[idx], ...acc };
      } else {
        merged.push(acc);
      }
    }
    return merged;
  } catch {
    return [...SEED_ACCOUNTS];
  }
};

/** Save a user account to the registered accounts store */
const saveAccount = (account) => {
  const accounts = getAllAccounts();
  const idx = accounts.findIndex((a) => a.email.toLowerCase() === account.email.toLowerCase());
  if (idx >= 0) {
    accounts[idx] = { ...accounts[idx], ...account };
  } else {
    accounts.push(account);
  }
  // Only persist non-seed accounts (or updates to seed accounts)
  localStorage.setItem('havenstay_accounts', JSON.stringify(accounts));
};

// ─── Default search state ──────────────────────────────────────────────────
const DEFAULT_SEARCH = {
  destination: '',
  checkIn: '',
  checkOut: '',
  guests: { adults: 1, children: 0, infants: 0, pets: 0 },
  category: 'all',
  minPrice: 0,
  maxPrice: 1500,
  propertyType: 'all',
  minRating: 0,
  amenities: [],
  sortBy: 'recommended'
};

// ─── Provider ──────────────────────────────────────────────────────────────
export const AppProvider = ({ children }) => {
  // Current logged-in user (null = anonymous)
  const [user, setUserState] = useState(() => {
    try {
      const saved = localStorage.getItem('havenstay_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch { return null; }
  });

  // Master property list (all properties, used for browsing)
  const [properties, setProperties] = useState(getMasterProperties);

  // Per-user data (bookings & wishlist keyed to logged-in user's email)
  const [bookings, setBookings] = useState(() =>
    user ? loadUserData(user.email).bookings : []
  );
  const [wishlist, setWishlist] = useState(() =>
    user ? loadUserData(user.email).wishlist : []
  );

  // UI state
  const [showTotalWithTaxes, setShowTotalWithTaxes] = useState(false);
  const [searchParams, setSearchParams] = useState(DEFAULT_SEARCH);
  const [toasts, setToasts] = useState([]);

  // ── Persistence ────────────────────────────────────────────────────────
  useEffect(() => {
    if (user) {
      localStorage.setItem('havenstay_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('havenstay_current_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('havenstay_properties', JSON.stringify(properties));
  }, [properties]);

  // Whenever the user changes, reload their personal bookings/wishlist
  useEffect(() => {
    if (user?.email) {
      const data = loadUserData(user.email);
      setBookings(data.bookings);
      setWishlist(data.wishlist);
    } else {
      setBookings([]);
      setWishlist([]);
    }
  }, [user?.email]);

  // Persist bookings under the current user's key
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(userKey(user.email, 'bookings'), JSON.stringify(bookings));
    }
  }, [bookings, user?.email]);

  // Persist wishlist under the current user's key
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(userKey(user.email, 'wishlist'), JSON.stringify(wishlist));
    }
  }, [wishlist, user?.email]);

  // ── Toast helpers ──────────────────────────────────────────────────────
  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // ── Auth actions ───────────────────────────────────────────────────────
  /**
   * Sign in with email + password.
   * Returns { success, error, user }
   */
  const signIn = (email, password) => {
    const accounts = getAllAccounts();
    const account = accounts.find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    if (!account) {
      return { success: false, error: 'Invalid email or password.' };
    }
    const { password: _pw, ...safeUser } = account;
    setUserState(safeUser);
    showToast(`Welcome back, ${safeUser.name}!`, 'success');
    return { success: true, user: safeUser };
  };

  /**
   * Register a new account.
   * Returns { success, error, user }
   */
  const register = (name, email, password, role = 'guest') => {
    const accounts = getAllAccounts();
    const existing = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please sign in.' };
    }
    const newAccount = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase(),
      password,
      role,
      avatar: role === 'host'
        ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      phone: '',
      location: '',
      bio: role === 'host'
        ? 'Passionate host welcoming guests from across the world.'
        : 'Excited to explore unforgettable vacation stays.',
      joinedDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    saveAccount(newAccount);
    const { password: _pw, ...safeUser } = newAccount;
    setUserState(safeUser);
    showToast(`Account created! Welcome, ${safeUser.name}!`, 'success');
    return { success: true, user: safeUser };
  };

  /** Quick demo login — for the demo shortcut buttons */
  const loginAsGuest = () => {
    const account = findAccountByEmail('alex.morgan@havenstay.demo');
    if (account) {
      const { password: _pw, ...safeUser } = account;
      setUserState(safeUser);
      showToast('Logged in as Demo Guest (Alex Morgan)', 'success');
    }
  };

  const loginAsHost = () => {
    const account = findAccountByEmail('matteo.sofia@havenstay.demo');
    if (account) {
      const { password: _pw, ...safeUser } = account;
      setUserState(safeUser);
      showToast('Logged in as Demo Host (Matteo & Sofia)', 'success');
    }
  };

  const logout = () => {
    setUserState(null);
    showToast('Signed out successfully', 'info');
  };

  const updateUserProfile = (updatedFields) => {
    setUserState((prev) => {
      const updated = { ...prev, ...updatedFields };
      // Persist profile update to accounts store (with password preserved)
      const accounts = getAllAccounts();
      const existing = accounts.find((a) => a.email.toLowerCase() === updated.email.toLowerCase());
      if (existing) {
        saveAccount({ ...existing, ...updatedFields });
      }
      return updated;
    });
    showToast('Profile information updated', 'success');
  };

  // ── Wishlist (guest-only, per user) ────────────────────────────────────
  const toggleWishlist = (propertyId) => {
    if (!user) { showToast('Please sign in to save properties', 'error'); return; }
    const isSaved = wishlist.includes(propertyId);
    const updated = isSaved
      ? wishlist.filter((id) => id !== propertyId)
      : [...wishlist, propertyId];
    setWishlist(updated);
    showToast(isSaved ? 'Removed from wishlist' : 'Added to your wishlist!', isSaved ? 'info' : 'success');
  };

  const isPropertyInWishlist = (propertyId) => wishlist.includes(propertyId);

  // ── Bookings (per user) ────────────────────────────────────────────────
  const createBooking = (bookingData) => {
    if (!user) { showToast('Please sign in to book', 'error'); return null; }
    const newBooking = {
      id: generateBookingId(),
      ...bookingData,
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0],
      guestName: user.name,
      guestEmail: user.email,
      guestId: user.id
    };
    setBookings((prev) => [newBooking, ...prev]);
    showToast(`Reservation ${newBooking.id} confirmed!`, 'success');
    return newBooking;
  };

  const cancelBooking = (bookingId) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: 'cancelled' } : b))
    );
    showToast('Reservation successfully cancelled', 'info');
  };

  // ── Property actions (hosts only) ──────────────────────────────────────
  const addProperty = (propertyData) => {
    if (!user || user.role !== 'host') {
      showToast('Only hotel managers can add listings', 'error');
      return null;
    }
    const newProp = {
      ...propertyData,
      id: 'prop-custom-' + Date.now(),
      hostId: user.id,
      hostEmail: user.email,
      rating: 5.0,
      reviewCount: 0,
      reviews: [],
      isSuperhost: false,
      isGuestFavorite: false,
      host: {
        name: user.name,
        avatar: user.avatar,
        isSuperhost: false,
        yearsHosting: 1,
        responseRate: '100%',
        responseTime: 'within an hour',
        bio: user.bio || 'Passionate host welcoming guests from across the world.'
      }
    };
    setProperties((prev) => [newProp, ...prev]);
    showToast('New listing published successfully!', 'success');
    return newProp;
  };

  const updateProperty = (propertyId, updatedData) => {
    // Hosts can only edit their own properties
    const prop = properties.find((p) => p.id === propertyId);
    if (!prop) return;
    if (user?.role === 'host' && prop.hostEmail && prop.hostEmail !== user.email) {
      showToast('You can only edit your own listings', 'error');
      return;
    }
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, ...updatedData } : p))
    );
    showToast('Listing updated successfully', 'success');
  };

  const deleteProperty = (propertyId) => {
    const prop = properties.find((p) => p.id === propertyId);
    if (!prop) return;
    if (user?.role === 'host' && prop.hostEmail && prop.hostEmail !== user.email) {
      showToast('You can only delete your own listings', 'error');
      return;
    }
    setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    setWishlist((prev) => prev.filter((id) => id !== propertyId));
    showToast('Listing deleted', 'info');
  };

  // ── Reviews ────────────────────────────────────────────────────────────
  const addReview = (propertyId, reviewData) => {
    if (!user) { showToast('Please sign in to leave a review', 'error'); return; }
    const newReview = {
      id: 'rev-' + Date.now(),
      author: user.name,
      avatar: user.avatar,
      date: 'Just now',
      rating: reviewData.rating,
      comment: reviewData.comment
    };
    setProperties((prev) =>
      prev.map((prop) => {
        if (prop.id !== propertyId) return prop;
        const currentReviews = prop.reviews || [];
        const updatedReviews = [newReview, ...currentReviews];
        const avg = (updatedReviews.reduce((s, r) => s + r.rating, 0) / updatedReviews.length).toFixed(2);
        return { ...prop, reviews: updatedReviews, reviewCount: updatedReviews.length, rating: parseFloat(avg) };
      })
    );
    showToast('Thank you! Your review has been posted.', 'success');
  };

  // ── Search ─────────────────────────────────────────────────────────────
  const updateSearchFilter = (key, value) => {
    setSearchParams((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSearchParams(DEFAULT_SEARCH);
    showToast('Filters reset', 'info');
  };

  // ── Host-scoped data helpers ───────────────────────────────────────────
  /** Returns only properties owned by the current host */
  const hostProperties = user?.role === 'host'
    ? properties.filter((p) => p.hostEmail === user.email || p.hostId === user.id)
    : [];

  /** Returns all bookings for properties owned by current host */
  const hostBookings = user?.role === 'host'
    ? (() => {
        const hostPropIds = new Set(hostProperties.map((p) => p.id));
        // Gather from all users' booking keys — we store them per-user key
        // So we need to scan localStorage for all booking keys
        const allBookings = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('havenstay_') && key.endsWith('_bookings')) {
            try {
              const bks = JSON.parse(localStorage.getItem(key) || '[]');
              for (const b of bks) {
                if (hostPropIds.has(b.propertyId)) allBookings.push(b);
              }
            } catch { /* skip */ }
          }
        }
        return allBookings;
      })()
    : [];

  return (
    <AppContext.Provider
      value={{
        // Auth
        user,
        signIn,
        register,
        loginAsGuest,
        loginAsHost,
        logout,
        updateUserProfile,
        // Properties
        properties,
        hostProperties,
        addProperty,
        updateProperty,
        deleteProperty,
        addReview,
        // Wishlist
        wishlist,
        toggleWishlist,
        isPropertyInWishlist,
        // Bookings
        bookings,          // guest's own bookings
        hostBookings,      // host's incoming reservations
        createBooking,
        cancelBooking,
        // UI
        showTotalWithTaxes,
        setShowTotalWithTaxes,
        searchParams,
        setSearchParams,
        updateSearchFilter,
        resetFilters,
        toasts,
        showToast,
        removeToast,
        // Seed data (for account list display)
        getAllAccounts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
