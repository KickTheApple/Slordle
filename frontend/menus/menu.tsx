import "./menu.css"
import logo from "../wordle2.png"
import type {Dispatch, SetStateAction} from "react";

interface Maneur {
    key: string;
    isMenu: boolean;
    setMenu: Dispatch<SetStateAction<boolean>>;
}



function Menu(prop : Maneur) {

    const handleLoginClick = () => {
        prop.setMenu(false);
    };

    const redirectorSignup = () => {
        window.location.href = "/signup";
    }

    const redirectorLogin = () => {
        window.location.href = "/login";
    }

    return (
        <div id={"menu-container"}>
            <div id={"upper-text-group"}>
                <img src={logo} alt={""} />
                <h2 id={"thingTitle"}>Slordle</h2>
                <p id={"descriptor"}></p>
                <p id={"descriptor"}></p>
            </div>
            <div id={"menu-button-group"}>
                <button id={"button-white"} onClick={redirectorSignup}>Register</button>
                <button id={"button-white"} onClick={redirectorLogin}>Login</button>
                <button id={"button-black"} onClick={handleLoginClick}>Play</button>
            </div>
            <div id={"lower-text-group"}>
                <p id={"descriptor-Date"}>08-11-2025</p>
                <p id={"descriptor-Identifier"}>1</p>
                <p id={"descriptor-Editor"}>Edited by Domenic Dvojmoč</p>
            </div>
        </div>
    );

}

export default Menu;