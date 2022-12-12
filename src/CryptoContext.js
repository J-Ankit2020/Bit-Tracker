import { onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useState, useEffect } from "react";
import { CoinList } from "./config/api";
import { auth } from "./firebase";

const Crypto = createContext();
const CryptoContextProvider = ({ children }) => {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const [coins, setCoins] = useState([]);
    const [watchlist, setWatchlist] = useState([])
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success"
    })
    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) setUser(user);
            else setUser(null);
        });
    }, [])
    const fetchCoins = async () => {
        const response = await fetch(CoinList(currency));
        setLoading(true);
        const data = await response.json();
        setCoins(data);
        setLoading(false);
    };
    useEffect(() => {
        if (currency === "INR") setSymbol("₹");
        else setSymbol("$");
    }, [currency])
    return <Crypto.Provider value={{ currency, symbol, setCurrency, coins, loading, fetchCoins, alert, setAlert, user, watchlist, setWatchlist }}>
        {children}
    </Crypto.Provider>
}
export default CryptoContextProvider;
export const CryptoState = () => {
    return useContext(Crypto)
};