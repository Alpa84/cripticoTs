import * as React from 'react'
import Link from 'src/components/Link';

type StepPosition = 'top' | 'right' | 'bottom' | 'left' | 'center'
let top: string = "top";
let topT: StepPosition = top as StepPosition

export const steps = [
 {
    content: () => (
    <div>
      <h2>Welcome!</h2>
      This site runs a crypto coin in your browser for you to experience and, if you dare, to hack...
    </div>
    ),
    selector: '[data-tut="header"]',
  },
  {
    content: () => (
    <div>
      <p>In this tour we are going to: </p>
      <ul>
        <li>steal some coins,</li>
        <li>make a transaction,</li>
        <li>publish it,</li>
        <li>do some mining,</li>
        <li>explore how the blockchain works.</li>
      </ul>
    </div>
    ),
    selector: '[data-tut="header"]',
  },
  {
    content: () => (
    <div>
      To do anything with a crypto coin you have to have a wallet. For that, you have to generate a Public Address and a Private Key.
      Your public address is like an email address. If anyone wants to send you a crypto-coin all they need to know is your public address.
      Your private key is like a password.You have to keep it secret.Anyone with your private key will be able to sell all your coins.
      Go ahead and click <b>generate a Public Address and a Private Key</b>
    </div>
    ),
    selector: '[data-tut="keyPair"]',
  },
  {
    action: (node: any) => {
      node.focus()
    },
    position: topT,
    content: () => (
      <div>
        Now that you have a key pair, choose an < b > alias</b > for your public address and < b > generate a wallet</b >.
      </div>
    ),
    selector: '[data-tut="keyPair"]',
  },
  {
    content: () => (
      <div>
        <p>Excellent!</p>
        <p>The data of your wallet will be stored here.</p>
      </div>
    ),
    selector: '[data-tut="wallets"]',
  },
  {
    content: () => (
      <div>
        <p>
          So, how do you get some sweet coin?
    </p>
        <p>
          To own a coin you either have to generate one or have someone who has coins transfer you some. Every crypto coin out there had to be generated first.
    </p>
        <p>It will be easier having someone transfer you. So, who has coins? That information is in the <b>Blockchain</b>.</p>
      </div>
    ),
    altSelector: 'wallets',
  },
  {
    content: () => (
      <div>
        <p>The Blockchain has a list of all the coin generations and all coin transactions for anyone to see.</p>
        <p> A generated coin is called a 'mined' coin, like when someone mines some gold and creates a gold coin with it. </p>
      </div>
    ),
    selector: '[data-tut="blockchain"]',
  },
  {
    content: () => (
      <div>
        <p>If user AlePan has mined 100 coins ( see <b>block 1</b> ) and has transferred 20 coins to Athena on <b>block 2</b>, how much does he have? </p>
        <p>That is how it is calculated. Instead of keeping track of how much everyone has, the blockchain stores information about all the transactions and mined coins.</p>
      </div>
    ),
    selector: '[data-tut="blockchain"]',
  },
  {
    content: () => (
      <div>
        <p>So, this AlePan has some coins. Anyone with his private key could make a transaction in his name and steal his coins.</p>
        <p>Let's take a look at the <b>wallets</b>.</p>
      </div>
    ),
    altSelector: 'blockchain',
  },
  {
    content: () => (
      <div>
        <p>They have everybody's private keys! Private keys should not be shared with anyone you don't trust. We are only storing them here for showing how it all works.</p>
        <p>In fact, everything about crypto currencies is about trusting no one.</p>
      </div>
    ),
    selector: '[data-tut="wallets"]',
  },
  {
    content: () => (
      <div>
        <p>Let's make a transaction from AlePan to your public address.</p>
      </div>
    ),
    altSelector: 'wallets',
  },
  {
    action: (node: any) => {
      node.focus()
    },
    content: () => (
      <div>
        <p>The first step is to publish the transaction.</p>
        <p>Choose <b>giver</b> (AlePan), <b>receiver</b> (you) and the <b>amount</b> to transfer. Be careful to choose an amount of coin that AlePan does have, if you don't everybody will ignore the transaction because they know how much everyone has.</p>
      </div>
    ),
    selector: '[data-tut="publish"]',
  },
  {
    content: () => (
      <div>
        <p>You also have to sign the transaction. To sign it you have to know the giver's private key (which we do, hehe)</p>
        <p>In the next step we are going to copy AlePan's private key from the wallets.</p>
      </div>
    ),
    selector: '[data-tut="publish"]',
  },
  {
    content: () => (
      <div>
        <p>Click <b>Copy Private Key</b></p>
      </div>
    ),
    selector: '[data-tut="creatorPrivateKey"]',
  },
  {
    action: (node: any) => {
      node.focus()
    },
    content: () => (
      <div>
        <p><b>Paste it into giver's private key</b> and click on <b>Sign with private Key</b>.</p>
      </div>
    ),
    selector: '[data-tut="publish"]',
  },
  {
    action: (node: any) => {
      node.focus()
    },
    content: () => (
      <div>
        <p>Signing a transaction is producing a big number that is specific for that transaction and can only be produced by using the owner's private key. The <b>Private Key</b> and the <b>Public Address</b> are linked, so anyone can be sure that that number was produced by the one with that public address (who also has the private key).</p>
        <p>To see how a signature is specific for a transaction, you can try the following. Change the amount , sign it again and watch the signature change.</p>
      </div>
    ),
    selector: '[data-tut="publish"]',
  },
  {
    action: (node: any) => {
      node.focus()
    },
    content: () => (
      <div>
        <p>You have already signed the transaction as AlePan, but the money is not yours yet</p>
        <p>Now you have to publish the transaction. By publishing the transaction you are saying to everyone that you want that transaction included in the blockchain.</p>
        <p>Go ahead and <b> publish the transaction</b></p>
      </div>
    ),
    selector: '[data-tut="publish"]',
  },
  {
    content: () => (
      <div>
        <p>How does it get included?</p>
        <p>Enter Mining. A Miner takes all the published transactions that haven't already got in the chain and groups them in a block.</p>
      </div>
    ),
    selector: '[data-tut="notPublishedYet"]',
  },
  {
    content: () => (
      <div>
        <p>So they just include the pending transactions block in the chain?</p>
        <p>Of course not, there is a catch.</p>
      </div>
    ),
    selector: '[data-tut="notPublishedYet"]',
  },
  {
    content: () => (
      <div>
        <p>Notice how every block on the blockchain has funny number called a <b>"hash"</b> </p>
      </div>
    ),
    selector: '[data-tut="blockchain"]',
  },
  {
    content: () => (
      <div>
        <p>What is a block hash?</p>
        <p>You take all the block data and you produce a number that is unique for that block. </p>
        <p>Let's put that to the test</p>
      </div>
    ),
    selector: '[data-tut="block"]',
  },
  {
    action: (node: any) => {
      node.focus()
    },
    content: () => (
      <div>
        <p> Go ahead and click <b>Hack the Chain</b>.</p>
      </div>
    ),
    selector: '[data-tut="toggleHackTheChain"]',
  },
  {
    action: (node: any) => {
      node.focus()
    },
    content: () => (
      <div>
        <p>Instead of user aliases, you will see user addresses. Blochains usually store user addresses, we show the aliases to make it more readable </p>
        <p>Change any field of the block and watch the <b>hash</b> change as you change the data. For the moment, never mind the warnings you are going to see.</p>
      </div>
    ),
    selector: '[data-tut="block"]',
  },
  {
    action: (node: any) => {
      node.focus()
    },
    content: () => (
      <div>
        <p>All that the miner does is try to guess different changes to make that <b>hash</b> start with two zeros (or more). </p><p> How? </p><p>He just tries different numbers in a place specifically meant for that, called the <b>"nonce"</b> until the block <b>hash</b> starts with '00'.</p>
      </div>
    ),
    selector: '[data-tut="block"]',
  },
  {
    action: (node: any) => {
      node.focus()
    },
    content: () => (
      <div>
        <p>You can try it yourself by randomly changing the nonce until the hash starts with '00' or by clicking <b>Find Nonce</b> to make the computer search it for you. That is what mining is all about, blindly changing the <b>nonce</b> until the hash starts with an established amount of zeros.</p>
        <p>Here it is a fairly simple task because we just need to make the hash start with two zeros. It gets exponentially harder as more zeros are required. In the Bitcoin chain the hash has to start with about 19 zeros.</p>
      </div>
    ),
    selector: '[data-tut="block"]',
  },
  {
    content: () => (
      <div>
        <p>Millions are spent trying to find the right nonce for each new block. </p><p> Why work so hard? </p><p> The one who finds the right nonce gets the privilege of creating a new coin for himself.</p>
      </div>
    ),
    altSelector: 'block',
  },
  {
    action: (node: any) => {
      node.focus()
    },
    content: () => (
      <div>
        <p>Let's go <b>Back to the Unedited Chain</b> .</p>
      </div>
    ),
    selector: '[data-tut="toggleHackTheChain"]',
  },
  {
    content: () => (
      <div>
        <p>As you can see, the first transaction of every block is a 'mined' coin. No one gives it, it was created.</p>
      </div>
    ),
    selector: '[data-tut="blockchain"]',
  },
  {
    content: () => (
      <div>
        <p>We are going to watch the miner grabbing the published transactions, packing them in a block and trying different numbers in the nonce until the hash starts with '00'.</p>
        <p>Ready?</p>
        <p>Select a <b>miner</b> Click <b>Start Mining</b></p>
      </div>
    ),
    selector: '[data-tut="notPublishedYet"]',
  },
  {
    content: () => (
      <div>
        <p>Did it happen too fast? </p><p>Click <b>Start Mining</b> again to see the generation of a new coin. If there are no transactions to be included the miner will just generate a new block with the creation of his new coin.</p>
        <p>Once the Miner finds the magic number for the <b>nonce</b>, he tells everybody that he has a new block, and everybody adds that new block to the chain.</p>
      </div>
    ),
    selector: '[data-tut="notPublishedYet"]',
  },
  {
    content: () => (
      <div>
        <p>That is it. That is what needs to happen for you to have some sweet coin.</p>
        <p>As you can see, the blockchain now says that AlePan gave you some amount of coin.</p>
      </div>
    ),
    selector: '[data-tut="blockchain"]',
  },
  {
    content: () => (
      <div>
        <p>How much everyone has can also be seen in the wallets, but the ground truth is always in the blockchain </p>
      </div>
    ),
    selector: '[data-tut="userWallet"]',
  },
  {
    content: () => (
      <div>
        <p>That is how far we are going to go with this tour, but there are a bunch of things you can explore by yourself.</p>
        <p>The <b>Blockchain</b> is fully editable.</p>
        <p>You can try modifying the chain info and reading the warnings at the top of each <b>block</b> to get a feel of the security measures implemented in the blockchain.</p>
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
    altSelector: 'userWallet',
  },
]
