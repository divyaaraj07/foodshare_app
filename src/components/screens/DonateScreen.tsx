import React, { useState } from 'react';
import { FoodListing, ScreenType } from '../../types';
import { TAMIL_NADU_DISTRICTS } from '../../data/mockData';

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
  const [title, setTitle] = useState('Hot Sambar Rice, Lemon Rice & Poriyal (Wedding Lunch Surplus)');
  const [tamilTitle, setTamilTitle] = useState('சுடச்சுட சாம்பார் சாதம், எலுமிச்சை சாதம் & பொரியல்');
  const [category, setCategory] = useState<'Prepared' | 'Produce' | 'Bakery' | 'Dairy' | 'Canned/Dry'>('Prepared');
  const [district, setDistrict] = useState('Chennai');
  const [quantity, setQuantity] = useState<number>(60);
  const [unit, setUnit] = useState('Boxed Meal Packets');
  const [description, setDescription] = useState(
    'Freshly cooked hot South Indian lunch from our marriage reception catering in Mylapore. Hygienically packed in silver foil boxes with drumstick sambar, kootu, and lemon rice.'
  );
  const [tags, setTags] = useState<string[]>(['Pure Veg', 'Freshly Cooked', 'FSSAI Certified', 'Hot Insulated Containers']);
  const [expiryTime, setExpiryTime] = useState('5:00 PM');
  const [fssaiLicense, setFssaiLicense] = useState('12421008000412');
  const [pickupAddress, setPickupAddress] = useState('No. 24, North Mada Street, Mylapore, Chennai - 600004');
  const [pickupNotes, setPickupNotes] = useState('Rear service entrance on Pitchu Pillai St. Tata Ace or volunteer auto parking available.');
  const [pledgeChecked, setPledgeChecked] = useState(true);
  const [isPublishing, setIsPublishing] = useState(false);

  const availableCategories: Array<{
    id: 'Prepared' | 'Produce' | 'Bakery' | 'Dairy' | 'Canned/Dry';
    label: string;
    emoji: string;
  }> = [
    { id: 'Prepared', label: 'Kalyanam Meals', emoji: '🍲' },
    { id: 'Produce', label: 'Agro Produce', emoji: '🥬' },
    { id: 'Bakery', label: 'Tiffin & Sweets', emoji: '☕' },
    { id: 'Dairy', label: 'Aavin Dairy', emoji: '🥛' },
    { id: 'Canned/Dry', label: 'Provisions', emoji: '🥫' }
  ];

  const tagOptions = [
    'Pure Veg',
    'Freshly Cooked',
    'FSSAI Certified',
    'Hot Insulated Containers',
    'Refrigerated',
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
      onShowToast('✨ AI Food Inspector: Verified South Indian Rice & Sambar batch. Temperature tag active.');
    }
  };

  const handlePublish = () => {
    if (!pledgeChecked) {
      onShowToast('Please agree to the FSSAI Food Safety & Quality Pledge');
      return;
    }

    setIsPublishing(true);
    setTimeout(() => {
      const newListing: FoodListing = {
        id: `listing-${Date.now()}`,
        title,
        tamilTitle,
        category,
        categoryLabel: category === 'Prepared' ? 'Kalyanam Meals' : category === 'Produce' ? 'Agro Produce' : category,
        categoryBg: category === 'Bakery' ? 'bg-tertiary-fixed' : category === 'Produce' ? 'bg-primary-fixed' : 'bg-secondary-container',
        categoryText: category === 'Bakery' ? 'text-on-tertiary-fixed' : category === 'Produce' ? 'text-on-primary-fixed' : 'text-on-secondary-fixed',
        imageUrl: photoUrl || 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX-j91gIXg04ryv9jHoG9Yn_YiqBhRczuIxVPdlkTFj_biPlVjsoiIr5U2T6OMVE7o6Ry7hWLprHADbLMwFAYoOUpyF-3c4qhIDkF1AHLmEPpRj7I8nsetPf39A6sUFICS7ctxGzAZRCvM-5I8d9092vjmsa_N0D8vdAEfceDAwUG_EPmHUEA0fUB6wxsc0zZiPQhj8xbgOyWtgSYovgxvmxilCpHVXMhRxRIuVFT57_3Xj6uzUdc',
        imageAlt: title,
        donorName: 'Sri Meenakshi Bhavan & Catering',
        donorRating: 4.95,
        donorRescuesCount: 143,
        donorLocation: `${district} (0.8 km)`,
        city: district,
        district,
        pincode: '600004',
        distance: '0.8 km',
        verified: true,
        donorContactName: 'K. Senthil Kumar (Chef)',
        donorPhone: '+91 98401 24892',
        quantityString: `${quantity} ${unit} • Feeds ~${quantity} people`,
        portions: quantity,
        remainingQuantity: quantity,
        weightKg: Math.round(quantity * 0.4),
        pickupWindow: `Today until ${expiryTime}`,
        urgentText: 'Urgent: Pick up before 5:00 PM',
        statusBadge: 'Freshly Prepared',
        statusType: 'available',
        hoursLeft: 2.5,
        isUrgent: true,
        tags,
        description,
        allergenNotice: tags.includes('Pure Veg') ? '100% Pure Vegetarian. Contains coconut and dal.' : undefined,
        pickupAddress,
        pickupInstructions: pickupNotes,
        fssaiNumber: `FSSAI Lic. #${fssaiLicense}`
      };

      onPublish(newListing);
      setIsPublishing(false);
      onShowToast('🎉 Donation broadcasted to No Food Waste, Robin Hood Army & Tamil Nadu food bank dispatchers!');
      setScreen('dashboard');
    }, 1100);
  };

  return (
    <div className="flex flex-col w-full pb-28">
      {/* Step Header */}
      <div className="flex items-center justify-between mb-space-sm pt-space-xs">
        <div className="flex flex-col">
          <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface font-bold">
            Create Food Listing • உணவு பதிவு
          </span>
          <span className="font-label-md text-label-md text-primary font-bold flex items-center gap-1.5 mt-0.5">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Tamil Nadu Rescue Dispatch Form
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
        <div className="h-full bg-primary-container rounded-full w-2/3 transition-all duration-500"></div>
      </div>

      {/* Form */}
      <form className="flex flex-col gap-space-lg" onSubmit={(e) => e.preventDefault()}>
        {/* District Selector */}
        <div>
          <label className="block font-title-md text-on-surface font-bold mb-1">
            Tamil Nadu District / City <span className="text-tertiary">*</span>
          </label>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
              location_city
            </span>
            <select
              aria-label="District"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full h-12 pl-11 pr-8 rounded-xl bg-surface-container-lowest text-on-surface font-body-md outline-none border border-surface-container appearance-none font-semibold"
            >
              {TAMIL_NADU_DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
            <span className="material-symbols-outlined absolute right-3 pointer-events-none text-on-surface-variant">
              expand_more
            </span>
          </div>
        </div>

        {/* Food Photo Dropzone */}
        <div className="flex flex-col gap-space-xs">
          <label className="font-title-md text-title-md text-on-surface font-bold flex items-center justify-between">
            <span>
              Food Photo <span className="text-tertiary">*</span>
            </span>
            <span className="font-label-sm text-label-sm text-primary font-bold">FSSAI Inspection Ready</span>
          </label>

          <div
            className="relative group cursor-pointer overflow-hidden rounded-2xl bg-surface-container-low hover:bg-surface-container transition-all duration-300 p-space-lg flex flex-col items-center justify-center text-center shadow-sm border-2 border-dashed border-surface-container-high"
          >
            {photoUrl ? (
              <div className="relative w-full h-44 rounded-xl overflow-hidden">
                <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-inverse-surface/40 flex items-center justify-center text-on-primary font-label-md font-bold">
                  Tap to take another photo
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-surface-container-highest flex items-center justify-center text-primary mb-space-sm group-hover:scale-105 transition-transform duration-200">
                  <span className="material-symbols-outlined text-[32px]">photo_camera</span>
                </div>
                <p className="font-title-md text-title-md text-on-surface font-bold">Take photo of surplus food batch</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 max-w-[260px]">
                  Required for NGO safety review &amp; thermal condition check
                </p>
                <div className="mt-space-md flex items-center gap-space-xs bg-surface-container-highest/80 px-space-md py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">auto_awesome</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
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

        {/* Titles */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="font-title-md text-title-md text-on-surface font-bold block mb-1">
              Food Item Title (English) <span className="text-tertiary">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
                restaurant
              </span>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Hot Sambar Rice, Lemon Rice & Poriyal"
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none border border-surface-container font-medium"
              />
            </div>
          </div>

          <div>
            <label className="font-title-md text-title-md text-on-surface font-bold block mb-1">
              Tamil Name (தமிழ் பெயர் - விருப்பத்திற்குரியது)
            </label>
            <input
              type="text"
              value={tamilTitle}
              onChange={(e) => setTamilTitle(e.target.value)}
              placeholder="எ.கா., சுடச்சுட சாம்பார் சாதம் & பொரியல்"
              className="w-full h-12 px-4 rounded-xl bg-surface-container-lowest text-on-surface font-body-md shadow-sm outline-none border border-surface-container"
            />
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-title-md text-title-md text-on-surface font-bold">
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
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-md text-label-md active:scale-95 transition-all font-bold ${
                    isSelected
                      ? 'bg-primary-container text-on-primary-container shadow-sm'
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
            <span className="font-title-md text-title-md text-on-surface font-bold">Quantity &amp; Servings</span>
            <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
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
                min="5"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full h-12 pl-11 pr-3 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none border border-surface-container font-bold"
              />
            </div>
            <div className="relative flex items-center">
              <select
                aria-label="Quantity Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full h-12 px-3.5 pr-8 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm appearance-none outline-none border border-surface-container font-semibold"
              >
                <option value="Boxed Meal Packets">Packets (Meal Boxes)</option>
                <option value="Kilograms (kg)">Kilograms (kg)</option>
                <option value="Insulated Degs / Trays">Large Degs / Trays</option>
                <option value="Individual Portions">Individual Portions</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 pointer-events-none text-on-surface-variant text-[20px]">
                expand_more
              </span>
            </div>
          </div>
        </div>

        {/* Description & Preparation Notes */}
        <div className="flex flex-col gap-space-xs">
          <label className="font-title-md text-title-md text-on-surface font-bold" htmlFor="food-desc">
            Preparation &amp; Packaging Notes
          </label>
          <textarea
            id="food-desc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe items, cooking time, thermal container details..."
            className="w-full p-3.5 rounded-xl bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none resize-none border border-surface-container font-medium"
          />
        </div>

        {/* Dietary & Storage Tags */}
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center justify-between">
            <span className="font-title-md text-title-md text-on-surface font-bold">Food Safety &amp; Dietary Tags</span>
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
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-label-md text-label-md shadow-sm active:scale-95 transition-all font-bold ${
                    active
                      ? 'bg-primary-container text-on-primary-container'
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

        {/* Pickup Window */}
        <div className="bg-surface-container-low p-space-md rounded-2xl flex flex-col gap-space-sm shadow-sm border border-surface-container">
          <div className="flex items-center justify-between">
            <span className="font-title-md text-title-md text-on-surface font-bold">Pickup By &amp; Expiry Window</span>
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
                value="Today, Tamil Nadu"
                className="w-full h-12 pl-10 pr-2 rounded-xl bg-surface-container-lowest text-on-surface font-body-md shadow-sm outline-none border border-surface-container font-semibold"
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
                className="w-full h-12 pl-10 pr-2 rounded-xl bg-surface-container-lowest text-on-surface font-body-md shadow-sm outline-none border border-surface-container font-bold"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed shadow-sm">
            <span className="material-symbols-outlined text-[20px] text-tertiary-container animate-pulse">
              timer
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm font-bold text-tertiary-container">
                Hot Food Safety Window: Must be picked up before {expiryTime}
              </span>
              <span className="font-body-sm text-body-sm leading-tight text-on-tertiary-fixed">
                Direct dispatch alert pinged to registered NGOs with thermal transport.
              </span>
            </div>
          </div>
        </div>

        {/* Pickup Location & FSSAI */}
        <div className="flex flex-col gap-space-sm">
          <span className="font-title-md text-title-md text-on-surface font-bold">Location &amp; Vehicle Access</span>
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
              pin_drop
            </span>
            <input
              type="text"
              value={pickupAddress}
              onChange={(e) => setPickupAddress(e.target.value)}
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-lowest text-on-surface font-body-md shadow-sm outline-none border border-surface-container font-medium"
            />
          </div>

          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-3.5 text-on-surface-variant text-[20px]">
              local_shipping
            </span>
            <input
              type="text"
              value={pickupNotes}
              onChange={(e) => setPickupNotes(e.target.value)}
              placeholder="e.g. Rear service entrance, van parking available"
              className="w-full h-12 pl-11 pr-4 rounded-xl bg-surface-container-lowest text-on-surface font-body-md shadow-sm outline-none border border-surface-container font-medium"
            />
          </div>

          <div>
            <label className="font-label-sm text-on-surface-variant font-semibold block mb-1">
              FSSAI License Number
            </label>
            <input
              type="text"
              value={fssaiLicense}
              onChange={(e) => setFssaiLicense(e.target.value)}
              className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-mono text-body-sm outline-none border border-surface-container font-bold"
            />
          </div>
        </div>

        {/* FSSAI Safety Pledge */}
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
            <strong className="text-on-surface font-bold block font-title-md text-title-md mb-0.5">
              FSSAI Surplus Food Recovery Pledge
            </strong>
            I confirm this food was cooked in a licensed kitchen, maintained above 65°C / under 5°C, and is packed in food-grade containers in compliance with FSSAI regulations.
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
                <span>Broadcasting to TN Rescue Network...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[22px]">publish</span>
                <span>Publish Listing • நேரலையில் பதிவுசெய்</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              onShowToast('Draft saved in local pending queue.');
              setScreen('dashboard');
            }}
            className="w-full h-12 py-2.5 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md font-bold flex items-center justify-center gap-2 hover:bg-surface-container-high active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[20px] text-on-surface-variant">bookmark</span>
            <span>Save as Draft</span>
          </button>
        </div>
      </form>
    </div>
  );
};
