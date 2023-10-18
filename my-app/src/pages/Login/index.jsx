import "../../styles/index.css";
import NavBar from "../../components/NavBar";
import { Navigate } from "react-router-dom";
import * as loginActions from "../../features/login";
import { useDispatch, useSelector } from "react-redux";

const LOGO = require("../../assets/argentBankLogo.png");

function Login() {

  const dispatch = useDispatch();
  const check = useSelector((state) => state.login.isLogged);

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(loginActions.set(true))
  }

  if (check) {
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
            {/* <div className="input-wrapper">
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
            </div> */}
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
