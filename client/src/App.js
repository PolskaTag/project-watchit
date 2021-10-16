import React from "react";

// We use Route in order to define the different routes of our application
import { Switch, BrowserRouter, Route } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/Navbar.jsx";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
// import Home from "./components/Home";
//import { Profile } from './components/profile';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route component={Register} exact path="/register" />
          <Route component={Login} exact path="/login" />
          <Route component={LandingPage} exact path="/" />
          {/* <Route component={Home} exact path="/Home"></Route> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
