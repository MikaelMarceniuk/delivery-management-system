'use client'

import { SidebarTrigger } from './ui/sidebar'

export function AppHeader() {
  return (
    <div className="flex items-center h-8">
      <SidebarTrigger />
    </div>
  )
}
