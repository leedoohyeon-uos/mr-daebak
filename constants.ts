import { MenuItem, InventoryItem, User, UserRole, ServingStyle, MenuOption, Ingredient } from './types';

// 1. Main Menu Definitions
export const MOCK_MENU: MenuItem[] = [
  {
    id: 'm1',
    name: 'Valentine Dinner',
    description: '작은 하트 모양과 큐피드가 장식된 접시에 냅킨과 함께 와인, 스테이크가 제공됩니다.',
    price: 45.00,
    category: 'Dinner Set',
    tags: ['Romantic', 'Steak', 'Wine', 'Cupid'],
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm2',
    name: 'French Dinner',
    description: '커피 한잔, 와인 한잔, 샐러드, 스테이크가 포함된 코스입니다.',
    price: 38.00,
    category: 'Dinner Set',
    tags: ['Classic', 'Full Course', 'Salad', 'Coffee'],
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm3',
    name: 'English Dinner',
    description: '에그 스크램블, 베이컨, 빵, 스테이크가 포함된 든든한 식사입니다.',
    price: 32.00,
    category: 'Dinner Set',
    tags: ['Hearty', 'Breakfast-style', 'Bacon', 'Eggs'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'm4',
    name: 'Champagne Festival Dinner',
    description: '2인 기준 고정. 샴페인 1병, 바게트 4개, 커피 1포트, 와인, 스테이크가 제공됩니다.',
    price: 85.00,
    category: 'Special Set',
    tags: ['Party', 'For Two', 'Luxury', 'Champagne'],
    image: 'https://images.unsplash.com/photo-1585511397022-7776bdd951a3?auto=format&fit=crop&w=800&q=80'
  }
];

// 2. Ingredients Definition
export const INGREDIENTS: Ingredient[] = [
    { id: 'i_steak', name: '스테이크 (Steak)', unit: '개' },
    { id: 'i_wine', name: '와인 (Wine)', unit: '잔' }, 
    { id: 'i_coffee', name: '커피 (Coffee)', unit: '잔/포트' },
    { id: 'i_salad', name: '샐러드 (Salad)', unit: '개' },
    { id: 'i_bacon', name: '베이컨 (Bacon)', unit: '개' },
    { id: 'i_egg', name: '에그 스크램블 (Eggs)', unit: '개' },
    { id: 'i_bread', name: '빵 (Bread)', unit: '개' },
    { id: 'i_baguette', name: '바게트 (Baguette)', unit: '개' },
    { id: 'i_champagne', name: '샴페인 (Champagne)', unit: '병' },
    { id: 'i_napkin', name: '냅킨 (Napkin)', unit: '장' },
];

export const INGREDIENT_PRICES: Record<string, number> = {
    'i_steak': 15.00,
    'i_wine': 8.00,
    'i_coffee': 4.00,
    'i_salad': 5.00,
    'i_bacon': 2.00,
    'i_egg': 1.50,
    'i_bread': 1.00,
    'i_baguette': 1.50,
    'i_champagne': 30.00,
    'i_napkin': 0.00
};

// 3. Recipes (Default Composition)
export const RECIPES: Record<string, { ingredientId: string; quantity: number }[]> = {
    'm1': [ // Valentine
        { ingredientId: 'i_steak', quantity: 1 },
        { ingredientId: 'i_wine', quantity: 1 }, 
        { ingredientId: 'i_napkin', quantity: 1 }
    ],
    'm2': [ // French
        { ingredientId: 'i_coffee', quantity: 1 },
        { ingredientId: 'i_wine', quantity: 1 },
        { ingredientId: 'i_salad', quantity: 1 },
        { ingredientId: 'i_steak', quantity: 1 }
    ],
    'm3': [ // English
        { ingredientId: 'i_egg', quantity: 1 },
        { ingredientId: 'i_bacon', quantity: 1 },
        { ingredientId: 'i_bread', quantity: 1 },
        { ingredientId: 'i_steak', quantity: 1 }
    ],
    'm4': [ // Champagne (2 ppl)
        { ingredientId: 'i_champagne', quantity: 1 },
        { ingredientId: 'i_baguette', quantity: 4 },
        { ingredientId: 'i_coffee', quantity: 1 }, // pot
        { ingredientId: 'i_wine', quantity: 2 },
        { ingredientId: 'i_steak', quantity: 2 }
    ]
};

// 4. Options Lists
export const WINE_TYPES = ['Cabernet Sauvignon', 'Merlot', 'Pinot Noir', 'Chardonnay', 'Sauvignon Blanc'];
export const DRESSING_TYPES = ['Ranch', 'Caesar', 'Balsamic', 'Italian', 'Thousand Island'];
export const CHAMPAGNE_TYPES = ['Moët & Chandon', 'Dom Pérignon', 'Veuve Clicquot', 'Krug', 'Bollinger'];
export const BREAD_TYPES = ['White Toast', 'Wheat Toast', 'Baguette', 'Croissant', 'Sourdough'];
export const DONENESS_TYPES = ['Rare', 'Medium Rare', 'Medium', 'Medium Well', 'Well Done'];

// 5. Styles
export const STYLE_PRICES = {
  [ServingStyle.SIMPLE]: 0,
  [ServingStyle.GRAND]: 10,
  [ServingStyle.DELUXE]: 20
};

export const STYLE_DESCRIPTIONS = {
  [ServingStyle.SIMPLE]: "플라스틱 접시/컵, 종이 냅킨, 플라스틱 쟁반. (와인 포함 시 플라스틱 잔)",
  [ServingStyle.GRAND]: "도자기 접시/컵, 흰색 면 냅킨, 나무 쟁반. (와인 포함 시 플라스틱 잔)",
  [ServingStyle.DELUXE]: "꽃병 장식, 도자기 접시/컵, 린넨 냅킨, 나무 쟁반. (와인 포함 시 유리 잔)"
};

// Initial Inventory
export const INITIAL_INVENTORY: InventoryItem[] = INGREDIENTS.map(ing => ({
  ingredientId: ing.id,
  quantity: 50
}));

// Mock Users
export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: '홍길동',
    email: 'hong@example.com',
    role: UserRole.CUSTOMER,
    completedOrders: 9
  },
  {
    id: 'u2',
    name: '관리자',
    email: 'admin@daebak.com',
    role: UserRole.STAFF,
    completedOrders: 0
  }
];

export const COUPON_THRESHOLD = 10;
export const LOYALTY_COUPON: import('./types').Coupon = {
  code: 'DAEBAK10',
  discountPercent: 15,
  description: '단골 우대: 15% 할인 쿠폰'
};

// Stub for legacy support if needed
export const EXTRA_OPTIONS: MenuOption[] = [];