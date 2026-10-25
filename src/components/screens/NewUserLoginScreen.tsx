import React, { useState } from 'react';
import { ScreenType, UserRole } from '../../types';
import { TAMIL_NADU_DISTRICTS } from '../../data/mockData';

interface NewUserLoginScreenProps {
  setScreen: (screen: ScreenType) => void;
  setUserRole: (role: UserRole) => void;
  onShowToast: (msg: string) => void;
}

export const NewUserLoginScreen: React.FC<NewUserLoginScreenProps> = ({
  setScreen,
  setUserRole,
  onShowToast
}) => {
  const [userIntent, setUserIntent] = useState<'donor' | 'recipient' | 'volunteer'>('donor');
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [district, setDistrict] = useState('Chennai');
  const [locality, setLocality] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleNewUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber || mobileNumber.length < 10) {
      onShowToast('Please enter a valid 10-digit mobile number');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUserRole(userIntent === 'volunteer' ? 'recipient' : userIntent);
      onShowToast(`வணக்கம் ${fullName || 'Friend'}! 6-digit WhatsApp OTP sent to +91 ${mobileNumber}`);
      setScreen('otp-verify');
    }, 700);
  };

  const handleGoogleQuickJoin = () => {
    onShowToast('Connecting with Google for New User Quick Access...');
    setTimeout(() => {
      setUserRole(userIntent === 'volunteer' ? 'recipient' : userIntent);
      onShowToast(`வணக்கம்! Welcome to FoodShare Tamil Nadu.`);
      setScreen(userIntent === 'donor' ? 'dashboard' : 'activity');
    }, 800);
  };

  return (
    <div className="flex flex-col w-full pb-20 animate-in fade-in duration-200">
      {/* Top Breadcrumb Navigation */}
      <div className="flex items-center justify-between py-2 mb-2">
        <button
          onClick={() => setScreen('home')}
          className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary text-body-sm font-semibold transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>Back to Home</span>
        </button>

        <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-label-sm font-bold tracking-wider">
          NEW USER PORTAL
        </span>
      </div>

      {/* Dedicated Page Navigator between Existing Sign In & New User Login */}
      <div className="bg-surface-container-high p-1 rounded-2xl flex items-center mb-3.5 border border-surface-container shadow-xs">
        <button
          type="button"
          onClick={() => setScreen('login')}
          className="flex-1 py-2 px-2.5 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container font-label-md font-bold text-center flex items-center justify-center gap-1.5 transition-all text-xs group"
        >
          <span className="material-symbols-outlined text-[16px] text-primary">login</span>
          <span className="group-hover:underline">&larr; 1. Returning Sign In</span>
        </button>
        <button
          type="button"
          disabled
          className="flex-1 py-2 px-2.5 rounded-xl bg-surface-container-lowest text-tertiary-container shadow-xs font-label-md font-bold text-center flex items-center justify-center gap-1.5 cursor-default text-xs"
        >
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            person_add
          </span>
          <span>2. New User Login</span>
        </button>
      </div>

      {/* Hero Header Card */}
      <div className="rounded-3xl bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high p-5 mb-5 border border-surface-container shadow-xs relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-primary-fixed/20 pointer-events-none blur-xl"></div>
        <div className="relative z-10 flex items-start gap-3.5">
          <div className="w-13 h-13 min-w-[52px] rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              waving_hand
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-primary uppercase tracking-wider font-bold">
                Welcome to FoodShare TN • நல்வரவு
              </span>
            </div>
            <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
              New User Quick Login
            </h1>
            <p className="font-body-sm text-on-surface-variant mt-0.5">
              Start donating excess meals or requesting food batches in under 1 minute.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container">
        <form onSubmit={handleNewUserSubmit} className="flex flex-col gap-5">
          {/* 1. What brings you here? (Intent Selector) */}
          <div>
            <label className="block font-title-md text-title-md text-on-surface font-bold mb-2">
              1. What describes you best? (உங்கள் பங்கு)
            </label>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Option A: Donor */}
              <div
                onClick={() => setUserIntent('donor')}
                className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                  userIntent === 'donor'
                    ? 'bg-surface-container-high border-primary/50 shadow-sm'
                    : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      restaurant
                    </span>
                    <span className="font-title-md text-title-md text-on-surface font-bold">
                      I have surplus food to donate
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm font-bold">
                    Donor
                  </span>
                </div>
                <p className="font-body-sm text-secondary pl-7">
                  Marriage Hall (கல்யாண மண்டபம்), Hotel, Mess, Catering, or Event Organizer
                </p>
              </div>

              {/* Option B: NGO / Shelter */}
              <div
                onClick={() => setUserIntent('recipient')}
                className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                  userIntent === 'recipient'
                    ? 'bg-surface-container-high border-tertiary-container/50 shadow-sm'
                    : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-tertiary-container text-[22px]">
                      volunteer_activism
                    </span>
                    <span className="font-title-md text-title-md text-on-surface font-bold">
                      I need food for shelter or community
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-bold">
                    Shelter / NGO
                  </span>
                </div>
                <p className="font-body-sm text-secondary pl-7">
                  Anbalayam, Orphanage, Elder Care, Street Feeding, or Charity Kitchen
                </p>
              </div>

              {/* Option C: Volunteer */}
              <div
                onClick={() => setUserIntent('volunteer')}
                className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                  userIntent === 'volunteer'
                    ? 'bg-surface-container-high border-primary/50 shadow-sm'
                    : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      two_wheeler
                    </span>
                    <span className="font-title-md text-title-md text-on-surface font-bold">
                      I want to volunteer / deliver meals
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm font-bold">
                    Volunteer
                  </span>
                </div>
                <p className="font-body-sm text-secondary pl-7">
                  Bike / Auto / Tata Ace driver or community volunteer in Tamil Nadu
                </p>
              </div>
            </div>
          </div>

          {/* Quick Demo Autofill Chips */}
          <div className="bg-surface-container-low p-2.5 rounded-2xl border border-surface-container">
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold block mb-1.5">
              Instant 1-Click Demo Profiles (புதிய பயனர் மாதிரிகள்):
            </span>
            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setUserIntent('donor');
                  setFullName('Sri Raghavendra Mandapam');
                  setMobileNumber('98410 88219');
                  setDistrict('Chennai');
                  setLocality('Mylapore, North Mada St');
                }}
                className="px-2.5 py-1 rounded-xl bg-surface-container-highest hover:bg-primary-container text-on-surface hover:text-on-primary-container font-label-sm text-[11px] font-bold transition-colors border border-surface-container flex items-center gap-1"
              >
                <span>🏢</span>
                <span>Mandapam Donor</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setUserIntent('recipient');
                  setFullName('Anbalayam Seva Trust');
                  setMobileNumber('94432 15002');
                  setDistrict('Madurai');
                  setLocality('Simmakkal');
                }}
                className="px-2.5 py-1 rounded-xl bg-surface-container-highest hover:bg-tertiary-container text-on-surface hover:text-on-tertiary-container font-label-sm text-[11px] font-bold transition-colors border border-surface-container flex items-center gap-1"
              >
                <span>🍲</span>
                <span>Shelter Recipient</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setUserIntent('volunteer');
                  setFullName('K. Vignesh (Auto)');
                  setMobileNumber('97890 33411');
                  setDistrict('Coimbatore');
                  setLocality('RS Puram');
                }}
                className="px-2.5 py-1 rounded-xl bg-surface-container-highest hover:bg-secondary-fixed text-on-surface hover:text-on-secondary-fixed font-label-sm text-[11px] font-bold transition-colors border border-surface-container flex items-center gap-1"
              >
                <span>🛵</span>
                <span>Volunteer Transport</span>
              </button>
            </div>
          </div>

          {/* 2. Basic Contact Details */}
          <div className="space-y-3.5">
            <div>
              <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                Your Full Name or Establishment Name <span className="text-tertiary">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
                  person
                </span>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Senthil / Sri Meenakshi Bhavan"
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container focus:bg-surface-container-high transition-colors font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                Mobile Number for Instant WhatsApp OTP <span className="text-tertiary">*</span>
              </label>
              <div className="flex items-center rounded-xl bg-surface-container-low border border-surface-container focus-within:border-primary focus-within:bg-surface-container-high transition-colors overflow-hidden">
                <div className="flex items-center gap-1 px-3.5 py-3 bg-surface-container border-r border-surface-container text-body-md font-bold text-on-surface shrink-0">
                  <span>🇮🇳</span>
                  <span>+91</span>
                </div>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="98401 24892"
                  className="w-full h-12 px-3.5 bg-transparent text-on-surface font-body-md outline-none font-mono font-bold"
                />
              </div>
            </div>

            {/* Tamil Nadu District & Locality Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                  Tamil Nadu District <span className="text-tertiary">*</span>
                </label>
                <div className="relative flex items-center">
                  <select
                    aria-label="Select Tamil Nadu District"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full h-12 px-3 pr-7 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container appearance-none font-semibold text-sm"
                  >
                    {TAMIL_NADU_DISTRICTS.map((dist) => (
                      <option key={dist} value={dist}>
                        {dist}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-2 pointer-events-none text-on-surface-variant text-[18px]">
                    expand_more
                  </span>
                </div>
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                  Locality / Area
                </label>
                <input
                  type="text"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Mylapore / RS Puram"
                  className="w-full h-12 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container font-medium text-sm"
                />
              </div>
            </div>
          </div>

          {/* Quick Notice */}
          <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-start gap-2.5">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
              shield
            </span>
            <p className="font-body-sm text-on-surface-variant text-xs leading-relaxed">
              No password needed! You'll receive a fast SMS / WhatsApp code to login instantly and start sharing or requesting food.
            </p>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-label-lg text-label-lg font-bold shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
            ) : (
              <>
                <span>Get OTP &amp; Start as New User</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="w-full h-[1px] bg-outline-variant/40 absolute"></div>
          <span className="relative px-3 bg-surface-container-lowest font-label-sm text-secondary uppercase tracking-wider font-semibold">
            or quick join with
          </span>
        </div>

        {/* Google SSO for New Users */}
        <button
          type="button"
          onClick={handleGoogleQuickJoin}
          className="w-full h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md flex items-center justify-center gap-2.5 transition-colors border border-surface-container font-bold shadow-xs"
        >
          <svg aria-hidden="true" className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" fill="#EA4335" />
            <path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" fill="#4285F4" />
            <path d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2c0 2.8.7 5.5 1.9 7.8l3.7-2.9z" fill="#FBBC05" />
            <path d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.3 7.5 23.5 12 23.5z" fill="#34A853" />
          </svg>
          <span>One-Tap Join with Google</span>
        </button>

        {/* Clear Routing for Existing Users */}
        <div className="mt-6 pt-4 border-t border-surface-container text-center space-y-2">
          <p className="font-body-sm text-secondary">
            Already have an existing FoodShare account?
          </p>
          <button
            type="button"
            onClick={() => setScreen('login')}
            className="inline-flex items-center gap-1.5 text-primary font-title-md font-bold hover:underline"
          >
            <span className="material-symbols-outlined text-[18px]">login</span>
            <span>Go to Existing User Login • ஏற்கனவே கணக்கு உள்ளதா?</span>
          </button>

          <div>
            <button
              type="button"
              onClick={() => setScreen('register')}
              className="text-xs text-on-surface-variant hover:text-primary font-medium hover:underline inline-block mt-1"
            >
              Need full enterprise registration with 14-digit FSSAI / 80G documentation? Click here
            </button>
          </div>
        </div>
      </div>

      {/* Trust Footer */}
      <footer className="mt-5 text-center space-y-1">
        <div className="inline-flex items-center gap-1.5 text-secondary font-label-sm">
          <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
          <span>Compliant with FSSAI Surplus Food Regulations, 2019</span>
        </div>
        <p className="font-label-sm text-[11px] text-on-surface-variant">
          Indian Food Sharing Alliance (IFSA) • Tamil Nadu Directorate
        </p>
      </footer>
    </div>
  );
};
