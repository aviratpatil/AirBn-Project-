import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  Building2,
  ShieldCheck,
  ArrowRight,
  UserCircle
} from 'lucide-react';

// Demo accounts info displayed in the sidebar (emails only, no automatic password)
const DEMO_ACCOUNTS = [
  { label: 'Demo Guest', email: 'alex.morgan@havenstay.demo', role: 'guest', color: 'emerald' },
  { label: 'Matteo & Sofia (Italy)', email: 'matteo.sofia@havenstay.demo', role: 'host', color: 'rose' },
  { label: 'Henrik (Finland)', email: 'henrik@havenstay.demo', role: 'host', color: 'rose' },
  { label: 'Kenji & Mariko (Japan)', email: 'kenji.mariko@havenstay.demo', role: 'host', color: 'rose' },
  { label: 'Amara (Cape Town)', email: 'amara@havenstay.demo', role: 'host', color: 'rose' },
  { label: 'Ibrahim (Dubai)', email: 'ibrahim@havenstay.demo', role: 'host', color: 'rose' },
];

export const AuthPage = () => {
  const navigate = useNavigate();
  const { signIn, register, setSearchParams } = useApp();

  const [mode, setMode] = useState('signin');
  const [role, setRole] = useState('guest'); // 'guest' | 'host'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (mode === 'register' && !name.trim()) errs.name = 'Full name is required';
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!password) {
      errs.password = 'Password is required';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters';
    }
    if (mode === 'register' && password !== confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    setIsLoading(true);

    await new Promise((r) => setTimeout(r, 400)); // simulate async

    if (mode === 'signin') {
      const result = signIn(email.trim(), password);
      if (!result.success) {
        setServerError(result.error);
        setIsLoading(false);
        return;
      }
      navigate(result.user.role === 'host' ? '/host' : '/trips');
    } else {
      const result = register(name, email.trim(), password, role);
      if (!result.success) {
        setServerError(result.error);
        setIsLoading(false);
        return;
      }
      navigate(result.user.role === 'host' ? '/host' : '/trips');
    }
    setIsLoading(false);
  };

  const handleSelectAccount = (acc) => {
    setEmail(acc.email);
    setPassword(''); // No automatic password - user must enter password
    setServerError('');
    if (mode !== 'signin') setMode('signin');
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrors({});
    setServerError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-rose-50/30 py-10 flex items-start justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6 items-start">

        {/* ── Demo Accounts Sidebar ────────────────────────────────── */}
        <div className="w-full lg:w-72 shrink-0 bg-white rounded-3xl p-6 border border-neutral-200 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-4">
            👤 Select Account
          </p>
          <div className="space-y-2">
            {DEMO_ACCOUNTS.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => handleSelectAccount(acc)}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all hover:shadow-sm active:scale-[0.98] ${
                  acc.role === 'host'
                    ? 'border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-800'
                    : 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-800'
                }`}
              >
                <span className="block font-bold">{acc.label}</span>
                <span className="text-[10px] opacity-70">{acc.email}</span>
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 bg-neutral-50 rounded-2xl border border-neutral-200">
            <p className="text-[10px] text-neutral-500 leading-relaxed">
              Click an account to fill its email address. Enter password manually to sign in (no automatic password).
            </p>
          </div>
        </div>

        {/* ── Auth Form Card ───────────────────────────────────────── */}
        <div className="flex-1 bg-white rounded-3xl p-8 border border-neutral-200 shadow-float">
          {/* Brand Header */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-coral to-rose-500 flex items-center justify-center text-white shadow-md">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C7.58 2 4 5.58 4 10c0 5.25 7 12 8 12s8-6.75 8-12c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
                </svg>
              </div>
              <span className="text-xl font-black text-neutral-900 tracking-tight">HavenStay</span>
            </Link>
            <h1 className="text-2xl font-black text-neutral-900 tracking-tight">
              {mode === 'signin' ? 'Welcome back' : 'Create your account'}
            </h1>
            <p className="text-xs text-neutral-500 mt-1">
              {mode === 'signin'
                ? 'Sign in to access your bookings, trips and wishlist'
                : 'Join to reserve unique homes or list your property'}
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex border-b border-neutral-200 mb-6">
            {['signin', 'register'].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => switchMode(m)}
                className={`flex-1 pb-3 text-xs font-bold border-b-2 transition-all ${
                  mode === m
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                }`}
              >
                {m === 'signin' ? 'Sign In' : 'Register'}
              </button>
            ))}
          </div>

          {/* Server error */}
          {serverError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 font-medium">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off" className="space-y-4">
            {/* Role Selector — only on Register */}
            {mode === 'register' && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-2">
                  I am registering as
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: 'guest', label: 'Guest / Traveler', icon: UserCircle, desc: 'Browse and book stays' },
                    { value: 'host', label: 'Hotel Manager', icon: Building2, desc: 'List and manage properties' }
                  ].map(({ value, label, icon: Icon, desc }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRole(value)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all ${
                        role === value
                          ? 'border-brand-coral bg-rose-50'
                          : 'border-neutral-200 bg-white hover:border-neutral-300'
                      }`}
                    >
                      <Icon className={`w-5 h-5 mb-1.5 ${role === value ? 'text-brand-coral' : 'text-neutral-400'}`} />
                      <p className={`text-xs font-bold ${role === value ? 'text-brand-coral' : 'text-neutral-800'}`}>{label}</p>
                      <p className="text-[10px] text-neutral-400 mt-0.5">{desc}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Full Name (register only) */}
            {mode === 'register' && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  {role === 'host' ? 'Manager / Business Name' : 'Full Name'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={role === 'host' ? 'e.g. Grand Palace Hotel' : 'Alex Morgan'}
                    className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-brand-coral ${
                      errors.name ? 'border-red-400' : 'border-neutral-300'
                    }`}
                  />
                </div>
                {errors.name && <p className="text-[11px] text-red-500 mt-1">{errors.name}</p>}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-brand-coral ${
                    errors.email ? 'border-red-400' : 'border-neutral-300'
                  }`}
                />
              </div>
              {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                  className={`w-full border rounded-xl pl-10 pr-10 py-2.5 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-brand-coral ${
                    errors.password ? 'border-red-400' : 'border-neutral-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[11px] text-red-500 mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password (register only) */}
            {mode === 'register' && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-600 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                    className={`w-full border rounded-xl pl-10 pr-10 py-2.5 text-sm text-neutral-800 outline-none focus:ring-2 focus:ring-brand-coral ${
                      errors.confirmPassword ? 'border-red-400' : 'border-neutral-300'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] text-red-500 mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Role badge on sign-in */}
            {mode === 'signin' && (
              <p className="text-[10px] text-neutral-400 leading-relaxed">
                Your role (Guest or Hotel Manager) is determined by your registered account.
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-coral to-rose-600 hover:from-brand-coral-dark hover:to-rose-700 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="animate-pulse">Processing…</span>
              ) : (
                <>
                  <span>{mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-[10px] text-neutral-400 leading-normal">
            Demo simulation only. No real personal data or authentication credentials are stored on any server.
          </p>
        </div>
      </div>
    </div>
  );
};
