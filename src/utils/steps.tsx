import * as React from 'react'
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
      <p>steal some coin</p>
      <p>make a transaction</p>
      <p>publish it</p>
      <p>do some mining</p>
      <p>and explore how the blockchain works</p>
    </div>
    ),
    selector: '[data-tut="header"]',
  },
  {
    content: () => (
    <div>
      To do aything with with a crypto coin you have to have a wallet. For that, you have to generate a Public Address and a Private Key.
      Your public address is like an email address.If anyone wants to send you coin all they need to know is your public address.
      Your private key is like a password.You have to keep it secret.Anyone with your private key will be able to sell your coin.
      Go ahead and click <b>generate a Public Address and a Private Key</b>
    </div>
    ),
    selector: '[data-tut="keyPair"]',
  },
  {
    action: (node: any) => {
      node.focus()
    },
    content: () => (
      <div>
        Now that you have a key pair, choose an < b > alias</b > for your public address and < b > generate a wallet</b >.
      </div>
    ),
    selector: '[data-tut="alias"]',
  },
  {
    content: () => (
      <div>
        The data of your wallet will be stored here.
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
          The only way to own a coin is to generate one or having someone who owns some transfer you some coin. Every coin out there had to be generated first.
    </p>
        <p>It will be easier having someone transfer you. So, who has some? That information is in the <b>Blockchain</b>.</p>
      </div>
    ),
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
        <p>If user AlePan has mined one coin ( see <b>block 1</b> ) and has transfered 0.2 coins to Athena on <b>block 2</b>. How much does he has? </p>
        <p>That is how it is calculated. Instead of keeping track of how much everyone has, the blockchain stores informatio about all the transactions and mined coins.</p>
      </div>
    ),
    selector: '[data-tut="blockchain"]',
  },
  {
    content: () => (
      <div>
        <p>So, this AlePan has some coin. If only you had his private key you could make a transaction to your address and steal it.</p>
        <p>Let's see the <b>wallets</b></p>
      </div>
    ),
  },
  {
    content: () => (
      <div>
        <p>They have everybody's private keys! Private keys should not be shared with anyone you don't trust. We are only storing them here for showing you how it all works.</p>
        <p>In fact, everthing about crypto coins is about trusting no one.</p>
      </div>
    ),
    selector: '[data-tut="wallets"]',
  },
  {
    content: () => (
      <div>
        <p>Lets make a transaction from AlePan to your public address.</p>
      </div>
    ),
  },
  {
    action: (node: any) => {
      node.focus()
    },
    content: () => (
      <div>
        <p>The first step is to publish the transaction.</p>
        <p>Choose <b>giver</b> (AlePan), <b>receiver</b> (you) and the <b>amount</b> to transfer. Be careful to choose an amount of coin that AlePan does have, if you don't everybody will ignore the transaction because they know how much every address has.</p>
      </div>
    ),
    selector: '[data-tut="publish"]',
  },
  {
    content: () => (
      <div>
        <p>You also have to sign the transaction. To sign it you have to know the giver's private key (which we do, hehe)</p>
        <p>Let's copy AlePan's private key from the wallets</p>
      </div>
    ),
    selector: '[data-tut="publish"]',
  },
  {
    content: () => (
      <div>
        <p>Double click to select and copy it</p>
      </div>
    ),
    selector: '[data-tut="wallets"] .privateKey',
  },
  {
    action: (node: any) => {
      node.focus()
    },
    content: () => (
      <div>
        <p><b>Paste it into giver's private key</b> and click on <b>Sign with private Key</b></p>
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
        <p>Signing a transaction is producing a big number that is specific for that transaction and can only be produced by using the private key. Also, anyone can check that that number was produced by the one with that public address (who also has the private key).</p>
        <p>To see how a signature is specific for a transaction, you can try the following. Change the amount , sign it again and watch the signature change</p>
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
        <p>You have already signed the transaction, now you have to <b>publish</b> it. By publishing the transaction you are saying everyone that you want that transaction included in the blockchain.</p>
      </div>
    ),
    selector: '[data-tut="publish"]',
  },
  {
    content: () => (
      <div>
        <p>How does is gets included?</p>
        <p>Enter Mining. A Miner takes all the published transactions that haven't already got in the chain and groups them in a block.</p>
      </div>
    ),
    selector: '[data-tut="notPublishedYet"]',
  },
  {
    content: () => (
      <div>
        <p>So they just include it in the blockchain?</p>
        <p>Of course not, there is a catch.</p>
        <p>Notice how every block on the blockchain has funny number called a 'hash'</p>
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
    content: () => (
      <div>
        <p> Go ahead and click <b>Hack the Chain</b></p>
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
        <p>Instead of the users aliases, you will see the user addresses. Blochains usually store user addresses, we show the aliases to make it more readable </p>
        <p>Change the data of the block and watch the hash change as you change the data. For the moment, never mind the warnings you are going to see.</p>
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
        <p>All that the miner does is try to make that hash start with two zeros (or more). </p><p> How? </p><p>He just tries different numbers in a place specially meant for that, called the "nonce" until the block hash starts with '00'.</p>
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
        <p>You can try it yourself by changing the nonce until the hash starts with '00' or by clicking <b>Find Nonce</b> to make the computer search it for you. That is what mining is all about, blindly trying random numbers until the hash starts with an established amount of zeros.</p>
        <p>Here it is a fairly simple task because we just need to make the hash start with two zeros. It gets exponentially harder as you require more zeros. In the Bitcoin chain the hash has to start with about 19 zeros.</p>
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
  },
  {
    content: () => (
      <div>
        <p>As you can see, the first transaction of every block is a 'mined' coin. No one gives it, it was created.</p>
      </div>
    ),
    selector: '[data-tut="transaction"]',
  },
  {
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
        <p>We are going to watch ta miner grabbing the published transactions, packing them in a block and trying different numbers in the nonce until the hash starts with '00'.</p>
      </div>
    ),
    selector: '[data-tut="toggleHackTheChain"]',
  },
  {
    content: () => (
      <div>
        <p>Select a <b>miner</b> Click the <b>Start Mining</b> button. Watch the miner grabbing the published transactions, packing them in a block and trying different numbers in the nonce until the hash starts with '00'.</p>
      </div>
    ),
    selector: '[data-tut="mining"]',
  },
  {
    content: () => (
      <div>
        <p>Did it happen too fast? </p><p>Click it again to see the generation of a new coin. If there are no transactions to be included the miner will just generate a new block with his new coin.</p>
        <p>Once he finds the magic number, it tells everybody that he has a new block, and everybody adds that new block to the chain.</p>
      </div>
    ),
    selector: '[data-tut="mining"]',
  },
  {
    content: () => (
      <div>
        <p>That is it. That is what needs to happen for you to have some sweet coin.</p>
        <p>You can see that the blockchain now says that AlePan gave you come amount of coin</p>
      </div>
    ),
    selector: '[data-tut="blockchain"]',
  },
  {
    content: () => (
      <div>
        <p>How much everyone has can also be seen in the wallets, but the ground trith is allways in the blockchain </p>
      </div>
    ),
    selector: '[data-tut="wallet"]:last-of-type',
  },
]
