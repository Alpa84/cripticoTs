import { GeneralType } from "src/Types"

export const prefferName = (dir: string, general: GeneralType) => {
    let name = general.wallets[dir]
    return name ? name.alias : dir
}