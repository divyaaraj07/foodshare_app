import React, { useState } from 'react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (msg: string) => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, onCreated }) => {
  const [categories, setCategories] = useState<string[]>(['Bakery', 'Fresh Produce']);
  const [distance, setDistance] = useState<number>(3);
  const [urgentOnly, setUrgentOnly] = useState<boolean>(true);

  if (!isOpen) return null;

  const toggleCategory = (cat: string) => {
    if (categories.includes(cat)) {
      setCategories(categories.filter(c => c !== cat));
    } else {
      setCategories([...categories, cat]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreated(`Alert active! We will notify you when ${categories.join(', ')} surplus becomes available within ${distance} miles.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl p-5 flex flex-col gap-4">
        <div className="flex items-center justify-between pb-2 border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">notifications_active</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Create Food Rescue Alert</h3>
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
            <label className="block font-title-md text-title-md text-on-surface mb-1.5">Categories to monitor</label>
            <div className="flex flex-wrap gap-2">
              {['Bakery', 'Fresh Produce', 'Cooked Meals', 'Dairy', 'Pantry'].map(cat => {
                const selected = categories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`px-3 py-1.5 rounded-full font-label-md text-label-md transition-all active:scale-95 ${
                      selected
                        ? 'bg-primary-container text-on-primary-container font-semibold shadow-xs'
                        : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                    }`}
                  >
                    {selected ? '✓ ' : '+ '}{cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-title-md text-title-md text-on-surface">Maximum Radius</label>
              <span className="font-label-md text-primary font-bold">&lt; {distance} miles</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full accent-primary"
            />
          </div>

          <label className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container-low cursor-pointer">
            <input
              type="checkbox"
              checked={urgentOnly}
              onChange={(e) => setUrgentOnly(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-primary focus:ring-0 accent-primary"
            />
            <div className="flex flex-col">
              <span className="font-label-md text-label-md font-semibold text-on-surface">Prioritize Urgent Expiries (&lt; 3 hours)</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Instant push notification so food is rescued before going to waste</span>
            </div>
          </label>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 rounded-xl bg-surface-container text-on-surface font-label-md hover:bg-surface-container-high"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 rounded-xl bg-primary text-on-primary font-label-md font-semibold hover:bg-primary-container shadow-sm active:scale-95 transition-transform"
            >
              Save Custom Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
