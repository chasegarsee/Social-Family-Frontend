import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import DeletePost from "./DeletePost";

/* REDUX */
import { connect } from "react-redux";
import { likePost, unlikePost } from "../redux/actions/dataActions";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

/* MUI */
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import ChatIcon from "@material-ui/icons/Chat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20
  },
  image: {
    minWidth: 175,
    backgroundSize: "contain"
  },
  content: {}
};

function Post(props) {
  const likedPost = () => {
    if (
      props.user.likes &&
      props.user.likes.find(like => like.postId === props.post.postId)
    )
      return true;
    return false;
  };

  const likePost = () => {
    props.likePost(props.post.postId);
  };

  const unlikePost = () => {
    props.unlikePost(props.post.postId);
  };
  const {
    classes,
    post: {
      body,
      createdAt,
      userImage,
      userHandle,
      likeCount,
      commentCount,
      postId
    },
    user: {
      authenticated,
      credentials: { handle }
    }
  } = props;

  dayjs.extend(relativeTime);

  const likeButton = !authenticated ? (
    <MyButton tip="Like">
      <Link to="/login">
        <FavoriteBorder color="primary" />
      </Link>
    </MyButton>
  ) : likedPost() ? (
    <MyButton tip="Undo Like" onClick={unlikePost}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Undo Like" onClick={likePost}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeletePost postId={postId} />
    ) : null;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        component={Link}
        to={`/users/${userHandle}`}
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
        {deleteButton}
        <Typography varient="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography varient="body1">{body}</Typography>
        {likeButton}
        <span>{likeCount} Likes</span>
        <MyButton tip="Comments">
          <ChatIcon color="secondary" />
        </MyButton>
        <span>{commentCount} Comments</span>
      </CardContent>
    </Card>
  );
}

Post.propTypes = {
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likePost,
  unlikePost
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Post));
