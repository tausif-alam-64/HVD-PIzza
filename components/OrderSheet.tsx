"use client"

import React, { useState } from "react"
import Image from "next/image"
import { Drawer } from "vaul"
import { X, Plus, Minus, MessageCircle, AlertCircle, Sparkles, ShieldCheck } from "lucide-react"
import { useOrderStore } from "@/lib/store"
import { CONFIG } from "@/lib/config"
import { CONTENT } from "@/lib/content"
import { MENU_ITEMS } from "@/lib/menu"
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

  const upsellShakes = MENU_ITEMS.filter((m) => m.category === "shakes" && m.upsell).slice(0, 3)

  const handlePlaceOrder = () => {
    if (!customer.name.trim()) {
      setErrorMessage("Please enter your name so the kitchen knows who to deliver to.")
      return
    }
    if (customer.mode === "delivery" && !customer.address.trim()) {
      setErrorMessage("Please enter your quarter number or colony address for delivery.")
      return
    }

    setErrorMessage(null)
    const code = generateOrderCode()
    const message = generateWhatsAppMessage(code)
    setLastPlacedOrderCode(code)

    const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(waUrl, "_blank")
  }

  const subtotal = getSubtotal()
  const total = getTotal()

  return (
    <Drawer.Root open={isOpen} onOpenChange={setDrawerOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-slate-950/60 z-50 backdrop-blur-xs transition-opacity" />
        <Drawer.Content className="fixed bottom-0 inset-x-0 z-50 max-h-[92dvh] flex flex-col bg-surface rounded-t-[30px] border-t border-line text-ink outline-none">
          {/* Top Grab Handle */}
          <div className="pt-3.5 pb-2 flex items-center justify-center">
            <div className="w-12 h-1.5 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>

          {/* Drawer Header */}
          <div className="px-5 py-3 border-b border-line flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Drawer.Title className="font-display font-black text-xl text-ink">
                Review Your Order
              </Drawer.Title>
              <span className="px-2 py-0.5 rounded-full bg-basil-tint text-basil text-[10px] font-bold border border-basil/20">
                Pure Veg
              </span>
            </div>
            <button
              onClick={() => setDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-ink-soft hover:text-ink active:scale-95 cursor-pointer"
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
                <p className="text-sm font-semibold">{CONTENT.drawer.empty}</p>
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
                          <p className="font-display font-black text-sm sm:text-base text-ink">
                            {item.name}
                          </p>
                          <p className="text-xs text-ink-soft font-semibold tabular-nums">
                            ₹{item.price}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="h-8 px-1.5 rounded-lg bg-tomato-tint border border-tomato/30 flex items-center gap-2">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="w-5 h-5 rounded-md bg-surface text-ink hover:text-tomato flex items-center justify-center transition-colors shadow-xs active:scale-90 cursor-pointer"
                            aria-label={`Decrease ${item.name}`}
                          >
                            <Minus className="w-2.5 h-2.5 stroke-[3]" />
                          </button>
                          <span className="font-black text-xs text-tomato tabular-nums min-w-[12px] text-center">
                            {quantity}
                          </span>
                          <button
                            onClick={() => addItem(item)}
                            className="w-5 h-5 rounded-md bg-tomato text-white flex items-center justify-center hover:bg-tomato-hover transition-colors shadow-xs active:scale-90 cursor-pointer"
                            aria-label={`Increase ${item.name}`}
                          >
                            <Plus className="w-2.5 h-2.5 stroke-[3]" />
                          </button>
                        </div>
                        <span className="font-display font-black text-sm text-ink tabular-nums w-14 text-right">
                          ₹{item.price * quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Upsell: Add a shake strip */}
                {!hasShakes() && (
                  <div className="p-3.5 rounded-[20px] bg-slate-50 dark:bg-slate-900 border border-line">
                    <div className="flex items-center gap-1.5 mb-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-tomato" />
                      <span className="text-xs font-bold text-ink">
                        Pair with a chilled thick shake?
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {upsellShakes.map((shake) => (
                        <div
                          key={shake.id}
                          className="bg-surface rounded-[14px] p-2 border border-line flex flex-col justify-between card-shadow"
                        >
                          <div className="relative w-full aspect-square rounded-[8px] overflow-hidden bg-slate-100 mb-1.5">
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
                                  "#09090B",
                                  "#E11D48"
                                )
                              }}
                            />
                          </div>
                          <span className="text-[11px] font-bold text-ink truncate">
                            {shake.name}
                          </span>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-[10px] font-black text-ink-soft tabular-nums">
                              ₹{shake.price}
                            </span>
                            <button
                              onClick={() => addItem(shake)}
                              className="w-5 h-5 rounded-md bg-tomato text-white flex items-center justify-center hover:bg-tomato-hover active:scale-90 cursor-pointer"
                              aria-label={`Add ${shake.name}`}
                            >
                              <Plus className="w-3 h-3 stroke-[3]" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Delivery or Pickup Segmented Control */}
                <div>
                  <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-line">
                    <button
                      type="button"
                      onClick={() => setCustomerDetails({ mode: "delivery" })}
                      className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        customer.mode === "delivery"
                          ? "bg-surface text-ink shadow-xs"
                          : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      Delivery (Colony)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCustomerDetails({ mode: "pickup" })}
                      className={`py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        customer.mode === "pickup"
                          ? "bg-surface text-ink shadow-xs"
                          : "text-ink-soft hover:text-ink"
                      }`}
                    >
                      Self Pickup
                    </button>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">
                      Your Full Name <span className="text-tomato">*</span>
                    </label>
                    <input
                      type="text"
                      value={customer.name}
                      onChange={(e) => setCustomerDetails({ name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-line text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-tomato focus:ring-1 focus:ring-tomato font-medium"
                    />
                  </div>

                  {customer.mode === "delivery" && (
                    <div>
                      <label className="block text-xs font-bold text-ink mb-1">
                        Quarter No. / Colony Block <span className="text-tomato">*</span>
                      </label>
                      <input
                        type="text"
                        value={customer.address}
                        onChange={(e) => setCustomerDetails({ address: e.target.value })}
                        placeholder="e.g. Type-II, Qtr 142 or Near Hospital Sector"
                        className="w-full h-11 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-line text-sm text-ink placeholder:text-ink-subtle focus:outline-none focus:border-tomato focus:ring-1 focus:ring-tomato font-medium"
                      />
                    </div>
                  )}

                  {/* Timing Option */}
                  <div>
                    <label className="block text-xs font-bold text-ink mb-1">
                      Delivery Timing
                    </label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setCustomerDetails({ when: "asap" })}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          customer.when === "asap"
                            ? "bg-ink text-white border-ink dark:bg-white dark:text-ink"
                            : "bg-slate-50 border-line text-ink-soft hover:border-ink/20"
                        }`}
                      >
                        As soon as possible
                      </button>
                      <button
                        type="button"
                        onClick={() => setCustomerDetails({ when: "later" })}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          customer.when === "later"
                            ? "bg-ink text-white border-ink dark:bg-white dark:text-ink"
                            : "bg-slate-50 border-line text-ink-soft hover:border-ink/20"
                        }`}
                      >
                        Later today
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
                        className="w-full h-10 px-3.5 mt-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-line text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-tomato font-medium"
                      />
                    )}
                  </div>

                  {/* Note for kitchen toggle */}
                  <div>
                    {!showNote ? (
                      <button
                        type="button"
                        onClick={() => setShowNote(true)}
                        className="text-xs text-tomato font-bold hover:underline cursor-pointer"
                      >
                        + Add cooking or delivery instructions
                      </button>
                    ) : (
                      <div>
                        <label className="block text-xs font-bold text-ink mb-1">
                          Cooking or gate notes
                        </label>
                        <input
                          type="text"
                          value={customer.note}
                          onChange={(e) => setCustomerDetails({ note: e.target.value })}
                          placeholder="e.g. Extra crispy, less spice, call on arrival"
                          className="w-full h-10 px-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-line text-xs text-ink placeholder:text-ink-subtle focus:outline-none focus:border-tomato font-medium"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Validation message banner if any */}
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-tomato-tint border border-tomato/30 text-tomato text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Bill Breakdown with clean receipt aesthetic */}
                <div className="pt-4 border-t border-line space-y-2 text-xs">
                  <div className="flex justify-between text-ink-soft font-medium">
                    <span>Item Total</span>
                    <span className="tabular-nums">₹{subtotal}</span>
                  </div>
                  {customer.mode === "delivery" && (
                    <div className="flex justify-between text-ink-soft font-medium">
                      <span>Sanghipuram Colony Delivery</span>
                      <span className="text-basil font-bold">
                        {CONFIG.deliveryFee === 0 ? "FREE" : `₹${CONFIG.deliveryFee}`}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-display font-black text-ink pt-2 border-t border-line/60">
                    <span>Grand Total</span>
                    <span className="tabular-nums text-tomato">₹{total}</span>
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
                className="w-full h-14 rounded-2xl bg-tomato hover:bg-tomato-hover active:scale-[0.98] text-white font-display font-black text-base shadow-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer uppercase tracking-wider"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Place Order on WhatsApp • ₹{total}</span>
              </button>
              <div className="flex items-center justify-center gap-1.5 text-center text-[11px] text-ink-soft mt-2 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-basil" />
                <span>Direct Kitchen Confirmation via WhatsApp</span>
              </div>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
