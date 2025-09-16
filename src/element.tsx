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
            <div key={text.thing.content} id={"element"} style={{backgroundColor : stylist(text.thing.state)}}>{text.thing.content}</div>
        </>
    )

}

export default Element;