'use client'

import { useState, useMemo } from 'react'
import PhoneFrame from '../PhoneFrame'

function renderBullets(bullets) {
  if (!bullets) return null

  // Support formats:
  // 1) Array of strings
  // 2) Array of { heading, text }
  // 3) Object: { Heading: description }
  const items = Array.isArray(bullets)
    ? bullets.map((b) => (typeof b === 'string' ? { heading: undefined, text: b } : b))
    : Object.entries(bullets).map(([heading, text]) => ({ heading, text }))

  return (
    <ul className="mt-4 space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex gap-2 text-zinc-700">
          <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]"></span>
          <div>
            {item.heading ? (
              <div className="font-medium text-zinc-900">{item.heading}</div>
            ) : null}
            <div className="text-sm leading-6 text-zinc-700">{item.text}</div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default function Carousel({ sectionTitle, slides }) {
  const [index, setIndex] = useState(0)
  const count = slides?.length ?? 0

  const safeIndex = useMemo(() => (count ? Math.min(Math.max(index, 0), count - 1) : 0), [index, count])
  const slide = count ? slides[safeIndex] : undefined

  function prev() {
    setIndex((i) => (i - 1 + count) % count)
  }

  function next() {
    setIndex((i) => (i + 1) % count)
  }

  if (!count) return null

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-zinc-900">{sectionTitle}</h2>
        <div className="text-sm text-zinc-600">
          {safeIndex + 1} / {count}
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div className="flex items-center justify-center">
            {slide?.image ? (
              <PhoneFrame src={slide.image} alt={slide?.title ?? 'Slide image'} fit="contain" />
            ) : null}
          </div>
          <div className="flex flex-col">
            <div className="text-2xl font-semibold text-zinc-950">{slide?.title}</div>
            {/* {slide?.description ? (
              <p className="mt-2 text-sm leading-6 text-zinc-700">{slide.description}</p>
            ) : null} */}
            {renderBullets(slide?.bullets)}

            <div className="mt-auto flex gap-3 pt-8">
              <button
                onClick={prev}
                className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                aria-label="Previous slide"
              >
                Prev
              </button>
              <button
                onClick={next}
                className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
                aria-label="Next slide"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


