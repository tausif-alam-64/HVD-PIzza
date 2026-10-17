"use client"

import React, { useState } from "react"
import { Check, Copy, MessageCircle, RotateCcw, X } from "lucide-react"
import { useOrderStore } from "@/lib/store"
import { CONFIG } from "@/lib/config"
import { CONTENT } from "@/lib/content"

export function ConfirmationModal() {
  const lastCode = useOrderStore((s) => s.lastPlacedOrderCode)
  const setLastPlacedOrderCode = useOrderStore((s) => s.setLastPlacedOrderCode)
  const clearOrder = useOrderStore((s) => s.clearOrder)
  const saveCurrentAsUsual = useOrderStore((s) => s.saveCurrentAsUsual)
  const generateWhatsAppMessage = useOrderStore((s) => s.generateWhatsAppMessage)
  const items = useOrderStore((s) => s.items)
  const getTotal = useOrderStore((s) => s.getTotal)

  const [copied, setCopied] = useState(false)

  if (!lastCode || items.length === 0) return null

  const messageText = generateWhatsAppMessage(lastCode)
  const waUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(messageText)}`
  const total = getTotal()

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(messageText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const handleSentConfirmation = () => {
    saveCurrentAsUsual(lastCode)
    clearOrder()
  }

  const handleStartOver = () => {
    clearOrder()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end sm:items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div className="bg-surface text-ink w-full max-w-md rounded-t-[28px] sm:rounded-[28px] border border-line p-5 sm:p-6 shadow-2xl relative max-h-[92dvh] overflow-y-auto">
        <button
          onClick={() => setLastPlacedOrderCode(null)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-page flex items-center justify-center text-ink-soft hover:text-ink active:scale-95"
          aria-label="Dismiss confirmation"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Checkmark Icon & Title */}
        <div className="text-center pt-2 pb-4">
          <div className="w-14 h-14 rounded-full bg-emerald-100 text-basil mx-auto flex items-center justify-center mb-3">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink leading-tight mb-1">
            {CONTENT.confirmation.title}
          </h2>
          <p className="text-xs sm:text-sm text-ink-soft max-w-xs mx-auto">
            {CONTENT.confirmation.subtitle}
          </p>
        </div>

        {/* Order Summary Receipt Box */}
        <div className="bg-page rounded-[18px] p-4 border border-line my-4 font-mono text-xs space-y-2">
          <div className="flex justify-between font-bold text-ink border-b border-line pb-2">
            <span>Order #{lastCode}</span>
            <span className="text-tomato">Sanghipuram Kitchen</span>
          </div>

          <div className="space-y-1 py-1">
            {items.map((i) => (
              <div key={i.item.id} className="flex justify-between text-ink-soft">
                <span>
                  {i.quantity} × {i.item.name}
                </span>
                <span className="tabular-nums">₹{i.item.price * i.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-bold text-sm text-ink pt-2 border-t border-line">
            <span>Total</span>
            <span className="tabular-nums">₹{total}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full h-12 rounded-full bg-basil hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>{CONTENT.confirmation.openAgain}</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full h-11 rounded-full bg-page hover:bg-surface border border-line text-ink font-semibold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-basil" />
                <span className="text-basil font-bold">{CONTENT.confirmation.copied}</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-ink-soft" />
                <span>{CONTENT.confirmation.copyOrder}</span>
              </>
            )}
          </button>

          <button
            onClick={handleSentConfirmation}
            className="w-full h-12 rounded-full bg-tomato hover:bg-tomato-press text-white font-bold text-sm shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span>{CONTENT.confirmation.sentConfirmation}</span>
          </button>
          <p className="text-center text-[10px] text-ink-soft/80 font-medium">
            {CONTENT.confirmation.sentNotice}
          </p>

          <button
            onClick={handleStartOver}
            className="w-full py-2 text-center text-xs text-ink-soft hover:text-ink font-medium"
          >
            {CONTENT.confirmation.startOver}
          </button>
        </div>
      </div>
    </div>
  )
}
