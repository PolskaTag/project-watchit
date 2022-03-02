import { Link } from "react-router-dom";
export default function Join() {
  return (
    <div className="join">
      <form className="form">
        <h1>Join</h1>
        <label>
          Email: <input type="email" name="email" />
        </label>
        <label>
          Password: <input type="password" name="password" />
        </label>
        <label>
          Confirm Password: <input type="password" name="password-confirm" />
        </label>
        <input
          className="action-button form-button"
          label="hello"
          type="submit"
          value="Submit"
        />
        <span>
          Already have an account?{" "}
          <Link to="/login" className="form-link">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}
