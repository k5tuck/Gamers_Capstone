import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import axios from "axios";
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  useParams,
} from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import Login from "./components/Login";
import About from "./components/About";
import MemberHome from "./components/MemberHome";
import ProfilePage from "./components/ProfilePage";
import HomeInitial from "./components/HomeInitial";
import AddPost from "./components/AddPost";
import GamePage from "./components/GamePage";
import Layout, { createFollow } from "./components/Layout";

function App() {
  // let history = useHistory();

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <HomeInitial />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          Gamers Capstone
          <Layout>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/member/home">
              <MemberHome />
            </Route>
            <Route path="/addPost">
              <AddPost />
            </Route>
            <Route path="/member/game/:id">
              <GamePage />
            </Route>
            <Route path="/profile/:id">
              <ProfilePage createFollow={createFollow} />
            </Route>
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
