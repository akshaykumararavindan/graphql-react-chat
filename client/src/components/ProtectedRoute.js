import { Redirect, Route } from "react-router-dom";
import { useAuthState } from "../store/context";

const ProtectedRoute = ({ component: Component, path, isPrivate, ...rest }) => {
  const userDetails = useAuthState();

  return (
    <Route
      path={path}
      render={(props) =>
        isPrivate && !userDetails.user ? (
          <Redirect to={{ pathname: "/login" }} />
        ) : (
          <Component {...props} />
        )
      }
      {...rest}
    />
  );
};

export default ProtectedRoute;
