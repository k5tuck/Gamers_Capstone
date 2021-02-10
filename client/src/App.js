import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUpPage from "./components/SignUpPage";
import Login from "./components/Login";
import About from "./components/About";
import MemberHome from "./components/MemberHome";
import ProfilePage from "./components/ProfilePage";
import HomeInitial from "./components/HomeInitial";
import AddPost from "./components/AddPost";
import GamePage from "./components/GamePage";
import WidgetChat from "./components/subcomponents/WidgetChat";
import Layout, { createFollow, removeFollow } from "./components/Layout";
import EditPost from "./components/EditPost";
import Contact from "./components/Contact";
import SearchPage from "./components/SearchPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [sessionid, setSessionId] = useState(null);

  // sessionid ? setIsLoggedIn(true) : setIsLoggedIn(false);

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
            <Login
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              // setSessionId={setSessionId}
            />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/contact">
            <Contact />
          </Route>
          Gamers Capstone
          <Layout isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
            <Route path="/member/home">
              <MemberHome isLoggedIn={isLoggedIn} />
            </Route>
            <Route path="/addPost">
              <AddPost />
            </Route>
            <Route path="/editpost">
              <EditPost />
            </Route>
            <Route path="/member/game/:id">
              <GamePage />
            </Route>
            <Route path="/profile/:id">
              <ProfilePage
                createFollow={createFollow}
                removeFollow={removeFollow}
              />
            </Route>
            <Route path="/member/chat">
              <WidgetChat />
            </Route>
            <Route path="/member/search">
              <SearchPage />
            </Route>
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
