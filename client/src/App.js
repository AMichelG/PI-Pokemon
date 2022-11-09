import "./App.css";
import { Switch, Route } from "react-router-dom";

import Landing from "./components/Landing/Landing";
import Nav from "./components/Nav/Nav";
import Creation from "./components/Creation/Creation";
import Detail from "./components/Detail/Detail";
import Home from "./components/Home/Home";
//importarlos componentes que aparezcan directamente en una ruta

function App() {
  return (
    <div className="App">
      <Route path="/:a">
        <Nav />
      </Route>

      <Switch>
        <Route exact path="/">
          <Landing />
        </Route>

        <Route exact path="/create">
          <Creation />
        </Route>

        <Route path="/home/:id">
          <Detail />
        </Route>

        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
