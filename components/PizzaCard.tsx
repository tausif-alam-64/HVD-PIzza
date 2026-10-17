"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Plus, Minus, Star } from "lucide-react"
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

  const fallback = getPlaceholderSvg(item.name, item.category, "#09090B", "#E11D48")

  return (
    <article className="bg-surface rounded-[24px] border border-line p-3.5 sm:p-4 card-shadow card-hover-shadow flex flex-col justify-between group">
      <div>
        {/* Large 4:3 Aspect Image */}
        <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden bg-slate-100 mb-3.5">
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
            <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-tag text-slate-950 font-black text-[10px] tracking-wide uppercase shadow-sm">
              <Star className="w-3 h-3 fill-slate-950" /> Bestseller
            </span>
          )}
        </div>

        {/* Item Title & Veg Mark */}
        <div className="flex items-center gap-2 mb-1">
          <VegMark />
          <h3 className="font-display font-black text-lg sm:text-xl text-ink leading-tight">
            {item.name}
          </h3>
        </div>

        {/* Crisp one-line description */}
        <p className="text-ink-soft text-xs sm:text-sm font-normal line-clamp-2 leading-relaxed mb-4">
          {item.description}
        </p>
      </div>

      {/* Price & Quantity Button */}
      <div className="flex items-center justify-between pt-2.5 border-t border-line/60">
        <div className="flex flex-col">
          <span className="text-[10px] font-semibold text-ink-subtle uppercase tracking-wider">Price</span>
          <span className="font-display font-black text-xl sm:text-2xl text-ink tabular-nums leading-none">
            ₹{item.price}
          </span>
        </div>

        {qty === 0 ? (
          <button
            onClick={() => addItem(item)}
            aria-label={`Add ${item.name} to order`}
            className="h-10 px-5 rounded-xl bg-tomato hover:bg-tomato-hover active:scale-95 text-white font-extrabold text-xs tracking-wide shadow-xs transition-all flex items-center gap-1.5 cursor-pointer uppercase"
          >
            <span>Add</span>
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        ) : (
          <div className="h-10 px-2 rounded-xl bg-tomato-tint border border-tomato/30 flex items-center gap-3 shadow-xs">
            <button
              onClick={() => removeItem(item.id)}
              aria-label={`Decrease quantity of ${item.name}`}
              className="w-7 h-7 rounded-lg bg-surface text-ink hover:text-tomato flex items-center justify-center transition-colors shadow-xs active:scale-90 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
            <span
              className="font-black text-sm text-tomato tabular-nums min-w-[14px] text-center"
              aria-live="polite"
            >
              {qty}
            </span>
            <button
              onClick={() => addItem(item)}
              aria-label={`Increase quantity of ${item.name}`}
              className="w-7 h-7 rounded-lg bg-tomato text-white flex items-center justify-center hover:bg-tomato-hover transition-colors shadow-xs active:scale-90 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
