import React, { useState } from 'react';
import { FoodListing } from '../../types';

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  listings: FoodListing[];
  onSelectListing: (listing: FoodListing) => void;
}

export const MapModal: React.FC<MapModalProps> = ({
  isOpen,
  onClose,
  listings,
  onSelectListing
}) => {
  const [selectedPin, setSelectedPin] = useState<FoodListing | null>(listings[0] || null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-sm flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-surface-container-lowest rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 bg-surface-container-low flex items-center justify-between border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[24px]">map</span>
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface leading-tight">Hyperlocal Rescue Map</h3>
              <p className="font-body-sm text-on-surface-variant">4 active community batches in Mission District</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Interactive Map Visual */}
        <div className="relative w-full h-80 bg-surface-container overflow-hidden select-none">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxgen5qsM8N_FrKhP9se5DKOmHg6wmLEE6GUwxg2m2y_Lh78Kn11CDNnHrhqsqNo_IsUb3I9S7g9exYPSU2b8OW8sxU-PKdHPsGRIiK3jh7AYvKQi7BRCapIW8sfTNIVGrSQBtetnP0bnbOMMMYGtyutug_vecrxFqI972SInb4A9Izz5H_xi3jaViydgE-IO245AogdkyP2wCNIWe5nEkqenZ18BdeilMN8AJzZVono5p1hCDd7c"
            alt="San Francisco Map"
            className="w-full h-full object-cover"
          />

          {/* Interactive Pins */}
          {listings.map((item, index) => {
            const positions = [
              { top: '48%', left: '46%' },
              { top: '30%', left: '38%' },
              { top: '65%', left: '55%' },
              { top: '35%', left: '68%' },
            ];
            const pos = positions[index % positions.length];
            const isSelected = selectedPin?.id === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedPin(item)}
                style={{ top: pos.top, left: pos.left }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg transition-all duration-200 active:scale-90 ${
                  isSelected
                    ? 'bg-primary text-on-primary ring-4 ring-primary-fixed scale-110 z-30'
                    : 'bg-surface-container-lowest text-on-surface hover:scale-105 z-20'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {item.category === 'Bakery' ? 'bakery_dining' : item.category === 'Produce' ? 'eco' : 'lunch_dining'}
                </span>
                <span className="font-label-sm font-semibold truncate max-w-[90px]">{item.donorName.split(' ')[0]}</span>
                {item.isUrgent && (
                  <span className="w-2 h-2 rounded-full bg-error animate-ping"></span>
                )}
              </button>
            );
          })}

          {/* User Location Pulse */}
          <div className="absolute top-[52%] left-[42%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex items-center justify-center">
            <span className="w-8 h-8 rounded-full bg-primary/20 animate-ping absolute"></span>
            <span className="w-4 h-4 rounded-full bg-primary border-2 border-white shadow-md"></span>
          </div>

          <div className="absolute bottom-3 left-3 bg-surface/90 backdrop-blur-md px-2.5 py-1 rounded-lg text-label-sm text-on-surface shadow-sm">
            📍 Your location: Mission District
          </div>
        </div>

        {/* Selected Item Preview Card */}
        {selectedPin && (
          <div className="p-4 bg-surface-container-lowest flex flex-col gap-3">
            <div className="flex items-start gap-3">
              <img
                src={selectedPin.imageUrl}
                alt={selectedPin.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0 shadow-sm"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm font-bold text-[10px]">
                    {selectedPin.categoryLabel}
                  </span>
                  <span className="font-label-sm text-on-surface-variant">{selectedPin.distance} away</span>
                </div>
                <h4 className="font-title-md text-title-md text-on-surface font-bold truncate">
                  {selectedPin.title}
                </h4>
                <p className="font-body-sm text-on-surface-variant truncate">
                  {selectedPin.donorName} • {selectedPin.pickupWindow}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  onSelectListing(selectedPin);
                  onClose();
                }}
                className="flex-1 py-2.5 rounded-xl bg-primary text-on-primary font-label-md font-semibold text-center hover:bg-primary-container active:scale-95 transition-all shadow-sm"
              >
                View Batch Details &amp; Request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
