import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const LoginPrivateRoute = ({ component: Component, ...rest }) => {
  const [state] = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        state.loading ? (
          <>
            <h1>loading...</h1>
          </>
        ) :
        state.loginStatus ? <Component {...props} /> : <Redirect to="/" /> 
      }
    />
  );
};

export default LoginPrivateRoute;