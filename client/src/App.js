import './App.css';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import LandingPage from './Components/LandingPage/LandingPage';
import Home from './Components/Home/Home';
import CreatePokemon from './Components/CreatePokemon/CreatePokemon';
import Details from './Components/Details/Details';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/pokemon" component={CreatePokemon} />
          <Route path="/detail/:id" component={Details} />
        </Switch>
      </div>

    </BrowserRouter>
  );
}

export default App;
