import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import ChatMessage from "../components/chat/ChatMessage"
import firebase from "../firebase"
import "../styles/chatStyles.css"

import { useCollectionData } from "react-firebase-hooks/firestore"

function ChatRoom(props) {
  const {
    user: {
      credentials: { handle, createdAt, imageUrl, bio, website, location, navColor, userId },
      loading,
      authenticated,
    },
  } = props

  const [formValue, setFormValue] = useState("")

  const firestore = firebase.firestore()
  const messageRef = firestore.collection("messages")
  const query = messageRef.orderBy("createdAt").limit(30)
  const [messages] = useCollectionData(query, { idField: "id" })

  const bannedRef = firestore.collection("banned")

  const [banned] = useCollectionData(bannedRef, { idField: "id" })
  const [isBanned, setIsBanned] = useState(false)

  useEffect(() => {
    if (banned) {
      const result = banned.filter((user) => user.id == userId)
      console.log(result)
      if (result.length > 0) setIsBanned(true)
    }
  }, [banned])

  const scrollMe = useRef()

  const sendMessage = async (e) => {
    e.preventDefault()
    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      userId,
      imageUrl,
    })
    setFormValue("")
    scrollMe.current.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <main>
        <div>{messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}</div>
        <span ref={scrollMe}></span>
      </main>
      <form className="chat-form" onSubmit={sendMessage}>
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button style={{ backgroundColor: navColor }} disabled={isBanned || !formValue}>
          Send
        </button>
      </form>
    </>
  )
}

const mapStateToProps = (state) => ({
  user: state.user,
})

ChatRoom.propTypes = {
  user: PropTypes.object.isRequired,
}

export default connect(mapStateToProps)(ChatRoom)
