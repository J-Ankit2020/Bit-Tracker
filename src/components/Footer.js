import React from 'react'
import { Typography } from '@material-ui/core'
const Footer = () => {
    return (
        <Typography variant='h6' style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            fontFamily: "Montserrat",
            padding: "2px",
            justifyContent: "center",
        }}> Made with ❤️ by &nbsp;<a href='https://github.com/J-Ankit2020' target={"_blank"} rel="noreferrer">Ankit</a></ Typography >
    )
}

export default Footer