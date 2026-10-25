import React, { useState } from 'react';
import { TAMIL_NADU_DISTRICTS } from '../../data/mockData';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (msg: string) => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onCreated }) => {
  const [district, setDistrict] = useState('Chennai');
  const [categories, setCategories] = useState<string[]>(['Kalyanam Meals', 'Agro Produce']);
  const [radiusKm, setRadiusKm] = useState<number>(5);
  const [urgentOnly, setUrgentOnly] = useState<boolean>(true);

  if (!isOpen) return null;

  const toggleCategory = (cat: string) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter((c) => c !== cat));
    } else {
      setCategories([...categories, cat]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreated(`Alert active! Dispatch notifications enabled for ${categories.join(', ')} in ${district} within ${radiusKm} km.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl p-5 flex flex-col gap-4 border border-surface-container">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">notifications_active</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
              Tamil Nadu Rescue Alert
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block font-title-md text-title-md text-on-surface mb-1 font-bold">
              Select District
            </label>
            <select
              aria-label="Select district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-surface-container-low text-on-surface font-body-md outline-none border border-surface-container font-semibold"
            >
              {TAMIL_NADU_DISTRICTS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-title-md text-title-md text-on-surface mb-1.5 font-bold">
              Categories to Monitor
            </label>
            <div className="flex flex-wrap gap-2">
              {['Kalyanam Meals', 'Agro Produce', 'Tiffin & Sweets', 'Aavin Dairy', 'Dry Provisions'].map((cat) => {
                const selected = categories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-all active:scale-95 font-semibold ${
                      selected
                        ? 'bg-primary-container text-on-primary-container font-bold shadow-xs'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {selected ? '✓ ' : '+ '}
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-title-md text-title-md text-on-surface font-bold">Max Radius</label>
              <span className="font-label-md text-primary font-bold">&lt; {radiusKm} km</span>
            </div>
            <input
              type="range"
              min="2"
              max="25"
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <label className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low cursor-pointer border border-surface-container">
            <input
              type="checkbox"
              checked={urgentOnly}
              onChange={(e) => setUrgentOnly(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-primary focus:ring-0 accent-primary"
            />
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-bold text-on-surface">
                Instant WhatsApp &amp; SMS Dispatch Ping
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Alerts volunteer vehicle drivers immediately when wedding or mandi surplus is posted
              </span>
            </div>
          </label>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-surface-container text-on-surface font-label-md font-semibold hover:bg-surface-container-high"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-label-md font-bold hover:bg-primary-container shadow-sm active:scale-95 transition-transform"
            >
              Save Alert • சேமி
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
