import * as constants from "../constants/constants";

let user = localStorage.getItem("loggedInUser")
  ? JSON.parse(localStorage.getItem("loggedInUser")).user
  : "";

export const initialState = {
  user: user || {},
  loading: false,
  error: null,
  posts: {},
  settings: {},
};

export const ContextReducer = (initialState, action) => {
  switch (action.type) {
    case constants.REQUEST_LOGIN:
      return {
        ...initialState,
        loading: true,
      };
    case constants.LOGIN_SUCCESS: {
      return { ...initialState, user: action.payload.user, loading: false };
    }
    case constants.LOGIN_FAILURE: {
      return {
        ...initialState,
        loading: false,
        error: action.error,
      };
    }
    case constants.REGISTER_ACCOUNT_REQUEST: {
      return {
        loading: true,
        error: false,
      };
    }
    case constants.REGISTER_ACCOUNT_SUCCESS: {
      return {
        ...initialState,
        user: action.payload,
      };
    }
    case constants.REGISTER_ACCOUNT_FAILURE: {
      return {
        ...initialState,
        loading: false,
        error: action.error,
      };
    }
    case constants.LOGOUT: {
      return {
        loginState: {},
      };
    }
    default: {
      return {
        loginState: initialState,
      };
    }
  }
};
