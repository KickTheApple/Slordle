import "./vrstica.css"
import Element from "./element.tsx";

interface VrsticaProps {
    stevilka : number
}

export default function Vrstica(stevilka : VrsticaProps) {

    const elementsInVrstica = [];
    for (let i = 0; i < stevilka.stevilka; i++) {
        elementsInVrstica.push(<Element />);
    }

    return (
        <div id={"row"}>
            {elementsInVrstica}
        </div>
    )
}