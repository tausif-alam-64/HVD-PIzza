"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, ShoppingBag } from "lucide-react"
import { useOrderStore } from "@/lib/store"
import { CONTENT } from "@/lib/content"
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

  // Up to 3 stacked mini photos
  const previewItems = items.slice(0, 3)

  return (
    <aside
      aria-label="Order summary bar"
      className="fixed bottom-0 inset-x-0 z-40 p-3 sm:p-4 safe-bottom pointer-events-none"
    >
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          onClick={() => setDrawerOpen(true)}
          className="w-full bg-slate-950 text-white rounded-[22px] p-3 border border-slate-800 float-bar-shadow flex items-center justify-between gap-3 hover:bg-black active:scale-[0.98] transition-all cursor-pointer group"
        >
          {/* Stacked mini photos & item count */}
          <div className="flex items-center gap-3">
            <div className="flex items-center -space-x-3.5 overflow-hidden py-0.5">
              {previewItems.map(({ item }) => (
                <div
                  key={item.id}
                  className="w-10 h-10 rounded-full ring-2 ring-slate-950 relative overflow-hidden bg-slate-800 flex-shrink-0"
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
                        "#E11D48"
                      )
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col text-left">
              <span className="text-[11px] text-slate-300 font-semibold tracking-wide uppercase">
                {itemCount} {itemCount === 1 ? "Item" : "Items"} in Cart
              </span>
              <span className="font-display font-black text-lg text-white tabular-nums leading-none mt-0.5">
                ₹{total}
              </span>
            </div>
          </div>

          {/* View order CTA pill */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-tomato text-white text-xs font-black shadow-sm group-hover:bg-tomato-hover transition-colors uppercase tracking-wider">
            <span>{CONTENT.orderBar.viewOrder}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </aside>
  )
}
