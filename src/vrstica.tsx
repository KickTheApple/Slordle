import "./vrstica.css"
import Element from "./element.tsx";

interface VrsticaProps {
    stevilka : number
    y : number
    singer : Array<string>
}

export default function Vrstica( stevilka : VrsticaProps) {

    const alleElemente = []
    for (let lenge = 0; lenge < stevilka.stevilka; lenge++) {
        alleElemente.push(<Element x={lenge} y={stevilka.y} thing={stevilka.singer[lenge]} />);
    }

    return (
        <div id={"row"}>
            {alleElemente}
        </div>
    )
}