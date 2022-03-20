import React from "react";
import { Amplify, API } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

import awsExports from "./aws-exports";
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
import Login from "./components/LandingPage/Login";
import { json } from "body-parser";
Amplify.configure({
  ...awsExports,
  API: {
    endpoints: [
      {
        name: "watchit",
        endpoint: "https://ty3opycl7e.execute-api.us-east-1.amazonaws.com/prod",
      },
    ],
  },
});

const App = ({ signOut, user }) => {
  const [apiData, setApiData] = React.useState("");

  const handleClick = async () => {
    const data = await API.get("watchit", "/watcher", {
      headers: {
        Authorization: user.signInUserSession.idToken.jwtToken,
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Headers": "*",
        // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        // "Access-Control-Allow-Credentials": true,
      },
    });
    setApiData(data.body);
  };

  return (
    <div>
      {/* <pre>{JSON.stringify(user, null, 2)}</pre>
      <h1>Hello {user.username}</h1>
      <p style={{ color: "black" }}>
        {user.signInUserSession.idToken.jwtToken}
      </p>
      <p style={{ color: "black" }}>{apiData}</p>
      <button onClick={signOut}>signOut</button>
      <button onClick={handleClick}>Click me!</button> */}
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

export default withAuthenticator(App);
