import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import Input from "./Input";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      // if doc exist or collection and there is a message then set the message  data into the collection messages array
      doc.exists() && setMessages(doc.data().messages);
    });

    // always cleanup when using useEffect to prevent memory leaking
    return () => {
      unSub();
    };
  }, [data.chatId]);

  console.log(messages)

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} 
        />
      ))}
      {/* <Message/> */}
      <Input />
    </div>
  );
};

export default Messages;