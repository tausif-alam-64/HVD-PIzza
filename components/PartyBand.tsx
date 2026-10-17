import React from "react"
import { Users, MessageCircle } from "lucide-react"
import { CONFIG } from "@/lib/config"
import { CONTENT } from "@/lib/content"

export function PartyBand() {
  const partyMessage = encodeURIComponent(
    `Hi HVD Pizzas! I'd like to enquire about a party order in Sanghipuram for a celebration.`
  )
  const partyUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${partyMessage}`

  return (
    <section className="my-10 px-4 sm:px-6">
      <div className="max-w-xl mx-auto rounded-[24px] bg-char text-white p-5 sm:p-6 border border-white/10 relative overflow-hidden oven-glow">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-crust tracking-wide mb-1.5">
              <Users className="w-3.5 h-3.5 text-crust" />
              {CONTENT.party.tag}
            </span>
            <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-2 leading-snug">
              {CONTENT.party.title}
            </h3>
            <p className="text-white/70 text-xs sm:text-sm font-normal mb-3 leading-relaxed">
              {CONTENT.party.description}
            </p>
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs font-medium border border-white/10">
              ⏰ {CONTENT.party.leadTime}
            </div>
          </div>

          <a
            href={partyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-basil hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all flex-shrink-0"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{CONTENT.party.cta}</span>
          </a>
        </div>
      </div>
    </section>
  )
}
