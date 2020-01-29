import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";

/* MUI */

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import teal from "@material-ui/core/colors/teal";

/* PAGES */
import home from "./pages/Home";
import signup from "./pages/Signup";
import login from "./pages/Login";

/* COMPONENTS */
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: "#2962ff"
    }
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

let authenticated;

const token = localStorage.FbIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <AuthRoute
              exact
              path="/signup"
              component={signup}
              authenticated={authenticated}
            />
            <AuthRoute
              exact
              path="/login"
              component={login}
              authenticated={authenticated}
            />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
