import React, { useState } from 'react';
import { FoodListing } from '../../types';

interface BrowseScreenProps {
  listings: FoodListing[];
  onSelectListing: (listing: FoodListing) => void;
  onRequestFood: (listing: FoodListing) => void;
  onOpenMap: () => void;
  onOpenAlertModal: () => void;
}

export const BrowseScreen: React.FC<BrowseScreenProps> = ({
  listings,
  onSelectListing,
  onRequestFood,
  onOpenMap,
  onOpenAlertModal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'closest' | 'urgent' | 'size'>('closest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [claimingIds, setClaimingIds] = useState<{ [key: string]: boolean }>({});
  const [claimedIds, setClaimedIds] = useState<{ [key: string]: boolean }>({});

  const filterChips = [
    { id: 'All', label: 'All Tamil Nadu', isDot: true },
    { id: 'Chennai', label: '📍 Chennai' },
    { id: 'Coimbatore', label: '📍 Coimbatore' },
    { id: 'Prepared', label: '🍲 Meals & Biriyani' },
    { id: 'Produce', label: '🥬 Koyambedu Produce' },
    { id: 'Bakery', label: '☕ Tiffin & Bakery' },
    { id: 'Dairy', label: '🥛 Aavin Dairy' },
    { id: 'urgent', label: '⚡ Urgent (<3 hrs)', isUrgent: true }
  ];

  const handleRequestClick = (listing: FoodListing) => {
    setClaimingIds((prev) => ({ ...prev, [listing.id]: true }));
    setTimeout(() => {
      setClaimingIds((prev) => ({ ...prev, [listing.id]: false }));
      setClaimedIds((prev) => ({ ...prev, [listing.id]: true }));
      onRequestFood(listing);
    }, 700);
  };

  const filteredListings = listings.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.tamilTitle && item.tamilTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.donorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.donorLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Chennai') return item.city === 'Chennai';
    if (selectedCategory === 'Coimbatore') return item.city === 'Coimbatore';
    if (selectedCategory === 'urgent') return item.isUrgent || item.hoursLeft <= 3;
    return item.category === selectedCategory;
  }).sort((a, b) => {
    if (sortBy === 'urgent') return a.hoursLeft - b.hoursLeft;
    if (sortBy === 'size') return (b.portions || 0) - (a.portions || 0);
    return parseFloat(a.distance) - parseFloat(b.distance);
  });

  return (
    <div className="flex flex-col w-full pb-6 space-y-4">
      {/* Search & View Controls Bar */}
      <div className="flex flex-col space-y-3">
        {/* Search Bar */}
        <div className="relative flex items-center w-full">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-outline">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search sambar rice, biriyani, idli, Koyambedu veg, or donor..."
            className="w-full h-12 pl-10 pr-10 bg-surface-container-lowest text-on-surface placeholder:text-outline text-body-md font-body-md rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 border border-surface-container"
          />
          {searchQuery ? (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 p-1.5 text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          ) : (
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              aria-label="Filter options"
              className="absolute right-2.5 p-1.5 text-outline hover:text-primary active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">tune</span>
            </button>
          )}
        </div>

        {/* Filter Chips Horizontal Scroll */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-0.5 -mx-gutter-mobile px-gutter-mobile">
          {filterChips.map((chip) => {
            const isSelected = selectedCategory === chip.id;
            if (chip.isUrgent) {
              return (
                <button
                  key={chip.id}
                  onClick={() => setSelectedCategory(isSelected ? 'All' : chip.id)}
                  className={`shrink-0 flex items-center space-x-1 px-3 py-1.5 rounded-full font-label-md text-label-md active:scale-95 transition-all font-semibold ${
                    isSelected
                      ? 'bg-error text-on-error shadow-sm'
                      : 'bg-error-container text-on-error-container hover:bg-error-container/80'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px]">bolt</span>
                  <span>{chip.label}</span>
                </button>
              );
            }

            return (
              <button
                key={chip.id}
                onClick={() => setSelectedCategory(chip.id)}
                className={`shrink-0 flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full font-label-md text-label-md active:scale-95 transition-all font-semibold ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                }`}
              >
                <span>{chip.label}</span>
                {chip.isDot && isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span>
                )}
              </button>
            );
          })}
        </div>

        {/* Results Count, Sort, and Map Toggle */}
        <div className="flex items-center justify-between pt-1 relative">
          <div className="flex items-center space-x-1.5">
            <span className="flex h-2 w-2 rounded-full bg-primary"></span>
            <span className="text-label-md font-label-md text-on-surface-variant font-medium">
              <strong className="text-on-surface font-bold">{filteredListings.length} batches available</strong> in Tamil Nadu
            </span>
          </div>

          <div className="flex items-center space-x-1.5">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:text-on-surface active:scale-95 transition-all font-semibold"
              >
                <span>
                  Sort: {sortBy === 'closest' ? 'Nearest First' : sortBy === 'urgent' ? 'Urgent Expiry' : 'Most Portions'}
                </span>
                <span className="material-symbols-outlined text-[14px]">expand_more</span>
              </button>

              {showSortDropdown && (
                <div className="absolute right-0 top-8 w-44 bg-surface-container-lowest rounded-xl shadow-lg border border-surface-container-high py-1 z-30 animate-in fade-in zoom-in-95 duration-100">
                  <button
                    onClick={() => { setSortBy('closest'); setShowSortDropdown(false); }}
                    className={`w-full px-3 py-1.5 text-left text-label-sm font-medium hover:bg-surface-container flex items-center justify-between ${
                      sortBy === 'closest' ? 'text-primary font-bold' : 'text-on-surface'
                    }`}
                  >
                    <span>Nearest First (km)</span>
                    {sortBy === 'closest' && <span className="material-symbols-outlined text-[14px]">check</span>}
                  </button>
                  <button
                    onClick={() => { setSortBy('urgent'); setShowSortDropdown(false); }}
                    className={`w-full px-3 py-1.5 text-left text-label-sm font-medium hover:bg-surface-container flex items-center justify-between ${
                      sortBy === 'urgent' ? 'text-primary font-bold' : 'text-on-surface'
                    }`}
                  >
                    <span>Urgent Expiry</span>
                    {sortBy === 'urgent' && <span className="material-symbols-outlined text-[14px]">check</span>}
                  </button>
                  <button
                    onClick={() => { setSortBy('size'); setShowSortDropdown(false); }}
                    className={`w-full px-3 py-1.5 text-left text-label-sm font-medium hover:bg-surface-container flex items-center justify-between ${
                      sortBy === 'size' ? 'text-primary font-bold' : 'text-on-surface'
                    }`}
                  >
                    <span>Most Portions</span>
                    {sortBy === 'size' && <span className="material-symbols-outlined text-[14px]">check</span>}
                  </button>
                </div>
              )}
            </div>

            {/* Map Toggle Pill */}
            <button
              onClick={onOpenMap}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-surface-container text-primary font-label-sm text-label-sm hover:bg-surface-container-high active:scale-95 transition-all font-bold"
            >
              <span className="material-symbols-outlined text-[15px]">map</span>
              <span>TN Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* Listings Stream */}
      <div className="flex flex-col space-y-3.5">
        {filteredListings.map((item) => {
          const isClaiming = !!claimingIds[item.id];
          const isClaimed = !!claimedIds[item.id];

          return (
            <article
              key={item.id}
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm flex flex-col transition-all hover:shadow-md border border-surface-container"
            >
              {/* Media Container */}
              <div
                onClick={() => onSelectListing(item)}
                className="relative w-full h-44 overflow-hidden cursor-pointer group"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/20 to-transparent"></div>

                {/* Tags Overlay Top */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full ${item.categoryBg} ${item.categoryText} text-label-sm font-label-sm uppercase tracking-wider font-bold shadow-sm`}
                    >
                      {item.categoryLabel}
                    </span>
                    {item.isUrgent ? (
                      <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container text-label-sm font-label-sm font-bold shadow-sm">
                        <span className="material-symbols-outlined text-[13px]">timer</span>
                        <span>{item.urgentText || `Urgent: ${item.hoursLeft}h left`}</span>
                      </span>
                    ) : (
                      <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface text-label-sm font-label-sm font-medium shadow-sm">
                        <span className="material-symbols-outlined text-[13px] text-secondary">update</span>
                        <span>Available: {item.hoursLeft}h left</span>
                      </span>
                    )}
                  </div>

                  {/* Status Pill */}
                  <div className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-surface-container-lowest/95 backdrop-blur-sm text-primary text-label-sm font-label-sm font-bold shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span>{item.statusBadge}</span>
                  </div>
                </div>

                {/* Quantity & Headline Overlay Bottom */}
                <div className="absolute bottom-2.5 left-3 right-3 text-inverse-on-surface">
                  <div className="flex items-center space-x-1.5 text-label-sm font-label-sm opacity-90 mb-0.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">scale</span>
                    <span>{item.quantityString}</span>
                  </div>
                  <h2 className="font-headline-sm text-headline-sm text-inverse-on-surface leading-tight font-bold drop-shadow-sm">
                    {item.title}
                  </h2>
                  {item.tamilTitle && (
                    <p className="text-label-sm text-primary-fixed font-medium truncate mt-0.5">
                      {item.tamilTitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Card Body & Donor Meta */}
              <div className="p-3.5 flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px] text-on-secondary-fixed">
                        {item.category === 'Produce' ? 'eco' : 'restaurant'}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center space-x-1">
                        <span className="font-title-md text-title-md text-on-surface truncate font-bold">
                          {item.donorName}
                        </span>
                        {item.verified && (
                          <span
                            className="material-symbols-outlined text-[16px] text-primary"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                            title="FSSAI Verified Establishment"
                          >
                            verified
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[13px] text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>
                          star
                        </span>
                        <span className="font-bold text-on-surface">{item.donorRating}</span>
                        <span>•</span>
                        <span className="truncate">{item.donorLocation}</span>
                      </div>
                    </div>
                  </div>

                  <span className="font-label-sm text-[11px] text-on-surface-variant font-mono bg-surface-container px-2 py-0.5 rounded shrink-0">
                    {item.fssaiNumber.replace('FSSAI Lic. #', 'Lic #')}
                  </span>
                </div>

                {/* Logistics Detail Pill */}
                <div className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-surface-container-low text-on-surface-variant text-body-sm font-body-sm border border-surface-container">
                  <span className="material-symbols-outlined text-[18px] text-primary">schedule</span>
                  <span>
                    Pickup Window: <strong className="text-on-surface font-semibold">{item.pickupWindow}</strong>
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <button
                    type="button"
                    onClick={() => onSelectListing(item)}
                    className="h-10 px-3 rounded-xl bg-surface-container text-on-surface hover:bg-surface-variant font-label-md text-label-md flex items-center justify-center transition-colors active:scale-98 font-bold"
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    disabled={isClaiming || isClaimed}
                    onClick={() => handleRequestClick(item)}
                    className={`h-10 px-3 rounded-xl font-label-md text-label-md flex items-center justify-center space-x-1 shadow-sm active:scale-98 transition-all font-bold ${
                      isClaimed
                        ? 'bg-primary-container text-on-primary-container'
                        : 'bg-primary text-on-primary hover:bg-surface-tint'
                    }`}
                  >
                    {isClaiming ? (
                      <span className="material-symbols-outlined text-[18px] animate-spin">refresh</span>
                    ) : isClaimed ? (
                      <>
                        <span className="material-symbols-outlined text-[18px]">check</span>
                        <span>Claimed!</span>
                      </>
                    ) : (
                      <span>Request Food</span>
                    )}
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {filteredListings.length === 0 && (
          <div className="p-8 text-center bg-surface-container-lowest rounded-2xl border border-surface-container">
            <span className="material-symbols-outlined text-4xl text-outline mb-2">search_off</span>
            <h3 className="font-headline-sm text-on-surface font-bold">No surplus found in this area</h3>
            <p className="font-body-sm text-on-surface-variant mt-1">
              Try choosing "All Tamil Nadu" or search for a specific dish like Sambar Rice or Koyambedu produce.
            </p>
          </div>
        )}
      </div>

      {/* Empty State / Missing Food Alert Banner */}
      <div className="rounded-2xl p-4 bg-surface-container-low text-on-surface flex items-start space-x-3.5 shadow-sm border border-surface-container">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-[22px]">notifications_active</span>
        </div>
        <div className="flex flex-col space-y-1.5 flex-1 min-w-0">
          <h3 className="font-title-md text-title-md font-bold text-on-surface leading-tight">
            Can’t find surplus in your district?
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
            Set up an instant alert for marriage hall batches, catering excess, or market produce in Chennai, Coimbatore, or Madurai.
          </p>
          <div className="pt-1">
            <button
              onClick={onOpenAlertModal}
              type="button"
              className="inline-flex items-center space-x-1 font-label-md text-label-md text-primary font-bold hover:underline active:opacity-80"
            >
              <span>Create Custom Tamil Nadu Alert</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
