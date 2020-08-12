import * as React from 'react'

export interface Props {
  text: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ text, value, onChange }: Props) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">{text}</span>
      </div>
      <input
        type="text"
        className="form-control"
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
