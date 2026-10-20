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
      case 'home': return 'Home';
      case 'browse': return 'Browse';
      case 'details': return 'Listing Details';
      case 'donate': return 'Donate';
      case 'dashboard': return 'Dashboard';
      case 'activity': return 'Activity';
      case 'auth': return 'Account';
      case 'admin': return 'Administration';
      default: return 'FoodShare';
    }
  };

  const getRoleBadge = () => {
    if (userRole === 'admin') return 'ADMIN';
    if (userRole === 'recipient') return 'COMMUNITY';
    return 'DONOR';
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container">
      <div className="h-16 px-gutter-mobile flex items-center justify-between max-w-md mx-auto">
        {/* Left cluster: back button (if stack) or logo & title */}
        <div className="flex items-center gap-space-xs min-w-0">
          {showBack && (
            <button
              onClick={onBack || (() => setScreen('browse'))}
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
              alt="FoodShare Logo"
              className="h-8 w-auto object-contain shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-headline-sm text-primary leading-none font-bold">
                  FoodShare
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowRoleMenu(!showRoleMenu);
                  }}
                  className="px-1.5 py-0.5 rounded-full bg-secondary-container hover:bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold tracking-wider transition-colors"
                  title="Click to switch perspective"
                >
                  {getRoleBadge()}
                </button>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate max-w-[130px]">
                {getScreenTitle()}
              </span>
            </div>
          </div>
        </div>

        {/* Right cluster: notifications & profile */}
        <div className="flex items-center gap-1 relative">
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
                <span className="font-title-md text-title-md text-on-surface">Community Alerts</span>
                <span className="font-label-sm text-primary font-semibold">Realtime</span>
              </div>
              <div className="space-y-2 text-left">
                <div 
                  onClick={() => { setScreen('dashboard'); setShowNotifications(false); }}
                  className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-tertiary font-bold">New Food Request</span>
                    <span className="font-label-sm text-on-surface-variant">10m ago</span>
                  </div>
                  <p className="font-body-sm text-on-surface mt-0.5">Hope Community Shelter requested 28 Veggie Bowls.</p>
                </div>

                <div 
                  onClick={() => { setScreen('activity'); setShowNotifications(false); }}
                  className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-primary font-bold">Courier Dispatched</span>
                    <span className="font-label-sm text-on-surface-variant">25m ago</span>
                  </div>
                  <p className="font-body-sm text-on-surface mt-0.5">David S. is on the way to 742 Valencia St (ETA 8m).</p>
                </div>
              </div>
            </div>
          )}

          {/* Role Switcher & Account Menu */}
          {showRoleMenu && (
            <div className="absolute right-0 top-12 w-64 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-high p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-surface-container mb-2">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM2Q2SPorKwAeUStBSxl8mVkcgze1KbnCNQ0bj_JWEZ7Dgi7dW2k5Ock7A8crIUrQMwF9KBn1bXxF--P_qfnKabsy9HfvEgRocbYfboHjkUxHt74ijgCGxNzOYetcbpcjDu82d9Y5t7P1eKkndaFBCjVEtTUBPykpOqpQmxF_1pI4oC5haarrBl-h3gFcLEJUAnDj7rdCZG3q6Gf9D2452gxufSY4BZx12Kd3V_WRK89iZpImVOdk"
                  alt="Maria"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="min-w-0">
                  <div className="font-title-md text-title-md text-on-surface font-semibold truncate">
                    {userRole === 'donor' ? 'Maria (Donor)' : userRole === 'recipient' ? 'David (NGO)' : 'Super Admin'}
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate block">
                    {userRole === 'donor' ? 'Urban Kitchen Catering' : userRole === 'recipient' ? 'Hope Community Food Bank' : 'Platform Operations'}
                  </span>
                </div>
              </div>

              <div className="text-left space-y-1">
                <span className="font-label-sm text-on-surface-variant uppercase tracking-wider block px-2 py-1">
                  Switch Persona / Screen
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
                    <span className="material-symbols-outlined text-[18px]">storefront</span>
                    Food Donor (Urban Kitchen)
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
                    NGO / Recipient (Hope Food Bank)
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
                    <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                    Platform Super Admin
                  </span>
                  {userRole === 'admin' && <span className="material-symbols-outlined text-[16px]">check</span>}
                </button>

                <div className="pt-2 border-t border-surface-container">
                  <button
                    type="button"
                    onClick={() => {
                      setScreen('auth');
                      setShowRoleMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-left text-body-sm text-primary hover:bg-surface-container font-semibold"
                  >
                    <span className="material-symbols-outlined text-[18px]">account_circle</span>
                    Sign In / Create Account
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
