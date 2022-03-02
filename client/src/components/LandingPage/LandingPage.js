/** The LandingPage is made up 3 sub components:
 *  LandingNavbar - the navbar to our landingpage.
 *  LandingBody - the content displayed on each
 *  LandingFooter - Links to socials and Action buttons
 */
import { Outlet, Link } from "react-router-dom";
import "./LandingPage.css";
import "../../App.css";

function LandingPage() {
  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="logo-div">
          <Link to="/">WT</Link>;
        </div>
        <nav className="nav">
          <ul className="landing-links">
            <li>
              <Link to="/discover">Discover</Link>
            </li>
            <li>
              <Link to="/join">Join</Link>
            </li>
            <li>
              <Link to="/SignIn">Sign In</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default LandingPage;
