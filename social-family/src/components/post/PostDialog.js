import React, { Fragment, useState, useEffect } from "react"
import PropTypes from "prop-types"
import withStyles from "@material-ui/core/styles/withStyles"
import MyButton from "../../util/MyButton"
import dayjs from "dayjs"
import Comments from "./Comments"
import CommentForm from "./CommentForm"
import { Link } from "react-router-dom"
/* MUI */
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import CardMedia from "@material-ui/core/CardMedia"
import CircularProgress from "@material-ui/core/CircularProgress"
import Typography from "@material-ui/core/Typography"
/* ICONS */
import CloseIcon from "@material-ui/icons/Close"
import UnfoldMore from "@material-ui/icons/UnfoldMore"
import ChatIcon from "@material-ui/icons/Chat"
/* REDUX */
import { connect } from "react-redux"
import { getPost } from "../../redux/actions/dataActions"
import LikeButton from "./LikeButton"

const styles = {
  invisibleSeparator: {
    border: "none",
    margin: 3,
  },
  // visibleSeparator: {
  //   width: "100%",
  //   borderBottom: "1px solid rgba(0,0,0,0.1",
  //   marginBottom: 20
  // },
  profileImage: {
    maxWidth: 50,
    maxHeight: 50,

    backgroundSize: "contain",
  },
  timeDate: {
    color: "grey",

    margin: 0,
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    top: "3%",
  },
  expandButton: {
    position: "absolute",
    left: "90%",
  },
  spinnerDiv: {
    textAlign: "center",
    margin: "50 0",
  },
  circularProgress: {
    color: "rgb(245, 245, 245)",
  },
  postImage: {
    minWidth: 200,
    minHeight: 200,
    maxHeight: 175,
    borderRadius: 2,
  },
  likesMessage: {
    color: "grey",
    fontSize: ".75rem",
  },
}

function PostDialog(props) {
  const [open, setOpen] = useState(false)
  const [oldPath, setOldPath] = useState("")
  const [newPath, setNewPath] = useState("")
  useEffect(() => {
    if (props.openDialog) {
      handleOpen()
    }
    // eslint-disable-next-line
  }, [])

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
      comments,
      likes,
      imageUrl,
    },
    UI: { loading },
  } = props

  const handleOpen = () => {
    const { userHandle, postId, getPost } = props
    let newPath = `/users/${userHandle}/post/${postId}`
    let oldPath = window.location.pathname
    if (oldPath === newPath) oldPath = `/users/${userHandle}`

    window.history.pushState(null, null, newPath)
    setOpen(true)
    setOldPath(oldPath)
    setNewPath(newPath)
    getPost(postId)
  }

  const handleClose = () => {
    window.history.pushState(null, null, oldPath)
    setOpen(false)
  }

  const likedBy = !likes ? null : likes.length === 1 ? (
    <span className={classes.likesMessage}>
      Liked by <strong>{[likes[0].userHandle]}</strong>
    </span>
  ) : likes.length === 2 ? (
    <span className={classes.likesMessage}>
      Liked by <strong>{[likes[0].userHandle]}</strong> & 1 other
    </span>
  ) : (
    <span className={classes.likesMessage}>
      Liked by <strong>{[likes[0].userHandle]}</strong> & {likes.length - 1} others
    </span>
  )

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} className={classes.circularProgress} />
    </div>
  ) : (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <img src={userImage} alt="Profile" className={classes.profileImage} />
          <Typography
            style={{ marginLeft: 10 }}
            component={Link}
            style={{ color: props.navColor }}
            varient="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
            <p className={classes.timeDate}>{dayjs(createdAt).format("h:mm a, MMM DD")}</p>
          </Typography>
        </div>
      </div>
      <div>
        <hr className={classes.invisibleSeparator} />
        <Typography varient="body1">{body}</Typography>
        {imageUrl ? (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <CardMedia image={imageUrl} title="Post Image" className={classes.postImage} />
          </div>
        ) : null}
        <LikeButton postId={postId} />
        <span>{likeCount}</span>

        <MyButton tip="Comments">
          <ChatIcon color="secondary" />
        </MyButton>
        <span>{commentCount}</span>
      </div>
      {likedBy}
      <CommentForm postId={postId} />
      <Comments navColor={props.navColor} comments={comments} />
    </div>
  )
  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Expand Post" tipClassName={classes.expandButton}>
        <UnfoldMore style={{ color: props.navColor }} />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton tip="Close" onClick={handleClose} tipClassName={classes.closeButton}>
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>{dialogMarkup}</DialogContent>
      </Dialog>
    </Fragment>
  )
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.data.post,
  UI: state.UI,
})

const mapActionsToProps = {
  getPost,
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PostDialog))
