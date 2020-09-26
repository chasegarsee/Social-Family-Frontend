import React from "react"

import MyButton from "../../util/MyButton"
import PostDialog from "../post/PostDialog"
import PostDialogWithChat from "../post/PostDialogWithChat"
import LikeButton from "../post/LikeButton"

/* MUI */
import Card from "@material-ui/core/Card"
import CardMedia from "@material-ui/core/CardMedia"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"

import "../../styles/index.scss"

const style = { maxWidth: 100, minHeight: 125, paddingRight: "10px", backgroundColor: "#EFEFEF" }

const cards = ["this", "is", "a", "quick", "fix"]

export default function SkelPost() {
  return (
    <>
      {cards.map((c, i) => (
        <Card key={i} style={{ minHeight: 275 }} className="loading-skeleton">
          <CardContent>
            <Typography varient="h5">User Handle</Typography>
            <br />
            <CardMedia
              image="img"
              style={style}
              className="loading-skeleton"
              title="Profile Image"
            />
            <br />
            <Typography varient="body2" color="textSecondary">
              Ambiguouys Date
            </Typography>

            <Typography varient="body1">Some Meaningful Text Here</Typography>

            <div style={{ display: "flex", justifyContent: "flex-start" }}>
              <CardMedia image="" title="Post Image" />
            </div>
            <br />
            <LikeButton />

            <MyButton tip="Comments">
              <PostDialogWithChat />
            </MyButton>

            <PostDialog />
          </CardContent>
        </Card>
      ))}
    </>
  )
}
