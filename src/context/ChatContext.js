import {
    createContext,
    useContext,
    useReducer,
  } from "react";
import { AuthContext } from "./AuthContext";
 
  
  export const ChatContext = createContext();
  
  export const ChatContextProvider = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    
    // our initial state on which our chatReducer will change before we dispatch
    const INITIAL_STATE = {
      chatId: "null",
      user: {},
    };
  
    //using reducer when the user we search and clicked, we want to change our user state and at thesame time update the user chat id
    const chatReducer = (state, action) => {
      switch (action.type) {
        case "CHANGE_USER":
          return {
            // the action.payload is the result of the condition we set, for example after clicking a user we want that user info to capture
            //and this will be stored in action.payload
            user: action.payload,
            chatId:
              currentUser.uid > action.payload.uid
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid,
          };
  
        default:
          return state;
      }
    };
  
    //set our setReducer value before dispatch
    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
    return (
      // this provider will our our index.js to be used anywhere in our app.js
      <ChatContext.Provider value={{ data:state, dispatch }}>
        {children}
      </ChatContext.Provider>
    );
  };