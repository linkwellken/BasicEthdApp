import React from 'react'

function StringList({savedMessages}) {
    return (
        <div>
        <h2>Strings</h2>
        <hr />
            <table>
            <thead>
                <tr>
                <th>Address</th>
                <th>String</th>
                </tr>
            </thead>
            <tbody>
                {savedMessages.map((message, index) => (
                <tr key={index} >
                    <td>{message.messenger}</td>
                    <td>{message.message}</td>
                </tr>
                ))}

                
            </tbody>
            </table>
        </div>
    )
}

export default StringList