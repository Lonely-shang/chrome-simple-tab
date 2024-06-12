import { Exterior } from '@/enum'
import { getExteriorForStorage } from './enumUtils'

const themeMedia = window.matchMedia('(prefers-color-scheme: light)')

export const changeTheme = async () => {
  const exterior: Exterior = await getExteriorForStorage()
  setTheme(exterior)
}

export const setModelTheme = (exterior: number) =>
  chrome.storage.sync.set({
    exterior
  })

const setTheme = (exterior: Exterior) => {
  removeAutoTheme()
  switch (exterior) {
    case Exterior.Light:
      setLightTheme()
      break
    case Exterior.Dark:
      setDarkTheme()
      break
    default:
      setAutoTheme()
      break
  }
}

const setAutoTheme = () => {
  initTheme(themeMedia.matches)
  themeMedia.addEventListener('change', setAutoThemeCallBack)
}

const removeAutoTheme = () => {
  themeMedia.removeEventListener('change', setAutoThemeCallBack)
}

const setAutoThemeCallBack = (theme: MediaQueryListEvent) => initTheme(theme.matches)

const initTheme = (model: boolean) => (model ? setLightTheme() : setDarkTheme())

const setLightTheme = () => {
  document.documentElement.classList.remove('dark')
}

const setDarkTheme = () => {
  document.documentElement.classList.add('dark')
}
