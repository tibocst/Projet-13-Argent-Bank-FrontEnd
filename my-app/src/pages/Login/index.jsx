import "../../styles/index.css";
import NavBar from "../../components/NavBar";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const LOGO = require("../../assets/argentBankLogo.png");

function Login() {
  const [inputs, setInput] = useState({ username: "", password: "" });

  function inputChange(e) {
    setInput({ ...inputs, [e.target.name]: e.target.value });
  }

  function login(event) {
    event.preventDefault();
    if (!inputs.username || !inputs.password) return;
    return (
      <Navigate to="/" replace={true}/>
      );  }

  return (
    <div className="login">
      <NavBar src={LOGO} />
      <main className="main bg-dark">
        <div className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={login}>
            <div className="input-wrapper">
              <label>Username
                <input type="text" name="username" id="username" onChange={inputChange}/>
              </label>
            </div>
            <div className="input-wrapper">
              <label>Password
                <input type="password" name="password" id="password" onChange={inputChange}/>
              </label>
            </div>
            <div className="input-remember">
              <label>Remember me
                <input type="checkbox" id="remember-me" />
              </label>
            </div>
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
