import React, { useState } from 'react';
import { ScreenType, UserRole } from '../../types';

interface AuthScreenProps {
  setScreen: (screen: ScreenType) => void;
  setUserRole: (role: UserRole) => void;
  onShowToast: (msg: string) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({
  setScreen,
  setUserRole,
  onShowToast
}) => {
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [role, setRole] = useState<'donor' | 'recipient'>('donor');
  const [showToast, setShowToast] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [orgName, setOrgName] = useState('Harbor Green Market & Bakery');
  const [email, setEmail] = useState('donations@harborgreen.org');
  const [password, setPassword] = useState('SafePantry2025#');
  const [confirmPassword, setConfirmPassword] = useState('SafePantry2025#');
  const [location, setLocation] = useState('Mission District, 94110');
  const [termsAgreed, setTermsAgreed] = useState(true);

  // Sign In states
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) {
      onShowToast('Please agree to the Food Safety & Good Samaritan terms');
      return;
    }
    setShowToast(true);
    setUserRole(role);
    onShowToast(`🎉 Account created for ${orgName}! Switched to ${role === 'donor' ? 'Donor' : 'NGO'} Mode.`);
    setTimeout(() => {
      setScreen(role === 'donor' ? 'dashboard' : 'activity');
    }, 1500);
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserRole('donor');
    onShowToast('Signed in successfully as Urban Kitchen Catering');
    setScreen('dashboard');
  };

  const handleSSO = (provider: 'Google' | 'Apple') => {
    onShowToast(`Authenticating securely with ${provider}...`);
    setTimeout(() => {
      setUserRole(role);
      onShowToast(`Welcome! Verified via ${provider}.`);
      setScreen('home');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full pb-20">
      {/* Interactive Feedback Toast */}
      {showToast && (
        <aside
          aria-live="polite"
          className="mb-4 transform transition-all duration-300 ease-out bg-primary-container text-on-primary-container rounded-2xl p-space-md shadow-md flex items-center justify-between gap-3 animate-in fade-in"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-full bg-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-on-primary-fixed text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <p className="font-body-sm text-body-sm font-medium truncate">
              Verification email sent! Please check your inbox.
            </p>
          </div>
          <button
            onClick={() => setShowToast(false)}
            className="text-on-primary-container/80 hover:text-on-primary-container shrink-0 p-1 rounded-lg"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </aside>
      )}

      {/* Community Impact Banner */}
      <section className="bg-surface-container-low rounded-2xl p-space-md shadow-sm mb-4 relative overflow-hidden border border-surface-container">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 shadow-sm bg-surface-container">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8PvYpsWl7ODw04_XH0vKFWkA7UopCj6zZ5vc0UF7LS0bQqlq8y9sGwvRnRIcWwA6dXce1gby9DAtYlbN63dA8PbflfcbmTPY1K9o_OfvOf4frTvEJfVIREQWQAjSXMB4NHfj64Bh2-mw1HY6kaiEFjVgtn-cPhy-ghXBSnSBm-vfJqSFuTjYyzAdh0vq4_QRSJR0_kSo3uB6cntbwwgXadjW_bTWwwxCG6cVccZc6F9Fyw3tVJmw"
              alt="Community volunteer handing fresh food"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-primary uppercase tracking-wide font-bold">
                3,420 kg Rescued This Week
              </span>
            </div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
              Join Our Shared Table
            </h2>
          </div>
        </div>
      </section>

      {/* Auth Wrapper Card */}
      <div className="bg-surface-container-lowest rounded-3xl p-space-lg shadow-sm border border-surface-container">
        {/* Top Segmented Switcher */}
        <div className="bg-surface-container p-1 rounded-2xl flex items-center mb-6">
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`flex-1 py-2 text-center rounded-xl font-label-md text-label-md transition-all duration-200 font-semibold ${
              authMode === 'signin'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 text-center rounded-xl font-label-md text-label-md transition-all duration-200 font-semibold ${
              authMode === 'signup'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Sign In Panel */}
        {authMode === 'signin' && (
          <form onSubmit={handleSignInSubmit} className="flex flex-col gap-4">
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="donations@harborgreen.org"
                  className="w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface shadow-sm font-body-md text-body-md outline-none focus:bg-surface-container border border-surface-container"
                />
              </div>
              <div className="relative">
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface shadow-sm font-body-md text-body-md outline-none focus:bg-surface-container border border-surface-container"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 bg-primary-container text-on-primary-container rounded-xl font-label-lg text-label-lg shadow-sm hover:opacity-95 transition-opacity flex items-center justify-center gap-2 font-semibold"
            >
              <span>Sign In to FoodShare</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </form>
        )}

        {/* Sign Up Form */}
        {authMode === 'signup' && (
          <form className="flex flex-col gap-5" onSubmit={handleSignUpSubmit}>
            {/* Role Selection Section */}
            <div>
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2.5 font-semibold">
                Select Your Community Role
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {/* Food Donor Card */}
                <label
                  onClick={() => setRole('donor')}
                  className={`relative flex items-start gap-3 p-3.5 rounded-2xl cursor-pointer transition-colors shadow-sm border ${
                    role === 'donor'
                      ? 'bg-surface-container-high border-primary/40'
                      : 'bg-surface-container-low hover:bg-surface-container border-transparent'
                  }`}
                >
                  <input
                    type="radio"
                    name="accountRole"
                    value="donor"
                    checked={role === 'donor'}
                    onChange={() => setRole('donor')}
                    className="mt-1 text-primary focus:ring-0 accent-primary w-4 h-4 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        storefront
                      </span>
                      <span className="font-title-md text-title-md text-on-surface font-semibold">Food Donor</span>
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                        Donor
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary line-clamp-1">
                      Restaurant, Grocery, Bakery, Caterer, or Individual
                    </p>
                    <p className="font-label-sm text-label-sm text-primary font-medium mt-1">
                      "I want to share surplus food"
                    </p>
                  </div>
                </label>

                {/* NGO / Recipient Card */}
                <label
                  onClick={() => setRole('recipient')}
                  className={`relative flex items-start gap-3 p-3.5 rounded-2xl cursor-pointer transition-colors shadow-sm border ${
                    role === 'recipient'
                      ? 'bg-surface-container-high border-tertiary-container/40'
                      : 'bg-surface-container-low hover:bg-surface-container border-transparent'
                  }`}
                >
                  <input
                    type="radio"
                    name="accountRole"
                    value="recipient"
                    checked={role === 'recipient'}
                    onChange={() => setRole('recipient')}
                    className="mt-1 text-primary focus:ring-0 accent-primary w-4 h-4 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="material-symbols-outlined text-tertiary-container text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        volunteer_activism
                      </span>
                      <span className="font-title-md text-title-md text-on-surface font-semibold">NGO / Recipient</span>
                      <span className="ml-auto px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                        Community
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-secondary line-clamp-1">
                      Food Bank, Shelter, Charity, Community Member
                    </p>
                    <p className="font-label-sm text-label-sm text-tertiary font-medium mt-1">
                      "I want to request and distribute food"
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Registration Fields */}
            <div className="flex flex-col gap-3">
              {/* Organization / Full Name */}
              <div className="relative bg-surface-container-low rounded-xl focus-within:bg-surface-container-high transition-colors shadow-sm border border-surface-container">
                <input
                  id="regOrgName"
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="Organization or Full Name"
                  className="w-full h-12 px-3.5 pr-10 rounded-xl bg-transparent text-on-surface font-body-md text-body-md outline-none"
                />
                <div className="absolute right-3.5 top-3 text-secondary">
                  <span className="material-symbols-outlined text-[20px]">business</span>
                </div>
              </div>

              {/* Email Address with Validation Checkmark */}
              <div className="relative bg-surface-container-low rounded-xl focus-within:bg-surface-container-high transition-colors shadow-sm border border-surface-container">
                <input
                  id="regEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full h-12 px-3.5 pr-10 rounded-xl bg-transparent text-on-surface font-body-md text-body-md outline-none"
                />
                <div className="absolute right-3.5 top-3 text-primary flex items-center">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified
                  </span>
                </div>
              </div>

              {/* Password with Strength Meter */}
              <div className="flex flex-col gap-1.5">
                <div className="relative bg-surface-container-low rounded-xl focus-within:bg-surface-container-high transition-colors shadow-sm border border-surface-container">
                  <input
                    id="regPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create Password"
                    className="w-full h-12 px-3.5 pr-10 rounded-xl bg-transparent text-on-surface font-body-md text-body-md outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-secondary hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </span>
                  </button>
                </div>

                {/* Password Strength Indicator */}
                <div className="px-1 flex items-center justify-between gap-2">
                  <div className="flex-1 flex items-center gap-1">
                    <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
                    <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
                    <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
                    <div className="h-1.5 flex-1 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <span className="material-symbols-outlined text-primary text-[14px]">shield</span>
                    <span className="font-label-sm text-label-sm text-primary font-semibold">Strong</span>
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="relative bg-surface-container-low rounded-xl focus-within:bg-surface-container-high transition-colors shadow-sm border border-surface-container">
                <input
                  id="regConfirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  className="w-full h-12 px-3.5 pr-10 rounded-xl bg-transparent text-on-surface font-body-md text-body-md outline-none"
                />
                <div className="absolute right-3.5 top-3 text-primary flex items-center">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check
                  </span>
                </div>
              </div>

              {/* Location / Zip Code with Auto-detect */}
              <div className="relative bg-surface-container-low rounded-xl focus-within:bg-surface-container-high transition-colors shadow-sm border border-surface-container">
                <input
                  id="regLocation"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Neighborhood or Zip Code"
                  className="w-full h-12 px-3.5 pr-10 rounded-xl bg-transparent text-on-surface font-body-md text-body-md outline-none"
                />
                <button
                  type="button"
                  onClick={() => onShowToast('📍 Location detected: Mission District, SF 94110')}
                  className="absolute right-3.5 top-3 text-primary hover:opacity-80"
                  title="Use current location"
                >
                  <span className="material-symbols-outlined text-[20px]">near_me</span>
                </button>
              </div>
            </div>

            {/* Food Safety & Good Samaritan Disclaimer Checkbox */}
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={termsAgreed}
                onChange={(e) => setTermsAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-0 accent-primary shrink-0"
              />
              <span className="font-body-sm text-body-sm text-secondary leading-relaxed">
                I agree to the <span className="text-primary font-semibold">Terms of Service</span> and acknowledge
                compliance with the{' '}
                <span className="text-on-surface font-semibold underline decoration-primary/40">
                  Food Safety &amp; Good Samaritan Donation guidelines
                </span>
                .
              </span>
            </label>

            {/* Primary Action Button */}
            <button
              type="submit"
              className="w-full h-12 bg-primary-container text-on-primary-container rounded-xl font-label-lg text-label-lg shadow-sm hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 font-bold"
            >
              <span>Create Account &amp; Start Sharing</span>
              <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
            </button>
          </form>
        )}

        {/* SSO Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="w-full h-[1px] bg-outline-variant/50 absolute"></div>
          <span className="relative px-3 bg-surface-container-lowest font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            or sign up with
          </span>
        </div>

        {/* Single Sign-On Actions */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Google SSO */}
          <button
            type="button"
            onClick={() => handleSSO('Google')}
            className="h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 transition-colors shadow-sm font-semibold border border-surface-container"
          >
            <svg aria-hidden="true" className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" fill="#EA4335" />
              <path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" fill="#4285F4" />
              <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2c0 2.8.7 5.5 1.9 7.8l3.7-2.9z" fill="#FBBC05" />
              <path d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.3 7.5 23.5 12 23.5z" fill="#34A853" />
            </svg>
            <span>Google</span>
          </button>

          {/* Apple SSO */}
          <button
            type="button"
            onClick={() => handleSSO('Apple')}
            className="h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 transition-colors shadow-sm font-semibold border border-surface-container"
          >
            <svg aria-hidden="true" className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.88c.67-.82 1.12-1.95 1-3.08-.97.04-2.14.65-2.83 1.46-.61.71-1.14 1.86-1 2.97 1.08.08 2.18-.54 2.83-1.35z" />
            </svg>
            <span>Apple</span>
          </button>
        </div>

        {/* Quick Toggle Text */}
        <div className="mt-6 text-center">
          <p className="font-body-sm text-body-sm text-secondary">
            {authMode === 'signup' ? 'Already have an account?' : "Don't have an account yet?"}{' '}
            <button
              type="button"
              onClick={() => setAuthMode(authMode === 'signup' ? 'signin' : 'signup')}
              className="text-primary font-semibold hover:underline ml-1"
            >
              {authMode === 'signup' ? 'Sign In' : 'Create Account'}
            </button>
          </p>
        </div>
      </div>

      {/* Trust & Transparency Footer Pill */}
      <footer className="mt-4 flex items-center justify-center gap-2 text-secondary font-label-sm text-label-sm">
        <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
          security
        </span>
        <span>Protected under Federal Bill Emerson Good Samaritan Act</span>
      </footer>
    </div>
  );
};
