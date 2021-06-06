import { useContext, useState } from "react";
import { Link } from "react-router-dom"
import { FirebaseContext } from "../firebase";

const ForgetPassword = props => {
    const responseData = {
        success: null,
        error: null
    };
    const [email, setEmail] = useState('');
    const [response, setResponse] = useState(responseData);
    const firebase = useContext(FirebaseContext);
    const onHandleSubmit = event => {
        event.preventDefault();
        firebase.passwordReset(email)
            .then(() => {
                const data = {
                    success: `Consulter votre adresse email ${email} pour changer le mot de passe`,
                    error: null
                };
                setResponse(data);
                setTimeout(() => {
                    props.history.push("/login");
                }, 5000);
            })
            .catch(error => {
                const data = {
                    success: null,
                    error: error
                };
                setResponse(data);
            });
    };
    const isDisabled = email === '' ? true : false;
    return (
        <div className="signUpLoginBox">
            <div className="slContainer">
                <div className="formBoxLeftForget"></div>
                <div className="formBoxRight">
                    <div className="formContent">
                        {response.success && <span
                            style={{
                                border: "1px solid green",
                                background: "green",
                                color: "#fff"
                            }}>
                            {response.success}
                        </span>
                        }
                        {response.error && <span>{response.error.message}</span>}
                        <h2>Mot de passe oublié ?</h2>
                        <form onSubmit={onHandleSubmit}>
                            <div className="inputBox">
                                <input type="email" id="email" value={email} required autoComplete="off" onChange={e => setEmail(e.target.value)} />
                                <label htmlFor="email">Email</label>
                            </div>
                            <button disabled={isDisabled}>Récupérer</button>
                        </form>
                        <div className="linkContainer">
                            <Link to="/login" className="simpleLink">Déjà inscrit? Connecter-vous.</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword
