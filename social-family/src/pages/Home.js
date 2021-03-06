import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getPosts } from "../redux/actions/dataActions"
import PropTypes from "prop-types"
import Post from "../components/post/Post"
import Profile from "../components/profile/Profile"
import SkelPost from "../components/skeleton/SkelPost"

/* MUI */

import Grid from "@material-ui/core/Grid"
import withStyles from "@material-ui/core/styles/withStyles"
// import Stories from "../components/layout/FamilyStories"

const styles = (theme) => ({
  profileCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300,
  },
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
})

function Home(props) {
  const { classes } = props

  useEffect(() => {
    props.getPosts()
    // eslint-disable-next-line
  }, [])

  const { posts, loading } = props.data

  let recentPostMarkup = !loading ? (
    posts.map((post) => <Post key={post.postId} post={post} />)
  ) : (
    <div className={classes.root}>
      <SkelPost />
    </div>
  )

  return (
    <div>
      {/* <Stories /> */}
      <Grid container spacing={3}>
        <Grid item sm={3} xs={12}>
          <Profile />
        </Grid>
        <Grid item sm={9} xs={12}>
          {recentPostMarkup}
        </Grid>
      </Grid>
    </div>
  )
}

Home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data,
})

export default connect(mapStateToProps, { getPosts })(withStyles(styles)(Home))
