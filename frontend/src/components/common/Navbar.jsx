import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Menu,
  Heart,
  Globe,
  User,
  ShieldCheck,
  Compass,
  Calendar,
  LogOut,
  Building,
  UserCheck
} from 'lucide-react';

export const Navbar = () => {
  const { user, wishlist, loginAsGuest, loginAsHost, logout } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const isHost = user?.role === 'host';
  const isSearchPage = location.pathname.startsWith('/search');

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-coral to-rose-400 flex items-center justify-center text-white shadow-md shadow-brand-coral/20 group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-neutral-900 group-hover:text-brand-coral transition-colors">
                Haven<span className="text-brand-coral">Stay</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold -mt-1 hidden sm:block">
                Vacation Rentals
              </span>
            </div>
          </Link>

          {/* Center Search Pill (Shows on non-home pages or search page) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => {
                if (location.pathname !== '/') {
                  navigate('/');
                } else {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center border border-neutral-200 rounded-full py-2 px-4 shadow-sm hover:shadow-md transition-shadow text-sm divide-x divide-neutral-200 gap-3 group"
            >
              <span className="font-semibold text-neutral-800 group-hover:text-brand-coral transition-colors">
                Anywhere
              </span>
              <span className="pl-3 font-semibold text-neutral-800">Any week</span>
              <div className="pl-3 flex items-center gap-2">
                <span className="text-neutral-500 font-normal">Add guests</span>
                <div className="w-8 h-8 rounded-full bg-brand-coral flex items-center justify-center text-white">
                  <Search className="w-3.5 h-3.5" />
                </div>
              </div>
            </button>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Host/Guest Dashboard Link */}
            {user?.role === 'host' ? (
              <Link
                to="/host"
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <Building className="w-4 h-4 text-brand-coral" />
                <span>Manager Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/trips"
                className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <Calendar className="w-4 h-4 text-brand-coral" />
                <span>My Trips</span>
              </Link>
            )}

            {/* Wishlist Link */}
            <Link
              to="/trips?tab=saved"
              className="relative p-2.5 text-neutral-600 hover:text-brand-coral hover:bg-neutral-100 rounded-full transition-colors"
              title="Saved Wishlist"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${wishlist.length > 0 ? 'fill-brand-coral text-brand-coral' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-brand-coral text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Explore Link */}
            <Link
              to="/search"
              className="hidden sm:flex p-2.5 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
              title="Explore all stays"
              aria-label="Explore"
            >
              <Compass className="w-5 h-5" />
            </Link>

            {/* User Dropdown Button */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2.5 border border-neutral-200 rounded-full py-1.5 px-3 hover:shadow-md transition-shadow"
                aria-expanded={menuOpen}
                aria-label="User profile menu"
              >
                <Menu className="w-4 h-4 text-neutral-600" />
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-coral to-rose-500 text-white flex items-center justify-center text-xs font-black select-none">
                  {user?.name ? user.name.trim().split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() : <User className="w-4 h-4" />}
                </div>
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-float border border-neutral-100 py-2 z-50 animate-in fade-in zoom-in-95">
                  {/* User Header */}
                  {user ? (
                    <div className="px-4 py-3 border-b border-neutral-100">
                      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        Signed in as
                      </p>
                      <p className="text-sm font-bold text-neutral-900 truncate">{user.name}</p>
                      <p className="text-[11px] text-neutral-400 truncate">{user.email}</p>
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-brand-50 text-brand-coral">
                        <ShieldCheck className="w-3 h-3" />
                        {user.role === 'host' ? 'Hotel Manager' : 'Guest'}
                      </span>
                    </div>
                  ) : (
                    <div className="px-4 py-3 border-b border-neutral-100">
                      <p className="text-sm font-bold text-neutral-700">Welcome to HavenStay</p>
                      <p className="text-xs text-neutral-400">Sign in to access your account</p>
                    </div>
                  )}

                  {/* Navigation Links */}
                  <div className="py-1">
                    {user && user.role !== 'host' && (
                      <>
                        <Link
                          to="/trips"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                        >
                          <Calendar className="w-4 h-4 text-neutral-400" />
                          <span>My Trips & Bookings</span>
                        </Link>
                        <Link
                          to="/trips?tab=saved"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                        >
                          <Heart className="w-4 h-4 text-neutral-400" />
                          <span>Saved Homes ({wishlist.length})</span>
                        </Link>
                        <Link
                          to="/trips?tab=profile"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                        >
                          <User className="w-4 h-4 text-neutral-400" />
                          <span>My Profile</span>
                        </Link>
                      </>
                    )}
                    {user && user.role === 'host' && (
                      <Link
                        to="/host"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-700 hover:bg-neutral-50 transition-colors"
                      >
                        <Building className="w-4 h-4 text-neutral-400" />
                        <span>Manager Dashboard</span>
                      </Link>
                    )}
                  </div>

                  {/* Auth Actions */}
                  <div className="border-t border-neutral-100 py-1">
                    {!user ? (
                      <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-bold text-brand-coral hover:bg-rose-50 transition-colors"
                      >
                        <span>Sign In or Register</span>
                      </Link>
                    ) : (
                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                          navigate('/');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
