import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

/* MUI */
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
/* ICONS */
import EditIcon from "@material-ui/icons/Edit";
import MyButton from "../../util/MyButton";

const styles = {
  button: {
    float: "right"
  }
};

function EditDetails(props) {
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [open, setOpen] = useState(false);

  const { classes, credentials } = props;

  const mapUserDetailsToState = credentials => {
    setBio(credentials.bio ? credentials.bio : "");
    setWebsite(credentials.website ? credentials.website : "");
    setLocation(credentials.location ? credentials.location : "");
  };

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(props.credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleBioChange = e => {
    e.preventDefault();
    setBio(e.target.value);
  };

  const handleWebsiteChange = e => {
    e.preventDefault();
    setWebsite(e.target.value);
  };
  const handleLocationChange = e => {
    e.preventDefault();
    setLocation(e.target.value);
  };

  const handleSubmit = () => {
    const userDetails = {
      bio,
      website,
      location
    };
    props.editUserDetails(userDetails);
    handleClose();
  };

  return (
    <Fragment>
      <MyButton
        tip="Edit Details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit Your Details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              lable="Bio"
              placeholder="A short bio about yourself"
              value={bio}
              onChange={handleBioChange}
              fullWidth
              className={classes.textField}
            />
            <TextField
              name="website"
              type="text"
              lable="Website"
              placeholder="Your Website"
              value={website}
              onChange={handleWebsiteChange}
              fullWidth
              className={classes.textField}
            />
            <TextField
              name="location"
              type="text"
              lable="Location"
              placeholder="Where you love"
              value={location}
              onChange={handleLocationChange}
              fullWidth
              className={classes.textField}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} varient="" color="secondary">
            Close
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
