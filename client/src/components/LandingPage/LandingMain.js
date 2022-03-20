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
      <section className="action-section">
        <div className="action-description">
          <h1>Try detecting today!</h1>
          <p>
            WatchIT lets people turn their computer into lightweight object
            detectors. Simply sign in to get started.
          </p>
        </div>
        <div className="action-buttons">
          <Link to="/discover" className="action-button" id="learn-more">
            Learn More
          </Link>
          <Link to="/join" className="action-button" id="sign-up">
            Sign Up
          </Link>
        </div>
      </section>
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
      </footer>
    </>
  );
}
