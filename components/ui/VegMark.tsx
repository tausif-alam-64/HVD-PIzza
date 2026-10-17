import React from "react"

export function VegMark({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center border-[1.5px] border-basil rounded-xs bg-white p-[2px] ${className}`}
      aria-label="Vegetarian"
      role="img"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-basil inline-block" />
    </span>
  )
}
