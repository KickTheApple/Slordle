import "./game.css"
import {useEffect} from "react";
import Vrstica from "./vrstica.tsx";

export default function Spiel() {

    const keyPressRoutine = ( event: { key: any; }) => {
        console.log(event.key);
    }

    useEffect(() => {
        window.addEventListener("keydown", keyPressRoutine, false);
    })

    const lineOfLines = [];

    for (let poskus = 0; poskus < 6; poskus++) {
        lineOfLines.push(<Vrstica stevilka={5} />);
    }

    return (
        <div id={"container"}>
            {lineOfLines}
        </div>
    );

}