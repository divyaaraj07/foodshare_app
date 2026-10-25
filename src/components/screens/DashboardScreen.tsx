import React, { useState } from 'react';
import { IncomingRequest, ScreenType, UserRole } from '../../types';

interface DashboardScreenProps {
  setScreen: (screen: ScreenType) => void;
  incomingRequests: IncomingRequest[];
  onAcceptRequest: (reqId: string, recipientName: string) => void;
  onDeclineRequest: (reqId: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  setScreen,
  incomingRequests,
  onAcceptRequest,
  onDeclineRequest,
  userRole,
  setUserRole
}) => {
  const [activeItems, setActiveItems] = useState([
    {
      id: 'act-1',
      title: 'Hot Sambar Rice, Lemon Rice & Aviyal',
      tamilTitle: 'சுடச்சுட சாம்பார் சாதம் & அவியல்',
      subtitle: 'Available: 85 meal packets (Mylapore Marriage Hall)',
      requests: 2,
      expiry: 'Pick up before 5:00 PM',
      status: 'Ready in thermal carriers',
      dotColor: 'bg-tertiary'
    },
    {
      id: 'act-2',
      title: '120 Pieces Mallipoo Idli & Medu Vada',
      tamilTitle: 'மல்லிகைப் பூ இட்லி & மெது வடை',
      subtitle: 'Available: 40 servings (T. Nagar Tiffin Stall)',
      requests: 0,
      expiry: 'Expires in 2 hours',
      status: 'Hot in insulated hotbox',
      dotColor: 'bg-primary'
    }
  ]);

  const handleMarkComplete = (id: string) => {
    setActiveItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCancelListing = (id: string) => {
    setActiveItems((prev) => prev.filter((item) => item.id !== id));
  };

  const pendingRequests = incomingRequests.filter((r) => r.status === 'pending');

  return (
    <div className="flex flex-col w-full pb-28 space-y-space-lg">
      {/* Profile & Mode Switcher Bar */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex flex-col min-w-0 pr-space-sm">
          <div className="flex items-center gap-1.5 text-primary">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
              Sri Meenakshi Bhavan • மயிலாப்பூர்
            </span>
          </div>
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold truncate">
            வணக்கம், Senthil Chef!
          </h1>
        </div>

        {/* Role Toggle Chip */}
        <button
          type="button"
          onClick={() => {
            if (userRole === 'donor') setUserRole('recipient');
            else setUserRole('donor');
          }}
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-container text-on-primary-container shadow-sm hover:bg-primary transition-all active:scale-95 font-bold"
          title="Click to toggle perspective"
        >
          <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            restaurant
          </span>
          <span className="font-label-sm text-label-sm font-bold tracking-wide">Donor Mode</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse"></span>
        </button>
      </div>

      {/* Primary Action Dispatch Button */}
      <div>
        <button
          onClick={() => setScreen('donate')}
          className="w-full flex items-center justify-center gap-space-sm bg-primary-container text-on-primary-container py-3.5 px-space-lg rounded-2xl shadow-md hover:bg-primary transition-all transform active:scale-[0.99] font-bold"
        >
          <span className="material-symbols-outlined text-[24px]">add_circle</span>
          <span className="font-title-md text-title-md tracking-tight font-bold">
            + Post Marriage Hall / Kitchen Surplus Food
          </span>
        </button>
      </div>

      {/* Impact Snapshot Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-surface-container to-surface-container-high p-space-md shadow-sm border border-surface-container">
        <div className="flex items-start gap-space-sm">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
            <span className="material-symbols-outlined text-[24px]">compost</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label-md text-label-md text-primary font-bold uppercase tracking-wider">
                Tamil Nadu Annual Impact • ஆண்டு சாதனை
              </span>
              <span className="text-xs">🌿</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface font-medium mt-0.5">
              Your kitchen has distributed <span className="font-title-md text-primary font-bold">4,850 meals</span> to local Anbalayams and saved{' '}
              <span className="font-title-md text-primary font-bold">2.4 tons</span> of greenhouse gas this year!
            </p>
          </div>
        </div>
      </div>

      {/* Summary Metrics Grid */}
      <div className="grid grid-cols-2 gap-space-sm">
        {/* Metric 1: Total Donated */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between space-y-2 border border-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Total Food Shared</span>
            <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[16px]">scale</span>
            </div>
          </div>
          <div>
            <div className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              2,140 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">kg</span>
            </div>
            <div className="flex items-center gap-1 mt-1 text-primary">
              <span className="material-symbols-outlined text-[14px]">trending_up</span>
              <span className="font-label-sm text-label-sm font-bold">+24% this wedding season</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Pending Requests */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between space-y-2 relative overflow-hidden border border-surface-container">
          <div className="absolute -right-4 -bottom-4 w-16 h-16 rounded-full bg-tertiary-fixed/30 pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Pending Requests</span>
            <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary animate-ping"></span>
              Action
            </span>
          </div>
          <div>
            <div className="font-headline-sm text-headline-sm text-tertiary font-bold tracking-tight">
              {pendingRequests.length}
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Awaiting driver dispatch</span>
          </div>
        </div>

        {/* Metric 3: Active Listings */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between space-y-2 border border-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Active Batches</span>
            <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px]">inventory_2</span>
            </div>
          </div>
          <div>
            <div className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              {activeItems.length} <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">batches</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">In insulated containers</span>
          </div>
        </div>

        {/* Metric 4: Completed Rescues */}
        <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col justify-between space-y-2 border border-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">Fulfilled Rescues</span>
            <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[16px]">task_alt</span>
            </div>
          </div>
          <div>
            <div className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              68 <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">runs</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">100% verified</span>
          </div>
        </div>
      </div>

      {/* Incoming Requests Section */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-tertiary text-[20px]">notification_important</span>
            <h2 className="font-title-md text-title-md text-on-surface font-bold">
              Incoming Dispatch Requests • உடனடி கோரிக்கைகள்
            </h2>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold">
            {pendingRequests.length} Needs Attention
          </span>
        </div>

        {incomingRequests.map((req) => {
          if (req.status === 'declined') return null;

          return (
            <div
              key={req.id}
              className={`bg-surface-container-lowest rounded-2xl p-space-md shadow-sm flex flex-col space-y-space-md transition-all duration-300 border border-surface-container ${
                req.status === 'accepted' ? 'bg-primary-fixed/20 border-primary-fixed' : ''
              }`}
            >
              <div className="flex items-start gap-space-sm">
                <img
                  src={req.imageUrl}
                  alt={req.requestedItem}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-xs"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span
                      className={`font-label-sm text-label-sm font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        req.status === 'accepted'
                          ? 'bg-primary text-on-primary'
                          : 'text-on-tertiary-fixed-variant bg-tertiary-fixed'
                      }`}
                    >
                      {req.status === 'accepted' ? 'Confirmed • Vehicle En Route' : 'Pending Confirmation'}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> {req.timeAgo}
                    </span>
                  </div>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold mt-1 line-clamp-1">
                    {req.recipientName}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    Requested: <span className="text-on-surface font-bold">{req.requestedItem}</span>
                  </p>
                </div>
              </div>

              {/* Logistics details pill */}
              <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between text-on-surface-variant border border-surface-container">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    local_shipping
                  </span>
                  <span className="font-body-sm text-body-sm truncate">
                    Pickup: <strong className="text-on-surface font-bold">{req.pickupTime}</strong>
                  </span>
                </div>
                <span className="font-label-sm text-label-sm shrink-0 px-2 py-0.5 rounded-md bg-surface-variant text-on-surface font-bold">
                  {req.vehicleNumber || 'Van Dispatch'}
                </span>
              </div>

              {/* Action Buttons */}
              {req.status === 'pending' ? (
                <div className="flex items-center gap-space-sm pt-1">
                  <button
                    onClick={() => onAcceptRequest(req.id, req.recipientName)}
                    className="flex-1 bg-primary-container text-on-primary-container hover:bg-primary py-2.5 px-space-md rounded-xl font-label-md text-label-md font-bold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">check_circle</span>
                    <span>Accept Request • அனுமதி</span>
                  </button>
                  <button
                    onClick={() => onDeclineRequest(req.id)}
                    className="px-space-md py-2.5 rounded-xl bg-surface-container text-on-surface-variant hover:bg-surface-variant font-label-md text-label-md font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">cancel</span> Decline
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between py-1 text-primary">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">task_alt</span>
                    <span className="font-label-md text-label-md font-bold">
                      Vehicle gate pass generated for {req.recipientName}!
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                    OTP Dispatched
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </section>

      {/* Active Listings */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">fastfood</span>
            <h2 className="font-title-md text-title-md text-on-surface font-bold">Your Live Kitchen Batches</h2>
          </div>
          <button
            onClick={() => setScreen('browse')}
            className="font-label-sm text-label-sm font-bold text-primary hover:underline"
          >
            View All ({activeItems.length})
          </button>
        </div>

        {activeItems.map((item) => (
          <div
            key={item.id}
            className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm space-y-space-sm border border-surface-container"
          >
            <div className="flex items-start justify-between gap-space-sm">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {item.requests > 0 ? (
                    <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                      {item.requests} Requests
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span> Active
                    </span>
                  )}
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">{item.expiry}</span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold mt-1 truncate">
                  {item.title}
                </h3>
                {item.tamilTitle && (
                  <p className="font-label-sm text-primary font-semibold truncate">
                    {item.tamilTitle}
                  </p>
                )}
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">{item.subtitle}</p>
              </div>
            </div>

            {/* Action strip */}
            <div className="flex items-center justify-between pt-2 border-t border-surface-container-low">
              <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1.5 font-medium">
                <span className={`w-2 h-2 rounded-full ${item.dotColor}`}></span>
                {item.status}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setScreen('donate')}
                  className="px-3 py-1.5 rounded-xl bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold hover:bg-surface-variant transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">edit</span> Edit
                </button>
                {item.requests > 0 ? (
                  <button
                    onClick={() => handleMarkComplete(item.id)}
                    className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary font-label-sm text-label-sm font-bold hover:bg-primary/20 transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">done_all</span> Mark Handed Over
                  </button>
                ) : (
                  <button
                    onClick={() => handleCancelListing(item.id)}
                    className="px-3 py-1.5 rounded-xl bg-surface-container text-error font-label-sm text-label-sm font-semibold hover:bg-error-container transition-colors flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span> Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
