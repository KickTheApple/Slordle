import "./game.css"
import {useEffect} from "react";
import {useState} from "react";
import Vrstica from "./vrstica.tsx";

const word = "COMFY"

function WordMaker(guess : Array<string>) : string {

    let beseda : string = "";
    for (let x = 0; x < guess.length; x++) {
        beseda += guess[x];
    }
    return beseda;

}

function softLetterMatcher(guess : string) : boolean {

    for (let x = 0; x < word.length; x++) {
        if (guess === word.charAt(x)) {
            return true;
        }
    }
    return false;

}

function hardLetterMatcher(guess : string, index : number) : boolean {
    return guess === word.charAt(index);
}

export default function Spiel() {

    const lineOfLines = [];
    const [ eyeLiner, setEyeLiner ] = useState(0);
    const [ linerLiner, setLinerLiner ] = useState(0);

    const [ theWorlde, setTheWordle ] = useState(Array(6).fill(undefined).map(v => (Array(5).fill(undefined).map(u => ({content: "", state: 0})))));

    const keyPressRoutine = ( event: { key: any; }) => {
        console.log(event.key);
        if (event.key === "Enter" && eyeLiner >= 5) {
            for (let location = 0; location < 5; location++) {
                if (softLetterMatcher(theWorlde[linerLiner][location].content)) {
                    if (hardLetterMatcher(theWorlde[linerLiner][location].content, location)) {
                        console.log("TRUE")
                        theWorlde[linerLiner][location].state = 1;
                    } else {
                        theWorlde[linerLiner][location].state = 2;
                    }
                } else {
                    theWorlde[linerLiner][location].state = 3;
                }
            }
            setEyeLiner(0);
            setLinerLiner(linerLiner + 1);
        } else {
            if (event.key === "Backspace" && eyeLiner > 0) {
                setEyeLiner(eyeLiner - 1);
                setTheWordle(theWorldle => theWorldle.map((arr, i) =>
                    arr.map((item, j) => {
                        if (i === linerLiner && j === eyeLiner) {
                            item.content = "";
                        }
                        return item;
                    })
                ));
            } else if (eyeLiner < 5 && event.key.length === 1) {
                setTheWordle(theWorldle => theWorldle.map((arr, i) =>
                    arr.map((item, j) => {
                        if (i === linerLiner && j === eyeLiner) {
                            item.content = event.key;
                        }
                        return item;
                    })
                ));
                setEyeLiner(eyeLiner + 1);
            }
        }
        console.log(theWorlde);
    }

    useEffect(() => {
        window.addEventListener("keydown", keyPressRoutine, false);
        return () => {
            window.removeEventListener("keydown", keyPressRoutine, false);
        };
    })

    for (let poskus = 0; poskus < 6; poskus++) {
        lineOfLines.push(<Vrstica stevilka={5} y={poskus} singer={theWorlde[poskus]}/>);
    }

    return (
        <div id={"container"}>
            {lineOfLines}
        </div>
    );

}