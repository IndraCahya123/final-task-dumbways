import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "react-query";

import './App.css';

import { ModalContextProvider } from './contexts/modalContext';
import { MenuContextProvider } from './contexts/menuContext';

import { UserContext } from './contexts/userContext';

import Home from './pages/Landing';
import Template from './pages/Template';
import Profile from './pages/Profile';
import MyLink from './pages/MyLink';

import Navbar from './components/macro/Navbar';

import LoginPrivateRoute from './privateRoute/LoginPrivateRoute';

import { APIURL, setAuthToken } from './api/integration';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {

  const queryClient = new QueryClient();

  const [stateUser, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await APIURL.get("/is-auth");

      if (response.status === 401) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data;
      payload.user.token = localStorage.token;
      
      dispatch({
        type: "AUTH_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
      });
    }
    console.log(stateUser);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className={stateUser.loginStatus ? "d-flex" : ""}>
      <QueryClientProvider client={queryClient}>
        <ModalContextProvider>
          <MenuContextProvider>
            <Router>
              <Navbar />
                <Switch>
                {stateUser.loginStatus ? <LoginPrivateRoute exact path="/template" component={Template} /> :
                  <Route exact path="/" component={Home} />}
                  <LoginPrivateRoute exact path="/profile" component={Profile} />
                  <LoginPrivateRoute exact path="/my-link" component={MyLink} />
                </Switch>
            </Router>
          </MenuContextProvider>
        </ModalContextProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
