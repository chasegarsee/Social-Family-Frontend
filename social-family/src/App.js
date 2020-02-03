import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";

/* GOOGLE ANALYTICS */
import ReactGA from "react-ga";

/* REDUX */
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";

/* MUI */

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import red from "@material-ui/core/colors/red";
import cyan from "@material-ui/core/colors/cyan";

/* PAGES */
import home from "./pages/Home";
import signup from "./pages/Signup";
import login from "./pages/Login";
import user from "./pages/User";

/* COMPONENTS */
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";
import axios from "axios";

const theme = createMuiTheme({
  palette: {
    primary: { main: red[800] },
    secondary: { main: cyan[400] }
  },
  form: {
    textAlign: "center"
  },
  textField: {
    margin: "5px auto"
  },
  button: {
    marginTop: 20,
    position: "relative"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  }
});

const token = localStorage.FbIdToken;

if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function initializeAnalytics() {
  ReactGA.initialize("UA-157625344-1");
  ReactGA.pageview("/HomePage");
}

function App() {
  initializeAnalytics();
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar refreshPage={refreshPage} />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute exact path="/signup" component={signup} />
              <AuthRoute exact path="/login" component={login} />
              <Route exact path="/users/:handle" component={user} />
              <Route
                exact
                path="/users/:handle/post/:postId"
                component={user}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
