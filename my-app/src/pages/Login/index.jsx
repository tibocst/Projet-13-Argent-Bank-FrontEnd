import "../../styles/index.css";
import NavBar from "../../components/NavBar";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getLoginLogged, fetchLogin } from "../../features/login";


const LOGO = require("../../assets/argentBankLogo.png");

function Login() {

  const dispatch = useDispatch();
  const logged = useSelector(getLoginLogged)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    if(formJson.rememberme === 'on') {
      localStorage.setItem("rememberMe", true)
    } else {
      localStorage.setItem("rememberMe", false)
    }
    const bodyFetchData = {
      email: formJson.username,
      password: formJson.password
    }
    await dispatch(fetchLogin(bodyFetchData));
    console.log(localStorage.getItem('rememberMe'), "login rememberMe")
    console.log(localStorage.getItem('userToken'), "login token")

  }

  if (logged) {
    return <Navigate to="/profile" replace={true} />
  }
  return (
    <div className="login">
      <NavBar src={LOGO} />
      <main className="main bg-dark">
        <div className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label>Username
                <input type="text" name="username" id="username"/>
              </label>
            </div>
            <div className="input-wrapper">
              <label>Password
                <input type="password" name="password" id="password"/>
              </label>
            </div>
            <div className="input-remember">
              <label>Remember me
                <input type="checkbox" name="rememberme"  id="remember-me" />
              </label>
            </div>
            <button type="submit" className="sign-in-button">
              Sign In
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
