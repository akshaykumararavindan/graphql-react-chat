import axios from "axios";

const URL = "http://localhost:5000";
const POSTCONFIG = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const userLogin = async (dispatch, { email, password }) => {
  try {
    dispatch({ type: "REQUEST_LOGIN" });
    const result = await axios.post(
      `http://localhost:5000/account/login`,
      {
        email,
        password,
      },
      POSTCONFIG
    );
    console.log(result);
    if (result.data.user) {
      dispatch({ type: "LOGIN_SUCCESS", payload: result.data });
      localStorage.setItem("loggedInUser", JSON.stringify(result.data));
      return result;
    } else if (!result.data.user) {
      dispatch({ type: "LOGIN_FAILURE", error: result.data.error });
      return;
    }
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", error: error });
  }
};

export const userLogout = async (dispatch) => {
  dispatch({ type: "LOGOUT" });
  localStorage.removeItem("loggedInUser");
};

export const dashboard = async () => {
  try {
    const result = await axios.get(`${URL}/pages/dashboard`);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
