import "./element.css";
import {useEffect, useReducer, useState} from "react";
import {flushSync} from "react-dom";

interface ElementInstance {
    content : string
    state : number
}


interface prop {
    key : string
    x : number
    y : number
    thing : ElementInstance
}

function Element( text : prop) {

    //console.log(text);
    //console.log(content)

    function stylist(status : number) : string {
        switch (status) {
            case 0:
                return "#121212"; // background black
            case 1:
                return "green";  // correct guess
            case 2:
                return "#b59e3b"; // wrong spot
            case 3:
                return "#3a3a3c"; // wrong
            default:
                return "#121212"
        }
    }

    return (
        <>
            <div key={text.thing.content} id={"element"} style={{backgroundColor : stylist(text.thing.state)}}>{text.thing.content}</div>
        </>
    )

}

export default Element;