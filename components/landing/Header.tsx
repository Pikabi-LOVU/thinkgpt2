'use client'

import React from 'react'
import Image from 'next/image'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-gray-950 z-[9999] border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center">
          <div className="flex items-center">
            <Image 
              src="/think-talk_logo.png" 
              alt="생각톡" 
              width={120} 
              height={40} 
              className="h-10 w-auto"
              priority
            />
          </div>
        </nav>
      </div>
    </header>
  )
}