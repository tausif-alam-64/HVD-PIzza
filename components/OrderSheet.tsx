"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Drawer } from "vaul"
import { X, Plus, Minus, MessageCircle, AlertCircle, Sparkles } from "lucide-react"
import { useOrderStore } from "@/lib/store"
import { CONFIG } from "@/lib/config"
import { CONTENT } from "@/lib/content"
import { MENU_ITEMS, MenuItem } from "@/lib/menu"
import { VegMark } from "./ui/VegMark"
import { getPlaceholderSvg } from "@/lib/placeholders"

export function OrderSheet() {
  const isOpen = useOrderStore((s) => s.isDrawerOpen)
  const setDrawerOpen = useOrderStore((s) => s.setDrawerOpen)
  const items = useOrderStore((s) => s.items)
  const customer = useOrderStore((s) => s.customer)
  const setCustomerDetails = useOrderStore((s) => s.setCustomerDetails)
  const addItem = useOrderStore((s) => s.addItem)
  const removeItem = useOrderStore((s) => s.removeItem)
  const getTotal = useOrderStore((s) => s.getTotal)
  const getSubtotal = useOrderStore((s) => s.getSubtotal)
  const hasShakes = useOrderStore((s) => s.hasShakes)
  const generateOrderCode = useOrderStore((s) => s.generateOrderCode)
  const generateWhatsAppMessage = useOrderStore((s) => s.generateWhatsAppMessage)
  const setLastPlacedOrderCode = useOrderStore((s) => s.setLastPlacedOrderCode)

  const [showNote, setShowNote] = useState(Boolean(customer.note))
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Upsell list of shakes when no shake is present in order
  const upsellShakes = MENU_ITEMS.filter((m) => m.category === "shakes" && m.upsell).slice(0, 3)

  const handlePlaceOrder = () => {
    // Plain inline validation
    if (!customer.name.trim()) {
      setErrorMessage("Please enter your name so the kitchen knows who to ask for.")
      return
    }
    if (customer.mode === "delivery" && !customer.address.trim()) {
      setErrorMessage("Please enter your colony quarter number or address for delivery.")
      return
    }

    setErrorMessage(null)
    const code = generateOrderCode()
    const message = generateWhatsAppMessage(code)
    setLastPlacedOrderCode(code)

    // Construct WhatsApp Link
    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`

    // Open WhatsApp
    window.open(waUrl, "_blank")
  }

  const subtotal = getSubtotal()
  const total = getTotal()

  return (
    <Drawer.Root open={isOpen} onOpenChange={setDrawerOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs transition-opacity" />
        <Drawer.Content className="fixed bottom-0 inset-x-0 z-50 max-h-[92dvh] flex flex-col bg-surface rounded-t-[28px] border-t border-line text-ink outline-none">
          {/* Top Grab Handle */}
          <div className="pt-3 pb-2 flex items-center justify-center">
            <div className="w-12 h-1.5 rounded-full bg-ink/20" />
          </div>

          {/* Drawer Header */}
          <div className="px-5 py-3 border-b border-line flex items-center justify-between">
            <Drawer.Title className="font-display font-extrabold text-xl text-ink">
              {CONTENT.drawer.title}
            </Drawer.Title>
            <button
              onClick={() => setDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-page flex items-center justify-center text-ink-soft hover:text-ink active:scale-95"
              aria-label="Close order sheet"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
            {items.length === 0 ? (
              <div className="py-12 text-center text-ink-soft">
                <span className="text-4xl block mb-3">🍕</span>
                <p className="text-sm font-medium">{CONTENT.drawer.empty}</p>
              </div>
            ) : (
              <>
                {/* Line Items List */}
                <div className="divide-y divide-line/60">
                  {items.map(({ item, quantity }) => (
                    <div
                      key={item.id}
                      className="py-3 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <VegMark />
                        <div>
                          <p className="font-display font-bold text-sm sm:text-base text-ink">
                            {item.name}
                          </p>
                          <p className="text-xs text-ink-soft tabular-nums">
                            ₹{item.price} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="h-8 px-1.5 rounded-full bg-tomato-tint border border-tomato/20 flex items-center gap-2">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-5 h-5 rounded-full bg-surface text-ink hover:text-tomato flex items-center justify-center transition-colors shadow-xs active:scale-90"
                            aria-label={`Decrease ${item.name}`}
                          >
                            <Minus className="w-2.5 h-2.5" />
                          </button>
                          <span className="font-bold text-xs text-tomato tabular-nums min-w-[12px] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => addItem(item)}
                            className="w-5 h-5 rounded-full bg-tomato text-white flex items-center justify-center hover:bg-tomato-press transition-colors shadow-xs active:scale-90"
                            aria-label={`Increase ${item.name}`}
                          >
                            <Plus className="w-2.5 h-2.5" />
                          </button>
                        </div>
                        <span className="font-display font-bold text-sm text-ink tabular-nums w-14 text-right">
                          ₹{item.price * quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upsell: Add a shake strip */}
                {!hasShakes() && (
                  <div className="p-3.5 rounded-[20px] bg-page border border-line">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-tomato" />
                      <span className="text-xs font-bold text-ink">
                        {CONTENT.drawer.upsellHeading}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {upsellShakes.map((shake) => (
                        <div
                          key={shake.id}
                          className="bg-surface rounded-[14px] p-2 border border-line/70 flex flex-col justify-between"
                        >
                          <div className="relative w-full aspect-square rounded-[8px] overflow-hidden bg-char/5 mb-1.5">
                            <Image
                              src={shake.image}
                              alt={shake.name}
                              fill
                              sizes="80px"
                              className="object-cover"
                              onError={(e) => {
                                ;(e.target as HTMLImageElement).src = getPlaceholderSvg(
                                  shake.name,
                                  "shakes",
                                  "#1C1513",
                                  "#D9381E"
                                )
                              }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-ink truncate">
                            {shake.name}
                          </span>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] font-semibold text-ink-soft tabular-nums">
                              ₹{shake.price}
                            </span>
                            <button
                              onClick={() => addItem(shake)}
                              className="w-5 h-5 rounded-full bg-tomato text-white flex items-center justify-center hover:bg-tomato-press active:scale-90"
                              aria-label={`Add ${shake.name}`}
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery or Pickup Segmented Control */}
                <div>
                  <div className="grid grid-cols-2 p-1 rounded-full bg-page border border-line">
                    <button
                      type="button"
                      onClick={() => setCustomerDetails({ mode: "delivery" })}
                      className={`py-2 rounded-full text-xs font-bold transition-all ${
                        customer.mode === "delivery"
                          ? "bg-surface text-ink shadow-xs"
                          : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      {CONTENT.drawer.modeDelivery}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerDetails({ mode: "pickup" })}
                      className={`py-2 rounded-full text-xs font-bold transition-all ${
                        customer.mode === "pickup"
                          ? "bg-surface text-ink shadow-xs"
                          : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      {CONTENT.drawer.modePickup}
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">
                      {CONTENT.drawer.nameLabel}
                    </label>
                    <input
                      type="text"
                      value={customer.name}
                      onChange={(e) => setCustomerDetails({ name: e.target.value })}
                      placeholder={CONTENT.drawer.namePlaceholder}
                      className="w-full h-11 px-3.5 rounded-[14px] bg-page border border-line text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-tomato focus:ring-1 focus:ring-tomato"
                    />
                  </div>

                  {customer.mode === "delivery" && (
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        {CONTENT.drawer.addressLabel}
                      </label>
                      <input
                        type="text"
                        value={customer.address}
                        onChange={(e) => setCustomerDetails({ address: e.target.value })}
                        placeholder={CONTENT.drawer.addressPlaceholder}
                        className="w-full h-11 px-3.5 rounded-[14px] bg-page border border-line text-sm text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-tomato focus:ring-1 focus:ring-tomato"
                      />
                    </div>
                  )}

                  {/* Timing Option */}
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">
                      {CONTENT.drawer.whenLabel}
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCustomerDetails({ when: "asap" })}
                        className={`flex-1 py-2 px-3 rounded-[12px] text-xs font-semibold border transition-all ${
                          customer.when === "asap"
                            ? "bg-char text-white border-char dark:bg-white dark:text-char"
                            : "bg-page border-line text-ink-soft hover:border-ink/20"
                        }`}
                      >
                        {CONTENT.drawer.whenAsap}
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomerDetails({ when: "later" })}
                        className={`flex-1 py-2 px-3 rounded-[12px] text-xs font-semibold border transition-all ${
                          customer.when === "later"
                            ? "bg-char text-white border-char dark:bg-white dark:text-char"
                            : "bg-page border-line text-ink-soft hover:border-ink/20"
                        }`}
                      >
                        {CONTENT.drawer.whenLater}
                      </button>
                    </div>

                    {customer.when === "later" && (
                      <input
                        type="text"
                        value={customer.timeString}
                        onChange={(e) =>
                          setCustomerDetails({ timeString: e.target.value })
                        }
                        placeholder="e.g. 8:30 PM tonight"
                        className="w-full h-10 px-3.5 mt-2 rounded-[12px] bg-page border border-line text-xs text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-tomato"
                      />
                    )}
                  </div>

                  {/* Note for kitchen toggle */}
                  <div>
                    {!showNote ? (
                      <button
                        type="button"
                        onClick={() => setShowNote(true)}
                        className="text-xs text-tomato font-semibold hover:underline"
                      >
                        {CONTENT.drawer.noteToggle}
                      </button>
                    ) : (
                      <div>
                        <label className="block text-xs font-bold text-ink mb-1">
                          Kitchen note
                        </label>
                        <input
                          type="text"
                          value={customer.note}
                          onChange={(e) => setCustomerDetails({ note: e.target.value })}
                          placeholder={CONTENT.drawer.notePlaceholder}
                          className="w-full h-10 px-3.5 rounded-[12px] bg-page border border-line text-xs text-ink placeholder:text-ink-soft/60 focus:outline-none focus:border-tomato"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Validation message banner if any */}
                {errorMessage && (
                  <div className="p-3 rounded-[14px] bg-tomato-tint border border-tomato/30 text-tomato text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Bill Breakdown */}
                <div className="pt-4 border-t border-line space-y-1.5 text-xs">
                  <div className="flex justify-between text-ink-soft">
                    <span>{CONTENT.drawer.subtotal}</span>
                    <span className="tabular-nums">₹{subtotal}</span>
                  </div>
                  {customer.mode === "delivery" && (
                    <div className="flex justify-between text-ink-soft">
                      <span>{CONTENT.drawer.delivery}</span>
                      <span className="text-basil font-semibold">
                        {CONFIG.deliveryFee === 0 ? CONTENT.drawer.free : `₹${CONFIG.deliveryFee}`}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm sm:text-base font-display font-extrabold text-ink pt-1.5 border-t border-line/60">
                    <span>{CONTENT.drawer.total}</span>
                    <span className="tabular-nums">₹{total}</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Drawer Fixed Footer CTA */}
          {items.length > 0 && (
            <div className="p-4 safe-bottom border-t border-line bg-surface">
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="w-full h-14 rounded-full bg-tomato hover:bg-tomato-press active:scale-[0.98] text-white font-display font-bold text-base shadow-warm-float flex items-center justify-center gap-2.5 transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>
                  {CONTENT.drawer.cta}, ₹{total}
                </span>
              </button>
              <p className="text-center text-[11px] text-ink-soft mt-2 font-medium">
                {CONTENT.drawer.confirmationNote}
              </p>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
