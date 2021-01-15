let user = localStorage.getItem("loggedInUser")
  ? JSON.parse(localStorage.getItem("loggedInUser")).user
  : "";

export const initialState = {
  user: user || "",
  loading: false,
  error: null,
};

export const LoginReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true,
      };
    case "LOGIN_SUCCESS": {
      return { ...initialState, user: action.payload.user, loading: false };
    }
    case "LOGIN_FAILURE": {
      return {
        ...initialState,
        loading: false,
        error: action.error,
      };
    }
    case "LOGOUT": {
      return {
        initialState: null,
      };
    }
    default: {
      return {
        initialState,
      };
    }
  }
};
