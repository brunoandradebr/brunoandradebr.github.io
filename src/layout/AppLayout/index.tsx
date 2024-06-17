import React from 'react'

import { useThemeStore } from 'storage/theme'

import { Outlet } from 'react-router-dom'

import { Menu } from 'components'

export const AppLayout = () => {
  const { theme } = useThemeStore()

  React.useEffect(() => {
    document.querySelector('html')?.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="flex flex-col max-w-[1480px] mx-auto">
      <Menu />

      <div className="p-10">
        <Outlet />
      </div>
    </div>
  )
}
