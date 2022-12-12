import React from "react";
import { AppBar, Container, Toolbar, Typography, Select, MenuItem, makeStyles, createTheme, ThemeProvider } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { CryptoState } from "../CryptoContext";
import AuthModal from "./AuthModal";
import UserSideBar from "./UserSideBar";
const useStyles = makeStyles(() => ({
    title: {
        flex: 1,
        color: "gold",
        fontFamily: "Montserrat",
        fontWeight: "bold",
        cursor: "pointer"
    }
}));
const Header = () => {
    const { currency, setCurrency, user } = CryptoState();
    const navigate = useNavigate();
    const classes = useStyles();
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            type: "dark"
        },
    });
    return <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
            <Container>
                <Toolbar>
                    <Typography className={classes.title} onClick={() => navigate('/')} variant="h6">🪙 Bit-Tracker</Typography>
                    <Select variant="outlined"
                        style={{
                            width: "100px",
                            height: "40px",
                            marginRight: "15"
                        }}
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <MenuItem value={"USD"}>USD</MenuItem>
                        <MenuItem value={"INR"}>INR</MenuItem>
                    </Select>
                    {user ? <UserSideBar /> : < AuthModal />}
                </Toolbar>
            </Container>
        </AppBar>
    </ThemeProvider>
}
export default Header;