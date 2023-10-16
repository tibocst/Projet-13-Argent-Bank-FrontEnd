import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Protected from "./components/Protected";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import { useState } from "react";

function App() {
    const [isLoggedIn, setisLoggedIn] = useState(null);
//  const logIn = () => {
//    setisLoggedIn(true);
//  };
//  const logOut = () => {
//    setisLoggedIn(false);
//  };

    return(
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/profile'
         element={
           <Protected isLoggedIn={isLoggedIn}>
             <Profile />
           </Protected>
         }
       />
        </Routes>
        <Footer />
      </Router>
);
}

export default App;