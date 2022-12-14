import React, { useEffect, useState } from 'react'
import { CoinList } from '../config/api'
import { CryptoState } from '../CryptoContext';
import {
    Container,
    TableCell,
    LinearProgress,
    Typography,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    Table,
} from "@material-ui/core";
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { numberWithCommas } from './Caraousel';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(() => ({
    row: {
        backgroundColor: "#16171a",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "blue"
        },
        fontFamily: 'Montserrat'
    },
    pagination: {
        "& .MuiPaginationItem-root": {
            color: "gold"
        }
    }
}))
const CoinsTable = () => {
    const [page, setPage] = useState(1)
    const classes = useStyles();
    const [search, setsearch] = useState('')
    const { currency, symbol, coins, loading, fetchCoins } = CryptoState();
    const navigate = useNavigate();
    useEffect(() => {
        fetchCoins();
    }, [currency]);
    const handleSearch = () => {
        return coins.filter(
            (coin) =>
                coin.name.toLowerCase().includes(search) ||
                coin.symbol.toLowerCase().includes(search)
        )
    }
    return (
        <Container style={{ textAlign: "center" }}>
            <Typography variant="h4" style={{ margin: 18, fontFamily: 'Montserrat' }}>
                Crypto Prices by Market Cap
            </Typography>
            <TextField label="Search for a crypto Currency" variant='outlined'
                style={{ marginBottom: 20, width: "100%" }}
                onChange={(e) => { setsearch(e.target.value) }}
            ></TextField>
            <TableContainer>
                {
                    loading ? (
                        <LinearProgress style={{ backgroundColor: "gold" }} />
                    ) : (
                        <Table aria-label="simple table">
                            <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                                <TableRow>
                                    {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                                        <TableCell
                                            style={{
                                                color: "black",
                                                fontWeight: "700",
                                                fontFamily: "Montserrat",
                                            }}
                                            key={head}
                                            align={head === "Coin" ? "left" : "right"}
                                        >
                                            {head}
                                        </TableCell>))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map(row => {
                                    const profit = row.price_change_percentage_24h > 0;
                                    return (
                                        <TableRow key={row.name}
                                            onClick={() => navigate(`/coins/${row.id}`)}
                                            className={classes.row}
                                        >
                                            <TableCell component='th' scope='row'
                                                styles={{
                                                    display: "flex",
                                                    gap: 15
                                                }}
                                            >
                                                <img src={row.image} alt={row.name} height="50"
                                                    style={{ marginBottom: 10 }}
                                                />
                                                <div style={{
                                                    display: "flex",
                                                    flexDirection: "column"
                                                }}>
                                                    <span style={{
                                                        textTransform: "uppercase",
                                                        fontSize: 22,
                                                    }}>{row.symbol}</span>
                                                    <span style={{
                                                        color: 'darkgray'
                                                    }}>
                                                        {row.name}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell align='right'>
                                                {symbol}{" "}
                                                {numberWithCommas(row.current_price.toFixed(2))}
                                            </TableCell>
                                            <TableCell align='right'
                                                style={{
                                                    color: profit > 0 ? "rgb(14,203,129)" : "red",
                                                    fontWeight: "500"

                                                }}>
                                                {profit && "+"}
                                                {row.price_change_percentage_24h.toFixed(2)}%
                                            </TableCell>
                                            <TableCell align='right'>
                                                {symbol}{" "}{
                                                    numberWithCommas(row.market_cap.toString().slice(0, -6))
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )
                }
            </TableContainer>
            <Pagination
                count={(handleSearch().length / 10).toFixed(0)}
                style={{
                    padding: 20,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                }}
                classes={{ ul: classes.pagination }}
                onChange={(_, value) => {
                    setPage(value);
                    window.scroll(0, 450);
                }}
            >
            </Pagination>
        </Container >
    )
}

export default CoinsTable;