import "./element.css";
import {useEffect, useState} from "react";

interface ElementInstance {
    content : string
    state : number
}


interface prop {
    x : number
    y : number
    thing : ElementInstance
}

function Element( text : prop) {

    const [ content, setContent ] = useState(text.thing.content);

    //console.log(text);
    //console.log(content)

    function stylist(status : number) : string {
        switch (status) {
            case 0:
                return "white";
            case 1:
                return "green";
            case 2:
                return "yellow";
            case 3:
                return "gray";
            default:
                return "white"
        }
    }

    return (
        <>
            <div id={"element"} style={{backgroundColor : stylist(text.thing.state)}}>{text.thing.content}</div>
        </>
    )

}

export default Element;