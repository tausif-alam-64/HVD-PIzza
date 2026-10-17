import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { MenuItem } from "./menu"
import { CONFIG } from "./config"

export interface OrderItem {
  item: MenuItem
  quantity: number
}

export interface UsualOrder {
  items: { id: string; name: string; quantity: number; price: number }[]
  total: number
  mode: "delivery" | "pickup"
  name: string
  address: string
  timestamp: number
}

export interface CustomerDetails {
  name: string
  address: string
  mode: "delivery" | "pickup"
  when: "asap" | "later"
  timeString: string
  note: string
}

interface OrderStore {
  items: OrderItem[]
  customer: CustomerDetails
  isDrawerOpen: boolean
  lastPlacedOrderCode: string | null
  usualOrder: UsualOrder | null
  
  // Actions
  addItem: (item: MenuItem) => void
  removeItem: (itemId: string) => void
  clearOrder: () => void
  setQuantity: (itemId: string, quantity: number) => void
  setCustomerDetails: (details: Partial<CustomerDetails>) => void
  setDrawerOpen: (isOpen: boolean) => void
  setLastPlacedOrderCode: (code: string | null) => void
  
  // Reorder "usual"
  loadUsualOrder: () => void
  saveCurrentAsUsual: (code: string) => void
  
  // Computed helpers
  getQuantity: (itemId: string) => number
  getItemCount: () => number
  getSubtotal: () => number
  getTotal: () => number
  hasShakes: () => boolean
  generateOrderCode: () => string
  generateWhatsAppMessage: (orderCode: string) => string
}

// Generates a 4-character uppercase alphanumeric code like #K7P2
function makeOrderCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  let res = ""
  for (let i = 0; i < 4; i++) {
    res += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return res
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      items: [],
      customer: {
        name: "",
        address: "",
        mode: "delivery",
        when: "asap",
        timeString: "",
        note: ""
      },
      isDrawerOpen: false,
      lastPlacedOrderCode: null,
      usualOrder: null,

      addItem: (item) => {
        // Haptic tap feedback on supported devices
        if (typeof window !== "undefined" && "vibrate" in navigator) {
          try { navigator.vibrate(12) } catch {}
        }
        set((state) => {
          const existing = state.items.find((i) => i.item.id === item.id)
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              )
            }
          }
          return { items: [...state.items, { item, quantity: 1 }] }
        })
      },

      removeItem: (itemId) => {
        if (typeof window !== "undefined" && "vibrate" in navigator) {
          try { navigator.vibrate(8) } catch {}
        }
        set((state) => {
          const existing = state.items.find((i) => i.item.id === itemId)
          if (!existing) return state
          if (existing.quantity <= 1) {
            return { items: state.items.filter((i) => i.item.id !== itemId) }
          }
          return {
            items: state.items.map((i) =>
              i.item.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
            )
          }
        })
      },

      setQuantity: (itemId, quantity) => {
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.item.id !== itemId) }
          }
          return {
            items: state.items.map((i) =>
              i.item.id === itemId ? { ...i, quantity } : i
            )
          }
        })
      },

      clearOrder: () => set({ items: [], lastPlacedOrderCode: null }),

      setCustomerDetails: (details) =>
        set((state) => ({ customer: { ...state.customer, ...details } })),

      setDrawerOpen: (isOpen) => set({ isDrawerOpen: isOpen }),

      setLastPlacedOrderCode: (code) => set({ lastPlacedOrderCode: code }),

      saveCurrentAsUsual: (code) => {
        const { items, customer, getTotal } = get()
        if (items.length === 0) return
        const usual: UsualOrder = {
          items: items.map((i) => ({
            id: i.item.id,
            name: i.item.name,
            quantity: i.quantity,
            price: i.item.price
          })),
          total: getTotal(),
          mode: customer.mode,
          name: customer.name,
          address: customer.address,
          timestamp: Date.now()
        }
        set({ usualOrder: usual, lastPlacedOrderCode: code })
      },

      loadUsualOrder: () => {
        const { usualOrder } = get()
        if (!usualOrder) return
        import("./menu").then(({ MENU_ITEMS }) => {
          const reconstructed: OrderItem[] = []
          for (const u of usualOrder.items) {
            const found = MENU_ITEMS.find((m) => m.id === u.id)
            if (found) {
              reconstructed.push({ item: found, quantity: u.quantity })
            }
          }
          if (reconstructed.length > 0) {
            set((state) => ({
              items: reconstructed,
              customer: {
                ...state.customer,
                name: usualOrder.name || state.customer.name,
                address: usualOrder.address || state.customer.address,
                mode: usualOrder.mode || state.customer.mode
              },
              isDrawerOpen: true
            }))
          }
        })
      },

      getQuantity: (itemId) => {
        const found = get().items.find((i) => i.item.id === itemId)
        return found ? found.quantity : 0
      },

      getItemCount: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.item.price * item.quantity,
          0
        )
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        if (subtotal === 0) return 0
        const deliveryFee =
          get().customer.mode === "delivery" ? CONFIG.deliveryFee : 0
        return subtotal + deliveryFee
      },

      hasShakes: () => {
        return get().items.some((i) => i.item.category === "shakes")
      },

      generateOrderCode: () => makeOrderCode(),

      generateWhatsAppMessage: (orderCode: string) => {
        const { items, customer, getTotal } = get()
        const orderLines = items
          .map((i) => `${i.quantity} × ${i.item.name} = ₹${i.item.price * i.quantity}`)
          .join("\n")

        const whenText =
          customer.when === "asap"
            ? "As soon as possible"
            : customer.timeString
            ? `Later today (${customer.timeString})`
            : "Later today"

        const addressLine =
          customer.mode === "delivery" && customer.address
            ? `Address: ${customer.address.trim()}\n`
            : ""

        const noteLine = customer.note.trim()
          ? `Note: ${customer.note.trim()}\n`
          : ""

        return (
          `Hi HVD Pizzas! New order #${orderCode}\n\n` +
          `${orderLines}\n\n` +
          `Total: ₹${getTotal()}\n` +
          `Mode: ${customer.mode === "delivery" ? "Delivery" : "Pickup"}\n` +
          `Name: ${customer.name.trim()}\n` +
          addressLine +
          `Time: ${whenText}\n` +
          noteLine
        ).trim()
      }
    }),
    {
      name: "hvd_pizzas_order_v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        customer: {
          name: state.customer.name,
          address: state.customer.address,
          mode: state.customer.mode,
          when: "asap",
          timeString: "",
          note: ""
        },
        usualOrder: state.usualOrder
      })
    }
  )
)
