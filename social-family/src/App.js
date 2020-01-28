import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

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

const theme = createMuiTheme({
  palette: {
    primary: teal,
    secondary: {
      main: "#2962ff"
    }
  }
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/signup" component={signup} />
            <Route exact path="/login" component={login} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
