"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowDown, Plus, Sparkles, RotateCcw } from "lucide-react"
import { CONTENT } from "@/lib/content"
import { MENU_ITEMS } from "@/lib/menu"
import { useOrderStore } from "@/lib/store"
import { VegMark } from "./ui/VegMark"
import { getPlaceholderSvg } from "@/lib/placeholders"

export function Hero() {
  const [mounted, setMounted] = useState<boolean>(false)
  const [imgError, setImgError] = useState<boolean>(false)
  const featuredItem = MENU_ITEMS.find((m) => m.featured) || MENU_ITEMS[0]

  const addItem = useOrderStore((s) => s.addItem)
  const usualOrder = useOrderStore((s) => s.usualOrder)
  const loadUsualOrder = useOrderStore((s) => s.loadUsualOrder)

  useEffect(() => {
    setMounted(true)
  }, [])

  const heroPlaceholder = getPlaceholderSvg(
    "Fresh Baked Paneer Pizza",
    "pizzas",
    "#17110F",
    "#D9381E"
  )

  return (
    <section
      id="hero"
      className="relative min-h-[82dvh] bg-char text-white flex flex-col justify-between overflow-hidden oven-glow px-4 sm:px-6 pt-6 pb-10"
    >
      {/* Background ambient circular oven mask for desktop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-tomato/10 blur-3xl pointer-events-none" />

      {/* Top headline block */}
      <div className="max-w-xl mx-auto w-full pt-4 sm:pt-8 text-center flex flex-col items-center z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-crust border border-white/15 mb-4 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-crust" />
          {CONTENT.hero.badge}
        </span>

        <h1 className="font-display font-extrabold text-[clamp(2.5rem,8vw,4.25rem)] leading-[1.02] tracking-tight text-white mb-3">
          {CONTENT.hero.headline}
        </h1>

        <p className="text-white/80 text-base sm:text-lg max-w-md font-normal leading-relaxed mb-6">
          {CONTENT.hero.subline}
        </p>

        <a
          href="#menu"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-sm border border-white/20 transition-all backdrop-blur-md shadow-sm mb-8"
        >
          {CONTENT.hero.orderNowCta}
          <ArrowDown className="w-4 h-4 text-crust animate-bounce" />
        </a>
      </div>

      {/* Central Hero Visual Container with 4:5 mobile / 16:9 desktop crop */}
      <div className="relative w-full max-w-md mx-auto aspect-[4/3] sm:aspect-[16/10] rounded-[24px] overflow-hidden border border-white/15 shadow-2xl bg-char-2 z-10 group">
        <Image
          src={
            imgError
              ? heroPlaceholder
              : "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1080&q=80&auto=format&fit=crop"
          }
          alt="Freshly baked artisan pizza"
          fill
          priority
          sizes="(max-width: 640px) 100vw, 540px"
          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-char/90 via-transparent to-black/20 pointer-events-none" />

        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/90">
          <span className="font-semibold flex items-center gap-1.5">
            <VegMark className="w-3.5 h-3.5" /> Handcrafted with pure dairy
          </span>
          <span className="text-white/60">Colony Special</span>
        </div>
      </div>

      {/* Quick Order Card or Returning Visitor 'Order your usual' Card */}
      <div className="max-w-md mx-auto w-full mt-6 z-10">
        {mounted && usualOrder ? (
          <div className="bg-surface/95 dark:bg-char-2 backdrop-blur-md rounded-[20px] p-3.5 border border-line shadow-warm-float flex items-center justify-between gap-3 text-ink">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-tomato-tint flex items-center justify-center text-tomato font-bold flex-shrink-0">
                <RotateCcw className="w-5 h-5 text-tomato" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-tomato tracking-wide uppercase">
                  Returning customer
                </span>
                <span className="text-xs sm:text-sm font-semibold text-ink line-clamp-1">
                  Order your usual (₹{usualOrder.total})
                </span>
              </div>
            </div>

            <button
              onClick={loadUsualOrder}
              className="px-4 py-2 rounded-full bg-tomato hover:bg-tomato-press text-white font-bold text-xs shadow-md active:scale-95 transition-all flex-shrink-0"
            >
              Order now
            </button>
          </div>
        ) : (
          <div className="bg-surface/95 dark:bg-char-2 backdrop-blur-md rounded-[20px] p-3 border border-white/10 shadow-warm-float flex items-center justify-between gap-3 text-ink">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-[14px] overflow-hidden relative flex-shrink-0 bg-char-2 border border-line">
                <Image
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&q=80&auto=format&fit=crop"
                  alt={featuredItem.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                  onError={(e) => {
                    ;(e.target as HTMLImageElement).src = heroPlaceholder
                  }}
                />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <VegMark className="w-3.5 h-3.5" />
                  <span className="text-sm font-bold text-ink">
                    {featuredItem.name}
                  </span>
                  <span className="px-1.5 py-0.2 rounded-xs bg-tomato-tint text-tomato text-[10px] font-bold">
                    Featured
                  </span>
                </div>
                <span className="text-xs font-semibold text-ink-soft tabular-nums">
                  ₹{featuredItem.price}
                </span>
              </div>
            </div>

            <button
              onClick={() => addItem(featuredItem)}
              className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-tomato hover:bg-tomato-press text-white font-bold text-xs shadow-md active:scale-95 transition-all flex-shrink-0"
              aria-label={`Add ${featuredItem.name} to order`}
            >
              <Plus className="w-3.5 h-3.5" /> Add
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
