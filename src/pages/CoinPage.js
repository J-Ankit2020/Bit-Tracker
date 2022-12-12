import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CryptoState } from "../CryptoContext"
import { SingleCoin } from "../config/api"
import { makeStyles } from "@material-ui/styles";
import CoinInfo from "../components/CoinInfo";
import { Typography, LinearProgress, Button } from "@material-ui/core";
import parse from 'html-react-parser'
import { numberWithCommas } from '../components/Caraousel';
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../firebase";
const CoinPage = () => {
    const { id } = useParams();
    const [coin, setCoin] = useState();
    const { currency, symbol, watchlist, setAlert } = CryptoState();
    const inWatchlist = watchlist.includes(coin?.id);
    const fetchCoin = async () => {
        const response = await fetch(SingleCoin(id));
        const data = await response.json();
        setCoin(data);
    }
    useEffect(() => {
        fetchCoin();
    }, [currency]);
    const useStyles = makeStyles((theme) => ({
        container: {
            display: "flex",
            [theme.breakpoints.down("md")]: {
                flexDirection: "column",
                alignItems: "center",
            }
        },
        sidebar: {
            display: 'flex',
            width: "30%",
            [theme.breakpoints.down("md")]: {
                width: "100%",
            },
            flexDirection: 'column',
            alignItems: "center",
            marginTop: 25,
            borderRight: "2px solid gray"
        },
        heading: {
            fontWeight: "bold",
            marginBottom: 20,
            fontFamily: "Montserrat",

        },
        description: {
            width: "100%",
            fontFamily: "Montserrat",
            padding: 25,
            paddingBottom: 15,
            paddingTop: 0,
            textAlign: 'justify',
        },
        marketData: {
            alignSelf: "start",
            padding: 25,
            paddingTop: 10,
            width: "100%",
            [theme.breakpoints.down("sm")]: {
                flexDirection: "column",
                alignItems: "center",
            },
            [theme.breakpoints.down("md")]: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            },
            [theme.breakpoints.down("xs")]: {
                alignItems: "start",
            },
        }
    }))
    const classes = useStyles();
    const { user, setWatchlist } = CryptoState();
    const addToWatchList = async () => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(coinRef,
                { coins: watchlist ? [...watchlist, coin?.id] : [] });
            setAlert({
                open: true,
                message: `${coin.name} Added to Watchlist!`,
                type: 'success'
            });
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: 'error'
            });
        }
    }
    const removeFromWatchList = async () => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(coinRef,
                {
                    coins: watchlist.filter((watch) => watch !== coin?.id),
                },
                { merge: true });
            setAlert({
                open: true,
                message: `${coin.name
                    } Removed from Watchlist!`,
                type: 'success'
            });
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: 'error'
            });
        }
    }
    useEffect(() => {
        if (user) {
            const coinRef = doc(db, "watchlist", user.uid);
            var unsubscribe = onSnapshot(coinRef, coin => {
                if (coin.exists()) {
                    setWatchlist(coin.data().coins)
                }
                else {
                    console.log("No Items in Watchlist");
                }
                return () => {
                    unsubscribe();
                }
            });
        }
    }, [user])
    if (!coin) return <LinearProgress style={{ background: "gold" }}></LinearProgress>
    else return <div className={classes.container}>

        <div className={classes.sidebar}>
            <img
                src={coin?.image.large}
                height="200"
                style={{ marginBottom: 20 }}
                alt={coin?.name} />
            <Typography variant="h3" className={classes.heading}>
                {coin?.name}
            </Typography>
            <Typography variant="subtitle1" className={classes.description}>
                {parse(`${coin?.description.en.split(". ")[0]}`)}
            </Typography>
            <div className={classes.marketData}>
                <span style={{ display: "flex" }}>
                    <Typography variant="h5" className={classes.heading}>
                        Rank:
                    </Typography>
                    &nbsp; &nbsp;
                    <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                        {coin?.market_cap_rank}
                    </Typography>
                </span>
                <span style={{ display: "flex" }}>
                    <Typography variant="h5" className={classes.heading}>
                        Current Price:
                    </Typography>
                    &nbsp; &nbsp;
                    <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                        {symbol}{" "}
                        {numberWithCommas(coin?.market_data.current_price[currency.toLowerCase()])}
                    </Typography>
                </span>
                <span style={{ display: "flex" }}>
                    <Typography variant="h5" className={classes.heading}>
                        Market Cap:
                    </Typography>
                    &nbsp; &nbsp;
                    <Typography variant="h5" style={{ fontFamily: "Montserrat" }}>
                        {symbol}{" "}
                        {coin?.market_data.market_cap[currency.toLowerCase()].toString().slice(0, -6)
                        }M
                    </Typography>
                </span>
                {user && (<Button variant='outlined'
                    style={{
                        width: "100%",
                        height: 40,
                        backgroundColor: inWatchlist ? "#ff0000" : "#EEBC1D"
                    }}
                    onClick={inWatchlist ? removeFromWatchList : addToWatchList}
                >
                    {inWatchlist ? "Remove from Watchlist" : "Add To WatchList"}
                </Button>)}
            </div>
        </div>
        <CoinInfo coin={coin} />
    </div >
}
export default CoinPage;