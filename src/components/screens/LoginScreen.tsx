import React, { useState } from 'react';
import { ScreenType, UserRole } from '../../types';

interface LoginScreenProps {
  setScreen: (screen: ScreenType) => void;
  setUserRole: (role: UserRole) => void;
  onShowToast: (msg: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  setScreen,
  setUserRole,
  onShowToast
}) => {
  const [loginMethod, setLoginMethod] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('98401 24892');
  const [email, setEmail] = useState('contact@meenakshibhavan.in');
  const [password, setPassword] = useState('Annadhanam2026#');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (loginMethod === 'phone') {
      setTimeout(() => {
        setIsLoading(false);
        onShowToast(`OTP sent to +91 ${phone}`);
        setScreen('otp-verify');
      }, 700);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setUserRole('donor');
      onShowToast('வணக்கம்! Logged in as Sri Meenakshi Bhavan Catering (Mylapore, Chennai)');
      setScreen('dashboard');
    }, 800);
  };

  return (
    <div className="flex flex-col w-full pb-16 animate-in fade-in duration-200">
      {/* Top Breadcrumb / Return */}
      <div className="flex items-center justify-between py-2 mb-2">
        <button
          onClick={() => setScreen('home')}
          className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary text-body-sm font-medium transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Home</span>
        </button>

        <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed text-label-sm font-bold tracking-wider">
          TAMIL NADU PORTAL
        </span>
      </div>

      {/* Dedicated Page Navigator between Existing Sign In & New User Login */}
      <div className="bg-surface-container-high p-1 rounded-2xl flex items-center mb-3.5 border border-surface-container shadow-xs">
        <button
          type="button"
          disabled
          className="flex-1 py-2 px-2.5 rounded-xl bg-surface-container-lowest text-primary shadow-xs font-label-md font-bold text-center flex items-center justify-center gap-1.5 cursor-default text-xs"
        >
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            login
          </span>
          <span>1. Returning Sign In</span>
        </button>
        <button
          type="button"
          onClick={() => setScreen('new-user-login')}
          className="flex-1 py-2 px-2.5 rounded-xl text-on-surface-variant hover:text-tertiary hover:bg-surface-container font-label-md font-bold text-center flex items-center justify-center gap-1.5 transition-all text-xs group"
        >
          <span className="material-symbols-outlined text-[16px] text-tertiary">person_add</span>
          <span className="group-hover:underline">2. New User Login &rarr;</span>
        </button>
      </div>

      {/* Hero Welcome Card */}
      <div className="rounded-2xl bg-surface-container-low p-4 mb-4 border border-surface-container shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 text-primary shadow-xs">
            <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              temple_hindu
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-primary uppercase tracking-wide font-bold">
                FoodShare • தமிழ்நாடு
              </span>
            </div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
              Sign In to Your Account
            </h1>
            <p className="font-body-sm text-on-surface-variant">
              Manage surplus meals, Mandapam bookings &amp; rescue dispatches
            </p>
          </div>
        </div>
      </div>

      {/* Prominent New User Switcher Card */}
      <div className="bg-primary-container/20 border border-primary/25 rounded-2xl p-3.5 mb-5 flex items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              waving_hand
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-title-md text-title-md font-bold text-on-surface leading-tight">
                New User?
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-tertiary-fixed text-on-tertiary-fixed">
                புதிய பயனர்
              </span>
            </div>
            <p className="font-body-sm text-on-surface-variant text-xs truncate">
              First time on FoodShare Tamil Nadu?
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setScreen('new-user-login')}
          className="px-3 py-2 rounded-xl bg-primary hover:bg-primary/90 text-on-primary font-label-md font-bold shrink-0 transition-all text-xs flex items-center gap-1.5 shadow-sm active:scale-95"
        >
          <span>New User Login</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container">
        {/* Toggle Phone OTP vs Email */}
        <div className="bg-surface-container p-1 rounded-xl flex items-center mb-5">
          <button
            type="button"
            onClick={() => setLoginMethod('phone')}
            className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md transition-all font-semibold flex items-center justify-center gap-1.5 ${
              loginMethod === 'phone'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">smartphone</span>
            <span>Mobile OTP</span>
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`flex-1 py-2 text-center rounded-lg font-label-md text-label-md transition-all font-semibold flex items-center justify-center gap-1.5 ${
              loginMethod === 'email'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">mail</span>
            <span>Email &amp; Password</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {loginMethod === 'phone' ? (
            <div>
              <label className="block font-label-md text-on-surface-variant mb-1.5 font-semibold">
                Registered WhatsApp / Mobile Number
              </label>
              <div className="flex items-center rounded-xl bg-surface-container-low border border-surface-container focus-within:border-primary focus-within:bg-surface-container-high transition-colors overflow-hidden">
                <div className="flex items-center gap-1 px-3 py-3 bg-surface-container border-r border-surface-container text-body-md font-semibold text-on-surface shrink-0">
                  <span>🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98401 24892"
                  className="w-full h-12 px-3 bg-transparent text-on-surface font-body-md outline-none"
                />
              </div>
              <p className="font-label-sm text-on-surface-variant mt-1.5 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-primary">verified</span>
                We will send an instant 6-digit OTP code to verify your login.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                  Official Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
                    business
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="manager@meenakshibhavan.in"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container focus:bg-surface-container-high transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-label-md text-on-surface-variant font-semibold">Password</label>
                  <button
                    type="button"
                    onClick={() => onShowToast('Password reset link sent to registered email.')}
                    className="font-label-sm text-primary font-semibold hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
                    lock
                  </span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 pl-11 pr-11 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container focus:bg-surface-container-high transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Remember me checkbox */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-0 accent-primary"
              />
              <span className="font-body-sm text-on-surface-variant">Remember on this device</span>
            </label>
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary-container hover:bg-primary text-on-primary-container rounded-xl font-label-lg text-label-lg shadow-sm active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-bold mt-1"
          >
            {isLoading ? (
              <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
            ) : (
              <>
                <span>{loginMethod === 'phone' ? 'Get Instant OTP' : 'Sign In to Portal'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="w-full h-[1px] bg-outline-variant/40 absolute"></div>
          <span className="relative px-3 bg-surface-container-lowest font-label-sm text-secondary uppercase tracking-wider font-semibold">
            or continue with
          </span>
        </div>

        {/* Social SSO Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => {
              onShowToast('Connecting with Google Workspace...');
              setTimeout(() => {
                setUserRole('donor');
                setScreen('dashboard');
              }, 700);
            }}
            className="h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 transition-colors border border-surface-container font-semibold"
          >
            <svg aria-hidden="true" className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" fill="#EA4335" />
              <path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" fill="#4285F4" />
              <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2c0 2.8.7 5.5 1.9 7.8l3.7-2.9z" fill="#FBBC05" />
              <path d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.3 7.5 23.5 12 23.5z" fill="#34A853" />
            </svg>
            <span>Google</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setUserRole('admin');
              setScreen('admin');
              onShowToast('Switched to Food Safety & Admin Portal');
            }}
            className="h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 transition-colors border border-surface-container font-semibold"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">shield_person</span>
            <span>Admin PIN</span>
          </button>
        </div>

        {/* Clear Navigation to Dedicated Registration & New User Pages */}
        <div className="mt-6 pt-4 border-t border-surface-container text-center space-y-3">
          <div className="p-3 rounded-2xl bg-surface-container-low border border-surface-container">
            <p className="font-body-sm text-on-surface font-semibold">
              First time on FoodShare Tamil Nadu?
            </p>
            <p className="text-xs text-on-surface-variant mb-2">
              Join instantly in under 1 minute with your mobile number
            </p>
            <button
              type="button"
              onClick={() => setScreen('new-user-login')}
              className="w-full py-2.5 px-4 rounded-xl bg-tertiary-container hover:bg-tertiary-container/80 text-on-tertiary-container font-label-md font-bold transition-all flex items-center justify-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">person_add</span>
              <span>Go to New User Login • புதிய பயனர்</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>

          <div>
            <p className="font-body-sm text-secondary text-xs">
              Need full enterprise registration with 14-digit FSSAI &amp; Darpan accreditation?
            </p>
            <button
              type="button"
              onClick={() => setScreen('register')}
              className="mt-1 inline-flex items-center gap-1 text-primary text-xs font-bold hover:underline"
            >
              <span>Register Full Organization Account</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Trust & FSSAI Footer */}
      <footer className="mt-5 text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 text-secondary font-label-sm">
          <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
          <span>Compliant with FSSAI Surplus Food Regulations, 2019</span>
        </div>
        <p className="font-label-sm text-[11px] text-on-surface-variant">
          Indian Food Sharing Alliance (IFSA) • Save Food, Share Joy
        </p>
      </footer>
    </div>
  );
};
