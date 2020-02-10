import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
// MUI Stuff
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// Redux stuff
import { connect } from "react-redux";
import { createPost, clearErrors } from "../../redux/actions/dataActions";

const styles = theme => ({
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10
  },
  addPhotoButton: {
    position: "relative",
    float: "left",
    marginTop: 10
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%"
  }
});

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      body: "THIS IS SOME TEXT",
      imageUrl: "",
      error: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.error) {
      this.setState({
        error: nextProps.UI.error
      });
    }
    if (!nextProps.UI.error && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, error: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, error: {} });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleEditPhoto = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleImageChange = e => {
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image, image.name);
    const body = this.state.body;
    this.setState({ imageUrl: formData });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createPost({
      body: this.state.body,
      imageUrl: this.state.imageUrl
    });
  };

  render() {
    const { error } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Create a post">
          <AddIcon />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="create post"
                multiline
                rows="3"
                placeholder="Create Post"
                error={error.body ? true : false}
                helperText={error.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <input
                type="file"
                id="imageInput"
                onChange={this.handleImageChange}
              />
              {/* <Button
                variant="contained"
                color="secondary"
                className={classes.addPhotoButton}
                onClick={this.handleEditPhoto}
              >
                Add Photo
              </Button> */}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
                onClick={this.handleChange}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, { createPost, clearErrors })(
  withStyles(styles)(CreatePost)
);
