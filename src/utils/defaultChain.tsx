import { Block } from "src/Types"
const FirstMinerPrivateKey = '65537,32738739318480270880847344601765335773851669760144296954546538700397943059327'
const FirstMinerPublicAddress = '1928746700469236093671538177020857857720733381331271737456327216724741025401,32738739318480270880847344601765335773851669760144296954546538700397943059327'

export const DefaultWallets = { [FirstMinerPublicAddress]: { alias: 'lolo', privateKey: FirstMinerPrivateKey } }

export const DefaultChain: Block[] = [
    {
        nonce: '75',
        previousBlockHash: '',
        transactions: [
            {
                amount: 1,
                gives: 'mined',
                receives: FirstMinerPublicAddress,
                signature: ''
                // a mined coin does not require signature
            },
        ],
    }
]
