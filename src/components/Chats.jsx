import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);

  // this dispatch is the reducer we make on the chatContext
  const { dispatch } = useContext(ChatContext);
  // console.log(dispatch);

  //using snapshot, whatever changes we make on our db like for example sideBar message it will display directly into our sideBarcomponent
  useEffect(() => {
    // we'll gonna have an error because the unsub function do not have a userId to prevent this we need towrap it on another function
    //we call this getChats to have a display with unsub function
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    //we write a condition to display chats
    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    // after clicking a user we dispatch it with change the user and activate the payload
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      <div className="chats">
        {Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="userChat"
              key={chat[0]} //[0] is the indx for combined users.uid
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              {/* this chat[1] here the number 1 you can find in the console inside the array */}
              <img src={chat[1].userInfo.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Chats;
