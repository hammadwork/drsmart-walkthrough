'use client'

import { useState } from 'react'
import Image from 'next/image'
import Carousel from './carousel/Carousel'
import sampleWalkthrough from '../data/sampleWalkthrough'

export default function Walkthrough({ data = sampleWalkthrough }) {
  const sections = data?.sections ?? []
  const [activeIndex, setActiveIndex] = useState(0)

  if (!sections.length) {
    return (
      <div className="w-full py-20 text-center text-zinc-600">
        No sections to display.
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Foodclick" width={140} height={32} />
            <span className="hidden text-sm font-medium text-zinc-600 sm:inline">DrSmart Walkthrough</span>
          </div>
        </header>

        <nav className="mb-6 overflow-x-auto">
          <ul className="flex min-w-max gap-2">
            {sections.map((section, idx) => (
              <li key={section.key}>
                <button
                  onClick={() => setActiveIndex(idx)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    idx === activeIndex
                      ? 'bg-[var(--primary)] text-white'
                      : 'bg-white text-zinc-700 hover:bg-zinc-100'
                  } border border-zinc-200`}
                >
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <Carousel
          key={sections[activeIndex].key}
          sectionTitle={sections[activeIndex].title}
          slides={sections[activeIndex].slides}
        />
      </div>
    </div>
  )
}


