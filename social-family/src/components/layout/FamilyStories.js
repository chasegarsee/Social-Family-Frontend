import React, { useState, Fragment } from "react";
import Stories from "react-insta-stories";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

/* MUI */
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CardMedia from "@material-ui/core/CardMedia";
/* ICONS */
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

const styles = {};

function FamilyStories(props) {
  const [open, setOpen] = useState(false);

  const { classes } = props;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Fragment>
        <MyButton
          onClick={handleOpen}
          tip="Expand Post"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="primary" />
        </MyButton>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <MyButton
            tip="Close"
            onClick={handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            <Stories
              stories={stories}
              defaultInterval={1500}
              width={432}
              height={768}
            />
          </DialogContent>
        </Dialog>
      </Fragment>
    </div>
  );
}

export default withStyles(styles)(FamilyStories);

const stories = [
  {
    content: ({ action, isPaused }) => {
      const handleClick = e => {
        e.preventDefault();
        action(isPaused ? "play" : "pause");
      };
      return (
        <div onClick={handleClick}>
          <h2>Hi</h2>
          <span>{isPaused ? "Paused" : "Playing"}</span>
        </div>
      );
    }
  },
  {
    url: "https://picsum.photos/1080/1920",
    seeMore: ({ close }) => <div>Hello</div>,
    header: {
      heading: "Mohit Karekar",
      subheading: "Posted 5h ago",
      profileImage: "https://picsum.photos/1000/1000"
    }
  },
  {
    url:
      "https://fsa.zobj.net/crop.php?r=dyJ08vhfPsUL3UkJ2aFaLo1LK5lhjA_5o6qEmWe7CW6P4bdk5Se2tYqxc8M3tcgYCwKp0IAyf0cmw9yCmOviFYb5JteeZgYClrug_bvSGgQxKGEUjH9H3s7PS9fQa3rpK3DN3nx-qA-mf6XN",
    header: {
      heading: "Mohit Karekar",
      subheading: "Posted 32m ago",
      profileImage: "https://picsum.photos/1080/1920"
    }
  },
  {
    url:
      "https://media.idownloadblog.com/wp-content/uploads/2016/04/iPhone-wallpaper-abstract-portrait-stars-macinmac.jpg",
    header: {
      heading: "mohitk05/react-insta-stories",
      subheading: "Posted 32m ago",
      profileImage:
        "https://avatars0.githubusercontent.com/u/24852829?s=400&v=4"
    }
  }
];
