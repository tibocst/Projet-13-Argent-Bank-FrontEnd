import "../../styles/index.css";
import NavBar from "../../components/NavBar";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {getLoginContents, getLoginStatus, getLoginLogged, fetchLogin } from "../../features/login";
// import { getUser } from "../../api";


const LOGO = require("../../assets/argentBankLogo.png");

function Login() {

  const dispatch = useDispatch();
  const contents = useSelector(getLoginContents)
  const status = useSelector(getLoginStatus)
  const logged = useSelector(getLoginLogged)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const bodyFetchData = {
      email: formJson.username,
      password: formJson.password
    }
    await dispatch(fetchLogin(bodyFetchData));
  }

  //test fetch

  // const [data, setData] = useState(null);

  // const fetchUser = async () => {
  //   const response = await getUser();
  //     setData(response);
  // };

  // useEffect(() => {
  //     fetchUser();
  // }, []);

  // console.log(data)


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
                <input type="checkbox" id="remember-me" />
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
