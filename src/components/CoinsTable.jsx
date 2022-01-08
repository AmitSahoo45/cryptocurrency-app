import {
    Typography,
    ThemeProvider,
    Container,
    createTheme,
    TextField,
    CircularProgress,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    TableContainer,
    Table,
    Paper,
} from '@material-ui/core'
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from '@material-ui/styles'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext'

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {


    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const { currency, symbol } = CryptoState();

    const useStyles = makeStyles({
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
            },
            fontFamily: "Poppins",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: '#F4F2C9'
            },
            "& .MuiPaginationItem-root:hover": {
                backgroundColor: "#265999"
            }
        },
    });


    const classes = useStyles();
    let navigate = useNavigate();


    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        // console.log(data);

        setCoins(data);
        setLoading(false);
    };


    console.log(coins)

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);


    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        },
    });

    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        );
    };


    return (
        <ThemeProvider theme={darkTheme}>
            <Container
                style={{
                    textAlign: "center",
                }}
            >
                <Typography
                    variant="h4"
                    style={{
                        margin: 18,
                        fontFamily: "Poppins",
                        textDecoration: 'underline',
                        textUnderlineOffset: 2
                    }}
                >
                    Cryptocurrency Prices by Market Cap
                </Typography>

                <TextField
                    label="Search Here For Crypto Currency"
                    variant="outlined"
                    style={{
                        marginBottom: 20,
                        width: "100%"
                    }}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <TableContainer >
                    {
                        loading ? (
                            <CircularProgress style={{
                                color: "#D5AD36"
                            }} />
                        ) : (
                            <Table>
                                <TableHead
                                    style={{
                                        backgroundColor: '#4488BF'
                                    }}
                                >
                                    <TableRow>
                                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                            <TableCell
                                                style={{
                                                    color: "#fff",
                                                    fontWeight: "500",
                                                    fontFamily: "Poppins",
                                                    letterSpacing: 1,
                                                    fontSize: 16
                                                }}
                                                key={head}
                                                align={head === "Coin" ? "" : "right"}
                                            >
                                                {head}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        handleSearch()
                                            .slice((page - 1) * 10, (page - 1) * 10 + 10)
                                            .map((row) => {
                                                const profit = row.price_change_percentage_24h > 0;

                                                return (
                                                    <TableRow
                                                        onClick={() => {
                                                            navigate("/coins/" + row.id)
                                                        }}
                                                        className={classes.row}
                                                        key={row.name}
                                                    >
                                                        <TableCell
                                                            component="th"
                                                            scope="row"
                                                            style={{
                                                                display: "flex",
                                                                gap: 15,
                                                            }}
                                                        >
                                                            <img
                                                                src={row?.image}
                                                                alt={row.name}
                                                                height="50"
                                                                style={{ marginBottom: 10 }}
                                                            />
                                                            <div
                                                                style={{ display: "flex", flexDirection: "column" }}
                                                            >
                                                                <span
                                                                    style={{
                                                                        textTransform: "uppercase",
                                                                        fontSize: 22,
                                                                        fontWeight: 400,
                                                                        letterSpacing: 1
                                                                    }}
                                                                >
                                                                    {row.symbol}
                                                                </span>
                                                                <span style={{ color: "#a8a8a8" }}>
                                                                    {row.name}
                                                                </span>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            style={{
                                                                fontSize: 16,
                                                            }}
                                                        >
                                                            {symbol}{" "}
                                                            {numberWithCommas(row.current_price.toFixed(2))}
                                                        </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            style={{
                                                                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                                                                fontSize: 16,
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {profit && "+"}
                                                            {row.price_change_percentage_24h.toFixed(2)}%
                                                        </TableCell>
                                                        <TableCell
                                                            align="right"
                                                            style={{
                                                                fontSize: 16,
                                                            }}
                                                        >
                                                            {symbol}{" "}
                                                            {numberWithCommas(
                                                                row.market_cap.toString().slice(0, -6)
                                                            )}
                                                            M
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                    }
                                </TableBody>
                            </Table>
                        )
                    }
                </TableContainer>
                <Pagination
                    count={(handleSearch()?.length / 10).toFixed(0)}
                    style={{
                        padding: 20,
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    classes={{ ul: classes.pagination }}
                    onChange={(_, value) => {
                        setPage(value);
                        window.scroll(0, 450);
                    }}
                />
            </Container>
        </ThemeProvider>
    )
}

export default CoinsTable
