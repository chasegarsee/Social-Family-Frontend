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
  visibleSeparator: {
    color: "black"
  },
  commentImage: {
    maxWidth: "100%",
    maxHeight: 175,
    padding: "0 20px"
  },
  commentData: {
    paddingLeft: 20,
    marginLeft: 20
  }
};

function Comments(props) {
  const { classes, comments } = props;
  return (
    <Grid container>
      {comments.map((comment, index) => {
        const { body, createdAt, userImage, userHandle } = comment;
        return (
          <Fragment key={createdAt}>
            <Grid item sm={12}>
              <Grid
                container
                style={{
                  borderBottom: "solid 1px rgba(0,0,0,0.1)",
                  marginBottom: 10
                  //padding: "10px 0"
                }}
              >
                <Grid item sm={2}>
                  <img
                    src={userImage}
                    alt="comment"
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item sm={9}>
                  <div className={classes.commentData}>
                    <Typography
                      variant="h5"
                      component={Link}
                      to={`/users/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>
                    <Typography varient="body2" color="textSecondary">
                      {dayjs(createdAt).format(`h:mm a, MMM DD YYYY`)}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography varient="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        );
      })}
    </Grid>
  );
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);
