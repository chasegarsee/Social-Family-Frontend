import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import Post from "../components/post/Post";
import Profile from "../components/profile/Profile";

/* MUI */
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  profileCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  }
});

function Home(props) {
  const { classes } = props;
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    function tick() {
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1));
    }

    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    props.getPosts();
  }, []);

  const { posts, loading } = props.data;

  let recentPostMarkup = !loading ? (
    posts.map(post => <Post key={post.postId} post={post} />)
  ) : (
    <div className={classes.root}>
      <LinearProgress color="secondary" />
    </div>
  );

  return (
    <Grid container spacing={3}>
      <Grid item sm={3} xs={12}>
        <Profile />
      </Grid>
      <Grid item sm={9} xs={12}>
        {recentPostMarkup}
      </Grid>
    </Grid>
  );
}

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getPosts })(withStyles(styles)(Home));
