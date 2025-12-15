import "./game.css"
import {type Dispatch, type SetStateAction, useEffect} from "react";
import {useState} from "react";
import Vrstica from "./vrstica.tsx";
import Keyboard from "./keyboard.tsx";
import PostGamer from "./postGameScreen.tsx";

interface Colors {
    legal: boolean;
    colors: Array<number>;
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

class Slordle {
    public content: string;
    public state: number;
    constructor() {
        this.content = "";
        this.state = 0;
    }
}

function WordMaker(guess : Array<Elementek>) : string {

    let beseda : string = "";
    for (let x = 0; x < guess.length; x++) {
        beseda += guess[x].content;
    }
    return beseda;

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

function winCheck(data: Colors): boolean {
    for (let i = 0; i < data.colors.length; i++) {
        if (data.colors[i] != 1) {
            return false;
        }
    }
    return true;

}

function ReplacerOfUseStateWithString(setTheWordle:  Dispatch<SetStateAction<Slordle[][]>>, linerLiner: number, eyeLiner: number, value: string) {
    setTheWordle(theWorldle => theWorldle.map((arr, i) =>
        arr.map((item, j) => {
            if (i === linerLiner && j === eyeLiner) {
                return { content: value, state: item.state }
            }
            return item;
        })
    ));
}

function ReplacerOfUseStateWithStatus(setTheWordle:  Dispatch<SetStateAction<Slordle[][]>>, linerLiner: number, eyeLiner: number, value: number) {
    setTheWordle(theWorldle => theWorldle.map((arr, i) =>
        arr.map((item, j) => {
            if (i === linerLiner && j === eyeLiner) {
                return { content: item.content, state: value }
            }
            return item;
        })
    ));
}

export default function Spiel(props : Prop) {

    const lineOfLines = [];
    const [ eyeLiner, setEyeLiner ] = useState(0);
    const [ linerLiner, setLinerLiner ] = useState(0);

    const [ theWorlde, setTheWordle ] = useState(Array(6).fill(undefined).map(v => (Array(5).fill(undefined).map(u => ({content: "", state: 0})))));
    const [ keyboardIndex, setKeyboardIndex ] = useState(Array(27).fill(undefined).map((u, index) => ({content: "A B C Č D E F G H I J K L M N O P R S Š T U V Z Ž Enter Backspace".split(" ")[index], state: 0, status: false})));

    const [ gameIsOver, setGameIsOver ] = useState(false);
    const [ areWeWinning, setAreWeWinning ] = useState(false);
    const [ postGamusHandlerus, setPostGamusHandlerus] = useState(false);

    const guessFetch : () => void = () => {
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
            if (!jsonData.legal) {
                return;
            }
            for (let location = 0; location < 5; location++) {
                ReplacerOfUseStateWithStatus(setTheWordle, linerLiner, location, jsonData.colors[location]);
            }
            if (winCheck(jsonData)) {
                setGameIsOver(true);
                setAreWeWinning(true);
                setPostGamusHandlerus(true);
            } else if (linerLiner == theWorlde.length-1) {
                setGameIsOver(true);
                setPostGamusHandlerus(true)
            }
            setEyeLiner(0);
            setLinerLiner(linerLiner + 1);
        });
    }

    const keyPressRoutine = ( event: { key: string; }) => {
        if (gameIsOver) {
            return;
        }

        if (event.key === "Enter" && eyeLiner >= 5) {
            guessFetch();
        } else {
            if (event.key === "Backspace" && eyeLiner > 0) {
                ReplacerOfUseStateWithString(setTheWordle, linerLiner, eyeLiner-1, "");
                setEyeLiner(eyeLiner - 1);
            } else if (eyeLiner < 5 && event.key.length === 1) {
                ReplacerOfUseStateWithString(setTheWordle, linerLiner, eyeLiner, event.key.toUpperCase());
                setEyeLiner(eyeLiner + 1);
            }
        }
        console.log(eyeLiner);
        console.log(theWorlde);
    }

    useEffect(() => {
        window.addEventListener("keydown", keyPressRoutine, false);
        return () => {
            window.removeEventListener("keydown", keyPressRoutine, false);
        };
    })

    const buttonPressRoutine = () => {
        if (gameIsOver) {
            return;
        }

        const foundPress: string = identifier(keyboardIndex);
        if (foundPress === "") {
            return
        }

        if (foundPress === "Enter" && eyeLiner >= 5) {
            guessFetch();
        } else {
            if (foundPress === "Backspace" && eyeLiner > 0) {
                ReplacerOfUseStateWithString(setTheWordle, linerLiner, eyeLiner-1, "");
                setEyeLiner(eyeLiner - 1);
            } else if (eyeLiner < 5 && foundPress.length === 1) {
                ReplacerOfUseStateWithString(setTheWordle, linerLiner, eyeLiner, foundPress);
                setEyeLiner(eyeLiner + 1);
            }
        }
        console.log(eyeLiner)
        console.log(theWorlde)
    }

    useEffect(() => {
        window.addEventListener("click", buttonPressRoutine, false);
        return () => {
            window.removeEventListener("click", buttonPressRoutine, false);
        };
    })

    for (let poskus = 0; poskus < 6; poskus++) {
        lineOfLines.push(<Vrstica key={poskus.toString()} stevilka={5} y={poskus} singer={theWorlde[poskus]}/>);
    }

    return (
        <div id={"container"}>r
            <div id={"panelContainer"}>
                {lineOfLines}
            </div>
            <Keyboard key={"k"} keysOnBoard={keyboardIndex} />
            <PostGamer statusus={postGamusHandlerus} funkcios={() => {setPostGamusHandlerus(false)}} condicio={areWeWinning}/>
        </div>
    );

}