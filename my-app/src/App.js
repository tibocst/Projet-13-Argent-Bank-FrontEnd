import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import Error from './pages/Error'
import {  fetchProfile } from "./features/profile";
import { getLoginLogged, connect } from "./features/login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const LOGO = require("./assets/argentBankLogo.png");

function App() {
  const dispatch = useDispatch();
  const logged = useSelector(getLoginLogged);

  useEffect(() => {
    if (
      localStorage.getItem("rememberMe") === "true" &&
      localStorage.getItem("userToken") && 
      logged === false
    ) {
      dispatch(connect());
      dispatch(fetchProfile(localStorage.getItem("userToken")))
    }
  },[dispatch,logged]);

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
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
