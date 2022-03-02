import React from "react";

// We use Route in order to define the different routes of our application
import { Switch, BrowserRouter, Route, Outlet, Link } from "react-router-dom";

// We import all the components we need in our app
//import Navbar from "./components/Navbar.jsx";
// import Register from "./components/Register";
// import Login from "./components/Login";
import LandingPage from "./components/LandingPage/LandingPage";
// import AdminUser from "./components/AdminUser";
// import Home from "./components/Home";
//import { Profile } from './components/profile';
// import ProfilePage from "./components/ProfilePage";
// import VideoList from "./components/VideoList";
// import ConfigWatcher from "./components/ConfigWatcher";
// import watcherConfigurator from "./components/watcherConfigurator/index";
// import Pictures from "./components/picture";
// import Navbar from "./components/Navbar";
import Discover from "./components/LandingPage/Discover";
import Join from "./components/LandingPage/Join";
import SignIn from "./components/LandingPage/SignIn";

const App = () => {
  return (
    <div>
      <LandingPage />
      {/* <BrowserRouter>
        <Switch>
          <Route component={AdminUser} exact path="/admin/user" />
          <Route component={Register} exact path="/register" />
          <Route component={Login} exact path="/login" />
          <Route component={LandingPage} exact path="/">
            <Route path="discover" component={Discover} />
            <Route path="join" component={Join} />
            <Route path="signIn" component={SignIn} />
          </Route>
          <Route component={Home} exact path="/Home"></Route>
          <Route component={ProfilePage} exact path="/ProfilePage" />
          <Route component={VideoList} exact path="/VideoList" />
          <Route component={Pictures} exact path="/Pictures" />
          <Route component={ConfigWatcher} exact path="/ConfigWatcher" />
          <Route
            component={watcherConfigurator}
            exact
            path="/watcherConfigurator"
          />
        </Switch>
      </BrowserRouter> */}
    </div>
  );
};

export default App;
