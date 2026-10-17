"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowDown, Plus, Sparkles, RotateCcw, ShieldCheck, Zap } from "lucide-react"
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
    "#09090B",
    "#E11D48"
  )

  return (
    <section
      id="hero"
      className="relative bg-surface border-b border-line px-4 sm:px-6 pt-6 sm:pt-10 pb-8 sm:pb-12 overflow-hidden"
    >
      <div className="max-w-xl mx-auto flex flex-col gap-6">
        {/* Trust Badges Bar like Blinkit / Swiggy */}
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-basil-tint text-basil border border-basil/20">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Pure Vegetarian Kitchen
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-tint text-amber-700 dark:text-amber-300 border border-amber-200">
            <Zap className="w-3.5 h-3.5 fill-current" /> Free Colony Delivery
          </span>
        </div>

        {/* Crisp Headline & Value Proposition */}
        <div>
          <h1 className="font-display font-black text-[clamp(2.1rem,7vw,3.2rem)] leading-[1.08] tracking-tight text-ink mb-2">
            The pizza you’ve been missing.
          </h1>
          <p className="text-ink-soft text-sm sm:text-base font-normal leading-relaxed">
            Freshly stretched dough, real mozzarella, and thick milkshakes. Made in Sanghipuram and delivered right to your quarter in 3 simple taps.
          </p>
        </div>

        {/* Star Hero Image Card */}
        <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-[24px] overflow-hidden border border-line card-shadow bg-slate-900 group">
          <Image
            src={imgError ? heroPlaceholder : "/images/hero-4x5.jpg"}
            alt="Freshly baked artisan cheese pull pizza"
            fill
            priority
            sizes="(max-width: 640px) 100vw, 600px"
            className="object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
            onError={() => setImgError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Quick specs banner on bottom of hero image */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
            <span className="font-bold flex items-center gap-1.5 drop-shadow-sm">
              <VegMark className="w-3.5 h-3.5" /> Baked fresh on every order
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-semibold text-white">
              WhatsApp Instant Confirmation
            </span>
          </div>
        </div>

        {/* Quick Order / Reorder Card */}
        {mounted && usualOrder ? (
          <div className="bg-surface rounded-[20px] p-3.5 border-2 border-tomato/30 card-shadow flex items-center justify-between gap-3 text-ink">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-tomato-tint flex items-center justify-center text-tomato font-bold flex-shrink-0">
                <RotateCcw className="w-5 h-5 text-tomato" />
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] font-bold text-tomato tracking-wider uppercase">
                  Welcome back!
                </span>
                <span className="text-xs sm:text-sm font-bold text-ink line-clamp-1">
                  Order your usual (₹{usualOrder.total})
                </span>
              </div>
            </div>

            <button
              onClick={loadUsualOrder}
              className="px-4 py-2 rounded-xl bg-tomato hover:bg-tomato-hover text-white font-bold text-xs shadow-xs active:scale-95 transition-all flex-shrink-0 cursor-pointer"
            >
              Order now
            </button>
          </div>
        ) : (
          <div className="bg-surface rounded-[20px] p-3 border border-line card-shadow flex items-center justify-between gap-3 text-ink">
            <div className="flex items-center gap-3">
              <div className="w-13 h-13 rounded-[16px] overflow-hidden relative flex-shrink-0 bg-slate-100 border border-line">
                <Image
                  src={featuredItem.image}
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
                  <span className="px-1.5 py-0.5 rounded-md bg-amber-tint text-amber-700 text-[10px] font-extrabold uppercase tracking-wide">
                    Top Pick
                  </span>
                </div>
                <span className="text-xs font-bold text-ink tabular-nums mt-0.5">
                  ₹{featuredItem.price}
                </span>
              </div>
            </div>

            <button
              onClick={() => addItem(featuredItem)}
              className="inline-flex items-center gap-1 h-9 px-4 rounded-xl bg-tomato hover:bg-tomato-hover text-white font-bold text-xs shadow-xs active:scale-95 transition-all flex-shrink-0 cursor-pointer"
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
