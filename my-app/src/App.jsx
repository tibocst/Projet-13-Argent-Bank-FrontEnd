import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer"
import './styles/index.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Router>
    <Routes>
        <Route path="/" element={
        <ProtectedRoute>
        <Home/>
        </ProtectedRoute>
     }/>
     console.log("passé routeur")
        <Route path="/login" element={<Login/>} />
    </Routes>
    <Footer />
    </Router>
  );
}

export default App;