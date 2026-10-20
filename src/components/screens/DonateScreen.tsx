import React, { useState } from 'react';
import { FoodListing, ScreenType } from '../../types';

interface DonateScreenProps {
  onPublish: (newListing: FoodListing) => void;
  setScreen: (screen: ScreenType) => void;
  onShowToast: (msg: string) => void;
}

export const DonateScreen: React.FC<DonateScreenProps> = ({
  onPublish,
  setScreen,
  onShowToast
}) => {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [title, setTitle] = useState('Fresh Artisan Sandwiches & Wraps');
  const [category, setCategory] = useState<'Prepared' | 'Produce' | 'Bakery' | 'Dairy' | 'Canned/Dry'>('Prepared');
  const [quantity, setQuantity] = useState<number>(25);
  const [unit, setUnit] = useState('Boxes / Servings');
  const [description, setDescription] = useState(
    'Prepared fresh today at 11:30 AM in our commercial kitchen. Assorted avocado club wraps and roasted Mediterranean vegetables in eco-friendly compostable containers.'
  );
  const [tags, setTags] = useState<string[]>(['Vegetarian', 'Nut-Free', 'Refrigerated']);
  const [expiryTime, setExpiryTime] = useState('6:30 PM');
  const [pickupAddress, setPickupAddress] = useState('742 Evergreen Terrace, Loading Dock #3');
  const [pickupNotes, setPickupNotes] = useState('Ring back bell, ask for Maria');
  const [pledgeChecked, setPledgeChecked] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const availableCategories: Array<{
    id: 'Prepared' | 'Produce' | 'Bakery' | 'Dairy' | 'Canned/Dry';
    label: string;
    emoji: string;
  }> = [
    { id: 'Prepared', label: 'Prepared Meals', emoji: '🍲' },
    { id: 'Produce', label: 'Fresh Produce', emoji: '🥬' },
    { id: 'Bakery', label: 'Bakery', emoji: '🥖' },
    { id: 'Dairy', label: 'Dairy', emoji: '🥛' },
    { id: 'Canned/Dry', label: 'Canned/Dry', emoji: '🥫' }
  ];

  const tagOptions = [
    'Vegetarian',
    'Nut-Free',
    'Gluten-Free',
    'Refrigerated',
    'Frozen',
    'Room Temp'
  ];

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoUrl(url);
      onShowToast('✨ AI analyzing food item: tagged as Prepared Meals (wraps & salads)');
    }
  };

  const handlePublish = () => {
    if (!pledgeChecked) {
      onShowToast('Please agree to the Food Safety & Quality Pledge');
      return;
    }

    setIsPublishing(true);
    setTimeout(() => {
      const newListing: FoodListing = {
        id: `listing-${Date.now()}`,
        title,
        category,
        categoryLabel: category === 'Prepared' ? 'Prepared Meals' : category,
        categoryBg: category === 'Bakery' ? 'bg-tertiary-fixed' : category === 'Produce' ? 'bg-primary-fixed' : 'bg-secondary-container',
        categoryText: category === 'Bakery' ? 'text-on-tertiary-fixed' : category === 'Produce' ? 'text-on-primary-fixed' : 'text-on-secondary-fixed',
        imageUrl: photoUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX-j91gIXg04ryv9jHoG9Yn_YiqBhRczuIxVPdlkTFj_biPlVjsoiIr5U2T6OMVE7o6Ry7hWLprHADbLMwFAYoOUpyF-3c4qhIDkF1AHLmEPpRj7I8nsetPf39A6sUFICS7ctxGzAZRCvM-5I8d9092vjmsa_N0D8vdAEfceDAwUG_EPmHUEA0fUB6wxsc0zZiPQhj8xbgOyWtgSYovgxvmxilCpHVXMhRxRIuVFT57_3Xj6uzUdc',
        imageAlt: title,
        donorName: 'Urban Kitchen & Catering Co.',
        donorRating: 4.95,
        donorRescuesCount: 129,
        donorLocation: 'Mission District (0.8 mi)',
        distance: '0.8 mi',
        verified: true,
        donorContactName: 'Maria Rodriguez',
        quantityString: `${quantity} ${unit.toLowerCase()} • Feeds ~${quantity} adults`,
        portions: quantity,
        remainingQuantity: quantity,
        weightKg: Math.round(quantity * 0.5),
        pickupWindow: `Today until ${expiryTime}`,
        urgentText: 'Urgent Expiry: 3h 40m left',
        statusBadge: 'Available Now',
        statusType: 'available',
        hoursLeft: 3.6,
        isUrgent: true,
        tags,
        description,
        allergenNotice: tags.includes('Nut-Free') ? 'Prepared in a nut-free facility.' : undefined,
        pickupAddress,
        pickupInstructions: pickupNotes
      };

      onPublish(newListing);
      setIsPublishing(false);
      onShowToast('🎉 Donation broadcasted live to 185 community food banks!');
      setScreen('dashboard');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Step Header */}
      <div className="flex items-center justify-between mb-space-sm pt-space-xs">
        <div className="flex flex-col">
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
            Create Food Donation
          </span>
          <span className="font-label-md text-label-md text-primary font-semibold flex items-center gap-1.5 mt-0.5">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Step 1 of 2: Listing Information
          </span>
        </div>

        <div className="flex items-center gap-1 bg-surface-container-high px-space-sm py-1 rounded-full shadow-xs">
          <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            eco
          </span>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">+50 Impact</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden mb-space-lg shadow-sm">
        <div className="h-full bg-primary-container rounded-full w-1/2 transition-all duration-500"></div>
      </div>

      {/* Donation Form */}
      <form className="flex flex-col gap-space-lg" onSubmit={(e) => e.preventDefault()}>
        {/* Food Photo Dropzone */}
        <div className="flex flex-col gap-space-xs">
          <label className="font-title-md text-title-md text-on-surface flex items-center justify-between">
            <span>
              Food Photo <span className="text-tertiary">*</span>
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Quality Verified</span>
          </label>

          <div
            className="relative group cursor-pointer overflow-hidden rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 p-space-lg flex flex-col items-center justify-center text-center shadow-sm border-2 border-dashed border-surface-container-high"
            id="photo-dropzone"
          >
            {photoUrl ? (
              <div className="relative w-full h-44 rounded-xl overflow-hidden">
                <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-inverse-surface/40 flex items-center justify-center text-on-primary font-label-md">
                  Tap to replace image
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-primary mb-space-sm group-hover:scale-105 transition-transform duration-200">
                  <span className="material-symbols-outlined text-[32px]">photo_camera</span>
                </div>
                <p className="font-title-md text-title-md text-on-surface font-semibold">Tap to take photo or upload</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 max-w-[240px]">
                  Required for recipient safety review &amp; fast approval
                </p>
                <div className="mt-space-md flex items-center gap-space-xs bg-surface-container-highest/80 px-space-md py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">auto_awesome</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    AI Auto-Tagging Enabled
                  </span>
                </div>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              aria-label="Upload food photo"
              onChange={handlePhotoUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {/* Food Item Title */}
        <div className="flex flex-col gap-space-xs">
          <label className="font-title-md text-title-md text-on-surface font-semibold" htmlFor="food-name">
            Food Item Title <span className="text-tertiary">*</span>
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
              restaurant
            </span>
            <input
              id="food-name"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Freshly Prepared Veggie Sandwiches"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none focus:bg-surface-container-low transition-colors border border-surface-container"
            />
          </div>
        </div>

        {/* Category Chips Horizontal Scroll */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-title-md text-title-md text-on-surface font-semibold">
            Category <span className="text-tertiary">*</span>
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar -mx-gutter-mobile px-gutter-mobile">
            {availableCategories.map((cat) => {
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-md text-label-md active:scale-95 transition-all ${
                    isSelected
                      ? 'bg-primary-container text-on-primary-container shadow-sm font-semibold'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quantity & Volume */}
        <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col gap-space-sm shadow-sm border border-surface-container">
          <div className="flex justify-between items-center">
            <span className="font-title-md text-title-md text-on-surface font-semibold">Quantity &amp; Volume</span>
            <span className="font-label-sm text-label-sm text-primary font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">groups</span>
              Feeds ~{quantity} adults
            </span>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
                pin
              </span>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full h-12 pl-11 pr-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none border border-surface-container"
              />
            </div>
            <div className="relative flex items-center">
              <select
                aria-label="Quantity Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full h-12 px-3.5 pr-8 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm appearance-none outline-none border border-surface-container"
              >
                <option value="Boxes / Servings">Boxes / Servings</option>
                <option value="Trays (Family Size)">Trays (Family Size)</option>
                <option value="Kilograms (kg)">Kilograms (kg)</option>
                <option value="Individual Portions">Individual Portions</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 pointer-events-none text-on-surface-variant text-[20px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Description & Ingredients */}
        <div className="flex flex-col gap-space-xs">
          <label className="font-title-md text-title-md text-on-surface font-semibold" htmlFor="food-desc">
            Description &amp; Ingredients
          </label>
          <textarea
            id="food-desc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe items, ingredients, prep time, packaging details..."
            className="w-full p-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none resize-none focus:bg-surface-container-low transition-colors border border-surface-container"
          />
        </div>

        {/* Dietary & Storage Tags */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-title-md text-title-md text-on-surface font-semibold">Dietary &amp; Storage Tags</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Tap to toggle</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {tagOptions.map((tag) => {
              const active = tags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-md text-label-md shadow-sm active:scale-95 transition-all ${
                    active
                      ? 'bg-primary-container text-on-primary-container font-semibold'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                  }`}
                >
                  {active && <span className="material-symbols-outlined text-[16px]">check</span>}
                  <span>{tag}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pickup By & Expiry Window */}
        <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col gap-space-sm shadow-sm border border-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-title-md text-title-md text-on-surface font-semibold">Pickup By &amp; Expiry Window</span>
            <span className="material-symbols-outlined text-tertiary text-[20px]">schedule</span>
          </div>

          <div className="grid grid-cols-2 gap-space-sm">
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
                calendar_today
              </span>
              <input
                type="text"
                readOnly
                value="Today, Nov 18"
                className="w-full h-12 pl-10 pr-2 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none border border-surface-container"
              />
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[18px]">
                alarm
              </span>
              <input
                type="text"
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
                className="w-full h-12 pl-10 pr-2 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none border border-surface-container"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-tertiary-container animate-pulse">
              timer
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm font-bold text-tertiary-container">
                Urgent Expiry: 3h 40m left
              </span>
              <span className="font-body-sm text-body-sm leading-tight text-on-tertiary-fixed">
                Will be prioritized on recipient feeds to prevent waste.
              </span>
            </div>
          </div>
        </div>

        {/* Pickup Location */}
        <div className="flex flex-col gap-space-sm">
          <span className="font-title-md text-title-md text-on-surface font-semibold">Pickup Location</span>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
              pin_drop
            </span>
            <input
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none border border-surface-container"
            />
          </div>

          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
              contact_support
            </span>
            <input
              type="text"
              value={pickupNotes}
              onChange={(e) => setPickupNotes(e.target.value)}
              placeholder="Pickup instructions (e.g., parking spot, dock code)"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none border border-surface-container"
            />
          </div>

          {/* Map routing graphic */}
          <div className="w-full h-28 rounded-xl overflow-hidden shadow-sm flex items-end p-2 relative">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxgen5qsM8N_FrKhP9se5DKOmHg6wmLEE6GUwxg2m2y_Lh78Kn11CDNnHrhqsqNo_IsUb3I9S7g9exYPSU2b8OW8sxU-PKdHPsGRIiK3jh7AYvKQi7BRCapIW8sfTNIVGrSQBtetnP0bnbOMMMYGtyutug_vecrxFqI972SInb4A9Izz5H_xi3jaViydgE-IO245AogdkyP2wCNIWe5nEkqenZ18BdeilMN8AJzZVono5p1hCDd7c"
              alt="Routing map"
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm relative z-10">
              <span className="material-symbols-outlined text-primary text-[16px]">directions</span>
              <span className="font-label-sm text-label-sm text-on-surface font-medium">
                Auto-routed for food couriers
              </span>
            </div>
          </div>
        </div>

        {/* Safety Pledge */}
        <div
          onClick={() => setPledgeChecked(!pledgeChecked)}
          className="bg-surface-container-high/60 p-space-md rounded-2xl flex items-start gap-3 shadow-sm cursor-pointer select-none border border-surface-container"
        >
          <input
            type="checkbox"
            checked={pledgeChecked}
            onChange={(e) => setPledgeChecked(e.target.checked)}
            className="mt-1 w-5 h-5 rounded accent-primary-container cursor-pointer"
          />
          <div className="font-body-sm text-body-sm text-on-surface-variant">
            <strong className="text-on-surface font-semibold block font-title-md text-title-md mb-0.5">
              Food Safety &amp; Quality Pledge
            </strong>
            I confirm this food has been handled, prepared, and stored in compliance with local hygiene and temperature safety regulations.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-space-sm pt-2">
          <button
            type="button"
            onClick={handlePublish}
            disabled={isPublishing}
            className="w-full h-13 py-3.5 rounded-xl bg-primary-container text-on-primary-container font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 shadow-md hover:bg-primary active:scale-[0.98] transition-all"
          >
            {isPublishing ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[20px]">refresh</span>
                <span>Broadcasting to Community...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[22px]">publish</span>
                <span>Publish Donation</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              onShowToast('Draft saved to your pending listings.');
              setScreen('dashboard');
            }}
            className="w-full h-12 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-2 hover:bg-surface-container-high active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">bookmark</span>
            <span>Save as Draft</span>
          </button>
        </div>
      </form>
    </div>
  );
};
