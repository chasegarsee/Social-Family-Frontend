import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"

function ChatMessage(props) {
  const {
    user: {
      credentials: { handle, createdAt, bio, website, location, navColor, userId },
      loading,
      authenticated,
    },
  } = props
  const { text, uid, imageUrl } = props.message

  const messageClass = uid === userId ? "sent" : "recieved"

  return (
    <div className={`message ${messageClass}`}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img style={{ width: 50, height: 50, borderRadius: "50%" }} src={imageUrl} />
        <p style={{ marginLeft: "1%" }}>{text}</p>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

ChatMessage.propTypes = {
  user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(ChatMessage)
