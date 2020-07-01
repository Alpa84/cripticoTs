import * as React from 'react'
import { Step, Styles } from 'react-joyride'
import Link from 'src/components/Link'
import { tooltipStyles } from 'src/components/Tour'

export const chainStepsObj: { [index: number]: Step } = {
  '0': {
    content: (
      <div>
        <h2>Chain Tour</h2>
      This site runs a crypto coin in your browser for you to experience and, if you dare, to hack...
      </div>
    ),
    target: '[data-tut="header"]',
    placement: 'bottom',
  },
  '1': {
    content: (
      <div>
        <h2>2</h2>
      This site runs a crypto coin in your browser for you to experience and, if you dare, to hack...
      </div>
    ),
    target: '[data-tut="header"]',
    placement: 'bottom',
  },
  '2': {
    content: (
      <div>
        <p>That is how far we are going to go with this tour, but there are a bunch of things you can explore by yourself.</p>
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
      buttonNext: { display: 'none' }
    } as Styles,
    target: '[data-tut="userWallet"]', // free
    placement: 'left-start',
  },
}
export const chainStepsPre: Step[] = Object.keys(chainStepsObj).sort((a, b) => parseInt(a, undefined) - parseInt(b, undefined))
  .map(key => chainStepsObj[key])

