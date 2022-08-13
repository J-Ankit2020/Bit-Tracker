import { makeStyles } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import { TrendingCoins } from '../config/api'
import { CryptoState } from '../CryptoContext'
const useStyles = makeStyles((theme) => ({
    carousel: {
        height: '50%',
        display: 'flex',
        alignItems: 'center',
    },
    carouselItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        textTransform: 'uppercase',
        color: 'white',

    }
}));
export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Caraousel = () => {
    const { currency, symbol } = CryptoState();
    const [trending, setTrending] = useState([])
    const classes = useStyles();
    const fetchTrendingCoins = async () => {
        const response = await fetch(TrendingCoins(currency));
        const data = await response.json();
        setTrending(data);
    }
    useEffect(() => {
        fetchTrendingCoins();
    }, [currency]);

    const items = trending.map(coin => {
        let profit = coin?.price_change_percentage_24h >= 0;
        return <Link
            to={`/coins/${coin.id}`}
            className={classes.carouselItem}
        >
            <img
                src={coin?.image}
                alt={coin.name}
                height="80"
                style={{ marginBottom: 10 }}
            />
            <span>
                {coin?.symbol}
                &nbsp;
                <span style={{
                    color: profit ? '#00ff00' : 'red',
                    fontWeight: '500',
                }}>{profit && '+'}{coin?.price_change_percentage_24h?.toFixed(2)}</span>
            </span>
            <span style={{ fontSize: 22, fontWeight: 500 }}>
                {symbol}{numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
        </Link>
    })
    const responsive = {
        0: { items: 2 },
        512: { items: 4 },
    };
    return (
        <div className={classes.carousel}>
            <AliceCarousel
                mouseTracking
                infinite
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                autoPlay
                items={items}
            />
        </div>
    )
}

export default Caraousel