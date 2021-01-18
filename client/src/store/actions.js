import axios from "axios";
import * as constants from "./constants/constants";

const URL = "http://localhost:5000";
const POSTCONFIG = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export const userLogin = async (dispatch, { email, password }) => {
  try {
    dispatch({ type: constants.REQUEST_LOGIN });
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
      dispatch({ type: constants.LOGIN_SUCCESS, payload: result.data });
      localStorage.setItem("loggedInUser", JSON.stringify(result.data));
      return result;
    } else if (!result.data.user) {
      dispatch({ type: constants.LOGIN_FAILURE, payload: result.data.error });
      return;
    }
  } catch (error) {
    dispatch({ type: constants.LOGIN_FAILURE, payload: error });
  }
};

export const userRegister = async (
  dispatch,
  { username, email, firstname, lastname, birthdate, password }
) => {
  try {
    dispatch({ type: constants.REGISTER_ACCOUNT_REQUEST });
    const result = await axios.post(
      `${URL}/account/register`,
      { username, email, firstname, lastname, birthdate, password },
      POSTCONFIG
    );
    if (result) {
      dispatch({
        type: constants.REGISTER_ACCOUNT_SUCCESS,
        payload: result.data.error,
      });
    }
    console.log(result);
  } catch (error) {
    dispatch({ type: constants.REGISTER_ACCOUNT_FAILURE, payload: error });
  }
};

export const userLogout = async (dispatch) => {
  dispatch({ type: constants.LOGOUT });
  localStorage.removeItem("loggedInUser");
  await axios.get(`http://localhost:5000/account/logout`);
  return;
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
