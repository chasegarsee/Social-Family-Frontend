import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import "../../styles/chatStyles.css"

function ChatMessage(props) {
  const {
    user: {
      credentials: { handle, createdAt, bio, website, location, navColor, userId },
      loading,
      authenticated,
    },
  } = props
  const { text, imageUrl } = props.message

  console.log("USER IDS", props.message.userId, userId)

  const messageClass = props.message.userId === userId ? "sent" : "received"

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={imageUrl} />
        <p style={messageClass === "sent" ? { backgroundColor: navColor } : {}}>{text}</p>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

ChatMessage.propTypes = {
  user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(ChatMessage)
