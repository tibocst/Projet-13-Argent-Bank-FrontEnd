import "./styles/index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";

function App() {
    return(
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/profile'
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