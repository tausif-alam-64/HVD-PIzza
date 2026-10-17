"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Plus, Minus } from "lucide-react"
import { MenuItem } from "@/lib/menu"
import { useOrderStore } from "@/lib/store"
import { VegMark } from "./ui/VegMark"
import { getPlaceholderSvg } from "@/lib/placeholders"

interface PizzaCardProps {
  item: MenuItem
}

export function PizzaCard({ item }: PizzaCardProps) {
  const [imgError, setImgError] = useState(false)
  const qty = useOrderStore((s) => s.getQuantity(item.id))
  const addItem = useOrderStore((s) => s.addItem)
  const removeItem = useOrderStore((s) => s.removeItem)

  const fallback = getPlaceholderSvg(item.name, item.category, "#1C1513", "#D9381E")

  return (
    <article className="bg-surface rounded-[24px] border border-line p-3 sm:p-4 shadow-sm hover:border-ink/20 transition-all flex flex-col justify-between group">
      <div>
        {/* Large 4:3 Aspect Image */}
        <div className="relative w-full aspect-[4/3] rounded-[20px] overflow-hidden bg-char/5 mb-3.5">
          <Image
            src={imgError ? fallback : item.image}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, 480px"
            loading="lazy"
            className="object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
            onError={() => setImgError(true)}
          />

          {item.bestseller && (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-crust text-char font-extrabold text-[10px] tracking-wide uppercase shadow-sm">
              Bestseller
            </span>
          )}
        </div>

        {/* Item Title & Veg Mark */}
        <div className="flex items-center gap-2 mb-1.5">
          <VegMark />
          <h3 className="font-display font-bold text-lg sm:text-xl text-ink leading-tight">
            {item.name}
          </h3>
        </div>

        {/* One-line pure description */}
        <p className="text-ink-soft text-xs sm:text-sm font-normal line-clamp-2 leading-relaxed mb-4">
          {item.description}
        </p>
      </div>

      {/* Price & Quantity Stepper */}
      <div className="flex items-center justify-between pt-2 border-t border-line/60">
        <span className="font-display font-extrabold text-lg sm:text-xl text-ink tabular-nums">
          ₹{item.price}
        </span>

        {qty === 0 ? (
          <button
            onClick={() => addItem(item)}
            aria-label={`Add ${item.name} to order`}
            className="h-10 px-5 rounded-full bg-tomato hover:bg-tomato-press active:scale-95 text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        ) : (
          <div className="h-10 px-2 rounded-full bg-tomato-tint border border-tomato/20 flex items-center gap-3">
            <button
              onClick={() => removeItem(item.id)}
              aria-label={`Decrease quantity of ${item.name}`}
              className="w-7 h-7 rounded-full bg-surface text-ink hover:text-tomato flex items-center justify-center transition-colors shadow-xs active:scale-90"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span
              className="font-bold text-sm text-tomato tabular-nums min-w-[12px] text-center"
              aria-live="polite"
            >
              {qty}
            </span>
            <button
              onClick={() => addItem(item)}
              aria-label={`Increase quantity of ${item.name}`}
              className="w-7 h-7 rounded-full bg-tomato text-white flex items-center justify-center hover:bg-tomato-press transition-colors shadow-xs active:scale-90"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
