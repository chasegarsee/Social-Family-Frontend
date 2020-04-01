import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
/* MUI */
import MuiLink from "@material-ui/core/Link";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import LocationOn from "@material-ui/icons/LocationOn";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  paper: {
    padding: 20
  },
  profileCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: 300
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      },
      "& a": {
        color: theme.palette.primary.main
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    }
  }
});

function StaticProfile(props) {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location, navColor }
  } = props;
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={imageUrl} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/users/${handle}`}
            style={{ color: navColor }}
            varient="h5"
          >
            @{handle}
          </MuiLink>
          <hr />
          {bio && <Typography varient="body2">{bio}</Typography>}
          <hr />
          {location && (
            <Fragment>
              <LocationOn style={{ color: navColor }} /> <span>{location}</span>
              <hr />
            </Fragment>
          )}
          {website && (
            <Fragment>
              <LinkIcon style={{ color: navColor }} />
              <a
                style={{ color: navColor }}
                href={website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                {website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday style={{ color: navColor }} />{" "}
          <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
        </div>
      </div>
    </Paper>
  );
}

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);
