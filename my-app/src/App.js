import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import { getLoginLogged, connect } from "./features/login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const LOGO = require("./assets/argentBankLogo.png");

function App() {
  const dispatch = useDispatch();
  const logged = useSelector(getLoginLogged);
  console.log(localStorage.getItem("rememberMe"), "app rememberMe");
  console.log(localStorage.getItem("userToken"), "app token");

  useEffect(() => {
    if (
      localStorage.getItem("rememberMe") === "true" &&
      localStorage.getItem("userToken") && 
      logged === false
    ) {
      console.log(localStorage.getItem("rememberMe"), "app rememberMe if");
      dispatch(connect());
      console.log(logged, "app logged");
    }
  },[]);

  return (
    <Router>
      <NavBar src={LOGO} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
