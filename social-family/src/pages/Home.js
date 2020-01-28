import React, { useState, useEffect } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Post from "../components/Post";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/posts")
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  let recentPostMarkup = posts ? (
    posts.map(post => <Post post={post} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={3}>
      <Grid item sm={3} xs={12}>
        <p>Profile...</p>
      </Grid>
      <Grid item sm={9} xs={12}>
        {recentPostMarkup}
      </Grid>
    </Grid>
  );
}
