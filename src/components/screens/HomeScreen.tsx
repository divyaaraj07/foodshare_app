import React from 'react';
import { FoodListing, ScreenType } from '../../types';

interface HomeScreenProps {
  setScreen: (screen: ScreenType) => void;
  onSelectListing: (listing: FoodListing) => void;
  listings: FoodListing[];
  onClaim: (listingId: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  setScreen,
  onSelectListing,
  listings,
  onClaim
}) => {
  return (
    <div className="flex flex-col w-full pb-10 space-y-space-xl">
      {/* Hero Section with Tamil Nadu Focus */}
      <section className="relative overflow-hidden rounded-3xl bg-surface-container-low p-space-md shadow-sm border border-surface-container">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-primary-fixed-dim/20 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-10 bottom-0 w-36 h-36 rounded-full bg-tertiary-fixed/30 blur-xl pointer-events-none"></div>
        
        <div className="relative flex flex-col space-y-space-md">
          {/* Welcoming Pill Tag */}
          <div className="inline-flex items-center gap-space-xs px-3 py-1.5 rounded-full bg-surface-container-highest w-fit shadow-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-md text-label-md text-on-surface-variant font-bold tracking-wide">
              TAMIL NADU RESCUE NETWORK • தமிழ்நாடு
            </span>
          </div>

          {/* Core Headline */}
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold tracking-tight">
            Share More Food. <br />
            <span className="text-primary">Waste Less.</span> <br />
            Feed More People.
          </h1>

          {/* Mission Statement localized */}
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Connecting marriage halls (கல்யாண மண்டபம்), restaurants, sweet stalls, and Koyambedu agro-mandis across
            Chennai, Coimbatore, Madurai, and Trichy with verified food banks in real time.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-1">
            <button
              onClick={() => setScreen('donate')}
              className="w-full h-12 flex items-center justify-between px-space-lg rounded-xl bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-md active:scale-[0.98] transition-transform hover:bg-primary font-bold"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  volunteer_activism
                </span>
                Donate Surplus Food • உணவு தானம்
              </span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            <button
              onClick={() => setScreen('browse')}
              className="w-full h-12 flex items-center justify-center gap-2 px-space-lg rounded-xl bg-secondary-container text-on-secondary-fixed font-label-lg text-label-lg hover:bg-secondary-fixed active:scale-[0.98] transition-transform font-bold"
            >
              <span className="material-symbols-outlined text-[20px] text-tertiary">near_me</span>
              <span>Find Food Near You in TN</span>
            </button>
          </div>

          {/* Warm Lifestyle Graphic Card */}
          <div className="relative w-full h-44 rounded-2xl overflow-hidden mt-2 shadow-inner">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVUKNKzIXdugw3GkEGA3LlAWuXFknHI8gnCN8dNGJoXZGhG1Qm0FydeEvTIXrKlRvXMWHUHXusAncGsj65MMqvHohY4MOcPxlZJLIwDVDwWTYiLwesib6U9tqLbx1Rehf3-64I3qIUz3DoWUeSfOm-G_Tvwkzg5wW56cvVlVg4MteD9yVrEdpFv03A4aeBIBUlzBnuj_vq3jtE4rG5vOCqBeBnR58cpT-qeveyhHJZZWWN622p3w4"
              alt="Volunteers loading food rescue crates in Chennai"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/20 to-transparent flex items-end p-space-sm">
              <div className="flex items-center gap-2 text-inverse-on-surface">
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim">verified</span>
                <span className="font-label-sm text-label-sm font-semibold">
                  FSSAI Compliant: Inspected redistribution within 90 minutes
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Portal Access Strip: New User vs Existing Sign In */}
      <section className="bg-surface-container-lowest rounded-2xl p-3 border border-surface-container shadow-xs">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setScreen('new-user-login')}
            className="flex-1 p-2.5 rounded-xl bg-tertiary-container/30 hover:bg-tertiary-container/50 border border-tertiary-container/40 text-left transition-all active:scale-[0.98] group"
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed uppercase">
                First Time
              </span>
              <span className="material-symbols-outlined text-[16px] text-tertiary group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
            <span className="font-title-md text-title-md font-bold text-on-surface block leading-tight">
              New User Login
            </span>
            <span className="text-[11px] text-on-surface-variant block mt-0.5 font-medium">
              புதிய பயனர் • OTP in 30s
            </span>
          </button>

          <button
            type="button"
            onClick={() => setScreen('login')}
            className="flex-1 p-2.5 rounded-xl bg-primary-container/20 hover:bg-primary-container/40 border border-primary/25 text-left transition-all active:scale-[0.98] group"
          >
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-primary-fixed text-on-primary-fixed uppercase">
                Returning
              </span>
              <span className="material-symbols-outlined text-[16px] text-primary group-hover:translate-x-0.5 transition-transform">
                arrow_forward
              </span>
            </div>
            <span className="font-title-md text-title-md font-bold text-on-surface block leading-tight">
              Existing Sign In
            </span>
            <span className="text-[11px] text-on-surface-variant block mt-0.5 font-medium">
              ஏற்கனவே உள்ளவர் • PIN / Pass
            </span>
          </button>
        </div>
      </section>

      {/* Live Impact Statistics Bento / Ticker */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">ecg_heart</span>
            <h2 className="font-title-md text-title-md text-on-surface font-bold">
              Tamil Nadu Live Impact • சமூக தாக்கம்
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            TN State Ticker
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Metric 1 */}
          <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between shadow-xs border border-surface-container">
            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-[18px]">restaurant</span>
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm text-on-surface block font-bold tracking-tight">
                74,250+
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Meals Shared in TN</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between shadow-xs border border-surface-container">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-fixed mb-2">
              <span className="material-symbols-outlined text-[18px]">storefront</span>
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm text-on-surface block font-bold tracking-tight">
                1,840+
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Hotels &amp; Mandapams</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between shadow-xs border border-surface-container">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary mb-2">
              <span className="material-symbols-outlined text-[18px]">handshake</span>
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm text-on-surface block font-bold tracking-tight">
                312
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Anbalayams &amp; NGOs</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between shadow-xs border border-surface-container">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-[18px]">co2</span>
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm text-on-surface block font-bold tracking-tight">
                34.8 Tons
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Methane &amp; CO₂ Saved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Food Rescues Carousel */}
      <section className="space-y-space-sm -mx-gutter-mobile px-gutter-mobile overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-title-md text-title-md text-on-surface font-bold">Urgent Rescues Nearby</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Hot meals &amp; produce ready for pickup in TN</p>
          </div>
          <button
            onClick={() => setScreen('browse')}
            className="font-label-sm text-label-sm text-primary flex items-center gap-0.5 hover:underline font-bold"
          >
            See All Listings
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scroll-smooth no-scrollbar -mx-gutter-mobile px-gutter-mobile">
          {listings.slice(0, 3).map((item) => (
            <div
              key={item.id}
              className="w-[270px] flex-shrink-0 bg-surface-container-lowest rounded-2xl p-3 shadow-md flex flex-col justify-between border border-surface-container"
            >
              <div>
                <div
                  onClick={() => onSelectListing(item)}
                  className="relative w-full h-32 rounded-xl overflow-hidden mb-2.5 cursor-pointer group"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded-full ${item.categoryBg} ${item.categoryText} font-label-sm text-label-sm uppercase font-bold`}
                  >
                    {item.categoryLabel}
                  </span>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-xs">
                    <span className="material-symbols-outlined text-[14px]">timer</span>
                    {item.urgentText || `Exp: ${item.hoursLeft}h`}
                  </div>
                </div>

                <h3
                  onClick={() => onSelectListing(item)}
                  className="font-title-md text-title-md text-on-surface font-bold truncate cursor-pointer hover:text-primary transition-colors"
                >
                  {item.title}
                </h3>
                {item.tamilTitle && (
                  <p className="font-label-sm text-primary font-medium truncate mt-0.5">
                    {item.tamilTitle}
                  </p>
                )}
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate mt-0.5">
                  {item.donorName}
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between mt-2 border-t border-surface-container-low">
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-bold truncate max-w-[130px]">
                    {item.quantityString.split('•')[0]}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">pin_drop</span>
                    {item.donorLocation}
                  </span>
                </div>
                <button
                  onClick={() => onClaim(item.id)}
                  className="px-3.5 py-1.5 rounded-xl bg-primary-container text-on-primary-container font-label-sm text-label-sm active:scale-95 transition-transform hover:bg-primary font-bold shadow-xs"
                >
                  Claim
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How FoodShare Works */}
      <section className="space-y-space-md">
        <div className="text-center space-y-1">
          <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
            FSSAI IFSA Logistics
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">How FoodShare TN Works</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Connecting Mandapams to Shelters in under 3 minutes</p>
        </div>

        <div className="space-y-3">
          {/* Step 1 */}
          <div className="bg-surface-container-low rounded-2xl p-space-md flex gap-space-md items-start shadow-xs border border-surface-container">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm text-headline-sm flex-shrink-0 font-bold">
              1
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-title-md text-title-md text-on-surface font-bold">Post Surplus in 60s</span>
                <span className="material-symbols-outlined text-[18px] text-primary">photo_camera</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Kalyana Mandapam, hotel, or mess snaps a quick photo, adds quantity (packets or kg), and lists surplus before hot food cools down.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-surface-container-low rounded-2xl p-space-md flex gap-space-md items-start shadow-xs border border-surface-container">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-headline-sm text-headline-sm flex-shrink-0 font-bold">
              2
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-title-md text-title-md text-on-surface font-bold">Instant Local Ping</span>
                <span className="material-symbols-outlined text-[18px] text-tertiary">notifications_active</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Registered NGOs in Chennai, Coimbatore, or Madurai (like No Food Waste or local Anbalayams) receive an instant WhatsApp / SMS dispatch notification.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-surface-container-low rounded-2xl p-space-md flex gap-space-md items-start shadow-xs border border-surface-container">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-headline-sm text-headline-sm flex-shrink-0 font-bold">
              3
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-title-md text-title-md text-on-surface font-bold">Swift Vehicle Dispatch</span>
                <span className="material-symbols-outlined text-[18px] text-primary">local_shipping</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Dedicated Tata Ace or volunteer auto rickshaws coordinate rapid, insulated pickup with live GPS tracking directly to shelter kitchens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Testimonial */}
      <section className="space-y-space-md">
        <div className="bg-surface-container-highest/60 rounded-3xl p-space-md space-y-space-sm relative overflow-hidden shadow-xs border border-surface-container">
          <div className="flex items-center gap-1 text-tertiary">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            ))}
          </div>
          <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
            “FoodShare replaced our evening surplus disposal from wedding receptions with 85 daily hot meals directly to
            Triplicane and Royapettah shelters. Tata Ace pickup arrives within 30 minutes.”
          </p>
          <div className="flex items-center gap-3 pt-1">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-bold">
              SK
            </div>
            <div>
              <span className="font-title-md text-title-md text-on-surface block font-bold leading-tight">
                K. Senthil Kumar
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Head Chef, Sri Meenakshi Bhavan Catering, Mylapore, Chennai
              </span>
            </div>
          </div>
        </div>

        {/* Trusted Partners Grid */}
        <div className="space-y-2">
          <div className="text-center font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
            Recognized Food Rescue Partners in Tamil Nadu
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-14 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center p-1 shadow-xs border border-surface-container">
              <span className="material-symbols-outlined text-[18px] text-primary">volunteer_activism</span>
              <span className="font-label-sm text-label-sm font-bold text-on-surface leading-tight mt-0.5">
                No Food Waste
              </span>
            </div>
            <div className="h-14 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center p-1 shadow-xs border border-surface-container">
              <span className="material-symbols-outlined text-[18px] text-tertiary">groups</span>
              <span className="font-label-sm text-label-sm font-bold text-on-surface leading-tight mt-0.5">
                Robin Hood Army
              </span>
            </div>
            <div className="h-14 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center p-1 shadow-xs border border-surface-container">
              <span className="material-symbols-outlined text-[18px] text-on-surface">restaurant</span>
              <span className="font-label-sm text-label-sm font-bold text-on-surface leading-tight mt-0.5">
                Akshaya Patra TN
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Conversion Tray */}
      <section className="rounded-3xl bg-primary p-space-md text-on-primary shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 pointer-events-none">
          <span className="material-symbols-outlined text-[130px]">spa</span>
        </div>
        <div className="relative space-y-space-sm">
          <div className="space-y-1">
            <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold">Have Surplus Today?</h3>
            <p className="font-body-sm text-body-sm text-on-primary/90">
              Turn your leftover marriage feast, hotel buffet, or tiffin prep into smiles across Tamil Nadu.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setScreen('donate')}
              className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-on-primary text-primary font-label-lg text-label-lg active:scale-95 transition-transform shadow-sm font-bold"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              Post a Food Listing
            </button>
            <button
              onClick={() => setScreen('browse')}
              className="h-11 px-4 flex items-center justify-center rounded-xl bg-primary-fixed-dim/30 text-on-primary font-label-sm text-label-sm active:scale-95 transition-transform hover:bg-primary-fixed-dim/40 font-bold"
            >
              View Feed
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
