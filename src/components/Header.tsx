import React, { useState } from 'react';
import { ScreenType, UserRole } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  setScreen,
  userRole,
  setUserRole,
  title,
  showBack = false,
  onBack
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  const getScreenTitle = () => {
    if (title) return title;
    switch (currentScreen) {
      case 'home': return 'Home • முகப்பு';
      case 'browse': return 'Browse Rescues • உலாவு';
      case 'details': return 'Listing Details';
      case 'donate': return 'Donate Food • தானம்';
      case 'dashboard': return 'Donor Dashboard';
      case 'activity': return 'NGO Dispatch • பணிகள்';
      case 'login': return 'Sign In • புகுபதிவு';
      case 'new-user-login': return 'New User Login • புதிய பயனர்';
      case 'register': return 'Registration • பதிவு';
      case 'otp-verify': return 'Verify OTP';
      case 'admin': return 'TN Admin & FSSAI';
      default: return 'FoodShare TN';
    }
  };

  const getRoleBadge = () => {
    if (userRole === 'admin') return 'ADMIN';
    if (userRole === 'recipient') return 'NGO / SHELTER';
    return 'DONOR';
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container">
      <div className="h-16 px-gutter-mobile flex items-center justify-between max-w-md mx-auto">
        {/* Left cluster: back button or logo & title */}
        <div className="flex items-center gap-space-xs min-w-0">
          {showBack && (
            <button
              onClick={onBack || (() => setScreen('home'))}
              className="w-10 h-10 -ml-1 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container active:scale-95 transition-all"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          )}

          <div
            onClick={() => setScreen('home')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpchK_2VlIkKkn_nHJm29vEOmhBlFY4iHqXamxmd6RoMKmopkvBs2Gd016mtFCc1enE-AT-xb8oJZYX5cUxGgzTavrTy0FFC3ODEsSx2ZSwy7UdpxHCSWteRYs5ejOzbt2PC8IR-TDGDvdBeF39Tt0KRdYTwdUt0mu7TVNABAcVUJJEGYrsq0GuNla_SNtLzxFIiSlXrsArsWPvjdBBpbJs7wLxIQ8voKXTduLHTJ_wBzGLYjGj9w"
              alt="FoodShare Tamil Nadu Logo"
              className="h-8 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-primary leading-none font-bold">
                  FoodShare
                </span>
                <span className="text-[11px] font-bold text-tertiary">
                  TN
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRoleMenu(!showRoleMenu);
                  }}
                  className="px-1.5 py-0.5 rounded-full bg-secondary-container hover:bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold tracking-wider transition-colors ml-0.5"
                  title="Click to switch persona"
                >
                  {getRoleBadge()}
                </button>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate max-w-[145px]">
                {getScreenTitle()}
              </span>
            </div>
          </div>
        </div>

        {/* Right cluster: quick login button, notifications & profile */}
        <div className="flex items-center gap-1.5 relative">
          {/* Direct Quick Login Page Action */}
          <button
            type="button"
            onClick={() => {
              if (currentScreen === 'new-user-login') {
                setScreen('login');
              } else {
                setScreen('new-user-login');
              }
            }}
            className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 shadow-xs active:scale-95 border ${
              currentScreen === 'new-user-login'
                ? 'bg-primary-container text-on-primary-container border-primary/30 hover:bg-primary hover:text-on-primary'
                : 'bg-tertiary-container text-on-tertiary-container border-tertiary-container hover:bg-tertiary hover:text-white'
            }`}
            title={currentScreen === 'new-user-login' ? 'Switch to Returning User Login' : 'Open Dedicated New User Login Page'}
          >
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {currentScreen === 'new-user-login' ? 'login' : 'person_add'}
            </span>
            <span className="font-semibold">
              {currentScreen === 'new-user-login' ? 'Sign In' : 'New User'}
            </span>
          </button>

          {/* Notifications Button */}
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowRoleMenu(false);
              setUnreadCount(0);
            }}
            aria-label="Notifications"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-tertiary-fixed-dim opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-tertiary"></span>
              </span>
            )}
          </button>

          {/* Profile Avatar Button */}
          <button
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowNotifications(false);
            }}
            className="w-10 h-10 flex items-center justify-center p-0.5 rounded-full hover:ring-2 hover:ring-primary/40 active:scale-95 transition-all"
            aria-label="User Profile & Role Switcher"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnsn5mglERQj9o7jV0eqohAnGMn6JaDqmhG-cppHoUlbVvDfGnWNK2IjwYDWZwXgO5lpskeAXfI4lNF4sIxspf3rMiyihioCi3kdWLSRD82hFmwBs10DJYpwSJH3m6oKwdXku9-qOVcEPHX6cG-H2iiFcpu91Xg8T_KWD5MnhC2wt41bxEkw_3_hEeFWBrjn6MBE4Bh6gqCsy2Qdfia9mKjRazWmmo0hBmTiIEe6uY3Z9qWkjYqVc"
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
          </button>

          {/* Notifications Flyout */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-surface-container mb-2">
                <span className="font-title-md text-title-md text-on-surface font-semibold">Tamil Nadu Alerts</span>
                <span className="font-label-sm text-primary font-bold">Live Network</span>
              </div>
              <div className="space-y-2 text-left">
                <div 
                  onClick={() => { setScreen('dashboard'); setShowNotifications(false); }}
                  className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-tertiary font-bold">Mylapore Request</span>
                    <span className="font-label-sm text-on-surface-variant font-medium">8m ago</span>
                  </div>
                  <p className="font-body-sm text-on-surface mt-0.5">
                    No Food Waste requested 85 Sambar Rice Packets for Triplicane Shelter.
                  </p>
                </div>

                <div 
                  onClick={() => { setScreen('activity'); setShowNotifications(false); }}
                  className="p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-primary font-bold">Tata Ace Transit</span>
                    <span className="font-label-sm text-on-surface-variant font-medium">18m ago</span>
                  </div>
                  <p className="font-body-sm text-on-surface mt-0.5">
                    Driver S. Karthik (TN-07-BW-4821) en route to North Mada Street, Mylapore.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Role Switcher & Account Menu */}
          {showRoleMenu && (
            <div className="absolute right-0 top-12 w-72 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-surface-container mb-2">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM2Q2SPorKwAeUStBSxl8mVkcgze1KbnCNQ0bj_JWEZ7Dgi7dW2k5Ock7A8crIUrQMwF9KBn1bXxF--P_qfnKabsy9HfvEgRocbYfboHjkUxHt74ijgCGxNzOYetcbpcjDu82d9Y5t7P1eKkndaFBCjVEtTUBPykpOqpQmxF_1pI4oC5haarrBl-h3gFcLEJUAnDj7rdCZG3q6Gf9D2452gxufSY4BZx12Kd3V_WRK89iZpImVOdk"
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <div className="font-title-md text-title-md text-on-surface font-bold truncate">
                    {userRole === 'donor'
                      ? 'Senthil Kumar (Chef)'
                      : userRole === 'recipient'
                      ? 'Anandhi S. (Coordinator)'
                      : 'TN Food Safety Admin'}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate block font-medium">
                    {userRole === 'donor'
                      ? 'Sri Meenakshi Bhavan, Mylapore'
                      : userRole === 'recipient'
                      ? 'No Food Waste (Chennai Hub)'
                      : 'FSSAI Tamil Nadu Directorate'}
                  </span>
                </div>
              </div>

              <div className="text-left space-y-1">
                <span className="font-label-sm text-on-surface-variant uppercase tracking-wider block px-2 py-1 font-semibold">
                  Switch Stakeholder View
                </span>
                
                <button
                  type="button"
                  onClick={() => {
                    setUserRole('donor');
                    setScreen('dashboard');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-body-sm font-medium transition-colors ${
                    userRole === 'donor' ? 'bg-primary-container text-on-primary-container font-semibold' : 'hover:bg-surface-container'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">restaurant</span>
                    Food Donor (Mandapam &amp; Hotel)
                  </span>
                  {userRole === 'donor' && <span className="material-symbols-outlined text-[16px]">check</span>}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserRole('recipient');
                    setScreen('activity');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-body-sm font-medium transition-colors ${
                    userRole === 'recipient' ? 'bg-primary-container text-on-primary-container font-semibold' : 'hover:bg-surface-container'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                    NGO / Shelter (No Food Waste TN)
                  </span>
                  {userRole === 'recipient' && <span className="material-symbols-outlined text-[16px]">check</span>}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setUserRole('admin');
                    setScreen('admin');
                    setShowRoleMenu(false);
                  }}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-body-sm font-medium transition-colors ${
                    userRole === 'admin' ? 'bg-primary-container text-on-primary-container font-semibold' : 'hover:bg-surface-container'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    FSSAI &amp; State Super Admin
                  </span>
                  {userRole === 'admin' && <span className="material-symbols-outlined text-[16px]">check</span>}
                </button>

                {/* Dedicated Separate Login & Register Page Links */}
                <div className="pt-2 border-t border-surface-container space-y-1">
                  <button
                    type="button"
                    onClick={() => {
                      setScreen('new-user-login');
                      setShowRoleMenu(false);
                    }}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-body-sm text-tertiary hover:bg-surface-container font-bold group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px]">person_add</span>
                      New User Login (புதிய பயனர்)
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed uppercase">
                      New
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setScreen('login');
                      setShowRoleMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-left text-body-sm text-primary hover:bg-surface-container font-bold"
                  >
                    <span className="material-symbols-outlined text-[18px]">login</span>
                    Sign In to Account (ஏற்கனவே உள்ளவர்)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setScreen('register');
                      setShowRoleMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-left text-body-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container font-medium"
                  >
                    <span className="material-symbols-outlined text-[18px]">domain_add</span>
                    Register Establishment (FSSAI)
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
