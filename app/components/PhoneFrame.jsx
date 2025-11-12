'use client'

import Image from 'next/image'

export default function PhoneFrame({ src, alt = 'App screenshot', fit = 'contain' }) {
  // Responsive, tall phone frame with a notch and subtle bezel.
  // Height scales per breakpoint to better showcase full images.
  return (
    <div className="relative mx-auto h-[540px] w-full max-w-[340px] md:h-[720px] md:max-w-[380px] xl:h-[860px] xl:max-w-[420px]">
      {/* Outer phone body */}
      <div className="absolute inset-0 rounded-[40px] border border-zinc-300 bg-zinc-900 shadow-2xl">
        {/* Inner bezel */}
        <div className="absolute inset-[10px] rounded-[32px] bg-black">
          {/* Notch */}
          <div className="absolute left-1/2 top-0 h-6 w-40 -translate-x-1/2 rounded-b-2xl bg-zinc-900"></div>

          {/* Screen */}
          <div className="absolute inset-[14px] rounded-[24px] bg-black overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={src}
                alt={alt}
                fill
                priority
                className={fit === 'cover' ? 'object-cover' : 'object-contain'}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


