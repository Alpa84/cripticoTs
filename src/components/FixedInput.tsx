import * as React from 'react'

export interface Props {
  text: string
  value: string | number
}

function FixedInput({ text, value }: Props) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">{text}</span>
      </div>
      <input
        type="text"
        className="form-control fixed"
        disabled={true}
        value={value}
      />
    </div>
  )
}

export default FixedInput
