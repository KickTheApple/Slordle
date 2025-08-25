import "./element.css";
import {useEffect, useState} from "react";


interface prop {
    x : number
    y : number
    thing : string
}

function Element( text : prop) {

    const [ content, setContent ] = useState(text.thing);

    console.log(text);
    console.log(content)

    return (
        <>
            <div id={"element"}>{text.thing}</div>
        </>
    )

}

export default Element;