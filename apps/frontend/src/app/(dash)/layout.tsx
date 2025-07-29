import { AppHeader } from '@/src/components/app-header'
import { AppSidebar } from '@/src/components/app-sidebar'
import { SidebarProvider } from '@/src/components/ui/sidebar'
import { SessionProvider } from '@/src/providers/session.provider'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <div className="rounded w-full m-2">
          <AppHeader />
          <main className="h-full">{children}</main>
        </div>
      </SidebarProvider>
    </SessionProvider>
  )
}
