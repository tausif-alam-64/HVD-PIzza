"use client"

import React, { useEffect, useState } from "react"
import { ShoppingBag, MapPin, Clock } from "lucide-react"
import { CONFIG, isStoreOpen } from "@/lib/config"
import { useOrderStore } from "@/lib/store"

export function TopBar() {
  const [openStatus, setOpenStatus] = useState<boolean>(true)
  const [mounted, setMounted] = useState<boolean>(false)
  const count = useOrderStore((s) => s.getItemCount())
  const total = useOrderStore((s) => s.getTotal())
  const setDrawerOpen = useOrderStore((s) => s.setDrawerOpen)

  useEffect(() => {
    setMounted(true)
    setOpenStatus(isStoreOpen())
    const interval = setInterval(() => {
      setOpenStatus(isStoreOpen())
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full h-15 bg-white/95 dark:bg-char/95 backdrop-blur-md border-b border-line px-4 sm:px-6 flex items-center justify-between transition-colors shadow-xs">
      {/* Brand & colony delivery pill */}
      <div className="flex items-center gap-3">
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-tomato flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
            🍕
          </div>
          <div className="flex flex-col">
            <span className="font-display font-black text-lg sm:text-xl tracking-tight text-ink leading-tight">
              {CONFIG.name}
            </span>
            <div className="flex items-center gap-1.5 text-[11px] text-ink-soft font-medium">
              <span className="flex items-center gap-0.5 text-tomato font-semibold">
                <MapPin className="w-3 h-3" /> Sanghipuram
              </span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                <Clock className="w-3 h-3" /> 4-11 PM
              </span>
            </div>
          </div>
        </a>
      </div>

      {/* Right side: Live Open Status + Cart */}
      <div className="flex items-center gap-2.5">
        {mounted && (
          <span
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              openStatus
                ? "bg-basil-tint text-basil border border-basil/20"
                : "bg-slate-100 text-slate-500 border border-slate-200"
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                openStatus ? "bg-basil animate-pulse" : "bg-slate-400"
              }`}
            />
            {openStatus ? "Open Now" : "Closed"}
          </span>
        )}

        <button
          onClick={() => setDrawerOpen(true)}
          aria-label={`View order (${count} items)`}
          className="relative flex items-center gap-2 h-10 px-3.5 rounded-xl bg-tomato hover:bg-tomato-hover active:scale-95 transition-all text-white font-bold text-xs shadow-sm cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4 text-white" />
          <span>{count > 0 ? `₹${total}` : "Cart"}</span>
          {mounted && count > 0 && (
            <span className="w-5 h-5 rounded-full bg-white text-tomato text-[11px] font-black flex items-center justify-center shadow-xs">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}
