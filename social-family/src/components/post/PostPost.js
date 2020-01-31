import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

/* REDUX */
import { connect } from "react-redux";
import { createPost, clearErrors } from "../../redux/actions/dataActions";

/* MUI */
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
/* ICONS */

import MyButton from "../../util/MyButton";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  submitButton: {
    position: "relative",
    margin: "10px auto"
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: 0
  },
  textField: {
    margin: "5px auto"
  }
});

function PostPost(props) {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.error);
    }
    if (props.UI.errpors && !props.UI.loading) {
      setBody("");
      setOpen(false);
      setErrors({});
    }
  }, []);

  const {
    classes,
    createPost,
    UI: { loading }
  } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setErrors({});
  };
  // function handleBodyChange(e) {
  //   setBody(e.target.value);
  //   console.log(body);
  // }
  let handleSubmit = e => {
    e.preventDefault();
    createPost("body");
  };

  return (
    <Fragment>
      <MyButton tip="Create Post" onClick={handleOpen}>
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Create a new post</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              lable="Post"
              multiline
              rows="3"
              placeholder="Create a post"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              //onChange={handleBodyChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

PostPost.propTypes = {
  createPost: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, { createPost })(
  withStyles(styles)(PostPost)
);
