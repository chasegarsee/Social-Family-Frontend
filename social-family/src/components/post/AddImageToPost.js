import React, { Fragment } from "react";
import ImageIcon from "@material-ui/icons/Image";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";

import { connect } from "react-redux";
import { uploadImageToPost } from "../../redux/actions/dataActions";

const styles = theme => ({
  addImageButton: {
    position: "absolute",
    left: "80%",
    top: 1
  },
  addIcon: {
    color: "#26c6da"
  }
});

function AddImageToPost(props) {
  const { classes } = props;
  console.log(props.postId);
  const handleImageChange = e => {
    const image = e.target.files[0];
    console.log(image);
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadImageToPost(props.postId, formData);
  };
  const handleEditPhoto = () => {
    const fileInput = document.getElementById("imageUploadInput");
    console.log("FILE IN??", fileInput);
    fileInput.click();
  };

  return (
    <Fragment>
      <input
        type="file"
        id="imageUploadInput"
        onChange={handleImageChange}
        hidden="hidden"
      />
      <MyButton
        tip="Add Image To Post"
        onClick={handleEditPhoto}
        btnClassName={classes.addImageButton}
      >
        <ImageIcon className={classes.addIcon} />
      </MyButton>
    </Fragment>
  );
}

AddImageToPost.propTypes = {
  uploadImageToPost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

export default connect(null, { uploadImageToPost })(
  withStyles(styles)(AddImageToPost)
);
