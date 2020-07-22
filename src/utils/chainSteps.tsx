import * as React from 'react'
import { Step, Styles } from 'react-joyride'
import { tooltipStyles } from 'src/components/Tour'

export const chainStepsObj: { [index: number]: Step } = {
  '0': {
    content: (
      <div>
        <h2>Chain Tour</h2>
      This site runs a crypto coin in your browser for you to experience and, if you dare, to hack...
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '1': {
    content: (
      <div>
        <p>The blockchain is here to solve one problem: How can you save information permanently collaborating with people that you don't trust.</p>
        <p>And the answer is amazing.</p>
      </div>
    ),
    target: '[data-tut="block"]',
    placement: 'right-start',
  },
  '2': {
    content: (
      <div>
        <p>At the core of the solution lies the concept of a chain of data.</p>
        <p>How can data be chained?</p>
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '3': {
    content: (
      <div>
        <p>First you have to hash the data, that is you take the block data and you produce a number from it.</p>
        <p>The same data will always produce the same number.</p>
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '4': {
    content: (
      <div>
        <p>This is the hash for this block</p>
      </div>
    ),
    target: '[data-tut="second-last-hash"]',
    placement: 'right-start',
  },
  '5': {
    content: (
      <div>
        <p>Now, all you have to do is include the hash of the previous block in the next block like this.</p>
        <p>That way you make a link between the blocks. That is why it is called a blockchain.</p>
      </div>
    ),
    target: '[data-tut="last-previous-hash"]',
    placement: 'right-start',
  },
  '6': {
    content: (
      <div>
        <p>Now comes the brilliant part. you make it a rule that the only valid chain is the longest one.</p>
        <p>The easiest way to create the longest chain is using the longest chain in existence and adding one block.</p>
        <p>The optimal strategy for anyone that wants to add a block is keeping the old chain and adding a new block. That way the old data persists and new data is added.</p>
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '7': {
    content: (
      <div>
        <p>Anyone that adds a block is entitled to include in that block the generation of some coins for himself , he just adds it along the other transactions, like this.</p>
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '8': {
    content: (
      <div>
        <p>Now, Adding blocks this way can be done really fast. You would end up with millions of blocks added every second. So there is a rule to make it more difficult to add a new block.</p>
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '9': {
    content: (
      <div>
        <p>The rule says that every block hash must start with a certain amount of zeros, like this one.</p>
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '10': {
    content: (
      <div>
        <p>Again, the block hash is a number produced using the data of the block, so how do you make it start with '00...' ? </p>
        <p>You change the data of the block. You certainly don't want to alter the transactions of the block, and you can't change the previous block hash either.</p> 
        <p>You have a special field in the block just to try different changes until you see that the block hash starts with '00...'</p>
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '11': {
    content: (
      <div>
        <p>that field is called the nonce</p>
      </div>
    ),
    target: '[data-tut="blockchain"]',
    placement: 'right-start',
  },
  '15': {
    content: (
      <div>
        <p>lasttttttttt</p>
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
