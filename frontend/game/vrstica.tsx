import "./vrstica.css"
import Element from "./element.tsx";

interface ElementInstance {
    content : string
    state : number
}

interface VrsticaProps {
    key : string;
    stevilka : number
    y : number
    singer : Array<ElementInstance>
}

export default function Vrstica( stevilka : VrsticaProps) {

    const alleElemente = []
    for (let lenge = 0; lenge < stevilka.stevilka; lenge++) {
        alleElemente.push(<Element key={lenge.toString()} x={lenge} y={stevilka.y} thing={stevilka.singer[lenge]} />);
    }

    return (
        <div id={"row"}>
            {alleElemente}
        </div>
    )
}