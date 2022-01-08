import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CoinPage from './Pages/CoinPage';
import Homepage from './Pages/Homepage';
import { makeStyles } from '@material-ui/core/styles';

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
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route path='/coins/:id' element={<CoinPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
