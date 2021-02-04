import '@progress/kendo-theme-default/dist/all.css';
import "./App.css";
import axios from "axios";
import React from "react";
import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import Login from "./components/Login";
import About from "./components/About";


function App() {
  // let history = useHistory();


  return (
    <div className="App">
    <Router>
      <Switch>
        
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

        
      </Switch>
    </Router>
    </div>
  );
}

export default App;
