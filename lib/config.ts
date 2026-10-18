// HVD Pizzas Master Configuration
// [CONFIRM]: Business parameters can be edited here by non-developers

export interface HoursConfig {
  open: number // 24-hr format (e.g. 17 for 5 PM)
  close: number // 24-hr format (e.g. 23 for 11 PM)
  days: number[] // 0 = Sunday, 1 = Monday ... 6 = Saturday
  displayHours: string
}

export interface BusinessConfig {
  name: string
  tagline: string
  area: string
  fullAddress: string
  phone: string
  whatsappNumber: string // digits only with country code
  hours: HoursConfig
  modes: {
    delivery: boolean
    pickup: boolean
  }
  deliveryFee: number // in INR [CONFIRM]
  freeDeliveryThreshold: number
  minimumOrder: number // in INR [CONFIRM]
  partyNoticeDays: string
  upiId?: string
}

export const CONFIG: BusinessConfig = {
  name: "HVD Pizzas",
  tagline: "Fresh out of the oven, three taps from your door.",
  area: "Sanghipuram (Adani Cement Colony), Gujarat",
  fullAddress: "Near Community Centre, Sanghipuram Colony, Abdasa, Kutch, Gujarat 370511",
  phone: "+91 70079 79770", // [CONFIRM] Replace with operational phone
  whatsappNumber: "917007979770", // [CONFIRM] Replace with actual WhatsApp number
  hours: {
    open: 16, // 4:00 PM
    close: 23, // 11:00 PM
    days: [0, 1, 2, 3, 4, 5, 6], // Every day [CONFIRM]
    displayHours: "4:00 PM – 11:00 PM every day"
  },
  modes: {
    delivery: true,
    pickup: true
  },
  deliveryFee: 0, // Free delivery inside Sanghipuram colony [CONFIRM]
  freeDeliveryThreshold: 0,
  minimumOrder: 0,
  partyNoticeDays: "2 to 3 days ahead"
}

export function isStoreOpen(hours: HoursConfig = CONFIG.hours): boolean {
  const now = new Date()
  // India Standard Time (IST) offset is UTC+5:30
  const utc = now.getTime() + now.getTimezoneOffset() * 60000
  const istDate = new Date(utc + 3600000 * 5.5)
  const currentHour = istDate.getHours()
  const currentDay = istDate.getDay()

  const isOpenDay = hours.days.includes(currentDay)
  const isOpenHour = currentHour >= hours.open && currentHour < hours.close
  return isOpenDay && isOpenHour
}
