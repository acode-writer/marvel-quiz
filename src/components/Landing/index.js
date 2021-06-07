import React, { useRef, useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
const Landing = () => {
    const [btn, setBtn] = useState(false);
    const refWolverine = useRef(null);

    useEffect(() => {
        refWolverine.current.classList.add("startingImg");
        setTimeout(() => {
            refWolverine.current.classList.remove("startingImg");
            setBtn(true);
        }, 1000);
    }, []);

    const onSetLeftImg = () => {
        refWolverine.current.classList.add("leftImg");
    };
    const onClearImg = () => {
        if (refWolverine.current.classList.contains("leftImg")) {
            refWolverine.current.classList.remove("leftImg");
        }else if(refWolverine.current.classList.contains("rightImg")) {
            refWolverine.current.classList.remove("rightImg");
        }
    }
    const onSetRightImg = () => {
        refWolverine.current.classList.add("rightImg");
       
    }; 

    const displayBtn = btn && (
        <Fragment>
            <div className="leftBox">
                <Link to="/signup" className="btn-welcome" onMouseOver={onSetLeftImg} onMouseOut={onClearImg}>Inscription</Link>
            </div>
            <div className="rightBox">
                <Link to="/login" className="btn-welcome" onMouseOver={onSetRightImg} onMouseOut={onClearImg}>Connexion</Link>
            </div>
        </Fragment>
    );
    return (
        <main className="welcomePage" ref={refWolverine}>
            {displayBtn}
        </main>
    );
   
};

export default Landing;