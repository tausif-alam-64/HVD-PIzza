"use client"

import React, { useEffect, useState } from "react"
import { ShoppingBag } from "lucide-react"
import { CONFIG, isStoreOpen } from "@/lib/config"
import { useOrderStore } from "@/lib/store"

export function TopBar() {
  const [openStatus, setOpenStatus] = useState<boolean>(true)
  const [mounted, setMounted] = useState<boolean>(false)
  const count = useOrderStore((s) => s.getItemCount())
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
    <header className="sticky top-0 z-40 w-full h-14 bg-char/90 backdrop-blur-md border-b border-white/10 text-white px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Brand logo & status */}
      <div className="flex items-center gap-3">
        <a href="#hero" className="flex items-center gap-2 group">
          <span className="w-8 h-8 rounded-full bg-tomato flex items-center justify-center text-white font-bold text-base shadow-sm group-hover:scale-105 transition-transform">
            🍕
          </span>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-lg tracking-tight leading-none">
              {CONFIG.name}
            </span>
            <span className="text-[10px] text-white/60 font-medium tracking-wide">
              Sanghipuram
            </span>
          </div>
        </a>

        {/* Operating status badge */}
        {mounted && (
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ml-2 ${
              openStatus
                ? "bg-basil/20 text-emerald-400 border border-emerald-500/30"
                : "bg-white/10 text-white/70 border border-white/15"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                openStatus ? "bg-emerald-400 animate-pulse" : "bg-white/50"
              }`}
            />
            {openStatus ? "Open" : "Closed"}
          </span>
        )}
      </div>

      {/* Cart button with count badge */}
      <button
        onClick={() => setDrawerOpen(true)}
        aria-label={`View order (${count} items)`}
        className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/15 active:scale-95 transition-all text-white border border-white/10"
      >
        <ShoppingBag className="w-4 h-4 text-white" />
        {mounted && count > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-tomato text-white text-[11px] font-bold flex items-center justify-center shadow-md animate-in zoom-in-50 duration-200">
            {count}
          </span>
        )}
      </button>
    </header>
  )
}
