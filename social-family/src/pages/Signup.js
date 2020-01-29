import React, { useState } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/fam.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

/* MUI */
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
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
};

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const newUserData = {
      email,
      password,
      confirmPassword,
      handle
    };
    axios
      .post(
        `https://us-central1-socialfamily-9d867.cloudfunctions.net/api/signup`,
        newUserData
      )
      .then(res => {
        console.log(res.data);
        localStorage.setItem("FbIdToken", `Bearer ${res.data.token}`);
        setLoading(false);
        props.history.push("/");
      })
      .catch(err => {
        setError(err.response.data);
        setLoading(false);
      });
  };

  let handleEmailChange = e => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  let handleHandle = e => {
    e.preventDefault();
    setHandle(e.target.value);
  };

  let handlePasswordChange = e => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  let handleConfirmPasswordChange = e => {
    e.preventDefault();
    setConfirmPassword(e.target.value);
  };

  const { classes } = props;

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        {/* <img src={AppIcon} alt="family photo" className={classes.image} /> */}

        <Typography variant="h3" className={classes.pageTitle}>
          Signup
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="Email"
            type="email"
            placeholder="Enter Email"
            variant="outlined"
            className={classes.textField}
            helperText={error.email}
            error={error.email ? true : false}
            value={email}
            onChange={handleEmailChange}
            fullWidth
          />

          <TextField
            id="password"
            label="Password"
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
          <TextField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="confirm password"
            variant="outlined"
            className={classes.textField}
            helperText={error.confirmPassword}
            error={error.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            fullWidth
          />
          <TextField
            id="handle"
            label="User Handle"
            type="text"
            placeholder="Create User Handle"
            variant="outlined"
            className={classes.textField}
            helperText={error.handle}
            error={error.handle ? true : false}
            value={handle}
            onChange={handleHandle}
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
            Signup
            {loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account?, Login <Link to="/login">here</Link>!
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
