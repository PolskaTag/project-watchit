
import React from "react";

// We use Route in order to define the different routes of our application
import { Switch, BrowserRouter, Route } from "react-router-dom";

// We import all the components we need in our app
//import Navbar from "./components/Navbar.jsx";
import Register from "./components/Register";
import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import AdminUser from "./components/AdminUser";
// import Home from "./components/Home";
//import { Profile } from './components/profile';
import ProfilePage from "./components/ProfilePage";
import VideoList from "./components/VideoList";
import ConfigWatcher from "./components/ConfigWatcher";


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route component={AdminUser} exact path="/admin/user"/>
          <Route component={Register} exact path="/register" />
          <Route component={Login} exact path="/login" />
          <Route component={LandingPage} exact path="/" />
          {/* <Route component={Home} exact path="/Home"></Route> */}
          <Route component={ProfilePage} exact path="/ProfilePage" />
          <Route component={VideoList} exact path="/VideoList" />
          <Route component={ConfigWatcher} exact path="/ConfigWatcher" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;