import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import axios from "axios"
import Post from "../components/post/Post"
import Grid from "@material-ui/core/Grid"
import CircularProgress from "@material-ui/core/CircularProgress"
import { connect } from "react-redux"
import { getUserData } from "../redux/actions/dataActions"
import StaticProfile from "../components/profile/StaticProfile"

import SkelPost from "../components/skeleton/SkelPost"

function User(props) {
  const [profile, setProfile] = useState(null)
  const [postIdParam, setPostIdParam] = useState(null)

  const { posts, loading } = props.data
  const { getUserData } = props

  useEffect(() => {
    const handle = props.match.params.handle
    const postId = props.match.params.postId

    if (postId) {
      setPostIdParam(postId)
    }

    getUserData(handle)
    // axios
    //   .get(
    //     `https://us-central1-socialfamily-9d867.cloudfunctions.net/api/user/${handle}`
    //   )
    //   .then(res => {
    //     setProfile(res.data.user);
    //   })
    //   .catch(err => console.log(err));

    async function setUserProfile() {
      const res = await axios.get(
        `https://us-central1-socialfamily-9d867.cloudfunctions.net/api/user/${handle}`
      )
      await setProfile(res.data.user)
    }
    setUserProfile()
    // eslint-disable-next-line
  }, [])

  const postsMarkup = loading ? (
    <SkelPost />
  ) : posts === null ? (
    <p>This user doesn't have any posts yet. </p>
  ) : !postIdParam ? (
    posts.map((post) => <Post key={post.postId} post={post} />)
  ) : (
    posts.map((post) => {
      if (post.postId !== postIdParam) return <Post key={post.postId} post={post} />
      else return <Post key={post.postId} post={post} openDialog />
    })
  )

  return (
    <Grid container spacing={3}>
      <Grid item sm={3} xs={12}>
        {profile === null ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "300",
            }}
          >
            <CircularProgress size={100} />
          </div>
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
      <Grid item sm={9} xs={12}>
        {postsMarkup}
      </Grid>
    </Grid>
  )
}

User.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  data: state.data,
})

export default connect(mapStateToProps, { getUserData })(User)
