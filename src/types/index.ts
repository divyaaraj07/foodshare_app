export type ScreenType = 
  | 'home' 
  | 'browse' 
  | 'details' 
  | 'donate' 
  | 'dashboard' 
  | 'activity' 
  | 'login'
  | 'new-user-login'
  | 'register'
  | 'otp-verify'
  | 'admin';

export type UserRole = 'donor' | 'recipient' | 'admin';

export interface FoodListing {
  id: string;
  title: string;
  tamilTitle?: string;
  category: 'Bakery' | 'Produce' | 'Prepared' | 'Dairy' | 'Canned/Dry';
  categoryLabel: string;
  categoryBg: string;
  categoryText: string;
  imageUrl: string;
  imageAlt: string;
  donorName: string;
  donorRating: number;
  donorRescuesCount: number;
  donorLocation: string;
  city: string;
  district: string;
  pincode: string;
  distance: string;
  verified: boolean;
  donorAvatar?: string;
  donorContactName?: string;
  donorPhone?: string;
  quantityString: string;
  portions: number;
  weightKg?: number;
  pickupWindow: string;
  urgentText?: string;
  statusBadge: string;
  statusType: 'available' | 'verified' | 'refrigerated';
  hoursLeft: number;
  tags: string[];
  description: string;
  allergenNotice?: string;
  pickupAddress: string;
  pickupInstructions: string;
  fssaiNumber: string;
  isUrgent?: boolean;
  claimedBy?: string;
  remainingQuantity: number;
}

export interface IncomingRequest {
  id: string;
  listingId: string;
  recipientName: string;
  requestedItem: string;
  imageUrl: string;
  timeAgo: string;
  pickupTime: string;
  volunteer?: string;
  transportType: string;
  vehicleNumber?: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface ActiveListingItem {
  id: string;
  title: string;
  subtitle: string;
  availableCount: string;
  statusText: string;
  expiresText: string;
  requestsCount: number;
  isReady: boolean;
}

export interface ActiveDispatch {
  id: string;
  title: string;
  category: string;
  categoryBg: string;
  categoryColor: string;
  donorName: string;
  donorDistance: string;
  pickupWindow: string;
  driver: string;
  vehicleNumber: string;
  address: string;
  eta: string;
  imageUrl: string;
  status: 'ready' | 'picked_up' | 'pending';
}

export interface FlaggedReport {
  id: string;
  ticketId: string;
  title: string;
  riskType: string;
  timeAgo: string;
  imageUrl: string;
  batchCode: string;
  reportedBy: string;
  donorName: string;
  fssaiId: string;
  detail: string;
  status: 'open' | 'dismissed' | 'removed';
}

export interface NGOVerification {
  id: string;
  name: string;
  location: string;
  registeredAgo: string;
  taxStatus: string;
  darpanId: string;
  fssaiReg: string;
  storageCapacity: string;
  documentName: string;
  documentSize: string;
  status: 'awaiting' | 'approved' | 'info_requested';
}

export interface RecentRescue {
  id: string;
  title: string;
  donor: string;
  location: string;
  date: string;
  type: 'produce' | 'prepared' | 'dairy';
  completed: boolean;
}
