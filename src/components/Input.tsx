import * as React from 'react';

// tslint:disable-next-line:interface-name
export interface Props {
    text: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Input({ text, value, onChange }: Props) {
    return (
        <div className="input-group">
            <div className="input-group-addon">{text}</div>
            <input type="text" className="form-control" value={value} onChange={onChange}/>
        </div>
    )
}

export default Input;

// // helpers

// function getExclamationMarks(numChars: number) {
//     return Array(numChars + 1).join('!');
// }