import '../../styles/index.css'
import { NavLink } from "react-router-dom";

function NavBar(props) {

    const { src } = props;

    return (
        <nav className="main-nav">
        <a className="main-nav-logo" href="./index.html">
          <img
            className="main-nav-logo-image"
            src={src}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </a>
        <div>
        <NavLink className="main-nav-item" to="/login"> 
            <i className="fa fa-user-circle"></i>
            Sign In 
        </NavLink>
        </div>
      </nav>
    );
}

export default NavBar;