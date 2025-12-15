import "./postGameScreen.css"


interface postusGamus {
    statusus: boolean;
    funkcios: () => void;
    condicio: boolean;
}

function PostGamer(prop : postusGamus) {
    if (!prop.statusus) {
        return null;
    }

    return (
        <div id={"endGame_Container"} className={"fade-in"}>
            <div id={"endGame_Text"}>
                <p>{prop.condicio ? "Zmagovalec si!" : "Poraženec si"}</p>
            </div>
            <div id={"endGame_Functionality"}>
                <button onClick={prop.funkcios}>Zapri</button>
            </div>
        </div>
    );

}

export default PostGamer;