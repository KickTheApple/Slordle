import "./postGameScreen.css"


interface postusGamus {
    statusus: boolean;
    funkcios: () => void;
}

function PostGamer(prop : postusGamus) {
    if (!prop.statusus) {
        return null;
    }

    return (
        <div id={"endGame_Container"} className={"fade-in"}>
            <div id={"endGame_Text"}>
                <p>Zmagovalec si!</p>
            </div>
            <div id={"endGame_Functionality"}>
                <button onClick={prop.funkcios}>Zapri</button>
            </div>
        </div>
    );

}

export default PostGamer;