"use client"

import React, { useState } from "react"
import { TopBar } from "@/components/TopBar"
import { Hero } from "@/components/Hero"
import { CategoryChips } from "@/components/CategoryChips"
import { PizzaCard } from "@/components/PizzaCard"
import { CompactCard } from "@/components/CompactCard"
import { PartyBand } from "@/components/PartyBand"
import { OrderBar } from "@/components/OrderBar"
import { OrderSheet } from "@/components/OrderSheet"
import { ConfirmationModal } from "@/components/ConfirmationModal"
import { Footer } from "@/components/Footer"
import { VegMark } from "@/components/ui/VegMark"
import { MENU_ITEMS, MenuCategory } from "@/lib/menu"
import { CONTENT } from "@/lib/content"

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("pizzas")

  const pizzas = MENU_ITEMS.filter((i) => i.category === "pizzas")
  const sides = MENU_ITEMS.filter((i) => i.category === "sides")
  const shakes = MENU_ITEMS.filter((i) => i.category === "shakes")

  const handleSelectCategory = (cat: MenuCategory) => {
    setActiveCategory(cat)
    const el = document.getElementById(`section-${cat}`)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="min-h-screen bg-page text-ink selection:bg-tomato selection:text-white flex flex-col">
      {/* 1. Sticky Top Bar (56 px) */}
      <TopBar />

      <main className="flex-1">
        {/* 2. Hero Section (min 80 dvh with oven glow & quick-order card) */}
        <Hero />

        {/* 3. Sticky Category Chips */}
        <div id="menu">
          <CategoryChips
            activeCategory={activeCategory}
            onSelectCategory={handleSelectCategory}
          />
        </div>

        {/* Vegetarian Kitchen Legend (shown once cleanly) */}
        <div className="max-w-xl mx-auto px-4 sm:px-6 pt-6 pb-2">
          <div className="p-3 rounded-[16px] bg-surface border border-line flex items-center gap-2.5">
            <VegMark className="w-4 h-4 flex-shrink-0" />
            <div className="text-xs">
              <span className="font-bold text-ink">
                {CONTENT.vegLegend.label}:
              </span>{" "}
              <span className="text-ink-soft">
                {CONTENT.vegLegend.description}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Menu Sections */}
        <div className="max-w-xl mx-auto px-4 sm:px-6 py-6 space-y-12">
          {/* Pizzas (Large cards) */}
          <section id="section-pizzas" className="scroll-mt-28">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-display font-extrabold text-2xl text-ink">
                {CONTENT.sections.pizzas}
              </h2>
              <span className="text-xs text-ink-soft font-semibold">
                Handcrafted dough
              </span>
            </div>
            <div className="flex flex-col gap-4">
              {pizzas.map((pizza) => (
                <PizzaCard key={pizza.id} item={pizza} />
              ))}
            </div>
          </section>

          {/* Sides (Compact 2-col grid) */}
          <section id="section-sides" className="scroll-mt-28">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-display font-extrabold text-2xl text-ink">
                {CONTENT.sections.sides}
              </h2>
              <span className="text-xs text-ink-soft font-semibold">
                Oven-crisped
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {sides.map((side) => (
                <CompactCard key={side.id} item={side} />
              ))}
            </div>
          </section>

          {/* Shakes (Compact 2-col grid) */}
          <section id="section-shakes" className="scroll-mt-28">
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-display font-extrabold text-2xl text-ink">
                {CONTENT.sections.shakes}
              </h2>
              <span className="text-xs text-ink-soft font-semibold">
                Chilled 250 ml
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {shakes.map((shake) => (
                <CompactCard key={shake.id} item={shake} />
              ))}
            </div>
          </section>
        </div>

        {/* 5. Party Orders Band */}
        <PartyBand />
      </main>

      {/* 6. Footer (Char bg) */}
      <Footer />

      {/* Order bar (Floating sticky bottom when items > 0) */}
      <OrderBar />

      {/* Order sheet drawer */}
      <OrderSheet />

      {/* WhatsApp Handoff Confirmation Modal */}
      <ConfirmationModal />
    </div>
  )
}
