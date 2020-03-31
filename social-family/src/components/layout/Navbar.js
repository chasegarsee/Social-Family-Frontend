import React, { Fragment, useEffect, useState } from "react";

import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";

/* REDUX */
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { editUserDetails } from "../../redux/actions/userActions";

/* Material UI */
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

/* ICON */

import HomeIcon from "@material-ui/icons/Home";
import CreatePost from "../post/CreatePost";
import CachedIcon from "@material-ui/icons/Cached";
import axios from "axios";

function Navbar(props) {
  const [color, setColor] = useState("");
  const {
    authenticated,
    refreshPage,
    user: {
      credentials: { navColor }
    }
  } = props;

  const mapUserDetailsToState = credentials => {
    setColor(credentials.navColor ? credentials.navColor : "");
  };

  return (
    <AppBar style={{ backgroundColor: navColor }}>
      <Toolbar className="nav-container">
        {authenticated ? (
          <Fragment>
            <CreatePost />
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications />
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          </Fragment>
        )}
        <MyButton tip="Refresh Content" onClick={refreshPage}>
          <CachedIcon />
        </MyButton>
      </Toolbar>
    </AppBar>
  );
}

Navbar.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  credentials: state.user.credentials,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { editUserDetails })(Navbar);
