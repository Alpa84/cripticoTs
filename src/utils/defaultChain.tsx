import { Block, Transaction } from "src/Types"
const CreatorPublicAddress = '1928746700469236093671538177020857857720733381331271737456327216724741025401,32738739318480270880847344601765335773851669760144296954546538700397943059327'
const CreatorPrivateKey = '65537,32738739318480270880847344601765335773851669760144296954546538700397943059327'

const FirstUserPublicAddress = '2429591038702207169527055321287347260698030400419129219397402631555421258249,54334791982059904886297432039313727154330513618477202451099219546996291545379'
const FirstUserPrivateKey = '65537,54334791982059904886297432039313727154330513618477202451099219546996291545379'

const MinerPublicAddress = '6903091057055691620190409836592864034155157352240690898723914094557322355713,68010805563177820461878967146841029797048825961202715976920079656059109223683'
const MinerPrivateKey = '65537,68010805563177820461878967146841029797048825961202715976920079656059109223683'

export const DefaultWallets = {
    [CreatorPublicAddress]: { alias: 'AlePan', privateKey: CreatorPrivateKey },
    [FirstUserPublicAddress]: { alias: 'Athena', privateKey: FirstUserPrivateKey },
    [MinerPublicAddress]: { alias: 'SomeUser', privateKey: MinerPrivateKey },
}

export const DefaultChain: Block[] = [
    {
        nonce: '75',
        previousBlockHash: '',
        transactions: [
            {
                amount: 1,
                gives: 'mined',
                receives: CreatorPublicAddress,
                signature: ''
                // a mined coin does not require signature
            },
        ],
    },
    {
        nonce: '121',
        previousBlockHash: '005d0a494e618e052cb3fd683cebe954',
        transactions: [
            {
                amount: 1,
                gives: 'mined',
                receives: MinerPublicAddress,
                signature: ''
            },
            {
                amount: 0.2,
                gives: CreatorPublicAddress,
                receives: FirstUserPublicAddress,
                signature: '23910372707287407453649144988419849450818779848466113454171123480163117208754'
            },
        ],
    },
]
export const DefaultEmptyTransaction: Transaction  = {
    amount: 0,
    gives: '',
    receives: '',
    signature: '',
}

