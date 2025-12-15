export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  STAFF = 'STAFF'
}

export interface UserCoupon {
  id: string;
  code: string;
  name: string;
  discountPercent: number;
  used: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  completedOrders: number;
  coupons?: UserCoupon[];
}

export enum ServingStyle {
  SIMPLE = 'Simple',
  GRAND = 'Grand',
  DELUXE = 'Deluxe'
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  image: string;
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
}

export interface InventoryItem {
  ingredientId: string;
  quantity: number;
}

export interface MenuOption {
    id: string;
    name: string;
    price: number;
}

// New: Detailed Customization Structure
export interface ItemCustomization {
    category: string; // e.g., 'Steak'
    count: number;
    selections: string[]; // e.g., ['Medium', 'Rare']
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  style: ServingStyle; 
  notes?: string;
  
  // Detailed options
  customizations?: ItemCustomization[]; // For display in Cart/Orders
  ingredientsPerSet?: { id: string; qty: number }[]; // For inventory deduction
  extraPricePerSet?: number; // Calculated extra cost
  
  // Legacy support fields (optional)
  options?: MenuOption[];       
  removedIngredients?: string[];
}

export interface DeliveryInfo {
  cardNumber: string;
  location: string;
  time: string;
}

export enum OrderStatus {
  CREATED = 'CREATED',
  PREPARING = 'PREPARING',
  COOKING = 'COOKING',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED'
}

export interface StatusHistory {
    status: OrderStatus;
    timestamp: string;
}

export interface Order {
  id: string;
  userId: string;
  userName: string;
  items: CartItem[];
  total: number;
  discountAmount?: number;
  finalTotal?: number;
  status: OrderStatus;
  statusHistory: StatusHistory[];
  createdAt: string;
  deliveryInfo: DeliveryInfo;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  description: string;
}

export enum IntentType {
  ADD_TO_CART = 'ADD_TO_CART',
  NAVIGATE = 'NAVIGATE',
  CHECKout = 'CHECKOUT',
  UNKNOWN = 'UNKNOWN'
}

export interface VoiceIntent {
  type: IntentType;
  target?: string;
  quantity?: number;
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    type?: 'text' | 'recommendation_card';
    menuId?: string;
}