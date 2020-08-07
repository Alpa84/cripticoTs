import * as React from 'react'
import { Step, Styles } from 'react-joyride'
import { tooltipStyles } from 'src/components/Tour'

export const chainStepsObj: { [index: number]: Step } = {
  '0': {
    content: (
      <div>
        <h2>Blockchain Tour</h2>
        We are going to take a look at what is a blockchain and how it is designed.
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '1': {
    content: (
      <div>
        <p>The blockchain is here to solve one problem: How can you save information permanently collaborating with people that you don't trust?</p>
        <p>And the answer is amazing.</p>
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '2': {
    content: (
      <div>
        <p>At the core of the solution lies the concept of a chain of data.</p>
        <p>How can data be chained?</p>
      </div>
    ),
    target: '[data-tut="chain"]',
    placement: 'right-start',
  },
  '3': {
    content: (
      <div>
        <p>First you have to <b>hash</b> each block's data, that is, you take the block data and you produce a number from it.</p>
        <p>The same data will always produce the same number.</p>
      </div>
    ),
    target: '.blockTutorial:nth-child(2)',
    placement: 'right-start',
  },
  '4': {
    content: (
      <div>
        <p>This is the <b>hash</b> for this block.</p>
      </div>
    ),
    target: '[data-tut="second-last-hash"]',
    placement: 'right-start',
  },
  '5': {
    content: (
      <div>
        <p>Now, all you have to do is include the <b>hash</b> of that block in the next block like this.</p>
        <p>That way you make a link between the blocks. That is why it is called a blockchain.</p>
      </div>
    ),
    target: '[data-tut="last-previous-hash"]',
    placement: 'right-start',
  },
  '6': {
    content: (
      <div>
        <p>Now comes the brilliant part. You make it a rule that the <b>only valid chain is the longest one.</b></p>
        <p>The easiest way to create the longest chain is using the longest chain in existence and adding one block.</p>
        <p>The optimal strategy for anyone that wants to add a block is to keep the old chain and add a new block on top. <b>That way the old data persists and new data is added</b>.</p>
      </div>
    ),
    target: '[data-tut="chain"]',
    placement: 'right-start',
  },
  '7': {
    content: (
      <div>
        <p>Anyone that adds a block is entitled to include in the block the generation of some coins for himself , he just adds the new coin generation along the other transactions, like this.</p>
      </div>
    ),
    target: '[data-tut="second-mined"]',
    placement: 'right-start',
  },
  '8': {
    content: (
      <div>
        <p>Now, adding blocks this way can be done really fast. You would end up with millions of blocks added every second. So there is a rule to make it more difficult to add a new block.</p>
      </div>
    ),
    target: '[data-tut="second-mined"]',
    placement: 'right-start',
  },
  '9': {
    content: (
      <div>
        <p>The rule says that every block <b>hash</b> must start with a certain amount of zeros, like this one.</p>
      </div>
    ),
    target: '[data-tut="second-last-hash"]',
    placement: 'right-start',
  },
  '10': {
    content: (
      <div>
        <p>Again, the block hash is a number produced using the data of the block, so how do you make it start with '00...' ? </p>
        <p>You change the data of the block. You certainly don't want to alter the transactions of the block, and you can't change the previous block hash either.</p> 
        <p>For that reason, you have a special field in each block just to try different changes until you see that the block hash starts with '00...'</p>
      </div>
    ),
    target: '[data-tut="second-last-hash"]',
    placement: 'right-start',
  },
  '11': {
    content: (
      <div>
        <p>That field is called the <b>nonce</b>.</p>
      </div>
    ),
    target: '[data-tut="second-last-nonce"]',
    placement: 'right-start',
  },
  '12': {
    content: (
      <div>
        <p>So it goes like this:</p>
        <p>People publish their <b>transactions</b>.</p>
        <p>The miners grab them and form a <b>block</b>.</p>
        <p>They also include the creation of a new coin for their own.</p>
        <p>And the race starts. They produce the <b>hash</b> for the <b>block</b> and change the <b>nonce</b> field until the <b>hash</b> starts with '00..'</p>
        <p>The first to figure out the right <b>nonce</b>, publishes it to the other miners.</p>
        <p>Then, the other miners give up their mining, add the new <b>block</b> to the chain, gather new <b>transactions</b> and start mining again.</p>
      </div>
    ),
    target: '[data-tut="second-last-nonce"]',
    placement: 'right-start',
  },
  '13': {
    content: (
      <div>
        <p><b>What if Miner A does not give up mining after Miner B has published the newest block?</b></p>
        <p>Miner A now would have to produce two blocks to produce the longest chain, while the others just one.</p>
        <p><b>What if Miner A does get to produce two blocks and have the longest chain at the moment?</b></p>
        <p>Every miner would then consider that chain the valid chain, and start trying to add a new block on top of that.</p>
        <p><b>So, Miner B's block would be discarded?</b></p>
        <p>Yes. It is easier for a block to be replaced when it's among the latest blocks. It is increasingly harder to replace a block that is further along the chain.</p>
        <p>Once a block has several blocks on top of it, it is considered permanent.</p>
      </div>
    ),
    target: '[data-tut="second-last-nonce"]',
    placement: 'right-start',
  },
  '15': {
    content: (
      <div>
        <p>We are done with the Blockchain Tour!</p>
        <p>There is also an <b>Intro Tour</b> at the top that covers digital signatures, transactions and a practical mining example.</p>
        <p>Thanks for joining!</p>
      </div>
    ),
    styles: {
      ...tooltipStyles,
      buttonNext: { display: 'none' }
    } as Styles,
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
}
export const chainStepsPre: Step[] = Object.keys(chainStepsObj).sort((a, b) => parseInt(a, undefined) - parseInt(b, undefined))
  .map(key => chainStepsObj[key])

