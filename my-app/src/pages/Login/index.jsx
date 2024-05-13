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
import ClipLoader from "react-spinners/ClipLoader";

function Login() {
  const dispatch = useDispatch();
  const loginContents = useSelector(getLoginContents);
  const logged = useSelector(getLoginLogged);
  const [signUp, setSignUp] = useState(false);
  const [signUpError, setSignUpError] = useState(false);
  const [loading, setLoading] = useState(false);
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const passWordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const nameRegex = /^[A-Za-z]+$/;

  const handleSubmitSignIn = async (e) => {
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
      email: formJson.email,
      password: formJson.password,
    };
    setLoading(true);
    console.log(loading);
    try {
      await dispatch(fetchLogin(bodyFetchData));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erreur lors de la connexion :", error);
    }
  };

  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (
      emailRegex.test(formJson.email) === true &&
      passWordRegex.test(formJson.password) === true &&
      nameRegex.test(formJson.firstname) === true &&
      nameRegex.test(formJson.lastname) === true
    ) {
      const bodyFetchData = {
        email: formJson.email,
        password: formJson.password,
        firstName: formJson.firstname,
        lastName: formJson.lastname,
      };

      setSignUpError(false);
      setLoading(true);
      try {
        await dispatch(fetchSignUp(bodyFetchData));
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Erreur lors de la création :", error);
    }
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
            loading ? (
              <div className="loader">
                <ClipLoader
                  color="black"
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  className="loader"
                  speedMultiplier={0.3}
                />
                <p>
                  Veuillez patienter pendant l'affichage des données, cela peut
                  prendre entre 30 et 50 secondes en raison du démarage de l'API
                  par Render.
                </p>
              </div>
            ) : (
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
                  description="Email"
                  type="text"
                  name="email"
                  id="email"
                  required={true}
                  errorDescription="Please enter valid Email"
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
            )
          ) : loading ? (
            <div className="loader">
              <ClipLoader
                color="black"
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
                className="loader"
                speedMultiplier={0.3}
              />
              <p>
                Veuillez patienter pendant l'affichage des données, cela peut
                prendre entre 30 et 50 secondes en raison du démarage de l'API
                par Render.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitSignIn}>
              <InputForm
                description="Email"
                type="text"
                name="email"
                id="email"
                required={true}
                errorDescription="Please enter valid Email"
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
