import React from 'react';
import { ScreenType } from '../types';

interface BottomNavProps {
  currentScreen: ScreenType;
  setScreen: (screen: ScreenType) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, setScreen }) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.05)] border-t border-surface-container">
      <div className="flex justify-between items-center h-16 px-space-xs max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => setScreen('home')}
          className={`flex-1 flex flex-col items-center justify-center h-full transition-colors ${
            currentScreen === 'home'
              ? 'text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          aria-label="Home"
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={currentScreen === 'home' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            home
          </span>
          <span className="font-label-sm text-label-sm mt-0.5">Home</span>
        </button>

        {/* Browse */}
        <button
          onClick={() => setScreen('browse')}
          className={`flex-1 flex flex-col items-center justify-center h-full transition-colors ${
            currentScreen === 'browse' || currentScreen === 'details'
              ? 'text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          aria-label="Browse Food Rescues"
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={currentScreen === 'browse' || currentScreen === 'details' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            search
          </span>
          <span className="font-label-sm text-label-sm mt-0.5">Browse</span>
        </button>

        {/* Elevated Donate Center FAB */}
        <div className="flex-1 flex flex-col items-center justify-center h-full relative -top-3.5">
          <button
            onClick={() => setScreen('donate')}
            className={`w-13 h-13 min-w-[50px] min-h-[50px] rounded-full bg-primary-container text-on-primary-container shadow-[0_8px_16px_rgba(33,134,91,0.28)] flex items-center justify-center hover:bg-primary transition-all transform active:scale-95 ${
              currentScreen === 'donate' ? 'ring-4 ring-primary-fixed' : ''
            }`}
            aria-label="Post a Food Donation"
          >
            <span className="material-symbols-outlined text-[28px]">add</span>
          </button>
          <span
            className={`font-label-sm text-label-sm font-semibold mt-1 ${
              currentScreen === 'donate' ? 'text-primary' : 'text-primary'
            }`}
          >
            Donate
          </span>
        </div>

        {/* Activity */}
        <button
          onClick={() => setScreen('activity')}
          className={`flex-1 flex flex-col items-center justify-center h-full transition-colors ${
            currentScreen === 'activity'
              ? 'text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          aria-label="Activity and Dispatches"
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={currentScreen === 'activity' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            receipt_long
          </span>
          <span className="font-label-sm text-label-sm mt-0.5">Activity</span>
        </button>

        {/* Dashboard */}
        <button
          onClick={() => setScreen('dashboard')}
          className={`flex-1 flex flex-col items-center justify-center h-full transition-colors ${
            currentScreen === 'dashboard' || currentScreen === 'admin'
              ? 'text-primary font-semibold'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
          aria-label="Donor Dashboard"
        >
          <span
            className="material-symbols-outlined text-[22px]"
            style={currentScreen === 'dashboard' || currentScreen === 'admin' ? { fontVariationSettings: "'FILL' 1" } : undefined}
          >
            dashboard
          </span>
          <span className="font-label-sm text-label-sm mt-0.5">Dashboard</span>
        </button>
      </div>
    </nav>
  );
};
