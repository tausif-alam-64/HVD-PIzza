// HVD Pizzas Menu Data
// 100% pure vegetarian, authentic descriptions matching exact item ingredients

export type MenuCategory = "pizzas" | "sides" | "shakes"

export interface MenuItem {
  id: string
  category: MenuCategory
  name: string
  description: string
  price: number // in INR
  image: string
  isVeg: boolean
  featured?: boolean
  bestseller?: boolean // [CONFIRM]
  upsell?: boolean // featured in "Add a shake?" drawer strip
  volume?: string // for shakes e.g. "250 ml"
}

export const MENU_ITEMS: MenuItem[] = [
  // ── Pizzas ──────────────────────────────────────────────────────────
  {
    id: "paneer-pizza",
    category: "pizzas",
    name: "Paneer Pizza",
    description: "Generous cubes of fresh spiced paneer over golden baked mozzarella.",
    price: 159,
    image: "/images/paneer-pizza.jpg",
    isVeg: true,
    featured: true, // Featured item on Quick Order card
    bestseller: true
  },
  {
    id: "corn-pizza",
    category: "pizzas",
    name: "Corn Pizza",
    description: "Sweet American golden corn kernels layered on warm melted cheese.",
    price: 139,
    image: "/images/corn-pizza.jpg",
    isVeg: true,
    bestseller: false
  },
  {
    id: "onion-pizza",
    category: "pizzas",
    name: "Onion Pizza",
    description: "Crisp red onion slices charred at high heat with savoury Italian herbs.",
    price: 119,
    image: "/images/onion-pizza.jpg",
    isVeg: true,
    bestseller: false
  },

  // ── Sides ───────────────────────────────────────────────────────────
  {
    id: "garlic-bread",
    category: "sides",
    name: "Garlic Bread",
    description: "Fresh-baked crispy crust brushed with garlic butter and herbs.",
    price: 59,
    image: "/images/garlic-bread.jpg",
    isVeg: true,
    bestseller: true
  },

  // ── Milkshakes (250 ml) ─────────────────────────────────────────────
  {
    id: "cold-coffee",
    category: "shakes",
    name: "Cold Coffee",
    description: "Thick brewed espresso blended creamy with chilled dairy milk.",
    price: 49,
    image: "/images/shake-cold-coffee.jpg",
    volume: "250 ml",
    isVeg: true,
    upsell: true
  },
  {
    id: "mango-shake",
    category: "shakes",
    name: "Mango Milkshake",
    description: "Sweet Alphonso mango pulp churned rich with chilled fresh milk.",
    price: 69,
    image: "/images/shake-mango.jpg",
    volume: "250 ml",
    isVeg: true,
    upsell: true,
    bestseller: true
  },
  {
    id: "banana-shake",
    category: "shakes",
    name: "Banana Milkshake",
    description: "Ripe sweet bananas blended silky with full cream milk.",
    price: 69,
    image: "/images/shake-banana.jpg",
    volume: "250 ml",
    isVeg: true
  },
  {
    id: "muskmelon-shake",
    category: "shakes",
    name: "Muskmelon Milkshake",
    description: "Fragrant sweet muskmelon fruit pureed with cool milk.",
    price: 69,
    image: "/images/shake-muskmelon.jpg",
    volume: "250 ml",
    isVeg: true
  },
  {
    id: "watermelon-shake",
    category: "shakes",
    name: "Watermelon Shake",
    description: "Refreshing crushed watermelon juice kissed with chilled cream.",
    price: 69,
    image: "/images/shake-watermelon.jpg",
    volume: "250 ml",
    isVeg: true
  },
  {
    id: "strawberry-shake",
    category: "shakes",
    name: "Strawberry Milkshake",
    description: "Vibrant garden strawberries churned into a rich creamy shake.",
    price: 79,
    image: "/images/shake-strawberry.jpg",
    volume: "250 ml",
    isVeg: true,
    upsell: true
  },
  {
    id: "oreo-shake",
    category: "shakes",
    name: "Oreo Milkshake",
    description: "Crushed Oreo cocoa cookies blended velvety with vanilla cream.",
    price: 99,
    image: "/images/shake-oreo.jpg",
    volume: "250 ml",
    isVeg: true,
    upsell: true,
    bestseller: true
  },
  {
    id: "kitkat-shake",
    category: "shakes",
    name: "KitKat Milkshake",
    description: "Crispy wafer chocolate KitKat bar churned into cold thick milk.",
    price: 99,
    image: "/images/shake-kitkat.jpg",
    volume: "250 ml",
    isVeg: true,
    upsell: true
  }
]

export const CATEGORIES = [
  { id: "pizzas" as const, label: "Pizzas" },
  { id: "sides" as const, label: "Sides" },
  { id: "shakes" as const, label: "Shakes" }
]
