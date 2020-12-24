import React from 'react'
import Table from 'react-bootstrap/Table'

function StringList({savedMessages}) {
    return (
        <Table striped bordered hover variant="dark">
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
        </Table>

    )
}

export default StringList