import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeStore {
  theme: string
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    set => ({
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
      toggleTheme: () => {
        const currentTheme = useThemeStore.getState().theme === 'dark' ? 'light' : 'dark'
        set({ theme: currentTheme })
        document.querySelector('html')?.setAttribute('data-theme', currentTheme)
      },
    }),
    { name: 'acobaia-theme' },
  ),
)
