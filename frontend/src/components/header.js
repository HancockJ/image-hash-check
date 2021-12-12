import React from 'react'

export const Header = () => {

    const headerStyle = {

        width: '100%',
        backgroundColor: "#294293",
        color: 'white',
        textAlign: 'center',
        display: "block",
    }

    return(
        <div style={headerStyle}>
            <h1>Jack's Image Checker</h1>
        </div>
    )
}