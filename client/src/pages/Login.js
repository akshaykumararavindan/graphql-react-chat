import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { userLogin } from "../store/actions";
import { useAuthState, useAuthDispatch } from "../store/context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useAuthDispatch();
  const { loading, error } = useAuthState();

  const submitForm = async (e) => {
    e.preventDefault();
    const result = await userLogin(dispatch, { email, password });
    if (result.data.user) {
      history.push("/dashboard");
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <form>
          <div>
            {loading && <p>Logging in if no errors please wait</p>}
            {error && <p>{error}</p>}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" onClick={submitForm}>
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
