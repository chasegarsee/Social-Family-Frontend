import React from "react";
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
/* ICONS */
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
/* REDUX */
import { connect } from "react-redux";
import { likePost, unlikePost } from "../../redux/actions/dataActions";

function LikeButton(props) {
  const { authenticated } = props.user;
  const likedPost = () => {
    if (
      props.user.likes &&
      props.user.likes.find(like => like.postId === props.postId)
    )
      return true;
    return false;
  };

  const likePost = () => {
    props.likePost(props.postId);
  };

  const unlikePost = () => {
    props.unlikePost(props.postId);
  };

  const likeButton = !authenticated ? (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedPost() ? (
    <MyButton tip="Undo Like" onClick={unlikePost}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like Post" onClick={likePost}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
  return likeButton;
}

LikeButton.propTypes = {
  user: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  likePost,
  unlikePost
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
