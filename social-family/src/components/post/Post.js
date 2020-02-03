import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";

/* REDUX */
import { connect } from "react-redux";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

/* MUI */
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import ChatIcon from "@material-ui/icons/Chat";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 175,
    paddingRight: "10px",
    borderRight: "1px solid rgba(0,0,0,0.2)"
  },
  postImage: {
    minWidth: 175,
    minHeight: 175,
    maxHeight: 175,
    backgroundSize: "contain"
  },
  content: {}
};

function Post(props) {
  const {
    classes,
    post: {
      body,
      createdAt,
      userImage,
      userHandle,
      likeCount,
      commentCount,
      postId,
      imageUrl
    },
    user: {
      authenticated,
      credentials: { handle }
    }
  } = props;

  dayjs.extend(relativeTime);

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeletePost postId={postId} />
    ) : null;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title="Profile Image"
      />
      <CardContent className={classes.content}>
        <Typography
          varient="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        <CardMedia
          className={classes.image}
          image={userImage}
          component={Link}
          to={`/users/${userHandle}`}
          title="Profile Image"
        />
        {deleteButton}
        <Typography varient="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography varient="body1">{body}</Typography>
        {imageUrl ? (
          <CardMedia
            image={imageUrl}
            title="Post Image"
            className={classes.postImage}
          />
        ) : null}

        <LikeButton postId={postId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="Comments">
          <ChatIcon color="secondary" />
        </MyButton>
        <span>{commentCount} Comments</span>
        <PostDialog
          postId={postId}
          userHandle={userHandle}
          openDialog={props.openDialog}
        />
      </CardContent>
    </Card>
  );
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(styles)(Post));
