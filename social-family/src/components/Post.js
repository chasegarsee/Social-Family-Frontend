import React from "react";
import Link from "react-router-dom/Link";

/* MUI */
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  card: {
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
  const {
    classes,
    post: { body, createdAt, userImage, userHandle, likeCount, CommentCount }
  } = props;
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
        <Typography varient="body2" color="textSecondary">
          {createdAt}
        </Typography>
        <Typography varient="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Post);
