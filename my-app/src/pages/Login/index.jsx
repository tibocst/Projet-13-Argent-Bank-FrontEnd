import "../../styles/index.css";
import { Navigate } from "react-router-dom";
import InputForm from "../../components/InputForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginLogged,
  fetchLogin,
  fetchSignUp,
  getLoginContents,
} from "../../features/login";
import { useState } from "react";

function Login() {
  const dispatch = useDispatch();
  const loginContents = useSelector(getLoginContents);
  const logged = useSelector(getLoginLogged);
  const [signUp, setSignUp] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  const passWordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/
  const nameRegex = /^[A-Za-z]+$/

  const handleSubmitSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    if (formJson.rememberme === "on") {
      localStorage.setItem("rememberMe", true);
    } else {
      localStorage.setItem("rememberMe", false);
    }
    const bodyFetchData = {
      email: formJson.username,
      password: formJson.password,
    };
    dispatch(fetchLogin(bodyFetchData));
  };

  const handleSubmitSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (
      emailRegex.test(formJson.username) === true &&
      passWordRegex.test(formJson.password) === true &&
      nameRegex.test(formJson.firstname) === true &&
      nameRegex.test(formJson.lastname) === true
    ) {
      const bodyFetchData = {
        email: formJson.username,
        password: formJson.password,
        firstName: formJson.firstname,
        lastName: formJson.lastname,
      };

      setSignUpError(false);
      dispatch(fetchSignUp(bodyFetchData));
    } else {
      setSignUpError(true);
    }
  };

  const handleClick = () => {
    setSignUp(!signUp);
  };

  if (logged) {
    return <Navigate to="/profile" replace={true} />;
  }
  return (
    <div className="login">
      <main className="main bg-dark">
        <div className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>{signUp ? "Sign Up" : "Sign In"}</h1>
          {loginContents.status === 400 && signUp === false ? (
            <p className="errorSignIn">
              Email or passWord not found, try again
            </p>
          ) : null}
          {signUpError === true ? (
            <p className="errorInput">Error in form, try again</p>
          ) : null}
          {signUp ? (
            <form onSubmit={handleSubmitSignUp}>
              <InputForm
                description="FirstName"
                type="text"
                name="firstname"
                id="firstname"
                required={true}
                errorDescription="Please enter valid firstname (no number)"
              />
              <InputForm
                description="LastName"
                type="text"
                name="lastname"
                id="lastname"
                required={true}
                errorDescription="Please enter valid lastname (no number)"
              />
              <InputForm
                description="Username"
                type="text"
                name="username"
                id="username"
                required={true}
                errorDescription="Please enter valid User Name"
              />
              <InputForm
                description="Password"
                type="password"
                name="password"
                id="password"
                required={true}
                errorDescription="Please enter valid password : One uppercase, numbers and 6-20 length"
              />
              <button type="submit" className="sign-in-button">
                Sign Up
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmitSignIn}>
              <InputForm
                description="Username"
                type="text"
                name="username"
                id="username"
                required={true}
                errorDescription="Please enter valid Username or email"
              />
              <InputForm
                description="Password"
                type="password"
                name="password"
                id="password"
                required={true}
              />
              <InputForm
                description="Remember me"
                type="checkbox"
                name="rememberme"
                id="remember-me"
                required={false}
              />
              <button type="submit" className="sign-in-button">
                Sign In
              </button>
            </form>
          )}

          <div onClick={handleClick} className="loginSwitch">
            <p>{signUp ? "Sign In ?" : "Sign Up ?"}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
