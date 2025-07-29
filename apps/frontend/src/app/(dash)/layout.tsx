import { SessionProvider } from '@/src/providers/session.provider'

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SessionProvider>{children}</SessionProvider>
}
