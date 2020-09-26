import React, { Fragment } from "react"

import MyButton from "../../util/MyButton"
/* MUI */
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"
import MuiLink from "@material-ui/core/Link"
import EditIcon from "@material-ui/icons/Edit"

import LocationOn from "@material-ui/icons/LocationOn"
import LinkIcon from "@material-ui/icons/Link"
import CalendarToday from "@material-ui/icons/CalendarToday"
import KeyboardReturn from "@material-ui/icons/KeyboardReturn"

import EditDetails from "../profile/EditDetails"

import "../../styles/index.scss"

export default function SkelUser() {
  return (
    <>
      <Paper className="loading-skeleton" style={{ padding: 20 }}>
        <div>
          <div className="image-wrapper">
            <div
              alt="profile"
              style={{ width: 150, height: 150, backgroundColor: "#EFEFEF", borderRadius: "50%" }}
            />
            <input type="file" id="imageInput" hidden="hidden" />
          </div>
          <br />
          <div className="profile-details">
            <Typography varient="body2">Handle</Typography>
            <br />
            <Typography varient="body2">A short Bio</Typography>
            <h5>
              <span>A relative location</span>
            </h5>
            <br />
            <Typography varient="body2">A cool website</Typography>

            <span>Joined Some time ago</span>
          </div>
          <MyButton tip="Logout">
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    </>
  )
}
