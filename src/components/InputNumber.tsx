import * as React from 'react';

// tslint:disable-next-line:interface-name
export interface Props {
    text: string
    value: number
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    path: string
    inputId?: string
}

function InputNumber({ text, value, onChange, path, inputId }: Props) {
    return (
        <div className="input-group">
            <div className="input-group-addon">{text}</div>
            {inputId ? (
                <input id={inputId} type="number" className="form-control" onChange={onChange} placeholder={value.toString()} data-key={path} />
            ) : (
                <input type="number" className="form-control" onChange={onChange } placeholder={value.toString()} data-key={path} />
            )}
        </div>
    )
}

export default InputNumber