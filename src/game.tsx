import "./game.css"
import {use, useEffect} from "react";
import {useState} from "react";
import Vrstica from "./vrstica.tsx";
import Keyboard from "./keyboard.tsx";
import key from "./key.tsx";

const word = "OPERO"

interface Lawful {
    law: string[]
}

interface Colors {
    colors: Array<number>
}

interface Elementek {
    content: string;
    state: number;
}

interface Prop {
    key: string;
}

interface KeyState {
    content : string;
    state : number;
    status : boolean;
}

function WordMaker(guess : Array<Elementek>) : string {

    let beseda : string = "";
    for (let x = 0; x < guess.length; x++) {
        beseda += guess[x].content;
    }
    return beseda;

}

function softLetterMatcher(guess : string, guessedWord : string) : boolean {

    for (let x = 0; x < word.length; x++) {
        if (word.charAt(x) !== guessedWord.charAt(x) && word.charAt(x) === guess) {
            return true;
        }
    }
    return false;

}

function hardLetterMatcher(guess : string, index : number) : boolean {
    return guess === word.charAt(index);
}

function identifier(keyboardIndex: Array<KeyState>) : string {
    for (let index = 0; index < keyboardIndex.length; index++) {
        if (keyboardIndex[index].status) {
            keyboardIndex[index].status = false;
            return keyboardIndex[index].content;
        }
    }
    return "";
}

function comparePromise(listOfValidWords: Promise<string[]>) : Lawful {
    const laws: Lawful = { law: [""]};
    listOfValidWords.then(validList => laws.law = validList)
    return laws;
}

function checkLawfulness(listOfLaws: Lawful, guess: string): boolean {
    for (let i = 0; i < listOfLaws.law.length; i++) {
        if (listOfLaws.law[i] === guess) {
            return true;
        }
    }
    return false;
}

export default function Spiel(props : Prop) {

    const lineOfLines = [];
    const [ eyeLiner, setEyeLiner ] = useState(0);
    const [ linerLiner, setLinerLiner ] = useState(0);

    const legalWords: Promise<string[]> = fetch("./src/sbsj.txt")
        .then(r => r.text())
        .then( lines => lines.split("\n")
            .map(beseda => beseda.replace("\r", "").toUpperCase()).filter(beseda => beseda.length === 5));
    const lawWordList : Lawful = comparePromise(legalWords);

    const [ theWorlde, setTheWordle ] = useState(Array(6).fill(undefined).map(v => (Array(5).fill(undefined).map(u => ({content: "", state: 0})))));
    const [ keyboardIndex, setKeyboardIndex ] = useState(Array(27).fill(undefined).map((u, index) => ({content: "A B C Č D E F G H I J K L M N O P R S Š T U V Z Ž Enter Backspace".split(" ")[index], state: 0, status: false})));

    const keyPressRoutine = ( event: { key: any; }) => {

        if (event.key === "Enter" && eyeLiner >= 5 && checkLawfulness(lawWordList, WordMaker(theWorlde[linerLiner]))) {
            fetch('http://localhost:8080/api/GuessTest', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    word: WordMaker(theWorlde[linerLiner]),
                }),
            }).then(function (response: Response) {
                return response.json();
            }).then(function (jsonData : Colors) {
                for (let location = 0; location < 5; location++) {
                    theWorlde[linerLiner][location].state = jsonData.colors[location];
                }
                setEyeLiner(0);
                setLinerLiner(linerLiner + 1);
            });
        } else {
            if (event.key === "Backspace" && eyeLiner > 0) {
                setTheWordle(theWorldle => theWorldle.map((arr, i) =>
                    arr.map((item, j) => {
                        if (i === linerLiner && j === eyeLiner-1) {
                            return { content: "", state: item.state }
                        }
                        return item;
                    })
                ));
                setEyeLiner(eyeLiner - 1);
            } else if (eyeLiner < 5 && event.key.length === 1) {
                setTheWordle(theWorldle => theWorldle.map((arr, i) =>
                    arr.map((item, j) => {
                        if (i === linerLiner && j === eyeLiner) {
                            return { content: event.key, state: item.state }
                        }
                        return item;
                    })
                ));
                setEyeLiner(eyeLiner + 1);
            }
        }
        console.log(eyeLiner)
        console.log(theWorlde)
    }

    useEffect(() => {
        window.addEventListener("keydown", keyPressRoutine, false);
        return () => {
            window.removeEventListener("keydown", keyPressRoutine, false);
        };
    })

    const obamna = () => {
        const foundPress: string = identifier(keyboardIndex);
        if (foundPress === "") {
            return
        }

        if (foundPress === "Enter" && eyeLiner >= 5 && checkLawfulness(lawWordList, WordMaker(theWorlde[linerLiner]))) {
            fetch('http://localhost:8080/api/GuessTest', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    word: WordMaker(theWorlde[linerLiner]),
                }),
            }).then(function (response: Response) {
                return response.json();
            }).then(function (jsonData : Colors) {
                for (let location = 0; location < 5; location++) {
                    theWorlde[linerLiner][location].state = jsonData.colors[location];
                }
                setEyeLiner(0);
                setLinerLiner(linerLiner + 1);
            });
        } else {
            if (foundPress === "Backspace" && eyeLiner > 0) {
                setTheWordle(theWorldle => theWorldle.map((arr, i) =>
                    arr.map((item, j) => {
                        if (i === linerLiner && j === eyeLiner-1) {
                            return { content: "", state: item.state }
                        }
                        return item;
                    })
                ));
                setEyeLiner(eyeLiner - 1);
            } else if (eyeLiner < 5 && foundPress.length === 1) {
                setTheWordle(theWorldle => theWorldle.map((arr, i) =>
                    arr.map((item, j) => {
                        if (i === linerLiner && j === eyeLiner) {
                            return { content: foundPress, state: item.state }
                        }
                        return item;
                    })
                ));
                setEyeLiner(eyeLiner + 1);
            }
        }
        console.log(eyeLiner)
        console.log(theWorlde)
    }

    useEffect(() => {
        window.addEventListener("click", obamna, false);
        return () => {
            window.removeEventListener("click", obamna, false);
        };
    })

    for (let poskus = 0; poskus < 6; poskus++) {
        lineOfLines.push(<Vrstica key={poskus.toString()} stevilka={5} y={poskus} singer={theWorlde[poskus]}/>);
    }

    return (
        <div id={"container"}>
            <div id={"panelContainer"}>
                {lineOfLines}
            </div>
            <Keyboard key={"k"} keysOnBoard={keyboardIndex} />
        </div>
    );

}