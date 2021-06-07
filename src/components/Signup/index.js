import React, { useState, useContext } from "react";
import {FirebaseContext} from "../firebase";
import { Link } from "react-router-dom";
const Signup = (props) => {
    const firebase = useContext(FirebaseContext);
    const data = {
        pseudo: "",
        email: "",
        password: "",
        confirmPassword: ""
    };
    const [loginData, setLoginData] = useState(data);
    const [error, setError] = useState("");
    const onHandleChange = event => {
        const name = event.target.id;
        const value = event.target.value;
        setLoginData({...loginData, [name]: value});
    };

    const onHandleSubmit = e => {
        e.preventDefault();
        const {pseudo, email, password} = loginData;
        firebase.signupUser(email,password)
        .then( authUser => {
            return firebase.user(authUser.user.uid).set({
                    pseudo, 
                    email
                });
        })
        .then( () => {
            setLoginData({...data});
            props.history.push("/welcome");
        })
        .catch( error => {
            setError(error);
            setLoginData({...data});
        });
    }
    const {pseudo, email, password, confirmPassword} = loginData;
    const btn = pseudo === "" || email === "" || password === "" || password !== confirmPassword 
    ? <button disabled className="btn-welcome">Inscription</button> : <button className="btn-welcome">Inscription</button> ;

    const errorMsg = error !== "" && <span>{error.message}</span>;

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftSignup"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {errorMsg}
                        <h2>Inscription</h2>
                        <form onSubmit={onHandleSubmit}>
                            <div className="inputBox">
                                <input type="text" id="pseudo" value={pseudo} required autoComplete="off" onChange={onHandleChange} />
                                <label htmlFor="pseudo">Pseudo</label>
                            </div>
                            <div className="inputBox">
                                <input type="email" id="email" value={email} required autoComplete="off" onChange={onHandleChange} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input type="password" id="password" value={password} required autoComplete="off" onChange={onHandleChange} />
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            <div className="inputBox">
                                <input type="password" id="confirmPassword" value={confirmPassword} required autoComplete="off" onChange={onHandleChange} />
                                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            </div>
                            {btn}
                        </form>
                        <div className="linkContainer">
                            <Link to="/login" className="simpleLink">Déjà inscrit? Connecter-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup
