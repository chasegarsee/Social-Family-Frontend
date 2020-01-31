import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
/* MUI */
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
/* ICONS */
/* REDUX */
import { connect } from "react-redux";
import { createComment } from "../../redux/actions/dataActions";

const styles = {};

function CommentForm(props) {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  const { classes, authenticated } = props;

  const handleChange = e => {
    setBody(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.createComment(props.postId, { body });
    setBody("");
  };

  useEffect(() => {
    if (props.UI.errors) {
      setErrors(props.UI.error);
    }
  }, []);

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on Post"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          varient="contained"
          color="secondary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
  return commentFormMarkup;
}

CommentForm.propTypes = {
  createComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, { createComment })(
  withStyles(styles)(CommentForm)
);
