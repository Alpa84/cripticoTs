import * as React from 'react'
import { logEvent } from 'src/utils/misc'

export interface Props {
  text: string
  href: string
}

function Link({ text, href }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      onClick={() => logEvent(href)}
    >{text}</a>
  )
}

export default Link;

