import * as React from 'react'

export interface Props {
  text: string
  value: number
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  inputId?: string
}

function InputNumber({ text, value, onChange, inputId }: Props) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">{text}</span>
      </div>
      {inputId ? (
        <input
          id={inputId}
          type="number"
          className="form-control"
          onChange={onChange}
          value={value.toString()}
        />
      ) : (
        <input
          type="number"
          className="form-control"
          onChange={onChange}
          value={value.toString()}
        />
      )}
    </div>
  )
}

export default InputNumber
