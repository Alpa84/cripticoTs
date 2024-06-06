import { Block, Transaction } from '../Types'
export const CreatorPublicAddress =
  '1928746700469236093671538177020857857720733381331271737456327216724741025401,32738739318480270880847344601765335773851669760144296954546538700397943059327'
const CreatorPrivateKey =
  '65537,32738739318480270880847344601765335773851669760144296954546538700397943059327'

const FirstUserPublicAddress =
  '2429591038702207169527055321287347260698030400419129219397402631555421258249,54334791982059904886297432039313727154330513618477202451099219546996291545379'
const FirstUserPrivateKey =
  '65537,54334791982059904886297432039313727154330513618477202451099219546996291545379'

const MinerPublicAddress =
  '6903091057055691620190409836592864034155157352240690898723914094557322355713,68010805563177820461878967146841029797048825961202715976920079656059109223683'
const MinerPrivateKey =
  '65537,68010805563177820461878967146841029797048825961202715976920079656059109223683'

export const LazyPublicAddress =
  '26024070825269641045251129171501649471474427805858913461501928594903095931873,76419909027497825306148546129254574846508876528270310624232190234245930634063'
export const LazyPrivateKey =
  '65537,76419909027497825306148546129254574846508876528270310624232190234245930634063'
export const LazyAlias = 'la-Z boy'

export const DefaultWallets = {
  [MinerPublicAddress]: { alias: 'SomeUser', privateKey: MinerPrivateKey },
  [FirstUserPublicAddress]: {
    alias: 'Athena',
    privateKey: FirstUserPrivateKey,
  },
  [CreatorPublicAddress]: { alias: 'AlePan', privateKey: CreatorPrivateKey },
}
export const Mined = 'mined'
export const DefaultChain: Block[] = [
  {
    nonce: '433',
    previousBlockHash: '',
    transactions: [
      {
        amount: 100,
        gives: Mined,
        receives: CreatorPublicAddress,
        signature: '',
        // a mined coin does not require signature
      },
    ],
  },
  {
    nonce: '104',
    previousBlockHash: '002ad067d829079ff31e6df090228f7c',
    transactions: [
      {
        amount: 100,
        gives: Mined,
        receives: MinerPublicAddress,
        signature: '',
      },
      {
        amount: 20,
        gives: CreatorPublicAddress,
        receives: FirstUserPublicAddress,
        signature:
          '5473174752784867862248874001086504892202029064443007835117631946601240039121',
      },
    ],
  },
]
export const DefaultEmptyTransaction: Transaction = {
  amount: 0,
  gives: '',
  receives: '',
  signature: '',
}
export const DefaultEmptyBlock: Block = {
  nonce: '',
  previousBlockHash: '',
  transactions: [],
}
