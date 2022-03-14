import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, Avatar, Button } from '@material-ui/core';
import { CryptoState } from '../../CryptoContext'
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { numberWithCommas } from '../CoinsTable';
import { AiFillDelete } from 'react-icons/ai'
import { doc, setDoc } from 'firebase/firestore';


const useStyles = makeStyles({
    container: {
        width: 320,
        padding: 25,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Poppins'
    },
    profile: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
        height: '92%',
    },
    picture: {
        width: 200,
        height: 200,
        cursor: 'pointer',
        backgroundColor: '#CA9703',
        objectFit: 'contain',
    }, name: {
        width: '100%',
        fontSize: 25,
        textAlign: 'center',
        fontWeight: 'bold',
        wordWrap: 'break-word',
    }, logout: {
        height: '8%',
        width: '100%',
        backgroundColor: '#CA9703',
        marginTop: 20
    }, watchlist: {
        flex: 1,
        width: '100%',
        backgroundColor: '#F4F2C9',
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
        overflowY: 'scroll',
        color: '#000000'
    },
    wttitle: {
        fontSize: 15,
    }, coin:{
        padding: 10,
        borderRadius: 5,
        color: '#000000',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#D5AD36'
    }
});

export default function UserSidebar() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    const { user, setAlert, watchlist, coins, symbol } = CryptoState();


    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const logOut = () => {
        signOut(auth)

        setAlert({
            open: true,
            type: 'success',
            message: 'You have been logged out successfully'
        })

        toggleDrawer()
    }

    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid)

        try {
            await setDoc(coinRef, {
                coins: watchlist.filter((watch) => watch !== coin?.id)
            },
                {
                    merge: 'true'
                }
            )

            setAlert({
                open: true,
                message: `${coin?.name} has been removed from watchlist`,
                type: 'success'
            })


        } catch (error) {
            setAlert({
                open: true,
                message: `${coin?.name}, Failed to add to watchlist. Please try again.`,
                type: 'error'
            })
        }
    }

    return (
        <div>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 40,
                            width: 40,
                            marginLeft: 15,
                            cursor: 'pointer',
                            backgroundColor: '#CA9703'
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        <div className={classes.container}>
                            <div className={classes.profile}>
                                <Avatar
                                    className={classes.picture}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    className={classes.name}
                                >
                                    {user.displayName || user.email}
                                </span>
                                <div className={classes.watchlist}>
                                    <span className={classes.wttitle}>
                                        WatchList
                                    </span>
                                    {
                                        coins.map((coin) => {
                                            if (watchlist.includes(coin.id))
                                                return (
                                                    <div className={classes.coin}>
                                                        <span>
                                                            {
                                                                coin.name
                                                            }
                                                        </span>
                                                        <span style={{ display: 'flex', gap: 8 }} >
                                                            {symbol}
                                                            {numberWithCommas(coin.current_price.toFixed(2))}
                                                            <AiFillDelete
                                                                style={{
                                                                    cursor: 'pointer'
                                                                }}
                                                                fontSize='16'
                                                                onClick={() => removeFromWatchlist(coin)}
                                                            />
                                                        </span>
                                                    </div>
                                                );
                                        })
                                    }
                                </div>
                            </div>
                            <Button
                                variant="contained"
                                className={classes.logout}
                                onClick={logOut}
                            >
                                Logout
                            </Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
