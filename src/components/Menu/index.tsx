import { useThemeStore } from 'storage/theme'

import { Link, useLocation } from 'react-router-dom'

import meIcon from './assets/icon/icon-me.png'
import experimentsIcon from './assets/icon/icon-experiments.png'
import contactIcon from './assets/icon/icon-contact.png'
import sunIcon from './assets/icon/icon-sun.png'
import moonIcon from './assets/icon/icon-moon.png'

const menuStructure = [
  {
    id: 'home',
    title: 'About',
    pathname: '/',
    icon: meIcon,
  },
  {
    id: 'experiments',
    title: 'Experiments',
    pathname: '/experiments',
    icon: experimentsIcon,
  },
  {
    id: 'contact',
    title: 'Contact',
    pathname: '/contact',
    icon: contactIcon,
  },
]

export const Menu = () => {
  const { pathname } = useLocation()

  const { theme, toggleTheme } = useThemeStore()

  const menuLinkClassNames = 'transition-opacity hover:opacity-100'

  return (
    <div className="flex items-center pr-5">
      <div className="relative flex flex-1 flex-row shrink-0 items-center ml-10 py-8 gap-8 after:h-[1px] after:w-[100%] after:bg-gradient-to-r from-transparent via-header-border via-40% to-transparent after:absolute after:bottom-0">
        {menuStructure.map(link => {
          const isActive = pathname === link.pathname
          const activeClassNames = isActive ? 'opacity-100 animate-float' : 'opacity-40'

          return (
            <Link
              key={link.id}
              className={`${menuLinkClassNames} ${activeClassNames}`}
              title={link.title}
              to={{ pathname: link.pathname }}
            >
              <img src={link.icon} />
            </Link>
          )
        })}
      </div>

      <div className="cursor-pointer select-none" title={'toggle theme'}>
        <img
          className={`w-[42px] transition-all duration-700 ${
            theme === 'dark' ? 'invert rotate-180' : 'rotate-0'
          }`}
          src={theme === 'dark' ? sunIcon : moonIcon}
          onClick={() => toggleTheme()}
        />
      </div>
    </div>
  )
}
