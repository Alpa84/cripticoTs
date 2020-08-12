import * as React from 'react'

export interface Props {
  text: string
  href: string
}

function Link({ text, href }: Props) {
  return (
    <a
      href={href}
      target="_blank"
    >{text}</a>
  )
}

export default Link;

