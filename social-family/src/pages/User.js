import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Post from "../components/post/Post";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";
import StaticProfile from "../components/profile/StaticProfile";

function User(props) {
  const [profile, setProfile] = useState(null);

  const { posts, loading } = props.data;

  useEffect(() => {
    const handle = props.match.params.handle;
    props.getUserData(handle);
    axios
      .get(
        `https://us-central1-socialfamily-9d867.cloudfunctions.net/api/user/${handle}`
      )
      .then(res => {
        setProfile(res.data.user);
      })
      .catch(err => console.log(err));
  }, []);

  const postsMarkup = loading ? (
    <LinearProgress color="secondary" />
  ) : posts === null ? (
    <p>This user doesn't have any posts yet. </p>
  ) : (
    posts.map(post => <Post key={post.postId} post={post} />)
  );

  return (
    <Grid container spacing={3}>
      <Grid item sm={3} xs={12}>
        {profile === null ? (
          <p>loading profile...</p>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
      <Grid item sm={9} xs={12}>
        {postsMarkup}
      </Grid>
    </Grid>
  );
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(User);
