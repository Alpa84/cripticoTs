import * as React from 'react'
import { useState } from 'react'

export interface Props {
  pKey : string
}

function PrivateKey({ pKey }: Props) {
  const [isCopied, setCopied] = useState(false)
  let textAreaRef = React.createRef<HTMLTextAreaElement>()
  const copyKeyToClipboard = () => {
    if (textAreaRef.current !== null) {
      textAreaRef.current.select()
      document.execCommand('copy')
      setCopied(true)
    }
    setTimeout( ()=> {
      setCopied(false)
    }, 4000)
  }
  return (
    <>
      <table className="table fixedTable">
        <tbody>
          <tr>
            <th scope="row">Private Key (shhhhhh!)</th>
            <td><div
              className='longString'>{pKey}</div></td>
          </tr>
        </tbody>
      </table>
      <textarea
        ref={textAreaRef}
        value={pKey}
        onChange={()=>{console.log('copied!')}} // deliberate. This is to perform the copy to clipboard
        className='hide'/>
      <button
        onClick={copyKeyToClipboard}
        type="button"
        className="btn btn-secondary btn-sm">Copy Private Key</button>
        {isCopied && (
          'Copied!'
        )}
    </>
  )
}

export default PrivateKey;
