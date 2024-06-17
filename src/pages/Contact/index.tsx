import { useThemeStore } from 'storage/theme'

import iconGithub from './assets/icon-github.png'
import iconYoutube from './assets/icon-youtube.png'
import iconLinkedin from './assets/icon-linkedin.png'
import iconInstagram from './assets/icon-instagram.png'

export const Contact = () => {
  const { theme } = useThemeStore()

  return (
    <>
      <div className="flex flex-col text-primary font-medium text-3xl">Contact</div>

      <div className="flex flex-col gap-5 mt-10">
        <a
          href="https://github.com/brunoandradebr"
          target="_blank"
          className="flex items-center gap-5 text-accent"
        >
          <img
            src={iconGithub}
            title="github"
            className={`w-[28px] ${theme === 'dark' && 'invert'}`}
          />
          /brunoandradebr
        </a>

        <a
          href="https://www.youtube.com/user/cloudandrade"
          target="_blank"
          className="flex items-center gap-5 text-accent"
        >
          <img
            src={iconYoutube}
            title="youtube"
            className={`w-[28px] ${theme === 'dark' && 'invert'}`}
          />
          /brunoandradebr
        </a>

        <a
          href="https://www.linkedin.com/in/brunoandradebr/"
          target="_blank"
          className="flex items-center gap-5 text-accent"
        >
          <img
            src={iconLinkedin}
            title="linkedin"
            className={`w-[28px] ${theme === 'dark' && 'invert'}`}
          />
          /brunoandradebr
        </a>

        <a
          href="https://www.instagram.com/brunoandradebr/"
          target="_blank"
          className="flex items-center gap-5 text-accent"
        >
          <img
            src={iconInstagram}
            title="instagram"
            className={`w-[28px] ${theme === 'dark' && 'invert'}`}
          />
          @brunoandradebr
        </a>
      </div>
    </>
  )
}
