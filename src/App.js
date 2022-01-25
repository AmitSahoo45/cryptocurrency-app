import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
// import CoinPage from './Pages/CoinPage';
// import Homepage from './Pages/Homepage';
import { makeStyles } from '@material-ui/core/styles';
import { lazy, Suspense } from 'react';
import { CircularProgress } from '@material-ui/core';
const Homepage = lazy(() => import("./Pages/Homepage"))
const CoinPage = lazy(() => import("./Pages/CoinPage"))

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "#ffffff",
    minHeight: "100vh",
  },
}));


function App() {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Suspense
          fallback={
            <CircularProgress
              color="secondary"
            />
          }
        >
          <Routes>
            <Route exact path='/' element={<Homepage />} />
            <Route path='/coins/:id' element={<CoinPage />} />
          </Routes>
        </Suspense>
      </div>
    </BrowserRouter>
  );
}

export default App;
