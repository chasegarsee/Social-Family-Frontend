import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";

/* REDUX */

import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

/* MUI */
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

/* Icons */

import NotificationIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

function Notifications(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { notifications } = props;

  dayjs.extend(relativeTime);

  let notificationIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter(note => note.read === false).length > 0
      ? (notificationIcon = (
          <Badge
            badgeContent={
              notifications.filter(note => note.read === false).length
            }
            color="secondary"
          >
            <NotificationIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationIcon />);
  } else {
    notificationIcon = <NotificationIcon />;
  }

  const handleOpen = e => {
    setAnchorEl(e.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpen = () => {
    let unreadNotificationIds = props.notifications
      .filter(note => !note.read)
      .map(note => note.notificationId);
    props.markNotificationsRead(unreadNotificationIds);
  };

  let notifiactionsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map(note => {
        const verb = note.type === "like" ? "liked" : "commented on";
        const time = dayjs(note.createdAt).fromNow();
        const iconColor = note.read ? "primary" : "secondary";
        const icon =
          note.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );
        return (
          <MenuItem key={note.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="textSecondary"
              varient="body1"
              to={`/users/${note.recipient}/post/${note.postId}`}
            >
              {note.sender} {verb} your post {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications</MenuItem>
    );

  return (
    <Fragment>
      <Tooltip placement="top" title="notifications">
        <IconButton
          area-owns={anchorEl ? "simple-menu" : undefined}
          area-haspopup="true"
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpen}
      >
        {notifiactionsMarkup}
      </Menu>
    </Fragment>
  );
}

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
  notifications: state.user.notifications
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
