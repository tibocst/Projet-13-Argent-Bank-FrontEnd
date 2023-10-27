import "../../styles/index.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileContents,
  getProfileEdittForm,
  fetchProfile,
  modifyProfile,
  toggleEditForm,
} from "../../features/profile";
import { useEffect } from "react";

function Profile() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("userToken");
  const contents = useSelector(getProfileContents);
  const editForm = useSelector(getProfileEdittForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    const fetchData = 
    {token: token,
    body: {
      firstName: formJson.firstname,
      lastName: formJson.lastname,
    }};
    await dispatch(modifyProfile(fetchData));
    dispatch(toggleEditForm())
  };

  useEffect(() => {
    dispatch(fetchProfile(token));
  }, []);

  return (
    <div className="profile">
      <main className="main bg-dark">
        <div className="header">
          <h1>
            Welcome back
            <br />
            {contents.body
              ? `${contents.body.firstName} ${contents.body.lastName} !`
              : null}
          </h1>

          {editForm ? (
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <button type="submit" className="edit-button">
                    Valider
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(toggleEditForm());
                    }}
                    className="edit-button"
                  >
                    Annuler
                  </button>
                </div>
                <div>
                  <input type="text" name="firstname" id="firstname" />
                  <input type="text" name="lastname" id="lastname" />
                </div>
              </div>
            </form>
          ) : (
            <button
              onClick={() => {
                dispatch(toggleEditForm());
              }}
              className="edit-button"
            >
              Edit Name
            </button>
          )}
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
