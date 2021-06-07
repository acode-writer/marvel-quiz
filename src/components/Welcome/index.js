import React from 'react';
import { useContext, useState, useEffect, Fragment } from "react";
import { FirebaseContext } from "../firebase";
import Logout from "../Logout"
import Quiz from "../Quiz"

const Welcome = props => {
    const firebase = useContext(FirebaseContext);
    const [userSession, setUserSession] = useState(null);
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const sessionListener = firebase.auth.onAuthStateChanged(user => {
            user ? setUserSession(user) : props.history.push("/");
        });
        if (userSession) {
            firebase.user(userSession.uid)

                .get()
                .then(doc => {
                    if (doc && doc.exists) {
                        const data = doc.data();
                        setUserData(data);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
        return () => {
            sessionListener();
        };
    }, [userSession]);

    return userSession === null ? (
        <Fragment>
            <div className="loader"></div>
            <p className="loaderText">Loading ...</p>
        </Fragment>
    ) : (
        <div className="quiz-bg">
            <div className="container">
                <Logout />
                <Quiz userData={userData} />
            </div>
        </div>
    )
};

export default Welcome
