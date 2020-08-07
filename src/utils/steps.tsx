import * as React from 'react'
import Link from 'src/components/Link';
import { Styles } from 'react-joyride';
import { tooltipStyles } from 'src/components/Tour';
import { Functions, TourName } from 'src/Types';
import { chainStepsObj } from './chainSteps';

export const generateSteps = (functions: Functions) => {
  let stepsObject = stepsFunc(functions)
  return Object.keys(stepsObject).sort((a, b) => parseInt(a, undefined) - parseInt(b, undefined))
    .map(key => stepsObject[key])
}

export const stepsFunc = (functions: Functions) => {
 return {
 '0': {
    content: (
    <div>
      <h2>Welcome!</h2>
      This site runs a crypto coin in your browser for you to experience and, if you dare, to hack...
    </div>
    ),
    target: '[data-tut="header"]',
    placement: 'bottom',
  },
  '1': {
    content: (
    <div>
      <p>In this tour we are going to: </p>
      <ul>
        <li>make a transaction</li>
        <li>publish it</li>
        <li>do some mining</li>
        <li>steal some coins</li>
      </ul>
    </div>
    ),
    target: '[data-tut="header"]',
    placement: 'bottom',
  },
  '2': {
    content: (
    <div>
      To do anything with a crypto coin you have to have a wallet. For that, you have to create a Public Address and a Private Key for yourself.
      Go ahead and click <b>generate a Public Address and a Private Key</b>
    </div>
    ),
    target: '[data-tut="keyPair"]',
    placement: 'right-start',
  },
  '3': {
    content: (
    <div>
      Your public address is like an email address. If anyone wants to send you a crypto-coin all they need to know is your public address.
      Your private key is like a password.You have to keep it secret. Anyone with your private key will be able to sell all your coins.
    </div>
    ),
    target: '[data-tut="onlyKeys"]',
    placement: 'right-start',
  },
  '4': {
    content: (
      <div>
        Now that you have a key pair, choose an < b > alias</b > for your public address and < b > generate a wallet</b >.
      </div>
    ),
    target: '[data-tut="keyPair"]',
    placement: 'right-start',
  },
  '5': {
    content: (
      <div>
        <p>Excellent!</p>
        <p>The data of your wallet will be stored here.</p>
      </div>
    ),
    target: '[data-tut="wallets"]',
    placement: 'left-start',
  },
  '6': {
    content: (
      <div>
        <p>
          So, how do you get some sweet coin?
    </p>
        <p>
          To own a coin you either have to generate one or have someone who has coins transfer you some. Every crypto coin out there had to be generated first.
    </p>
        <p>It will be easier having someone transfer you. So, who has coins?</p>
        <p>That information is in the <b>Blockchain</b>.</p>
        <p>We are going to take a look at it next.</p>
      </div>
    ),
    target: '[data-tut="wallets"]', // free
    placement: 'left-start',
  },
  '7': {
    content: (
      <div>
        <p>The Blockchain has a list of all the coin generations and all coin transactions for anyone to see.</p>
        <p> A generated coin is called a 'mined' coin, like when someone mines some gold and creates a gold coin with it. </p>
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '8': {
    content: (
      <div>
        <p>If user AlePan has mined 100 coins ( see <b>block 1</b> ) and has transferred 20 coins to Athena on <b>block 2</b>, how much does he have? </p>
        <p>That is how it is calculated. Instead of keeping track of how much everyone has, the blockchain stores information about all the transactions and mined coins.</p>
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '9': {
    content: (
      <div>
        <p>So, this AlePan has some coins. Anyone with his private key could make a transaction in his name and steal his coins.</p>
        <p>Lets take a look at the <b>wallets</b>.</p>
      </div>
    ),
    target: '[data-tut="blockchain"]', // free
    placement: 'right-start',
  },
  '10': {
    content: (
      <div>
        <p>They have everybody's private keys! You shouldn't share Private Keys with people you don't trust. We are only storing them here for showing how it all works.</p>
        <p>In fact, everything about crypto currencies is about trusting no one.</p>
      </div>
    ),
    target: '[data-tut="wallets"]',
    placement: 'left-start',
  },
  '11': {
    content: (
      <div>
        <p>If we are going to steal some coins form AlePan we will need his private key .</p>
        <p>Click <b>Copy Private Key</b>.</p>
      </div>
    ),
    target: '[data-tut="creatorPrivateKey"]',
    placement: 'left-start',
  },
  '12': {
    content: (
      <div>
        <p>Now that we have AlePan's secret key, lets make a transaction from AlePan to your public address.</p>
      </div>
    ),
    target: '[data-tut="publish"]', // Free
    placement: 'right-start',
  },
  '13': {
    content: (
      <div>
        <p>The first step is to publish the transaction.</p>
        <p>Choose <b>giver</b> (AlePan), <b>receiver</b> (you) and the <b>amount</b> to transfer. Be careful to choose an amount of coin that AlePan does have, if you don't everybody will ignore the transaction because they know how much everyone has.</p>
      </div>
    ),
    target: '[data-tut="publish"]',
    placement: 'right-start',
  },
  '14': {
    content: (
      <div>
        <p>We need the giver's private key to sign the transaction.</p>
        <p>Signing a transaction is producing a big number that is specific for that transaction, and can only be produced by using the giver's private key. </p>
        <p>Anyone can check the signature and be sure that it was made by the owner of both the <b>Public Address</b> and the <b>Private Key</b>.</p>
      </div>
    ),
    target: '[data-tut="publish"]',
    placement: 'right-start',
  },
  '15': {
    content: (
      <div>
        <p>Paste AlePan's key into the <b>giver's private key</b> and click on <b>Sign with private Key</b>.</p>
      </div>
    ),
    target: '[data-tut="publish"]',
    placement: 'right-start',
  },
  '16': {
    content: (
      <div>
        <p>To see how a signature is specific for a transaction, you can try the following: change the amount , sign it again and watch the signature change.</p>
      </div>
    ),
    target: '[data-tut="publish"]',
    placement: 'right-start',
  },
  '17': {
    content: (
      <div>
        <p>You have already signed the transaction as AlePan, but the money is not yours yet</p>
        <p>Now you have to publish the transaction. By publishing the transaction you are saying to everyone that you want that transaction included in the blockchain.</p>
        <p>Go ahead and <b> publish the transaction</b></p>
      </div>
    ),
    target: '[data-tut="publish"]',
    placement: 'right-start',
  },
  '18': {
    content: (
      <div>
        <p>OK, once the transaction is published, how does it get included in the blockchain?</p>
        <p>Enter Mining. A Miner takes all the published transactions that haven't already got in the chain and groups them in a block.</p>
      </div>
    ),
    target: '[data-tut="notIncludedYet"]',
    placement: 'right-start',
  },
  '19': {
    content: (
      <div>
        <p>So they just include the pending transactions block in the chain?</p>
        <p>Of course not, there is a catch.</p>
      </div>
    ),
    target: '[data-tut="notIncludedYet"]',
    placement: 'right-start',
  },
  '20': {
    content: (
      <div>
        <p>To be included in the blockchain every block has to include a number called a 'nonce'.</p>
        <p>By design that number is hard to figure out and unique for every block.</p>
        <p>So the all a miner does, is try different nonces until one just clicks</p>
      </div>
    ),
    target: '[data-tut="block"]',
    placement: 'right-start',
  },
  '26': {
    content: (
      <div>
        <p>Millions are spent trying to find the right nonce for new blocks. </p><p> Why work so hard? </p><p> The one who finds the right nonce gets the privilege of creating a new coin for himself.</p>
        <p>The first transaction of every block is a coin that the miner has generated for himself.</p>
        <p>It is a 'mined' coin.</p>
      </div>
    ),
    target: '[data-tut="block"]',
    placement: 'right-start',
  },
  '29': {
    content: (
      <div>
        <p>We are going to watch the miner grabbing the published transactions, packing them in a block and trying different numbers in the nonce until the hash starts with '00'.</p>
        <p>Ready?</p>
        <p>Select a <b>miner</b> and click <b>Start Mining</b></p>
      </div>
    ),
    target: '[data-tut="miningPlusBlockchain"]',
    placement: 'right-start',
  },
  '30': {
    content: (
      <div>
        <p>Did it happen too fast? </p><p>Click <b>Start Mining</b> again to see the generation of a new coin. If there are no transactions to be included the miner will just generate a new block with the creation of his new coin.</p>
        <p>Once the Miner finds the magic number for the <b>nonce</b>, he tells everybody that he has a new block, and everybody adds that new block to the chain.</p>
      </div>
    ),
    target: '[data-tut="miningPlusBlockchain"]',
    placement: 'right-start',
  },
  '31': {
    content: (
      <div>
        <p>That is it. That is what needs to happen for you to have some sweet coin.</p>
        <p>If you have followed the steps, you should see that the blockchain now says that AlePan gave you some amount of coin.</p>
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '32': {
    content: (
      <div>
        <p>How much everyone has can also be seen in the wallets, but the ground truth is always in the blockchain.</p>
      </div>
    ),
    target: '[data-tut="userWallet"]',
    placement: 'left-start',
  },
  '33': {
    content: (
      <div>
        <p>That is how far we are going to go with this tour.</p>
        <p>If you want to understand how the blockchain design works you can take the <b>Blockchain Tour</b></p>
        <button
          onClick={functions.introToChainDirect}
          className="btn btn-primary">Take the Blockchain Tour</button>
        <p>Also, there are a bunch of things you can explore by yourself.</p>
        <p>The <b>Blockchain</b> is fully editable.</p>
        <p>You can try modifying the chain info and reading the warnings that will appear to get a feel of the security measures implemented in the blockchain.</p>
        <p>Thanks for joining!</p>
        <ul>
          <li>
            <Link href="/AlePan" text="About me" />
          </li>
          <li>
            <Link href="/en" text="Other projects" />
          </li>
        </ul>
      </div>
    ),
    styles: {
      ...tooltipStyles,
      buttonNext: { display: 'none'}
    } as Styles,
    target: '[data-tut="userWallet"]', // free
    placement: 'left-start',
  },
 }
}
export const stepKeys: string[] = Object.keys(stepsFunc({} as Functions))

export const stepIndexToKey =  (ind: number ) => {
  return stepKeys.sort((a, b) => parseInt(a, undefined) - parseInt(b, undefined))[ind]
}
export const stepKeyToIndex =  (key: string, tourName: TourName) => {
  if(tourName === TourName.Chain){
    return Object.keys(chainStepsObj).sort((a, b) => parseInt(a, undefined) - parseInt(b, undefined)).indexOf(key)
  } else {
    return stepKeys.sort((a, b) => parseInt(a, undefined) - parseInt(b, undefined)).indexOf(key)
  }
}