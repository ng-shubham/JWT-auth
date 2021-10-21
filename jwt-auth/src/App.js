import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import Header from "./Components/Header";
import { useState } from "react";
import "../src/App.css";
import Register from "./Components/Register";

function App() {
  const [logOutUser, setLogOutUser] = useState(false);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Header logOutUser={logOutUser} setLogOutUser={setLogOutUser} />
            <Home logOutUser={logOutUser} />
          </Route>
          <Route path="/login">
            <Login setLogOutUser={setLogOutUser} />
          </Route>
          <Route path="/register">
            <Register setLogOutUser={setLogOutUser} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
