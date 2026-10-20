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
  const urgentListings = [
    {
      id: 'urgent-1',
      title: 'Fresh Artisan Bakery Loaves',
      donorName: 'Green Valley Bakery',
      category: 'Bakery',
      categoryBg: 'bg-tertiary-fixed',
      categoryText: 'text-on-tertiary-fixed',
      expTime: 'Exp: 3h',
      quantity: '15 kg',
      distance: '0.8 mi away',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9RWNk6UXqxJgxbBwG5XLI9sOMjop9ULKhmdAL-WSmGDlqsLzRqerKqhSKF-sVS1RTekT7kINxVUhxrGFc_F3M__BZ27205kEcgHNSCYqaqXkscWLt2T6XeAkpJT1oqWXt0sArNh9uer96I-aZ86WXvHRpUTbwXbZ9sAB193Gh1QnLIFj0uPk7-Pa6UTH4maBcr--UV8i8GqCDp8DmK9pvHO9kTKM_eMazADEbtoynYaQ9K5e2Rhk',
      originalListingId: 'listing-2'
    },
    {
      id: 'urgent-2',
      title: 'Organic Vegetable Crates',
      donorName: 'Sunrise Grocery',
      category: 'Produce',
      categoryBg: 'bg-surface-container-highest',
      categoryText: 'text-primary',
      expTime: 'Exp: 6h',
      quantity: '25 kg',
      distance: '1.4 mi away',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBa_7xOAgD8snvXzt-Dlg8ASkNQHJSOluq0fUgmEUrLergWir91GZhgEL6QaLoeVrRvlUZLSKbryjNms6U3c-nYU1g7NypMTDRiBRurBTnpQGiXWbzsj_v7l0mfp8Z28A8B1NwgwN-EFjMLCkwPGjwp2VxnxfDrGLTCoYHLhJtO8rTHTNAkK9Cqc7gTbTYhnfjLBvKBtdzZg39RlYnR4-u1mDG4PMFM8FSBpD8Js0F3E0PrRXqcX0Q',
      originalListingId: 'listing-3'
    },
    {
      id: 'urgent-3',
      title: 'Rice & Curry Catering Bowls',
      donorName: 'Grand Hyatt Banquet',
      category: 'Prepared',
      categoryBg: 'bg-tertiary-fixed',
      categoryText: 'text-tertiary',
      expTime: 'Exp: 4h',
      quantity: '30 Portions',
      distance: '2.1 mi away',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmVYY6HhjSRkSP9KVnb5JYMg9LRrncnId-lg59UiKJ3gJ1H_2xjWsF51ddII5kKPOzEYd2SDwwFh9L7sZnEAwIIVicUM_dC3HjWFilcq43iryznoTJj_Z8tB3VlbRa9cBLv16498MkTQ7arc7a54K8bEWoqQEPlbNqfdbLWLbbsG-tpgVW8kMFMJUJgxRzpytm7jLGn7_tMjIzV5BdE1IlQG455UAfUnd5yN4zS2i2nRcJ9u6wnbA',
      originalListingId: 'listing-4'
    }
  ];

  return (
    <div className="flex flex-col w-full pb-10 space-y-space-xl">
      {/* Hero Section with Tactile Warmth & Dual Action Focus */}
      <section className="relative overflow-hidden rounded-3xl bg-surface-container-low p-space-md shadow-sm">
        <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-primary-fixed-dim/20 blur-2xl pointer-events-none"></div>
        <div className="absolute -left-10 bottom-0 w-36 h-36 rounded-full bg-tertiary-fixed/30 blur-xl pointer-events-none"></div>
        <div className="relative flex flex-col space-y-space-md">
          {/* Welcoming Pill Tag */}
          <div className="inline-flex items-center gap-space-xs px-3 py-1.5 rounded-full bg-surface-container-highest w-fit shadow-xs">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-md text-label-md text-on-surface-variant font-medium tracking-wide">
              HYPERLOCAL RESCUE NETWORK
            </span>
          </div>

          {/* Core Headline */}
          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold tracking-tight">
            Share More Food. <br />
            <span className="text-primary">Waste Less.</span> <br />
            Feed More People.
          </h1>

          {/* Mission Statement */}
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Connecting restaurants, grocers, and community donors with local food banks and individuals in real time.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-1">
            <button
              onClick={() => setScreen('donate')}
              className="w-full h-12 flex items-center justify-between px-space-lg rounded-xl bg-primary-container text-on-primary-container font-label-lg text-label-lg shadow-md active:scale-[0.98] transition-transform hover:bg-primary"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  volunteer_activism
                </span>
                Donate Surplus Food
              </span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>

            <button
              onClick={() => setScreen('browse')}
              className="w-full h-12 flex items-center justify-center gap-2 px-space-lg rounded-xl bg-secondary-container text-on-secondary-fixed font-label-lg text-label-lg hover:bg-secondary-fixed active:scale-[0.98] transition-transform"
            >
              <span className="material-symbols-outlined text-[20px] text-tertiary">near_me</span>
              <span>Find Food Near You</span>
            </button>
          </div>

          {/* Warm Lifestyle Graphic Card */}
          <div className="relative w-full h-44 rounded-2xl overflow-hidden mt-2 shadow-inner">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVUKNKzIXdugw3GkEGA3LlAWuXFknHI8gnCN8dNGJoXZGhG1Qm0FydeEvTIXrKlRvXMWHUHXusAncGsj65MMqvHohY4MOcPxlZJLIwDVDwWTYiLwesib6U9tqLbx1Rehf3-64I3qIUz3DoWUeSfOm-G_Tvwkzg5wW56cvVlVg4MteD9yVrEdpFv03A4aeBIBUlzBnuj_vq3jtE4rG5vOCqBeBnR58cpT-qeveyhHJZZWWN622p3w4"
              alt="Community volunteers and bakers loading fresh sourdough loaves into reusable crates"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-inverse-surface/20 to-transparent flex items-end p-space-sm">
              <div className="flex items-center gap-2 text-inverse-on-surface">
                <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim">verified</span>
                <span className="font-label-sm text-label-sm font-medium">Safe, inspected redistribution within 90 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Impact Statistics Bento / Ticker */}
      <section className="space-y-space-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[20px]">ecg_heart</span>
            <h2 className="font-title-md text-title-md text-on-surface font-semibold">Community Impact Live</h2>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Live Ticker
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Metric 1 */}
          <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between shadow-xs">
            <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-[18px]">restaurant</span>
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm text-on-surface block font-bold tracking-tight">42,850+</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Meals Shared</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between shadow-xs">
            <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-fixed mb-2">
              <span className="material-symbols-outlined text-[18px]">storefront</span>
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm text-on-surface block font-bold tracking-tight">1,240+</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Active Donors</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between shadow-xs">
            <div className="w-8 h-8 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary mb-2">
              <span className="material-symbols-outlined text-[18px]">handshake</span>
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm text-on-surface block font-bold tracking-tight">185</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">NGOs &amp; Pantries</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col justify-between shadow-xs">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-primary mb-2">
              <span className="material-symbols-outlined text-[18px]">co2</span>
            </div>
            <div>
              <span className="font-headline-sm text-headline-sm text-on-surface block font-bold tracking-tight">18.4 Tons</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">CO2 Offset</span>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Food Rescues Carousel */}
      <section className="space-y-space-sm -mx-gutter-mobile px-gutter-mobile overflow-hidden">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-title-md text-title-md text-on-surface font-semibold">Urgent Food Rescues</h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Ready for immediate pickup nearby</p>
          </div>
          <button
            onClick={() => setScreen('browse')}
            className="font-label-sm text-label-sm text-primary flex items-center gap-0.5 hover:underline"
          >
            See All (14)
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        {/* Horizontal Scrollable Container */}
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scroll-smooth no-scrollbar -mx-gutter-mobile px-gutter-mobile">
          {urgentListings.map((item) => (
            <div
              key={item.id}
              className="w-[260px] flex-shrink-0 bg-surface-container-lowest rounded-2xl p-3 shadow-md flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => {
                    const match = listings.find(l => l.id === item.originalListingId) || listings[0];
                    onSelectListing(match);
                  }}
                  className="relative w-full h-32 rounded-xl overflow-hidden mb-2.5 cursor-pointer group"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded-full ${item.categoryBg} ${item.categoryText} font-label-sm text-label-sm uppercase font-semibold`}
                  >
                    {item.category}
                  </span>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-xs">
                    <span className="material-symbols-outlined text-[14px]">timer</span>
                    {item.expTime}
                  </div>
                </div>

                <h3
                  onClick={() => {
                    const match = listings.find(l => l.id === item.originalListingId) || listings[0];
                    onSelectListing(match);
                  }}
                  className="font-title-md text-title-md text-on-surface font-semibold truncate cursor-pointer hover:text-primary transition-colors"
                >
                  {item.title}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {item.donorName}
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between mt-2">
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">{item.quantity}</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-0.5">
                    <span className="material-symbols-outlined text-[14px] text-primary">pin_drop</span>
                    {item.distance}
                  </span>
                </div>
                <button
                  onClick={() => onClaim(item.originalListingId)}
                  className="px-3 py-1.5 rounded-xl bg-primary-container text-on-primary-container font-label-sm text-label-sm active:scale-95 transition-transform hover:bg-primary"
                >
                  Claim
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works (Delightful 3-Step Guide) */}
      <section className="space-y-space-md">
        <div className="text-center space-y-1">
          <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
            Simple Logistics
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">How FoodShare Works</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Connecting food rescue in under 3 minutes</p>
        </div>

        <div className="space-y-3">
          {/* Step 1 */}
          <div className="bg-surface-container-low rounded-2xl p-space-md flex gap-space-md items-start shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center font-headline-sm text-headline-sm flex-shrink-0 font-bold">
              1
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-title-md text-title-md text-on-surface font-semibold">Donate in 60s</span>
                <span className="material-symbols-outlined text-[18px] text-primary">photo_camera</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Snap a quick photo, tag the category, and list surplus food before it goes to waste.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-surface-container-low rounded-2xl p-space-md flex gap-space-md items-start shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-fixed flex items-center justify-center font-headline-sm text-headline-sm flex-shrink-0 font-bold">
              2
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-title-md text-title-md text-on-surface font-semibold">Instant Match</span>
                <span className="material-symbols-outlined text-[18px] text-tertiary">notifications_active</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Verified local shelters, soup kitchens, and verified neighbors receive an instant dispatch ping.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-surface-container-low rounded-2xl p-space-md flex gap-space-md items-start shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center font-headline-sm text-headline-sm flex-shrink-0 font-bold">
              3
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="font-title-md text-title-md text-on-surface font-semibold">Seamless Hand-off</span>
                <span className="material-symbols-outlined text-[18px] text-primary">local_shipping</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Coordinate swift, contactless or scheduled curbside pickup with real-time ETA tracking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Testimonial & Partner Endorsements */}
      <section className="space-y-space-md">
        {/* Testimonial Card */}
        <div className="bg-surface-container-highest/60 rounded-3xl p-space-md space-y-space-sm relative overflow-hidden shadow-xs">
          <div className="flex items-center gap-1 text-tertiary">
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            ))}
          </div>
          <p className="font-body-md text-body-md text-on-surface italic leading-relaxed">
            “FoodShare replaced our evening surplus disposal with 40 daily meals directly to our neighborhood shelter. The pickup is seamless.”
          </p>
          <div className="flex items-center gap-3 pt-1">
            <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-semibold">
              EL
            </div>
            <div>
              <span className="font-title-md text-title-md text-on-surface block font-semibold leading-tight">Elena Lin</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Head Chef, The Rustle Bistro</span>
            </div>
          </div>
        </div>

        {/* Trusted Partners Grid */}
        <div className="space-y-2">
          <div className="text-center font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Trusted Rescue Network Partners
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-14 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center p-1 shadow-xs">
              <span className="material-symbols-outlined text-[20px] text-primary">diversity_1</span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface leading-tight mt-0.5">Feeding America</span>
            </div>
            <div className="h-14 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center p-1 shadow-xs">
              <span className="material-symbols-outlined text-[20px] text-tertiary">home_pin</span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface leading-tight mt-0.5">Local Hope</span>
            </div>
            <div className="h-14 rounded-xl bg-surface-container-low flex flex-col items-center justify-center text-center p-1 shadow-xs">
              <span className="material-symbols-outlined text-[20px] text-on-surface">eco</span>
              <span className="font-label-sm text-label-sm font-semibold text-on-surface leading-tight mt-0.5">CleanPlate</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Conversion Tray / Quick Callout Card */}
      <section className="rounded-3xl bg-primary p-space-md text-on-primary shadow-lg relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4 pointer-events-none">
          <span className="material-symbols-outlined text-[130px]">spa</span>
        </div>
        <div className="relative space-y-space-sm">
          <div className="space-y-1">
            <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold">Have Surplus Today?</h3>
            <p className="font-body-sm text-body-sm text-on-primary/90">
              Turn your leftover kitchen prep, bakery bins, or pantry items into community smiles.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => setScreen('donate')}
              className="flex-1 h-11 flex items-center justify-center gap-2 rounded-xl bg-on-primary text-primary font-label-lg text-label-lg active:scale-95 transition-transform shadow-sm font-semibold"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              Post a Listing
            </button>
            <button
              onClick={() => setScreen('browse')}
              className="h-11 px-4 flex items-center justify-center rounded-xl bg-primary-fixed-dim/30 text-on-primary font-label-sm text-label-sm active:scale-95 transition-transform hover:bg-primary-fixed-dim/40 font-semibold"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
