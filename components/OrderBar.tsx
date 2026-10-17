"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, ShoppingBag, Sparkles } from "lucide-react"
import { useOrderStore } from "@/lib/store"
import { getPlaceholderSvg } from "@/lib/placeholders"

export function OrderBar() {
  const [mounted, setMounted] = useState(false)
  const items = useOrderStore((s) => s.items)
  const total = useOrderStore((s) => s.getTotal())
  const itemCount = useOrderStore((s) => s.getItemCount())
  const setDrawerOpen = useOrderStore((s) => s.setDrawerOpen)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || items.length === 0) return null

  // Up to 3 stacked preview dishes
  const previewItems = items.slice(0, 3)

  return (
    <aside
      aria-label="Order summary bar"
      className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 safe-bottom pointer-events-none"
    >
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-full bg-[#1A2616] text-white rounded-[24px] p-2.5 sm:p-3 pl-3.5 border border-[#3b7227]/40 float-bar-shadow flex items-center justify-between gap-3 hover:bg-[#152012] active:scale-[0.98] transition-all cursor-pointer group backdrop-blur-md"
        >
          {/* Left section: Stacked dish thumbnails + Item details */}
          <div className="flex items-center gap-3">
            <div className="flex items-center -space-x-3.5 overflow-hidden py-0.5">
              {previewItems.map(({ item }) => (
                <div
                  key={item.id}
                  className="w-10 h-10 rounded-full ring-2 ring-[#1A2616] relative overflow-hidden bg-slate-900 flex-shrink-0 shadow-sm"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = getPlaceholderSvg(
                        item.name,
                        item.category,
                        "#09090B",
                        "#3b7227"
                      )
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-emerald-400 tracking-wider uppercase">
                  {itemCount} {itemCount === 1 ? "Item" : "Items"}
                </span>
                <span className="text-emerald-500/50">•</span>
                <span className="text-[10px] text-white/70 font-medium">Free Delivery</span>
              </div>
              <span className="font-display font-black text-xl text-white tabular-nums leading-none mt-0.5">
                ₹{total}
              </span>
            </div>
          </div>

          {/* Right section: Premium Button in #3b7227 */}
          <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-[#3b7227] hover:bg-[#316020] text-white text-xs sm:text-sm font-black shadow-md group-hover:scale-102 transition-all tracking-wide">
            <ShoppingBag className="w-4 h-4 fill-white/20 stroke-white" />
            <span>View Cart</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </aside>
  )
}
