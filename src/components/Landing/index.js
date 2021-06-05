import { useRef, useEffect, useState } from "react";
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
        <>
            <div className="leftBox">
                <button className="btn-welcome" onMouseOver={onSetLeftImg} onMouseOut={onClearImg}>Inscription</button>
            </div>
            <div className="rightBox">
                <button className="btn-welcome" onMouseOver={onSetRightImg} onMouseOut={onClearImg}>Connexion</button>
            </div>
        </>
    );
    return (
        <main className="welcomePage" ref={refWolverine}>
            {displayBtn}
        </main>
    );
   
};

export default Landing;