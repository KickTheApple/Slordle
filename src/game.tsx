import "./game.css"
import {useEffect} from "react";
import {useState} from "react";
import Vrstica from "./vrstica.tsx";

const word = "TADEJ"

function WordMaker(guess : Array<string>) : string {

    let beseda : string = "";
    for (let x = 0; x < guess.length; x++) {
        beseda += guess[x];
    }
    return beseda;

}

function softLetterMatcher(guess : string) : boolean {

    for (let x = 0; x < word.length; x++) {
        if (word.charAt(x) === guess) {
            return true;
        }
    }
    return false;

}

function hardLetterMatcher(guess : string, index : number) : boolean {
    return word.charAt(index) === guess;
}

export default function Spiel() {

    const lineOfLines = [];
    const [ text, setText] = useState("")
    const [ eyeLiner, setEyeLiner ] = useState(0);
    const [ linerLiner, setLinerLiner ] = useState(0);

    const [ theWorlde, setTheWordle ] = useState([["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""], ["", "", "", "", ""]])

    const keyPressRoutine = ( event: { key: any; }) => {
        console.log(event.key);
        if (event.key === "Enter" && eyeLiner >= 5) {
            for (let basil = 0; basil < 5; basil++) {
                if (softLetterMatcher(theWorlde[linerLiner][eyeLiner])) {
                    if (hardLetterMatcher(theWorlde[linerLiner][eyeLiner])) {

                    } else {

                    }
                } else {

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
                            return "";
                        }
                        return item;
                    })
                ));
            } else if (eyeLiner < 5 && event.key.length === 1) {
                setTheWordle(theWorldle => theWorldle.map((arr, i) =>
                    arr.map((item, j) => {
                        if (i === linerLiner && j === eyeLiner) {
                            return event.key;
                        }
                        return item;
                    })
                ));
                setEyeLiner(eyeLiner + 1);
            }
        }
        setText(event.key);
        console.log(theWorlde);
    }

    useEffect(() => {
        window.addEventListener("keydown", keyPressRoutine, false);
        return () => {
            window.removeEventListener("keydown", keyPressRoutine, false);
        };
    })

    for (let poskus = 0; poskus < 6; poskus++) {
        lineOfLines.push(<Vrstica stevilka={5} besedilo={text} y={poskus} singer={theWorlde[poskus]}/>);
    }

    return (
        <div id={"container"}>
            {lineOfLines}
        </div>
    );

}