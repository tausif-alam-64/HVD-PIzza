"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
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
          className="w-full bg-char text-white rounded-[24px] p-2 sm:p-2.5 pl-3 border border-white/15 shadow-warm-float flex items-center justify-between gap-3 hover:bg-char-2 active:scale-[0.98] transition-all cursor-pointer group"
        >
          {/* Stacked mini photos & item count */}
          <div className="flex items-center gap-3">
            <div className="flex items-center -space-x-3.5 overflow-hidden py-1">
              {previewItems.map(({ item }) => (
                <div
                  key={item.id}
                  className="w-9 h-9 rounded-full ring-2 ring-char relative overflow-hidden bg-surface flex-shrink-0"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="36px"
                    className="object-cover"
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src = getPlaceholderSvg(
                        item.name,
                        item.category,
                        "#1C1513",
                        "#D9381E"
                      )
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs text-white/70 font-medium">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </span>
              <span className="font-display font-extrabold text-base text-white tabular-nums leading-none">
                ₹{total}
              </span>
            </div>
          </div>

          {/* View order CTA pill */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-tomato text-white text-xs font-bold shadow-xs group-hover:bg-tomato-press transition-colors">
            <span>{CONTENT.orderBar.viewOrder}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </button>
      </div>
    </aside>
  )
}
