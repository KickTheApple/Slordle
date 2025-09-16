import "./key.css";
import {useEffect} from "react";
import Vrstica from "./vrstica.tsx";

interface KeyState {
    content : string;
    state : number;
    status : boolean;
}

interface prop {
    key: string,
    thing: KeyState
}

function Key(thing: prop) {

    const obamna = () => {
        thing.thing.status = true;
    }

    return (
        <button id={"kljuc"} onClick={obamna}>{thing.thing.content}</button>
    );
}

export default Key;