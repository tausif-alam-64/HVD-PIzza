"use client"

import React from "react"
import { CATEGORIES, MenuCategory } from "@/lib/menu"

interface CategoryChipsProps {
  activeCategory: MenuCategory
  onSelectCategory: (cat: MenuCategory) => void
}

export function CategoryChips({
  activeCategory,
  onSelectCategory
}: CategoryChipsProps) {
  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-15 z-30 w-full bg-white/95 dark:bg-char/95 backdrop-blur-md border-b border-line py-2.5 px-4 sm:px-6 transition-colors shadow-xs"
    >
      <div className="max-w-xl mx-auto flex items-center justify-start gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id
          const emoji = cat.id === "pizzas" ? "🍕" : cat.id === "sides" ? "🥖" : "🥤"

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive
                  ? "bg-ink text-white shadow-sm dark:bg-white dark:text-ink"
                  : "bg-slate-100 hover:bg-slate-200/80 text-ink-soft hover:text-ink dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              <span>{emoji}</span>
              <span>{cat.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
