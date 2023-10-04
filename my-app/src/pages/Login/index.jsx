import "../../styles/index.css";
import NavBar from "../../components/NavBar";
import LoginForm from "../../components/LoginForm";

const LOGO = require("../../assets/argentBankLogo.png");

function Login() {
  return (
    <div className="login">
      <NavBar src={LOGO} />
      <main className="main bg-dark">
        <LoginForm />
      </main>
    </div>
  );
}

export default Login;
