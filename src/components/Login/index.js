import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../firebase";

const Login = (props) => {
    const firebase = useContext(FirebaseContext);
    const data = {
        email: "",
        password: "",
    };
    const [loginData, setLoginData] = useState(data);
    const [btn, setBtn] = useState(false);
    const [error, setError] = useState("");
    const { email, password } = loginData;
    useEffect(() => {
        if (password.length > 5 && email !== "") {
            setBtn(true);
        } else if (btn) {
            setBtn(false);
        }
    }, [password, email, btn]);
    const onHandleChange = event => {
        const name = event.target.id;
        const value = event.target.value;
        setLoginData({ ...loginData, [name]: value });
    };
    const onHandleSubmit = event => {
        event.preventDefault();
        firebase.loginUser(email, password)
            .then(user => {
                setLoginData({ ...data });
                props.history.push("/welcome");
            })
            .catch(error => {
                setError(error);
                setLoginData({ ...data });
            });
    };

    const errorMsg = error !== "" && <span>{error.message}</span>;

    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftLogin"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {errorMsg}
                        <h2>Connexion</h2>
                        <form onSubmit={onHandleSubmit}>
                            <div className="inputBox">
                                <input type="email" id="email" value={email} required autoComplete="off" onChange={onHandleChange} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="inputBox">
                                <input type="password" id="password" value={password} required autoComplete="off" onChange={onHandleChange} />
                                <label htmlFor="password">Mot de passe</label>
                            </div>
                            {btn ? <button>Connexion</button> : <button disabled>Connexion</button>}
                        </form>
                        <div className="linkContainer">
                            <Link to="/signup" className="simpleLink">Nouveau sur Marvel Quiz ? Inscrivez-vous maintenant</Link><br/>
                            <Link to="/forgetpassword" className="simpleLink">Mot de passe oublié ? Récupérer-le ici.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
