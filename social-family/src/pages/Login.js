import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/* MUI */
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

/* REDUX */

import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = {
  form: {
    textAlign: "center",
    display: "flex",
    justifyContent: "center"
  },
  textField: {
    margin: "5px auto"
  },
  button: {
    marginTop: 20,
    position: "relative",
    color: "white"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 10
  },
  progress: {
    position: "absolute"
  }
};

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleSubmit = e => {
    e.preventDefault();

    const userData = {
      email,
      password
    };
    props.loginUser(userData, props.history);
  };

  useEffect(() => {
    if (props.UI.error) {
      setError(props.UI.error);
    }
  }, [props.UI.error]);

  let handleEmailChange = e => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  let handlePasswordChange = e => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const {
    classes,
    UI: { loading }
  } = props;

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        {/* <img src={AppIcon} alt="family photo" className={classes.image} /> */}

        <Typography variant="h3" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <div>
            <TextField
              id="email"
              label="Email"
              type="email"
              placeholder="Enter email"
              variant="outlined"
              className={classes.textField}
              helperText={error.email}
              error={error.email ? true : false}
              value={email}
              onChange={handleEmailChange}
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="password"
              label="password"
              type="password"
              placeholder="Enter password"
              variant="outlined"
              className={classes.textField}
              helperText={error.password}
              error={error.password ? true : false}
              value={password}
              onChange={handlePasswordChange}
              fullWidth
            />
            {error.general && (
              <Typography variant="body2" className={classes.customError}>
                {error.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              disabled={loading}
            >
              Login
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <small>
              Don't have an account?, Sign Up <Link to="/signup">here</Link>!
            </small>
          </div>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
