import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../firebase";
import Logout from "../Logout"
import Quiz from "../Quiz"

const Welcome = props => {
    const firebase = useContext(FirebaseContext);
    const [userSession, setUserSession] = useState(null);
    useEffect(() => {
        const sessionListener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push("/");
        });
        return () => {
            sessionListener();
        }
    }, []);

    return userSession === null ? (
        <>
            <div className="loader"></div>
            <p className="loaderText">Loading ...</p>
        </>
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                <Quiz />
            </div>
        </div>
    )
};

export default Welcome
