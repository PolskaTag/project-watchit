import githubIcon from "../images/github-icon.png";
import twitterIcon from "../images/twitter-icon.png";
import instagramIcon from "../images/instagram-icon.png";
import facebookIcon from "../images/facebook-icon.png";
import { Link } from "react-router-dom";

export default function LandingMain() {
  return (
    <>
      <div className="landing-main">
        <div className="main-text">
          <h1>WatchIT</h1>
          <h2>Detect and Act</h2>
          <h3>A lightweight user-defined action and object detection app.</h3>
        </div>
      </div>
      <footer className="landing-footer">
        <div className="plugs">
          <a>
            <img src={facebookIcon} />
          </a>
          <a>
            <img src={githubIcon} />
          </a>
          <a>
            <img src={instagramIcon} />
          </a>
          <a>
            <img src={twitterIcon} />
          </a>
        </div>
        <div className="action-buttons">
          <Link to="/discover" className="action-button">
            Learn More
          </Link>
          <Link to="/join" className="action-button">
            Sign Up
          </Link>
        </div>
      </footer>
    </>
  );
}
