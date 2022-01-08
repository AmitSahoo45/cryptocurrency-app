import { Container, makeStyles, Typography } from '@material-ui/core'
import React from 'react'
import Carousel from './Carousel';

const useStyles = makeStyles((theme) => ({
    banner: {
        backgroundImage: "url(./cryptocurrency.jpg)",
        backgroundPosition: "center",
        backgroundSize: "cover"
    },
    bannerContent: {
        height: 400,
        display: "flex",
        flexDirection: "column",
        paddingTop: 25,
        justifyContent: "space-around",
    },
    tagline: {
        display: "flex",
        height: "40%",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
    },
    carousel: {
        height: "50%",
        display: "flex",
        alignItems: "center",
    },
}));

const Banner = () => {

    const classes = useStyles();

    return (
        <div className={classes.banner}>
            <Container className={classes.bannerContent}>
                <div className={classes.tagline}>
                    <Typography
                        variant="h2"
                        style={{
                            fontWeight: "bold",
                            marginBottom: '15px',
                            fontFamily: 'Poppins',
                            letterSpacing: '1.3px'

                        }}
                    >
                        CryptoHub
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        style={{
                            color: '#e6e6e6',
                            textTransform: 'capitalize',
                            fontFamily: "Poppins",
                            padding: "10px",
                            background: 'rgba(214, 214, 214, 0.26)'
                        }}
                    >
                        Get all the details and info regrading your favourite cryptocurrency
                    </Typography>
                </div>
                <Carousel />
            </Container>
        </div>
    )
}

export default Banner
