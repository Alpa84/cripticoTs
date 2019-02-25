import * as React from 'react'
import { GeneralType } from '../Types'

export interface Props {
    general: GeneralType
}

function Balance({ general }: Props) {
    return (
        <div className="Balance">
        <h1>Balance</h1>
            <div className="panel panel-default">
                <div className="panel-body">
                    {
                        Object.keys(general.balance).map((dir, index) => (
                            <div key={index}>
                                {general.directorio[dir] || dir} : {general.balance[dir]}
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Balance;