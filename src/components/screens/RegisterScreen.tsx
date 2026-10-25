import React, { useState } from 'react';
import { ScreenType, UserRole } from '../../types';
import { TAMIL_NADU_DISTRICTS } from '../../data/mockData';

interface RegisterScreenProps {
  setScreen: (screen: ScreenType) => void;
  setUserRole: (role: UserRole) => void;
  onShowToast: (msg: string) => void;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  setScreen,
  setUserRole,
  onShowToast
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [selectedRole, setSelectedRole] = useState<'donor' | 'recipient'>('donor');
  
  // Step 1: Location & Role
  const [district, setDistrict] = useState('Chennai');
  const [area, setArea] = useState('Mylapore');
  const [pincode, setPincode] = useState('600004');

  // Step 2: Organization & Compliance
  const [orgType, setOrgType] = useState('Kalyana Mandapam & Catering');
  const [orgName, setOrgName] = useState('Sri Meenakshi Bhavan Catering');
  const [fssaiLicense, setFssaiLicense] = useState('12421008000412');
  const [darpanId, setDarpanId] = useState('TN/2019/021943');
  const [contactPerson, setContactPerson] = useState('K. Senthil Kumar');
  const [mobileNumber, setMobileNumber] = useState('98401 24892');
  const [email, setEmail] = useState('admin@meenakshibhavan.in');

