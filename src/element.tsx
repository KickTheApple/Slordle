import "./element.css";


interface prop {
    x ?: string
}

export default function Element( text : prop) {

    return (
        <>
            <div id={"element"}>{text.x}</div>
        </>
    )

}