import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { userRegister } from "../store/actions";
import { useAuthState, useAuthDispatch } from "../store/context";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const history = useHistory();
  const dispatch = useAuthDispatch();
  const { user, loading, error } = useAuthState();

  const submitForm = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const result = await userRegister(dispatch, {
        email,
        username,
        firstname,
        lastname,
        birthdate,
        password,
        confirmPassword,
      });
      console.log(result);
    } else {
      alert("Your passwords do not match");
    }
  };
  return (
    <>
      {loading && <div className="loader"></div>}
      {error && <p>{error}</p>}
      <div
        className="flex-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <form>
          <div style={{ flexDirection: "column" }}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div style={{ flexDirection: "column" }}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div style={{ flexDirection: "column" }}>
            <label htmlFor="firstname">Firstname</label>
            <input
              type="text"
              name="firstname"
              placeholder="Enter Firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div style={{ flexDirection: "column" }}>
            <label htmlFor="lastname">Lastname</label>
            <input
              type="text"
              name="lastname"
              placeholder="Enter lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div style={{ flexDirection: "column" }}>
            <label htmlFor="birthdate">Birthday</label>
            <input
              type="date"
              name="birthdate"
              placeholder="Enter date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              required
            />
          </div>
          <div style={{ flexDirection: "column" }}>
            <label htmlFor="email">Password</label>
            <input
              type="text"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ flexDirection: "column" }}>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="text"
              name="confirm-password"
              placeholder="Enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div style={{ flexDirection: "column" }}>
            <button type="submit" onClick={submitForm}>
              Register
            </button>
            <p>
              Already have an account? <a href="/login">Login.</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
