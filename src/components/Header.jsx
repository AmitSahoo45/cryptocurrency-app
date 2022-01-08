import { AppBar, Container, createTheme, MenuItem, Select, Toolbar, Typography, ThemeProvider } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "#CA9703",
        cursor: 'pointer',
        fontSize: '1.5rem',
        letterSpacing: '1.5px',
        fontFamily: 'Gilda Display',
        fontWeight: '600'
    }
}))

function Header() {

    const classes = useStyles();
    const { currency, setCurrency } = CryptoState();

    console.log(currency)

    const navigate = useNavigate();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#ffffff",
            }, type: "dark",
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar
                position='sticky'
                style={{
                    background: '#161616',
                    boxShadow: '0px 2px 6px rgba(204,204,204,0.3)'
                }}
            >
                <Container>
                    <Toolbar>
                        <Typography
                            onClick={() => navigate('/')}
                            className={classes.title}
                            variant='h6'
                        >
                            CryptoHub
                        </Typography>
                        <Select
                            defaultValue={"INR"}
                            variant='outlined'
                            style={{
                                width: '100px',
                                height: '40px',
                                marginRight: '15px'
                            }}

                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                    </Toolbar>
                </Container>
            </AppBar >
        </ThemeProvider>
    )
}

export default Header
