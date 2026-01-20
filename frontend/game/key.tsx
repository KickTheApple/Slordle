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

    function stylist(status : number) : string {
        switch (status) {
            case 0:
                return "gray"; // background black
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
        <button id={"kljuc"} 
        onClick={obamna}
        className={thing.thing.content === "Enter" || thing.thing.content === "Backspace" ? "special" : ""}
        style={{backgroundColor : stylist(thing.thing.state)}}
        >
            
        {thing.thing.content}</button>
    );
}

export default Key;