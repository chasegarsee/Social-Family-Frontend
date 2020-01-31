import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";

/* MUI */
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteIcon from "@material-ui/icons/DeleteOutline";

import { connect } from "react-redux";
import { deletePost } from "../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: 0
  },
  deleteIcon: {
    color: "#e36107"
  }
};

function DeletePost(props) {
  const [open, setOpen] = useState(false);
  const { classes } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeletePost = () => {
    props.deletePost(props.postId);
    setOpen(false);
  };

  return (
    <Fragment>
      <MyButton
        tip="Delete Post"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteIcon className={classes.deleteIcon} />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeletePost} color="#e36107">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

DeletePost.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(null, { deletePost })(withStyles(styles)(DeletePost));
