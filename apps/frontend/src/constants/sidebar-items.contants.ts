import { Home, Package, Truck } from 'lucide-react'

const sidebarItems = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: Home,
  },
  {
    title: 'Motoristas',
    url: '/drivers',
    icon: Truck,
  },
  {
    title: 'Pacotes',
    url: '#',
    icon: Package,
  },
] as const

export default sidebarItems
