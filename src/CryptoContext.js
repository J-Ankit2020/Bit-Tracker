import React, { createContext, useContext, useState, useEffect } from "react";

const Crypto = createContext();
const CryptoContextProvider = ({ children }) => {
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    useEffect(() => {
        if (currency === "INR") setSymbol("₹");
        else setSymbol("$");
    }, [currency])
    return <Crypto.Provider value={{ currency, symbol, setCurrency }}>
        {children}
    </Crypto.Provider>
}
export default CryptoContextProvider;
export const CryptoState = () => {
    return useContext(Crypto)
};