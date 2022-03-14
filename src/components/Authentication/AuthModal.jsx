import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Backdrop, Fade, Button, AppBar, Tabs, Tab, Box } from '@material-ui/core';
import SignUp from './SignUp';
import Login from './Login';
import GoogleButton from 'react-google-button';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: '350px',
        backgroundColor: theme.palette.background.paper,
        color: '#FFFFFF',
        borderRadius: 10
    }, google: {
        padding: 24,
        paddingTop: 0,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        gap: 20,
        fontSize: 20
    }
}));

export default function AuthModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { setAlert } = CryptoState();

    const googleProvider = new GoogleAuthProvider();

    const signInWithGoogle = () => {
        signInWithPopup(auth, googleProvider).then(res => {
            setAlert({
                open: true,
                type: 'success',
                message: `Successfully Signed in. Welcome! ${res.user.email}`
            })
            handleClose()
        }).catch(err => {
            setAlert({
                open: true,
                type: 'error',
                message: err.message
            })
            return;
        })

    }

    return (
        <div>
            <Button
                variant="contained"
                style={{
                    width: 85,
                    height: 40,
                    backgroundColor: '#D5AD36',
                    fontWeight: 'bold',
                }}
                onClick={handleOpen}
            >Login
            </Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <AppBar
                            position="static"
                            style={{
                                background: 'transparent',
                                color: '#FFFFFF'
                            }}
                        >
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                variant="fullWidth"
                                style={{
                                    borderRadius: 10
                                }}
                            >
                                <Tab label="Login" />
                                <Tab label="Sign Up" />
                            </Tabs>
                        </AppBar>
                        {value === 0 && <Login handleClose={handleClose} />}
                        {value === 1 && <SignUp handleClose={handleClose} />}

                        <Box
                            className={classes.google}
                        >
                            <span>OR</span>
                            <GoogleButton
                                style={{ width: '100%', outline: 'none' }}
                                onClick={signInWithGoogle}
                            />
                        </Box>

                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