  // Step 3: Safety & Credentials
  const [password, setPassword] = useState('Annadhanam2026#');
  const [confirmPassword, setConfirmPassword] = useState('Annadhanam2026#');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedFSSAI, setAgreedFSSAI] = useState(true);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 2) {
      if (selectedRole === 'donor' && fssaiLicense.length < 10) {
        onShowToast('Please enter a valid 14-digit FSSAI License Number');
        return;
      }
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (currentStep === 3) {
      if (!agreedFSSAI) {
        onShowToast('Please accept the FSSAI Surplus Food Recovery Pledge');
        return;
      }
      if (password !== confirmPassword) {
        onShowToast('Passwords do not match');
        return;
      }
      setUserRole(selectedRole);
      onShowToast(`Sending SMS verification code to +91 ${mobileNumber}...`);
      setScreen('otp-verify');
    }
  };

  return (
    <div className="flex flex-col w-full pb-20 animate-in fade-in duration-200">
      {/* Top Bar with Step & Back */}
      <div className="flex items-center justify-between py-2 mb-2">
        <button
          onClick={() => {
            if (currentStep > 1) {
              setCurrentStep((s) => (s - 1) as 1 | 2);
            } else {
              setScreen('login');
            }
          }}
          className="inline-flex items-center gap-1 text-on-surface-variant hover:text-primary text-body-sm font-semibold transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          <span>{currentStep === 1 ? 'Back to Sign In' : `Back to Step ${currentStep - 1}`}</span>
        </button>

        <span className="font-label-sm font-bold text-primary bg-primary-fixed/30 px-2.5 py-0.5 rounded-full">
          Step {currentStep} of 3
        </span>
      </div>

      {/* Stepper Progress Bar */}
      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%' }}
        ></div>
      </div>

      {/* Header Banner */}
      <div className="rounded-2xl bg-surface-container-low p-4 mb-5 border border-surface-container shadow-xs">
        <h1 className="font-headline-sm text-headline-sm text-on-surface font-bold">
          {currentStep === 1 && '1. Choose Role & Tamil Nadu Location'}
          {currentStep === 2 && '2. Organization & FSSAI Accreditation'}
          {currentStep === 3 && '3. Safety Pledge & Security Passcode'}
        </h1>
        <p className="font-body-sm text-on-surface-variant mt-0.5">
          {currentStep === 1 && 'Register your catering service, hotel, marriage hall, or local charitable trust'}
          {currentStep === 2 && 'Provide mandatory food safety and contact person details'}
          {currentStep === 3 && 'Acknowledge FSSAI Surplus Food Regulations, 2019'}
        </p>
      </div>

      {/* Form Content */}
      <form onSubmit={handleNextStep} className="bg-surface-container-lowest rounded-3xl p-5 shadow-sm border border-surface-container flex flex-col gap-5">
        {/* STEP 1 */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block font-label-md text-on-surface-variant mb-2 font-semibold">
                Select Your Stakeholder Category
              </label>
              <div className="grid grid-cols-1 gap-3">
                {/* Donor Option */}
                <div
                  onClick={() => setSelectedRole('donor')}
                  className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                    selectedRole === 'donor'
                      ? 'bg-surface-container-high border-primary/50 shadow-sm'
                      : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[22px]">
                        restaurant_menu
                      </span>
                      <span className="font-title-md text-title-md text-on-surface font-bold">
                        Food Donor (உணவு வழங்குபவர்)
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm font-bold">
                      Donor
                    </span>
                  </div>
                  <p className="font-body-sm text-secondary">
                    Kalyana Mandapams, Hotels, Sweet Stalls, Mess, Banquet Caterers, Corporate Canteens
                  </p>
                </div>

                {/* NGO / Recipient Option */}
                <div
                  onClick={() => setSelectedRole('recipient')}
                  className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                    selectedRole === 'recipient'
                      ? 'bg-surface-container-high border-tertiary-container/50 shadow-sm'
                      : 'bg-surface-container-low border-surface-container hover:bg-surface-container'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-tertiary-container text-[22px]">
                        volunteer_activism
                      </span>
                      <span className="font-title-md text-title-md text-on-surface font-bold">
                        NGO / Anbalayam / Shelter (தன்னார்வ அமைப்பு)
                      </span>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm font-bold">
                      Charity
                    </span>
                  </div>
                  <p className="font-body-sm text-secondary">
                    Food Banks, Orphanages, Old Age Homes, Community Pantries, Robin Hood Army Chapters
                  </p>
                </div>
              </div>
            </div>

            {/* Tamil Nadu District Dropdown */}
            <div>
              <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                Tamil Nadu District / Headquarters
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
                  location_city
                </span>
                <select
                  aria-label="District selection"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full h-12 pl-11 pr-8 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container appearance-none"
                >
                  {TAMIL_NADU_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist}>
                      {dist}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 pointer-events-none text-on-surface-variant">
                  expand_more
                </span>
              </div>
            </div>

            {/* Locality & Pincode Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                  Area / Locality
                </label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Mylapore / RS Puram"
                  className="w-full h-12 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container"
                />
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                  Postal PIN Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="600004"
                  className="w-full h-12 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {currentStep === 2 && (
          <div className="space-y-3.5">
            <div>
              <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                Organization / Establishment Name
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
                  storefront
                </span>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g., Sri Meenakshi Bhavan Catering"
                  className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container"
                />
              </div>
            </div>

            <div>
              <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                Establishment Type
              </label>
              <select
                aria-label="Establishment type"
                value={orgType}
                onChange={(e) => setOrgType(e.target.value)}
                className="w-full h-12 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container"
              >
                {selectedRole === 'donor' ? (
                  <>
                    <option value="Kalyana Mandapam & Catering">Kalyana Mandapam (Marriage Hall)</option>
                    <option value="Restaurant & Banquet">Pure Veg Restaurant / Non-Veg Mess</option>
                    <option value="Sweet Stall & Bakery">Traditional Sweet Stall / Bakery</option>
                    <option value="Wholesale Agro Merchant">Wholesale Market Trader (Koyambedu / Mandi)</option>
                    <option value="Temple Annadhanam Trust">Temple Annadhanam Trustee</option>
                  </>
                ) : (
                  <>
                    <option value="Registered Charitable Trust">12A/80G Registered Charitable Trust</option>
                    <option value="Elder Shelter & Orphanage">Elder Shelter / Orphanage (Anbalayam)</option>
                    <option value="Volunteer Rescue Network">Volunteer Food Rescue Network (e.g. Robin Hood Army)</option>
                    <option value="Community Kitchen">Community Free Kitchen</option>
                  </>
                )}
              </select>
            </div>

            {selectedRole === 'donor' ? (
              <div>
                <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                  FSSAI License / Registration Number (14 Digits)
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-primary text-[20px]">
                    verified
                  </span>
                  <input
                    type="text"
                    required
                    maxLength={14}
                    value={fssaiLicense}
                    onChange={(e) => setFssaiLicense(e.target.value)}
                    placeholder="12421008000412"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container font-mono"
                  />
                </div>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-1 block">
                  Mandatory under FSSAI Surplus Food Regulations 2019 for bulk food donors.
                </span>
              </div>
            ) : (
              <div>
                <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                  NGO NITI Aayog Darpan ID / Trust Registration #
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-primary text-[20px]">
                    account_balance
                  </span>
                  <input
                    type="text"
                    required
                    value={darpanId}
                    onChange={(e) => setDarpanId(e.target.value)}
                    placeholder="TN/2019/021943"
                    className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container font-mono"
                  />
                </div>
              </div>
            )}

            {/* Representative Details */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                  Authorized Person
                </label>
                <input
                  type="text"
                  required
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="K. Senthil Kumar"
                  className="w-full h-12 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container"
                />
              </div>

              <div>
                <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                  WhatsApp Contact (+91)
                </label>
                <input
                  type="tel"
                  required
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="98401 24892"
                  className="w-full h-12 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                Official Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="contact@meenakshibhavan.in"
                className="w-full h-12 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container"
              />
            </div>
          </div>
        )}

        {/* STEP 3 */}
        {currentStep === 3 && (
          <div className="space-y-4">
            {/* Password */}
            <div>
              <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                Create Account Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 px-3.5 pr-11 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container"
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

            {/* Confirm Password */}
            <div>
              <label className="block font-label-md text-on-surface-variant mb-1 font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container"
              />
            </div>

            {/* Food Safety & FSSAI Pledge Box */}
            <div className="p-3.5 rounded-2xl bg-surface-container-low border border-surface-container flex items-start gap-3">
              <input
                type="checkbox"
                id="fssaiPledge"
                checked={agreedFSSAI}
                onChange={(e) => setAgreedFSSAI(e.target.checked)}
                className="mt-1 w-5 h-5 rounded text-primary focus:ring-0 accent-primary shrink-0 cursor-pointer"
              />
              <label htmlFor="fssaiPledge" className="font-body-sm text-on-surface-variant cursor-pointer">
                <strong className="text-on-surface block font-semibold mb-0.5">
                  FSSAI Surplus Food Recovery &amp; Hygiene Pledge
                </strong>
                I hereby declare that all surplus food distributed will be handled in compliance with FSSAI
                hygiene standards, hot-hold temperatures (&gt;65°C), and verified shelf-life guidelines.
              </label>
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex items-center gap-3 pt-2">
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => (s - 1) as 1 | 2)}
              className="py-3 px-4 rounded-xl bg-surface-container text-on-surface font-label-md font-semibold hover:bg-surface-container-high transition-colors"
            >
              Previous
            </button>
          )}

          <button
            type="submit"
            className="flex-1 py-3 px-4 rounded-xl bg-primary text-on-primary font-label-md font-bold hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-sm"
          >
            <span>{currentStep === 3 ? 'Generate OTP & Verify' : `Continue to Step ${currentStep + 1}`}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </form>

      {/* Switcher back to Sign In and New User Login */}
      <div className="mt-5 text-center space-y-2">
        <p className="font-body-sm text-secondary">
          Already registered your establishment?{' '}
          <button
            type="button"
            onClick={() => setScreen('login')}
            className="text-primary font-bold hover:underline ml-0.5"
          >
            Sign In here
          </button>
        </p>

        <div>
          <button
            type="button"
            onClick={() => setScreen('new-user-login')}
            className="text-xs text-on-surface-variant hover:text-tertiary font-semibold hover:underline inline-flex items-center gap-1"
          >
            <span>Need quick personal access instead?</span>
            <span className="font-bold text-tertiary">Try New User Login (புதிய பயனர்) &rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};
