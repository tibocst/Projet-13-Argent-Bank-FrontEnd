import "../../styles/index.css";
import { NavLink } from "react-router-dom";
import {getLoginLogged, disconnect} from "../../features/login";
import {getProfileContents } from "../../features/profile";
import { useSelector, useDispatch } from "react-redux";

function NavBar(props) {
  const { src } = props;
  const logged = useSelector(getLoginLogged)
  const dispatch = useDispatch()
  const contents = useSelector(getProfileContents)
  console.log(logged, "logged navbar")
  console.log(contents, "contents navbar")
  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={src} alt="Argent Bank Logo" />
      </NavLink>
      <div>
        {logged ? (
          <div>
          <NavLink className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            {contents.body ? contents.body.firstName : null}
          </NavLink>
          <NavLink onClick={()=> dispatch(disconnect())} className="main-nav-item" to="/" replace={true}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </NavLink>
          </div>
        ) : (
          <NavLink className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
