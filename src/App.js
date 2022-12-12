import { makeStyles } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';

import Home from './pages/Home';
import CoinPage from './pages/CoinPage';
import { ThemeProvider, createTheme } from '@material-ui/core';
import Footer from './components/Footer';
import Alert from './components/Alert';
function App() {
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#14161a",
      color: "white",
      minHeight: "100vh"
    }
  }));
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff"
      },
      type: "dark"
    },
  });
  const classes = useStyles();
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/coins/:id' element={<CoinPage />} />
          </Routes>
          <Footer />
        </div>
        <Alert />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
