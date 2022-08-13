import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react'
import Caraousel from './Caraousel';
const useStyles = makeStyles(() => ({
    banner: {
        backgroundImage: 'url(./banner2.jpg)',
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: 'space-around',
    },
    tagline: {
        display: "flex",
        height: '40%',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
    }
}));
const Banner = () => {
    const classes = useStyles();
    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography variant='h2' style={{
                        fontWeight: "bold",
                        marginBottom: 15,
                        fontFamily: 'Montserrat',
                    }}>
                        Bit Tracker
                    </Typography>
                    <Typography variant='subtitle2' style={{
                        color: 'darkgray',
                        textTransform: "capitalize",
                        fontFamily: 'Montserrat',
                    }}>
                        Get All The Info Regarding Your Favorite Crypto Currency
                    </Typography>
                </div>
                <Caraousel />
            </Container>
        </div>
    )
}

export default Banner