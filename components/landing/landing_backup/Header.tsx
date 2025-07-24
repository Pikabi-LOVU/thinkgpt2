'use client'

import React from 'react'
import { Brain } from 'lucide-react'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-gray-950 z-[9999] border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-white">ThinkGPT</span>
          </div>
        </nav>
      </div>
    </header>
  )
}