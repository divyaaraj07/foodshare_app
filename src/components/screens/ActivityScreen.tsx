import React, { useState } from 'react';
import { ActiveDispatch, FoodListing, RecentRescue, ScreenType } from '../../types';

interface ActivityScreenProps {
  dispatches: ActiveDispatch[];
  recentRescues: RecentRescue[];
  setScreen: (screen: ScreenType) => void;
  onOpenMap: () => void;
  onQuickRequest: (item: FoodListing) => void;
  onShowToast: (msg: string) => void;
}

export const ActivityScreen: React.FC<ActivityScreenProps> = ({
  dispatches,
  recentRescues,
  setScreen,
  onOpenMap,
  onQuickRequest,
  onShowToast
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [pickedUpStatus, setPickedUpStatus] = useState<boolean>(false);
  const [pendingCancelled, setPendingCancelled] = useState(false);
  const [smartRequested, setSmartRequested] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      onShowToast('🔄 Network sync complete. All dispatch routes up-to-date.');
    }, 700);
  };

  const handleStartNav = () => {
    setIsNavigating(true);
    onShowToast('🚀 Turn-by-turn routing started: Head south on Mission toward 18th St.');
    setTimeout(() => setIsNavigating(false), 2000);
  };

  const handleMarkPickedUp = () => {
    setPickedUpStatus(true);
    onShowToast('✅ Pick-up verified! 28 meals transferred to Van #2 for distribution.');
  };

  return (
    <div className="flex flex-col w-full pb-28 space-y-space-lg">
      {/* NGO Identity & Status Banner */}
      <div className="bg-surface-container-low rounded-2xl p-space-md shadow-sm relative overflow-hidden border border-surface-container">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-primary-fixed/30 pointer-events-none"></div>
        <div className="flex items-start justify-between relative z-10">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 shadow-sm text-primary">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                volunteer_activism
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                  Hope Community Food Bank
                </h1>
                <span
                  className="material-symbols-outlined text-primary text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  title="Verified NGO"
                >
                  verified
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                  NGO Coordinator
                </span>
                <span className="text-on-surface-variant font-body-sm text-body-sm flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block"></span> Hub #4 East
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleRefresh}
            aria-label="Refresh Status"
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-transform active:rotate-180"
          >
            <span className={`material-symbols-outlined text-[20px] ${isRefreshing ? 'animate-spin' : ''}`}>
              sync
            </span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Row (3 cards) */}
      <div className="grid grid-cols-3 gap-2.5">
        {/* Active Requests */}
        <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-sm flex flex-col justify-between border border-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Active Req.</span>
            <span className="material-symbols-outlined text-[16px] text-tertiary">pending_actions</span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-headline-md text-headline-md text-on-surface font-bold">2</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">batches</span>
          </div>
        </div>

        {/* Approved Pickups (Highlighted Emerald) */}
        <div className="bg-primary text-on-primary rounded-2xl p-3 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-2 -top-2 w-10 h-10 rounded-full bg-white/10 pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-inverse-on-surface font-medium">Ready Pickup</span>
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-ping"></span>
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="font-headline-md text-headline-md text-white font-bold">1</span>
            <span className="font-label-sm text-label-sm text-inverse-on-surface">urgent</span>
          </div>
        </div>

        {/* Total Food Rescued */}
        <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-sm flex flex-col justify-between border border-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Rescued</span>
            <span className="material-symbols-outlined text-[16px] text-primary">eco</span>
          </div>
          <div className="mt-2 flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">4,890</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">kg total</span>
          </div>
        </div>
      </div>

      {/* Urgent Pickup & Active Requests Section */}
      <section className="space-y-space-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Active Dispatch</h2>
            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
              Action Needed
            </span>
          </div>
          <button
            onClick={onOpenMap}
            className="font-label-md text-label-md text-primary flex items-center font-semibold hover:underline"
          >
            Live Map <span className="material-symbols-outlined text-[16px] ml-0.5">arrow_forward</span>
          </button>
        </div>

        {/* Urgent Pickup Card (Approved) */}
        {dispatches.map((disp) => (
          <div
            key={disp.id}
            className="bg-surface-container-lowest rounded-2xl p-space-md shadow-md space-y-3.5 relative overflow-hidden border border-surface-container"
          >
            <div className="w-1.5 h-full absolute left-0 top-0 bg-primary"></div>

            {/* Card Header */}
            <div className="flex items-start justify-between gap-2 pl-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold mb-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  {pickedUpStatus ? 'Picked Up • In Van #2' : 'Approved • Ready for Pickup'}
                </div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold">{disp.title}</h3>
              </div>
              <span className={`px-2 py-0.5 rounded-full ${disp.categoryBg} ${disp.categoryColor} font-label-sm text-label-sm uppercase tracking-wide shrink-0 font-bold`}>
                {disp.category}
              </span>
            </div>

            {/* Image & Donor Details */}
            <div className="pl-2 flex gap-3 items-center">
              <img
                src={disp.imageUrl}
                alt={disp.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-on-surface font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">storefront</span>
                  <span className="truncate font-semibold">{disp.donorName}</span>
                  <span className="text-on-surface-variant font-normal">• {disp.donorDistance}</span>
                </div>
                <div className="flex items-center gap-1 text-tertiary-container font-label-sm text-label-sm mt-1">
                  <span className="material-symbols-outlined text-[16px]">schedule</span>
                  <span>Window: {disp.pickupWindow}</span>
                </div>
                <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm mt-0.5">
                  <span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span>
                  <span className="truncate">{disp.driver}</span>
                </div>
              </div>
            </div>

            {/* Interactive Map Preview for Directions */}
            <div className="pl-2">
              <div
                onClick={onOpenMap}
                className="w-full h-24 rounded-xl bg-cover bg-center relative overflow-hidden shadow-inner flex items-end p-2 cursor-pointer group"
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxgen5qsM8N_FrKhP9se5DKOmHg6wmLEE6GUwxg2m2y_Lh78Kn11CDNnHrhqsqNo_IsUb3I9S7g9exYPSU2b8OW8sxU-PKdHPsGRIiK3jh7AYvKQi7BRCapIW8sfTNIVGrSQBtetnP0bnbOMMMYGtyutug_vecrxFqI972SInb4A9Izz5H_xi3jaViydgE-IO245AogdkyP2wCNIWe5nEkqenZ18BdeilMN8AJzZVono5p1hCDd7c"
                  alt="SF Route"
                  className="w-full h-full object-cover absolute inset-0 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-on-surface flex items-center justify-between w-full shadow-sm relative z-10">
                  <span className="font-label-sm text-label-sm truncate font-medium">{disp.address}</span>
                  <span className="font-label-sm text-label-sm text-primary font-bold shrink-0">{disp.eta}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pl-2 grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={handleStartNav}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-container-highest transition-colors active:scale-95 font-semibold"
              >
                <span className={`material-symbols-outlined text-[18px] text-primary ${isNavigating ? 'animate-pulse' : ''}`}>
                  near_me
                </span>
                <span>{isNavigating ? 'Routing...' : 'Start Navigation'}</span>
              </button>

              <button
                type="button"
                onClick={handleMarkPickedUp}
                className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl font-label-md text-label-md shadow-sm transition-colors active:scale-95 font-semibold ${
                  pickedUpStatus
                    ? 'bg-primary-container text-on-primary-container'
                    : 'bg-primary text-on-primary hover:bg-primary-container'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>{pickedUpStatus ? 'Picked Up' : 'Mark Picked Up'}</span>
              </button>
            </div>
          </div>
        ))}

        {/* Pending Review Card */}
        {!pendingCancelled && (
          <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm space-y-3 border border-surface-container">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-medium mb-1">
                  <span className="material-symbols-outlined text-[14px] text-tertiary animate-spin">
                    hourglass_empty
                  </span>
                  Pending Donor Review
                </div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  15 kg Organic Sourdough &amp; Pastries
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] font-label-sm text-label-sm uppercase tracking-wide shrink-0 font-bold">
                Bakery
              </span>
            </div>

            <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">bakery_dining</span>
                <span className="text-on-surface font-medium">Artisan Hearth Bakery</span>
              </div>
              <span>Submitted 25 mins ago</span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-surface-container-low">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">pin_drop</span> 2.4 miles away
              </span>
              <button
                onClick={() => {
                  setPendingCancelled(true);
                  onShowToast('Request for Artisan Hearth Bakery cancelled.');
                }}
                className="font-label-md text-label-md text-error px-2 py-1 rounded-lg hover:bg-error-container/40 transition-colors font-semibold"
              >
                Cancel Request
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Smart Suggestions / Recommended Rescue */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              recommend
            </span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Smart Suggestions</h2>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Tailored to your needs</span>
        </div>

        {/* Recommendation Card */}
        <div className="bg-surface-container-low rounded-2xl p-space-md shadow-sm relative overflow-hidden flex flex-col space-y-3 border border-surface-container">
          <div className="flex gap-3">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0J9nYvFAF-xtin4vJTkZINdLC1J7PlVRBdUJlRm-7UElK6qrWBPz9zEIC3X5afGAp5yls-rfDKV7pbgW2tBR3Uy0W50ifHGFnAEkS9KB7nmkCnysW4UEjy7Ry_oclIVoCr36OVJWwwO4Cv0UYeFFaK_selhv6L01Bowl8Nfw6h7LbYt0x0BNxYuwoKVHYmR8xWzCdcHWroP-5iPtOAoxSfuWyTaX3UJnHFE23-3rRMapgadOuMak"
              alt="Farm Greens"
              className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-sm"
            />
            <div className="min-w-0 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] font-label-sm text-label-sm uppercase tracking-wider font-bold">
                    Produce
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">• 1.2 miles</span>
                </div>
                <h3 className="font-title-md text-title-md text-on-surface truncate font-bold">
                  Fresh Farm Greens &amp; Vegetables
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                  Golden Gate Organic Market
                </p>
              </div>

              <div className="flex items-center justify-between mt-1">
                <span className="font-label-md text-label-md text-primary font-bold">32 kg available</span>
                <span className="font-label-sm text-label-sm text-tertiary font-medium">Expires in 4h</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-surface-container">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Matches “Fresh Produce” request alert
            </span>
            <button
              onClick={() => {
                setSmartRequested(true);
                onShowToast('Request dispatched to Golden Gate Organic Market for 32 kg produce.');
              }}
              disabled={smartRequested}
              className={`px-4 py-2 rounded-xl font-label-md text-label-md shadow-sm transition-all active:scale-95 flex items-center gap-1 font-semibold ${
                smartRequested
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-primary hover:bg-primary-container text-on-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">
                {smartRequested ? 'check' : 'add_circle'}
              </span>
              <span>{smartRequested ? 'Requested' : 'Quick Request'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Recent Rescue History */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">Recent Rescues</h2>
          <button
            onClick={() => setScreen('browse')}
            className="font-label-md text-label-md text-primary font-semibold hover:underline"
          >
            View Full Log
          </button>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl shadow-sm divide-y divide-surface-container overflow-hidden border border-surface-container">
          {recentRescues.map((res) => (
            <div
              key={res.id}
              className="p-space-md flex items-center justify-between hover:bg-surface-container-low transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                    res.type === 'produce'
                      ? 'bg-[#ECFDF5] text-[#065F46]'
                      : res.type === 'prepared'
                      ? 'bg-[#FFEDD5] text-[#9A3412]'
                      : 'bg-[#EFF6FF] text-[#1E40AF]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {res.type === 'produce' ? 'nutrition' : res.type === 'prepared' ? 'lunch_dining' : 'local_drink'}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="font-title-md text-title-md text-on-surface truncate font-semibold">{res.title}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {res.date} • {res.donor}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                  <span className="material-symbols-outlined text-[14px]">done_all</span> Completed
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Impact Spark Banner */}
      <div className="bg-surface-container rounded-2xl p-space-md flex items-center gap-3 shadow-sm border border-surface-container-high">
        <div className="w-10 h-10 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[24px]">favorite</span>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-title-md text-title-md text-on-surface font-semibold">Community Reach Goal</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            You are 110 kg away from hitting 5,000 kg milestone this month!
          </p>
        </div>
      </div>
    </div>
  );
};
