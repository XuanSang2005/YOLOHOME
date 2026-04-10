import { Outlet } from '@tanstack/react-router'
import Header from './Header'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#e6e2d2]">
      <Header />
      <main className="flex-1 px-4 sm:px-8 lg:px-14 pb-8 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
