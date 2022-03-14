import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import axios from 'axios';
import { CryptoState } from '../../CryptoContext'
import { TrendingCoins } from '../../config/api'
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    carousel: {
        height: '50%',
        display: 'flex',
        alignItems: 'center',
    }, carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
    },
}));

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {

    const [trending, setTrending] = useState([]);

    const classes = useStyles();

    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(currency));

        setTrending(data)
    };


    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currency]);


    const items = trending.map((coin) => {

        let profit = coin.price_change_percentage_24h >= 0;

        return (
            <Link
                className={classes.carouselItem}
                to={`/coins/${coin.id}`}
            >
                <img
                    src={coin?.image}
                    alt={coin.name}
                    height="80px"
                    style={{
                        marginBottom: 10
                    }}
                />
                <span>
                    {coin?.symbol}
                    &nbsp;
                    <span
                        style={{
                            color: profit > 0 ? "#32CD32" : "#DC0000",
                            fontWeight: 500,
                        }}
                    >
                        {profit && "+"}
                        {coin?.price_change_percentage_24h?.toFixed(2)}%
                    </span>
                </span>
                <span
                    style={{
                        fontSize: 22,
                        color: profit > 0 ? "#32CD32" : "#DC0000",
                        fontWeight: 500
                    }}
                >
                    {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
                </span>
            </Link>
        )

    })

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        },
    };

    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1500}
                animationDuration={2000}
                disableDotsControls
                responsive={responsive}
                autoPlay
                items={items}
                disableButtonsControls
            />
        </div>
    )
}

export default Carousel
