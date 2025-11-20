import Key from "./key.tsx";
import "./keyboard.css";

interface KeyState {
    content : string;
    state : number;
    status : boolean;
}

interface ListOfKeys {
    key: string;
    keysOnBoard: Array<KeyState>;
}

function keyboard(thing: ListOfKeys) {

    const keyLibrary = []
    for (let i = 0; i < thing.keysOnBoard.length; i++) {
        keyLibrary.push(<Key key={i.toString()} thing={thing.keysOnBoard[i]} />);
    }

    return (
        <div id={"KeyZone"}>
            {keyLibrary}
        </div>
    )

}

export default keyboard;