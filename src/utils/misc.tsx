import { GeneralType } from 'src/Types'

const SmallScreenSize = 720

export const prefferName = (dir: string, general: GeneralType) => {
  let name = general.wallets[dir]
  return name ? name.alias : dir
}
export let isSmallScreen = () => window.innerWidth < SmallScreenSize
export function addDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
