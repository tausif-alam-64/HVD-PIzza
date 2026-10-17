"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Plus, Minus } from "lucide-react"
import { MenuItem } from "@/lib/menu"
import { useOrderStore } from "@/lib/store"
import { VegMark } from "./ui/VegMark"
import { getPlaceholderSvg } from "@/lib/placeholders"

interface CompactCardProps {
  item: MenuItem
}

export function CompactCard({ item }: CompactCardProps) {
  const [imgError, setImgError] = useState(false)
  const qty = useOrderStore((s) => s.getQuantity(item.id))
  const addItem = useOrderStore((s) => s.addItem)
  const removeItem = useOrderStore((s) => s.removeItem)

  const fallback = getPlaceholderSvg(item.name, item.category, "#1C1513", "#D9381E")

  return (
    <article className="bg-surface rounded-[20px] border border-line p-3 shadow-xs hover:border-ink/20 transition-all flex flex-col justify-between group">
      <div>
        {/* 1:1 Square Thumbnail */}
        <div className="relative w-full aspect-square rounded-[14px] overflow-hidden bg-char/5 mb-2.5">
          <Image
            src={imgError ? fallback : item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 50vw, 220px"
            loading="lazy"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={() => setImgError(true)}
          />
          {item.volume && (
            <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-xs bg-char/80 text-white font-mono text-[9px] backdrop-blur-xs">
              {item.volume}
            </span>
          )}
        </div>

        <div className="flex items-start gap-1.5 mb-1">
          <VegMark className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
          <h4 className="font-display font-bold text-sm sm:text-base text-ink leading-snug line-clamp-1">
            {item.name}
          </h4>
        </div>

        <p className="text-ink-soft text-[11px] sm:text-xs leading-relaxed line-clamp-2 mb-3">
          {item.description}
        </p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-line/60">
        <span className="font-display font-bold text-sm sm:text-base text-ink tabular-nums">
          ₹{item.price}
        </span>

        {qty === 0 ? (
          <button
            onClick={() => addItem(item)}
            aria-label={`Add ${item.name}`}
            className="h-8 px-3 rounded-full bg-tomato hover:bg-tomato-press active:scale-95 text-white font-bold text-[11px] shadow-xs transition-all flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" />
            <span>Add</span>
          </button>
        ) : (
          <div className="h-8 px-1.5 rounded-full bg-tomato-tint border border-tomato/20 flex items-center gap-2">
            <button
              onClick={() => removeItem(item.id)}
              aria-label={`Decrease ${item.name}`}
              className="w-5 h-5 rounded-full bg-surface text-ink hover:text-tomato flex items-center justify-center transition-colors shadow-xs active:scale-90"
            >
              <Minus className="w-2.5 h-2.5" />
            </button>
            <span
              className="font-bold text-xs text-tomato tabular-nums min-w-[10px] text-center"
              aria-live="polite"
            >
              {qty}
            </span>
            <button
              onClick={() => addItem(item)}
              aria-label={`Increase ${item.name}`}
              className="w-5 h-5 rounded-full bg-tomato text-white flex items-center justify-center hover:bg-tomato-press transition-colors shadow-xs active:scale-90"
            >
              <Plus className="w-2.5 h-2.5" />
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
