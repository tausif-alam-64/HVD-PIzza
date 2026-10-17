import React from "react"
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react"
import { CONFIG } from "@/lib/config"
import { CONTENT } from "@/lib/content"

export function Footer() {
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hi HVD Pizzas! I have a question about the menu."
  )}`

  return (
    <footer className="bg-char text-white pt-12 pb-24 border-t border-white/10 px-4 sm:px-6">
      <div className="max-w-xl mx-auto flex flex-col gap-8">
        {/* Brand statement */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-full bg-tomato flex items-center justify-center text-sm">
              🍕
            </span>
            <span className="font-display font-bold text-xl tracking-tight">
              {CONFIG.name}
            </span>
          </div>
          <p className="text-white/70 text-xs sm:text-sm font-normal max-w-sm">
            {CONTENT.footer.kitchenNotice}
          </p>
        </div>

        {/* Operational coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-white/80 border-y border-white/10 py-6">
          <div className="flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-crust flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Location</p>
              <p className="text-white/60 leading-relaxed">{CONFIG.fullAddress}</p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-crust flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white">Kitchen Hours</p>
              <p className="text-white/60 leading-relaxed">{CONFIG.hours.displayHours}</p>
            </div>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-3 px-4 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 border border-white/15 flex items-center justify-center gap-2 text-xs font-semibold text-white transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={`tel:${CONFIG.phone}`}
            className="flex-1 py-3 px-4 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 border border-white/15 flex items-center justify-center gap-2 text-xs font-semibold text-white transition-all"
          >
            <Phone className="w-4 h-4 text-crust" />
            <span>Call Kitchen</span>
          </a>
        </div>

        {/* Legal & copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-4 text-[11px] text-white/40 border-t border-white/5">
          <span>{CONTENT.footer.copyright}</span>
          <span>{CONTENT.footer.madeFor}</span>
        </div>
      </div>
    </footer>
  )
}
