import './App.css'
import Spiel from "./game.tsx"
import Menu from "./menu.tsx"
import {useState} from "react";

function App() {

    const [isMenu, setIsMenu] = useState(true);

    return (
        <>
            {isMenu ? <Menu key={0 .toString()} isMenu={isMenu} setMenu={setIsMenu}/> : <Spiel key={1 .toString()} />}
        </>
    )
}

export default App
