import {useState, useEffect,useContext } from "react";
import { FirebaseContext } from "../firebase";
const Logout = () => {
    const firebase = useContext(FirebaseContext);
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        if(checked){
            console.log("Deconnexion");
            firebase.signoutUser();
        }
    },[checked,firebase]);
    const onHandleChange = e => {
        setChecked(e.target.checked);
    }
    return (
        <div className="logoutContainer">
            <label className="switch">
                <input 
                    type="checkbox" 
                    checked={checked}
                    onChange={onHandleChange}
                />
                <span className="slider round"></span>
            </label>
        </div>
    )
}

export default Logout
