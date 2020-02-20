import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import BigNavbar from "./components/BigNavbar.js";
import ToggleNavButton from "./components/ToggleNavButton.js";
import PageContainer from "./components/PageContainer.js";
import { Home, Login, Signup, Themes } from "./pages";


const checkPath = path => {
  switch (path) {
    case "home":
      return <Redirect to="/" />;
      break;
    case "login":
      return <Redirect to="/login" />;
      break;
    case "signup":
      return <Redirect to="/signup" />;
      break;
    case "themes":
      return <Redirect to="/themes" />;
      break;
    default:
      break;
  }
};

function App() {
  const [loggedIn, toggleLoggedIn] = useState();
  const [userId, setUserId] = useState('');
  const [navToggled, toggleNav] = useState(false);
  const [redirectPath, setRedirectPath] = useState();

  const loadUser = (user) => {
    toggleLoggedIn(true);
    setUserId(user.user_id)
    console.log('logged in ' + loggedIn)
  }

  const logOut = (user) => {
    toggleLoggedIn(false);
    setUserId('')
    console.log('logged in ' + loggedIn)
  }

  return (
    <div className="App">
      {/* Navbar */}
      <BigNavbar
        toggleNav={toggleNav}
        navToggled={navToggled}
        setRedirectPath={setRedirectPath}
        loggedIn={loggedIn}
        logOut={logOut}
      />

      <ToggleNavButton navToggled={navToggled} toggleNav={toggleNav} />
      {/* Pages */}
      <Router>
        {checkPath(redirectPath)}

        {/* Switch */}
        <PageContainer marginleft={navToggled ? "25vw" : "0px"}>
      {/* <h3>ColorItX</h3> */}
          <Switch>
            <Route path="/login">
              <Login loadUser={loadUser} setRedirectPath={setRedirectPath}/>
            </Route>
            <Route path="/signup">
              <Signup loadUser={loadUser} setRedirectPath={setRedirectPath}/>
            </Route>
            <Route path="/themes">
              <Themes user_id={userId} loggedIn={loggedIn} setRedirectPath={setRedirectPath}/>
            </Route>
            <Route exact path="/">
              <Home setRedirectPath={setRedirectPath} loggedIn={loggedIn} />
            </Route>
          </Switch>
        </PageContainer>
      </Router>

    </div>
  );
}

export default App;
