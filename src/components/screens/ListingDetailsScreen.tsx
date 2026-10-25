import React, { useState } from 'react';
import { FoodListing } from '../../types';

interface ListingDetailsScreenProps {
  listing: FoodListing;
  onBack: () => void;
  onRequestEntire: (listing: FoodListing) => void;
  onRequestPartial: (listing: FoodListing, quantity: number) => void;
  onOpenMessage: () => void;
  onShowToast: (msg: string) => void;
}

export const ListingDetailsScreen: React.FC<ListingDetailsScreenProps> = ({
  listing,
  onBack,
  onRequestEntire,
  onRequestPartial,
  onOpenMessage,
  onShowToast
}) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showPartialModal, setShowPartialModal] = useState(false);
  const [partialQuantity, setPartialQuantity] = useState(15);
  const [isReserved, setIsReserved] = useState(false);
  const [reservedCount, setReservedCount] = useState<number | null>(null);

  const maxAvailable = listing.remainingQuantity || 50;

  const handleToggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onShowToast(!isBookmarked ? 'Listing saved to your bookmarked rescues' : 'Removed from saved rescues');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `FoodShare Tamil Nadu: ${listing.title}`,
        text: `${listing.quantityString} available for immediate rescue from ${listing.donorName} in ${listing.donorLocation}!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      onShowToast('Share link copied to clipboard!');
    }
  };

  const handleCallKitchen = () => {
    onShowToast(`Dialing kitchen dispatch: ${listing.donorPhone || '+91 98401 24892'}`);
  };

  const confirmPartial = () => {
    setShowPartialModal(false);
    setIsReserved(true);
    setReservedCount(partialQuantity);
    onRequestPartial(listing, partialQuantity);
  };

  const confirmEntire = () => {
    setIsReserved(true);
    setReservedCount(maxAvailable);
    onRequestEntire(listing);
  };

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Top Navigation & Action Row */}
      <div className="flex items-center justify-between py-space-sm mb-space-sm">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-space-xs text-primary font-label-lg text-label-lg hover:opacity-80 transition-opacity font-bold"
        >
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>
          <span>Back to Browse • உலாவு</span>
        </button>

        <div className="flex items-center gap-space-xs">
          <button
            onClick={handleToggleBookmark}
            aria-label="Save listing"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 shadow-xs"
          >
            <span
              className="material-symbols-outlined text-[20px]"
              style={isBookmarked ? { fontVariationSettings: "'FILL' 1", color: '#006b45' } : undefined}
            >
              {isBookmarked ? 'bookmark' : 'bookmark_border'}
            </span>
          </button>

          <button
            onClick={handleShare}
            aria-label="Share listing"
            className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95 shadow-xs"
          >
            <span className="material-symbols-outlined text-[20px]">share</span>
          </button>
        </div>
      </div>

      {/* Hero Visual Card */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container shadow-md mb-space-md border border-surface-container">
        <div className="h-60 w-full relative">
          <img
            src={listing.imageUrl}
            alt={listing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/85 via-inverse-surface/30 to-transparent"></div>

          {/* Top badges on image */}
          <div className="absolute top-space-md left-space-md right-space-md flex flex-wrap gap-space-xs items-center justify-between">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md text-tertiary-container font-label-md text-label-md font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
              {listing.categoryLabel}
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary-container text-on-primary-container font-label-md text-label-md font-bold shadow-sm">
              <span className="material-symbols-outlined text-[14px]">check_circle</span>
              {listing.statusBadge}
            </span>
          </div>

          {/* Urgent timer badge over hero */}
          <div className="absolute bottom-space-md left-space-md right-space-md">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-bold shadow-md">
              <span className="material-symbols-outlined text-[16px] text-tertiary">alarm</span>
              <span>{listing.urgentText || `Urgent: Pick up before expiry`}</span>
            </div>
          </div>
        </div>

        {/* Core Food Title & Metrics */}
        <div className="p-space-md bg-surface-container-lowest flex flex-col gap-space-xs">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm font-bold text-[11px]">
              {listing.district} District
            </span>
            <span className="font-label-sm font-mono text-on-surface-variant">
              {listing.fssaiNumber}
            </span>
          </div>

          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold leading-tight">
            {listing.title}
          </h2>

          {listing.tamilTitle && (
            <p className="font-title-md text-primary font-semibold">
              {listing.tamilTitle}
            </p>
          )}

          <div className="flex items-center gap-2 text-on-surface-variant font-label-lg text-label-lg mt-0.5">
            <span className="material-symbols-outlined text-[18px] text-primary">inventory_2</span>
            <span className="font-semibold text-on-surface">{listing.quantityString}</span>
          </div>

          {/* Countdown Bar Card */}
          <div className="mt-space-xs p-space-sm rounded-xl bg-surface-container-low flex items-center justify-between border border-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[20px]">hourglass_top</span>
              <span className="font-label-md text-label-md text-on-surface font-bold">
                Must be collected within {Math.floor(listing.hoursLeft)} hrs {Math.round((listing.hoursLeft % 1) * 60)} mins
              </span>
            </div>
            <div className="w-14 h-2 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="w-3/4 h-full bg-tertiary rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Donor Profile Card */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-sm mb-space-md border border-surface-container">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-surface-container shrink-0">
              <img
                src={listing.donorAvatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuAM2Q2SPorKwAeUStBSxl8mVkcgze1KbnCNQ0bj_JWEZ7Dgi7dW2k5Ock7A8crIUrQMwF9KBn1bXxF--P_qfnKabsy9HfvEgRocbYfboHjkUxHt74ijgCGxNzOYetcbpcjDu82d9Y5t7P1eKkndaFBCjVEtTUBPykpOqpQmxF_1pI4oC5haarrBl-h3gFcLEJUAnDj7rdCZG3q6Gf9D2452gxufSY4BZx12Kd3V_WRK89iZpImVOdk"}
                alt={listing.donorName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="font-title-md text-title-md text-on-surface truncate font-bold">
                  {listing.donorName}
                </h3>
                {listing.verified && (
                  <span
                    className="material-symbols-outlined text-primary text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    title="FSSAI Verified Establishment"
                  >
                    verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                <span className="inline-flex items-center text-tertiary">
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  <strong className="ml-0.5 font-label-sm text-label-sm">{listing.donorRating}</strong>
                </span>
                <span>•</span>
                <span>{listing.donorRescuesCount} rescues completed in TN</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Action row */}
        <div className="grid grid-cols-2 gap-space-xs pt-space-xs">
          <button
            onClick={onOpenMessage}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-variant transition-colors active:scale-95 font-bold"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">chat_bubble</span>
            <span>Message {listing.donorContactName?.split(' ')[0] || 'Chef'}</span>
          </button>
          <button
            onClick={handleCallKitchen}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md hover:bg-surface-variant transition-colors active:scale-95 font-bold"
          >
            <span className="material-symbols-outlined text-[18px] text-primary">call</span>
            <span>Call Kitchen</span>
          </button>
        </div>
      </div>

      {/* Detailed Food Description */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-sm mb-space-md flex flex-col gap-space-sm border border-surface-container">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">restaurant</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Batch &amp; Preparation Details</h3>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
          {listing.description}
        </p>

        {/* Dietary & Safety Badges */}
        <div className="flex flex-wrap gap-2 pt-space-xs">
          {listing.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-bold flex items-center gap-1 border border-surface-container"
            >
              <span className="material-symbols-outlined text-[14px]">check</span>
              {tag}
            </span>
          ))}
        </div>

        {/* Allergen & Dietary Warning Box */}
        {listing.allergenNotice && (
          <div className="mt-space-xs p-space-sm rounded-xl bg-surface-container-high flex items-start gap-space-sm border border-surface-container">
            <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0 mt-0.5">info</span>
            <div className="flex flex-col">
              <span className="font-label-md text-label-md text-on-surface font-bold">Dietary &amp; Ingredients Note:</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {listing.allergenNotice}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Pickup Logistics Section */}
      <div className="w-full bg-surface-container-lowest rounded-2xl p-space-md shadow-sm mb-space-md flex flex-col gap-space-sm border border-surface-container">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Pickup &amp; Vehicle Access</h3>
          </div>
          <span className="font-label-sm text-label-sm text-primary font-bold">{listing.distance} away</span>
        </div>

        {/* Location preview */}
        <div className="w-full h-36 rounded-xl bg-cover bg-center relative overflow-hidden flex items-end p-space-sm shadow-inner">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxgen5qsM8N_FrKhP9se5DKOmHg6wmLEE6GUwxg2m2y_Lh78Kn11CDNnHrhqsqNo_IsUb3I9S7g9exYPSU2b8OW8sxU-PKdHPsGRIiK3jh7AYvKQi7BRCapIW8sfTNIVGrSQBtetnP0bnbOMMMYGtyutug_vecrxFqI972SInb4A9Izz5H_xi3jaViydgE-IO245AogdkyP2wCNIWe5nEkqenZ18BdeilMN8AJzZVono5p1hCDd7c"
            alt="Tamil Nadu Route Map"
            className="w-full h-full object-cover absolute inset-0"
          />
          <div className="absolute inset-0 bg-inverse-surface/30"></div>
          <div className="relative z-10 w-full flex items-center justify-between bg-surface-container-lowest/95 backdrop-blur-md px-3 py-2 rounded-lg shadow-sm">
            <div className="flex items-center gap-2 min-w-0">
              <span className="material-symbols-outlined text-error text-[20px] shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>
                location_on
              </span>
              <span className="font-label-sm text-label-sm text-on-surface truncate font-bold">
                {listing.donorLocation}
              </span>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(listing.pickupAddress)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 text-primary font-label-sm text-label-sm font-bold flex items-center gap-0.5 hover:underline"
            >
              <span>Open in Maps</span>
              <span className="material-symbols-outlined text-[14px]">open_in_new</span>
            </a>
          </div>
        </div>

        {/* Detailed Address */}
        <div className="flex flex-col gap-2 pt-space-xs">
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-on-surface-variant text-[18px] shrink-0 mt-0.5">apartment</span>
            <span className="font-body-md text-body-md text-on-surface font-semibold">{listing.pickupAddress}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">local_shipping</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              {listing.pickupInstructions}
            </span>
          </div>
        </div>
      </div>

      {/* Partial Claim Modal */}
      {showPartialModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm flex items-end justify-center p-0 animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-surface-container-lowest rounded-t-3xl p-space-lg flex flex-col gap-space-md shadow-2xl animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between">
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Select Quantity to Rescue</h4>
              <button
                onClick={() => setShowPartialModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              How many meal packets or containers can your shelter volunteer vehicle transport safely right now?
            </p>

            <div className="flex items-center justify-center gap-space-md py-space-sm">
              <button
                type="button"
                onClick={() => setPartialQuantity((q) => Math.max(5, q - 5))}
                className="w-12 h-12 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface text-[24px] font-bold active:scale-95 transition-transform"
              >
                -
              </button>
              <div className="flex flex-col items-center min-w-[90px]">
                <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold">
                  {partialQuantity}
                </span>
                <span className="font-label-sm text-on-surface-variant font-medium">Packets / Units</span>
              </div>
              <button
                type="button"
                onClick={() => setPartialQuantity((q) => Math.min(maxAvailable, q + 5))}
                className="w-12 h-12 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-on-surface text-[24px] font-bold active:scale-95 transition-transform"
              >
                +
              </button>
            </div>

            <button
              onClick={confirmPartial}
              className="w-full py-3.5 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md active:scale-[0.99] transition-transform hover:bg-primary-container"
            >
              Confirm Request for {partialQuantity} Meals
            </button>
          </div>
        </div>
      )}

      {/* Sticky Bottom Reservation Tray */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-gutter-mobile pt-space-sm pb-safe flex flex-col gap-space-xs border-t border-surface-container max-w-md mx-auto">
        <div className="flex gap-space-xs items-center">
          <button
            onClick={() => setShowPartialModal(true)}
            className="flex-1 py-3 px-2 rounded-xl bg-surface-container-high text-primary font-label-md text-label-md font-bold text-center hover:bg-surface-variant active:scale-95 transition-all"
          >
            Partial ({partialQuantity})
          </button>

          <button
            onClick={confirmEntire}
            disabled={isReserved}
            className={`flex-[2] py-3 px-3 rounded-xl font-label-lg text-label-lg font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-[0.99] transition-all ${
              isReserved
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-primary text-on-primary hover:bg-primary-container'
            }`}
          >
            {isReserved ? (
              <>
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>Batch Reserved ({reservedCount} Meals)</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                <span>Request Entire Batch ({maxAvailable})</span>
              </>
            )}
          </button>
        </div>

        {/* FSSAI Legal Protection Note */}
        <div className="flex items-center justify-center gap-1 text-center pb-1">
          <span className="material-symbols-outlined text-[13px] text-outline">verified_user</span>
          <span className="font-label-sm text-label-sm text-outline tracking-tight">
            Protected under FSSAI Surplus Food Regulations 2019 &amp; Section 31 FSS Act
          </span>
        </div>
      </div>
    </div>
  );
};
