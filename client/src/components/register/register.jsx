import React from "react";
import loginImg from "./images/login2.png";
import "./register.css";

export class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return ( 
            <div className = "base-container" ref={this.props.containerRef}>
                <div className = "header"></div>
                <div className = "content">
                    <div className="image">
                        <br/>
                        <br/>
                        <br/>
                        <img src={loginImg} alt="login pic" class="register-logo"/>
                        <br/>
                        <br/>
                        <br/>
                        <div className="form">
                            <div className="form-group">
                                <label htmlFor="username">Email: </label>
                                <input type="text" name="email" placeholder="Email Address" />
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="password">Password: </label>
                                <input type="password" name="password" placeholder="Pasword" />
                            </div>
                            <br/>
                            <div className="form-group">
                                <label htmlFor="password">Confirm Password: </label>
                                <input type="password" name="confirm-password" placeholder="Confirm Pasword" />
                            </div>
                            <br/>
                        </div>
                        <br/>
                    </div>
                    <div className="form-group">
                        <input
                        type="submit"
                        value="Sign Up"
                        className="btn btn-primary"
                        />
                    </div>
                </div>
            </div>
        );
    }
}