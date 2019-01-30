import * as React from 'react';

// tslint:disable-next-line:interface-name
export interface Props {
    text: string
    value: string
    path: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ text, value, onChange, path }: Props) {
    return (
        <div className="input-group">
            <div className="input-group-addon">{text}</div>
            <input type="text" className="form-control" id="exampleInputAmount" value={value} data-key={path} onChange={onChange}/>
        </div>
    )
}

export default Input;

// // helpers

// function getExclamationMarks(numChars: number) {
//     return Array(numChars + 1).join('!');
// }