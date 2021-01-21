import * as constants from "../constants/constants";

let user = localStorage.getItem("loggedInUser")
  ? JSON.parse(localStorage.getItem("loggedInUser")).user
  : "";

export const initialState = {
  user: user || {},
  loading: false,
  error: null,
  posts: {},
  post: {},
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
    case constants.GET_ALL_POSTS_REQUEST: {
      return {
        ...initialState,
        loading: true,
        error: null,
      };
    }

    case constants.GET_ALL_POSTS_SUCCESS: {
      return {
        ...initialState,
        loading: false,
        error: false,
        posts: action.payload,
      };
    }
    case constants.GET_ALL_POSTS_FAILURE: {
      return {
        ...initialState,
        error: action.error,
        loading: false,
      };
    }

    case constants.GET_SINGLE_POST_SUCCESS: {
      return {
        ...initialState,
        post: action.payload,
        loading: false,
        error: null,
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
