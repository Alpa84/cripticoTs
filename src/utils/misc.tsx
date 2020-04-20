import { GeneralType } from "src/Types"

export const prefferName = (dir: string, general: GeneralType) => {
    let name = general.wallets[dir]
    return name ? name.alias : dir
}
export function addDelay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}