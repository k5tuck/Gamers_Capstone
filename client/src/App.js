import '@progress/kendo-theme-default/dist/all.css';
import "./App.css";
import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import Login from "./components/Login";

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
        </div>
      </Switch>
    </Router>
  );
}

export default App;
