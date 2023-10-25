import "../../styles/index.css";
import NavBar from "../../components/NavBar";
import { useDispatch, useSelector } from "react-redux";
import {getProfileContents, getProfileStatus, fetchProfile } from "../../features/profile";
import { useEffect } from "react";

const LOGO = require("../../assets/argentBankLogo.png");

function Profile() {

  const dispatch = useDispatch();
  const contents = useSelector(getProfileContents)
  const status = useSelector(getProfileStatus)

  useEffect(()=>{
    dispatch(fetchProfile(localStorage.getItem("userToken")))
  },[])



  return (
    <div className="profile">
        <NavBar src={LOGO}/>
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {contents.body ? `${contents.body.firstName} ${contents.body.lastName} !` : null}
          </h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Checking (x8349)</h3>
            <p className="account-amount">$2,082.79</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Savings (x6712)</h3>
            <p className="account-amount">$10,928.42</p>
            <p className="account-amount-description">Available Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
            <p className="account-amount">$184.30</p>
            <p className="account-amount-description">Current Balance</p>
          </div>
          <div className="account-content-wrapper cta">
            <button className="transaction-button">View transactions</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
