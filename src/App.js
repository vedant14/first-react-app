import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Create from "./pages/Create";
import SinglePost from "./pages/SinglePost"
import Login from "./pages/Login"
function App() {
  return (
    <div className="App">
      <h2>App</h2>
      <BrowserRouter>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/create" exact component={Create} />
          <Route path="/login" exact component={Login} />
          <Route path="/:id" exact component={SinglePost} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
