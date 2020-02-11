import React, { Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { Link } from "react-router-dom";
/* MUI */
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const styles = {
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  timeDate: {
    color: "grey",

    margin: 0
  },
  commentImage: {
    height: 50,
    width: 50,
    borderRadius: "50%",
    backgroundSize: "contain"
  }
};

function Comments(props) {
  const { classes, comments } = props;
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "solid 1px rgba(0,0,0,0.1)",
        marginBottom: 10
      }}
    >
      {comments.map((comment, index) => {
        const { body, createdAt, userImage, userHandle } = comment;
        return (
          <Fragment key={createdAt}>
            <div>
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImage}
                  />
                  <div style={{ paddingLeft: 7 }}>
                    <Typography
                      variant="h6"
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <p className={classes.timeDate}>
                      {dayjs(createdAt).format("h:mm a, MMM DD")}
                    </p>
                  </div>
                </div>
                <div>
                  <div className={classes.commentData}>
                    <hr className={classes.invisibleSeparator} />
                    <Typography varient="body1">{body}</Typography>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
