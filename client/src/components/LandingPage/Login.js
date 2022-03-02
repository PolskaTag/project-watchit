import loginLogo from "../images/login.png";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div className="login">
      {/* <img className="login-logo" src={loginLogo}></img> */}
      <form className="form">
        <h1>Login</h1>
        <label>
          Email:{" "}
          <input
            placeholder="Enter your email here!"
            type="email"
            name="email"
          />
        </label>
        <label>
          Password:{" "}
          <input placeholder="Password" type="password" name="password" />
        </label>
        <input
          className="action-button form-button"
          label="hello"
          type="submit"
          value="Submit"
        />
        <span>
          New? Register your account{" "}
          <Link className="form-link" to="/join">
            Here
          </Link>
        </span>
      </form>
    </div>
  );
}
