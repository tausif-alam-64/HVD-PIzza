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
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&auto=format&fit=crop&q=80",
    isVeg: true,
    bestseller: false
  },
  {
    id: "onion-pizza",
    category: "pizzas",
    name: "Onion Pizza",
    description: "Crisp red onion slices charred at high heat with savoury Italian herbs.",
    price: 119,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1546173159-315724a31696?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=800&auto=format&fit=crop&q=80",
    volume: "250 ml",
    isVeg: true
  },
  {
    id: "muskmelon-shake",
    category: "shakes",
    name: "Muskmelon Milkshake",
    description: "Fragrant sweet muskmelon fruit pureed with cool milk.",
    price: 69,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&auto=format&fit=crop&q=80",
    volume: "250 ml",
    isVeg: true
  },
  {
    id: "watermelon-shake",
    category: "shakes",
    name: "Watermelon Shake",
    description: "Refreshing crushed watermelon juice kissed with chilled cream.",
    price: 69,
    image: "https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?w=800&auto=format&fit=crop&q=80",
    volume: "250 ml",
    isVeg: true
  },
  {
    id: "strawberry-shake",
    category: "shakes",
    name: "Strawberry Milkshake",
    description: "Vibrant garden strawberries churned into a rich creamy shake.",
    price: 79,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=800&auto=format&fit=crop&q=80",
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
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&auto=format&fit=crop&q=80",
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
