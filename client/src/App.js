import "./App.css";
import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import Login from "./components/Login";
import About from "./components/About";

function App() {
  return (
    <Router>
      <Switch>
        <div className="App">
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          Gamers Capstone
          <Route path="/about"> 
            <About />
          </Route>

        </div>
      </Switch>
    </Router>
  );
}

export default App;
