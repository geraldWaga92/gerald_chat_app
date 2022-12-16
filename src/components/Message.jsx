import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  //using useRef we store the latest values
  const ref = useRef();

  //using this useEffect whenever we type a message we want to see directly the message on the bottom, so the scrollbar will slide automatically
  //down to bottom or latest chat message 
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);


  return (
    // This will be displayed on the chats box
    <div
      ref={ref}
      // check if the message is the currentUser id then use the className owner and message
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            // this means that if the message sender id matches to the current user id so this belong to us, then we can display our user image or photURL
            //else just display the current data photoURL
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {/* if there is no image */}
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;