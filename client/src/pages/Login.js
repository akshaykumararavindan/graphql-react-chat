import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { userLogin } from "../store/actions";
import { useAuthState, useAuthDispatch } from "../store/context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useAuthDispatch();
  const { user, loading, error } = useAuthState();

  const submitForm = async (e) => {
    e.preventDefault();
    const result = await userLogin(dispatch, { email, password });
    if (result.data.user) {
      history.push("/dashboard");
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
            <label htmlFor="password">Password</label>
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
            <button type="submit" onClick={submitForm}>
              Login
            </button>
            <p>
              Need account? <a href="/register">Register here.</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
