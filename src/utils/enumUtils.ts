import { Exterior } from '@/enum'

export const getExteriorForStorage = async (): Promise<Exterior> => {
  const { exterior } = (await chrome.storage.sync.get('exterior')) as ChromeStorageData
  switch (exterior) {
    case 0:
      return Exterior.Light
    case 1:
      return Exterior.Dark
    default:
      return Exterior.Auto
  }
}

export const getExteriorDisplacement = (model: Exterior): string => {
  const num: number = 100 / 3
  switch (model) {
    case Exterior.Light:
      return '0%'
    case Exterior.Dark:
      return `${num}%`
    default:
      return `${num * 2}%`
  }
}
