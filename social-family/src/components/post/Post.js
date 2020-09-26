import React from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import MyButton from "../../util/MyButton"
import DeletePost from "./DeletePost"
import PostDialog from "./PostDialog"
import PostDialogWithChat from "./PostDialogWithChat"
import LikeButton from "./LikeButton"

/* REDUX */
import { connect } from "react-redux"

import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

/* MUI */
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import withStyles from "@material-ui/core/styles/withStyles"
import AddImageToPost from "./AddImageToPost"

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: "50%",
  },
  postImage: {
    minWidth: 200,
    minHeight: 200,
    maxHeight: 175,
    borderRadius: 2,
  },
  content: {},
}

function Post(props) {
  const {
    classes,
    post: { body, createdAt, userImage, userHandle, likeCount, commentCount, postId, imageUrl },
    user: {
      authenticated,
      credentials: { handle, navColor },
    },
  } = props

  dayjs.extend(relativeTime)

  const deleteButton =
    authenticated && userHandle === handle ? <DeletePost postId={postId} /> : null
  const uploadImage =
    authenticated && userHandle === handle ? <AddImageToPost postId={postId} /> : null

  return (
    <Card className={classes.card}>
      {/* <CardMedia className={classes.image} image={userImage} title="Profile Image" /> */}
      <CardContent className={classes.content}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CardMedia className={classes.image} image={userImage} title="Profile Image" />
          <Typography
            varient="h5"
            component={Link}
            to={`/users/${userHandle}`}
            style={{ color: navColor, marginLeft: "3%" }}
          >
            {userHandle}
          </Typography>
        </div>
        {uploadImage}
        {deleteButton}
        <Typography varient="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography varient="body1">{body}</Typography>
        {imageUrl ? (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <CardMedia image={imageUrl} title="Post Image" className={classes.postImage} />
          </div>
        ) : null}

        <LikeButton navColor={navColor} postId={postId} />
        <span>{likeCount}</span>
        <MyButton tip="Comments">
          <PostDialogWithChat
            postId={postId}
            userHandle={userHandle}
            openDialog={props.openDialog}
          />
        </MyButton>

        <span>{commentCount}</span>
        <PostDialog
          navColor={navColor}
          postId={postId}
          userHandle={userHandle}
          openDialog={props.openDialog}
        />
      </CardContent>
    </Card>
  )
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(withStyles(styles)(Post))
