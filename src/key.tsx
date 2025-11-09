import "./key.css";

interface KeyState {
    content : string;
    state : number;
    status : boolean;
}

interface prop {
    key: string,
    thing: KeyState
}

function Key(thing: prop) {

    const obamna = () => {
        thing.thing.status = true;
    }
    return (
        <button id={"kljuc"} 
        onClick={obamna}
        className={thing.thing.content === "Enter" || thing.thing.content === "Backspace" ? "special" : ""}
        >
            
        {thing.thing.content}</button>
    );
}

export default Key;