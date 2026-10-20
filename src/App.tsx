import { useState } from 'react';
import { ScreenType, UserRole, FoodListing, IncomingRequest, ActiveDispatch, FlaggedReport, NGOVerification, RecentRescue } from './types';
import { INITIAL_LISTINGS, INITIAL_INCOMING_REQUESTS, INITIAL_ACTIVE_DISPATCHES, INITIAL_FLAGGED_REPORTS, INITIAL_NGO_VERIFICATIONS, RECENT_RESCUES } from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/screens/HomeScreen';
import { BrowseScreen } from './components/screens/BrowseScreen';
import { ListingDetailsScreen } from './components/screens/ListingDetailsScreen';
import { DonateScreen } from './components/screens/DonateScreen';
import { DashboardScreen } from './components/screens/DashboardScreen';
import { ActivityScreen } from './components/screens/ActivityScreen';
import { AdminScreen } from './components/screens/AdminScreen';
import { AuthScreen } from './components/screens/AuthScreen';
import { MapModal } from './components/modals/MapModal';
import { AlertModal } from './components/modals/AlertModal';
import { MessageModal } from './components/modals/MessageModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [userRole, setUserRole] = useState<UserRole>('donor');
  const [listings, setListings] = useState<FoodListing[]>(INITIAL_LISTINGS);
  const [selectedListing, setSelectedListing] = useState<FoodListing>(INITIAL_LISTINGS[0]);
  const [incomingRequests, setIncomingRequests] = useState<IncomingRequest[]>(INITIAL_INCOMING_REQUESTS);
  const [dispatches, setDispatches] = useState<ActiveDispatch[]>(INITIAL_ACTIVE_DISPATCHES);
  const [flaggedReports, setFlaggedReports] = useState<FlaggedReport[]>(INITIAL_FLAGGED_REPORTS);
  const [ngoVerifications, setNgoVerifications] = useState<NGOVerification[]>(INITIAL_NGO_VERIFICATIONS);
  const [recentRescues, setRecentRescues] = useState<RecentRescue[]>(RECENT_RESCUES);

  // Modals
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  // Notification Toast
  const [toast, setToast] = useState<{ message: string; icon?: string; id: number } | null>(null);

  const showToast = (message: string, icon = 'check_circle') => {
    const id = Date.now();
    setToast({ message, icon, id });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3200);
  };

  const handleSelectListing = (listing: FoodListing) => {
    setSelectedListing(listing);
    setCurrentScreen('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClaimEntire = (listing: FoodListing) => {
    setListings((prev) =>
      prev.map((l) => (l.id === listing.id ? { ...l, remainingQuantity: 0, statusBadge: 'Claimed' } : l))
    );
    // Add to dispatches
    const newDisp: ActiveDispatch = {
      id: `disp-${Date.now()}`,
      title: listing.title,
      category: listing.category.toUpperCase(),
      categoryBg: 'bg-primary-fixed',
      categoryColor: 'text-on-primary-fixed',
      donorName: listing.donorName,
      donorDistance: listing.distance,
      pickupWindow: listing.pickupWindow,
      driver: 'David S. (Van #2)',
      address: listing.pickupAddress,
      eta: 'ETA 12m',
      imageUrl: listing.imageUrl,
      status: 'ready'
    };
    setDispatches((prev) => [newDisp, ...prev]);
    showToast(`🎉 Entire batch (${listing.remainingQuantity} portions) reserved! Added to active dispatch.`);
  };

  const handleClaimPartial = (listing: FoodListing, quantity: number) => {
    setListings((prev) =>
      prev.map((l) =>
        l.id === listing.id
          ? { ...l, remainingQuantity: Math.max(0, l.remainingQuantity - quantity) }
          : l
      )
    );
    showToast(`✅ Reserved ${quantity} meals from ${listing.donorName}! Collection pass generated.`);
  };

  const handlePublishListing = (newListing: FoodListing) => {
    setListings((prev) => [newListing, ...prev]);
  };

  const handleAcceptRequest = (reqId: string, recipientName: string) => {
    setIncomingRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'accepted' } : r))
    );
    showToast(`Confirmed! Dispatch notified for ${recipientName}`);
  };

  const handleDeclineRequest = (reqId: string) => {
    setIncomingRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'declined' } : r))
    );
    showToast('Donation request declined', 'info');
  };

  const handleDismissReport = (id: string) => {
    setFlaggedReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'dismissed' } : r))
    );
    showToast('Report marked as reviewed and resolved.', 'done_all');
  };

  const handleRemoveListing = (id: string) => {
    setFlaggedReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'removed' } : r))
    );
    showToast('Listing deactivated & removed from public feed.', 'delete_forever');
  };

  const handleApproveNGO = (id: string, name: string) => {
    setNgoVerifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: 'approved' } : n))
    );
    showToast(`${name} accredited successfully!`, 'verified');
  };

  const handleRequestNGOInfo = (id: string) => {
    setNgoVerifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: 'info_requested' } : n))
    );
    showToast('Clarification request dispatched for documentation.', 'send');
  };

  return (
    <div className="bg-background min-h-screen flex flex-col font-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Fixed Header */}
      <Header
        currentScreen={currentScreen}
        setScreen={setCurrentScreen}
        userRole={userRole}
        setUserRole={setUserRole}
        showBack={currentScreen === 'details' || currentScreen === 'auth' || currentScreen === 'admin'}
        onBack={() => {
          if (currentScreen === 'details') setCurrentScreen('browse');
          else if (currentScreen === 'admin' || currentScreen === 'auth') setCurrentScreen('home');
          else setCurrentScreen('home');
        }}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 flex flex-col relative w-full pt-16 px-gutter-mobile max-w-md mx-auto">
        {currentScreen === 'home' && (
          <HomeScreen
            setScreen={setCurrentScreen}
            onSelectListing={handleSelectListing}
            listings={listings}
            onClaim={(id) => {
              const item = listings.find((l) => l.id === id) || listings[0];
              handleSelectListing(item);
            }}
          />
        )}

        {currentScreen === 'browse' && (
          <BrowseScreen
            listings={listings}
            onSelectListing={handleSelectListing}
            onRequestFood={handleClaimEntire}
            onOpenMap={() => setIsMapModalOpen(true)}
            onOpenAlertModal={() => setIsAlertModalOpen(true)}
          />
        )}

        {currentScreen === 'details' && (
          <ListingDetailsScreen
            listing={selectedListing}
            onBack={() => setCurrentScreen('browse')}
            onRequestEntire={handleClaimEntire}
            onRequestPartial={handleClaimPartial}
            onOpenMessage={() => setIsMessageModalOpen(true)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'donate' && (
          <DonateScreen
            onPublish={handlePublishListing}
            setScreen={setCurrentScreen}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'dashboard' && (
          <DashboardScreen
            setScreen={setCurrentScreen}
            incomingRequests={incomingRequests}
            onAcceptRequest={handleAcceptRequest}
            onDeclineRequest={handleDeclineRequest}
            userRole={userRole}
            setUserRole={setUserRole}
          />
        )}

        {currentScreen === 'activity' && (
          <ActivityScreen
            dispatches={dispatches}
            recentRescues={recentRescues}
            setScreen={setCurrentScreen}
            onOpenMap={() => setIsMapModalOpen(true)}
            onQuickRequest={(item) => handleSelectListing(item)}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'admin' && (
          <AdminScreen
            flaggedReports={flaggedReports}
            ngoVerifications={ngoVerifications}
            onDismissReport={handleDismissReport}
            onRemoveListing={handleRemoveListing}
            onApproveNGO={handleApproveNGO}
            onRequestNGOInfo={handleRequestNGOInfo}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'auth' && (
          <AuthScreen
            setScreen={setCurrentScreen}
            setUserRole={setUserRole}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation (visible unless on details or auth modal view) */}
      {currentScreen !== 'details' && (
        <BottomNav currentScreen={currentScreen} setScreen={setCurrentScreen} />
      )}

      {/* Modals */}
      <MapModal
        isOpen={isMapModalOpen}
        onClose={() => setIsMapModalOpen(false)}
        listings={listings}
        onSelectListing={handleSelectListing}
      />

      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onCreated={(msg) => showToast(msg, 'notifications_active')}
      />

      <MessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        donorName={selectedListing.donorName}
        contactName={selectedListing.donorContactName || 'Maria Rodriguez'}
      />

      {/* Global Interactive Toast Notification */}
      {toast && (
        <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-2xl shadow-2xl flex items-center justify-between gap-3 transform animate-in slide-in-from-bottom duration-200 z-50 border border-inverse-on-surface/10">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              className="material-symbols-outlined text-inverse-primary text-[22px] shrink-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {toast.icon || 'check_circle'}
            </span>
            <span className="font-body-sm text-body-sm font-medium truncate">
              {toast.message}
            </span>
          </div>
          <button
            onClick={() => setToast(null)}
            className="text-inverse-on-surface/80 hover:text-inverse-on-surface p-1"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      )}
    </div>
  );
}
