import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from "../firebase";

//using this context api we can use whatever function we write here to anywhere in components
export const AuthContext = createContext();

//this function can reach it's children component and can manipulate them
export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});


    useEffect(() => {
        //here we are listening to the changes on our Auth wether we are changing user or the current user
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            console.log(user);
        })
        //to avoid memory leaking ALWAYS Return the function so we can stop this function from keeping listening
        return () => {
            unsub();
        }
    }, []);

    //ALSO Return this to display the homepage 
    return (
        //this means that we wrap with AuthContext funtion the '{children}' which is basically the components that will
        //wrap in our App.js and we pass a value which is the currentUser, so with this whatever our currentUser will be, 
        // it will always be reachable in all of our pages
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}