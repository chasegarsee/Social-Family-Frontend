import React, { Component, Fragment, useState } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import { Link } from "react-router-dom";
/* MUI */
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
/* ICONS */
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
/* REDUX */
import { connect } from "react-redux";
import { getPost } from "../../redux/actions/dataActions";
import LikeButton from "./LikeButton";

const styles = {
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  // visibleSeparator: {
  //   width: "100%",
  //   borderBottom: "1px solid rgba(0,0,0,0.1",
  //   marginBottom: 20
  // },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover"
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    top: "3%"
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  },
  spinnerDiv: {
    textAlign: "center",
    margin: "50 0"
  },
  circularProgress: {
    color: "rgb(245, 245, 245)"
  }
};

function PostDialog(props) {
  const [open, setOpen] = useState(false);

  const {
    classes,
    post: {
      postId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      userHandle,
      comments
    },
    UI: { loading }
  } = props;

  const handleOpen = () => {
    setOpen(true);
    props.getPost(props.postId);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <LinearProgress color="secondary" />
      <CircularProgress
        size={200}
        thickness={2}
        className={classes.circularProgress}
      />
      <LinearProgress variant="query" color="secondary" />
    </div>
  ) : (
    <Grid container spacing={1}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          varient="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography varient="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography varient="body1">{body}</Typography>
        <LikeButton postId={postId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="Comments">
          <ChatIcon color="secondary" />
        </MyButton>
        <span>{commentCount} Comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      <CommentForm postId={postId} />
      <Comments comments={comments} />
    </Grid>
  );
  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand Post"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.data.post,
  UI: state.UI
});

const mapActionsToProps = {
  getPost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(PostDialog));
