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
      className="sticky top-14 z-30 w-full bg-page/95 backdrop-blur-md border-b border-line py-2.5 px-4 sm:px-6 transition-colors"
    >
      <div className="max-w-xl mx-auto flex items-center justify-start gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer active:scale-95 ${
                isActive
                  ? "bg-char text-white shadow-sm dark:bg-white dark:text-char"
                  : "bg-surface border border-line text-ink-soft hover:text-ink hover:border-ink/20"
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
