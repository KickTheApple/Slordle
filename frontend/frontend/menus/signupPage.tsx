import "./signPage.css"
import { useState } from "react";
import { InputText } from "primereact/inputtext"

interface ValidityResponse {
    usernameStatus: number;
    passwordStatus: number;
    generalStatus: boolean;
}

function SignupPage() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [userAbled, setUserAbled] = useState(false);
    const [passAbled, setPassAbled] = useState(false);


    const inputHandler = () => {
        fetch('http://localhost:8080/api/AddUser', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then(function (response: Response) {
            return response.json();
        }).then(function (jsonData : ValidityResponse) {
            if (jsonData.usernameStatus !== 0) {
                setUserAbled(true);
            }
            if (jsonData.passwordStatus !== 0) {
                setPassAbled(true);
            }
            if (!jsonData.generalStatus) {
                window.location.replace("http://localhost:5173")
            }
        });
    }

    return (
        <>
            <div id={"sign_container"}>
                <div id={"sign_title"}>
                    <h2>Signup</h2>
                </div>
                <div id={"sign_data"}>
                    <div id={"sign_username"}>
                        <label htmlFor="username">Username</label>
                        <InputText invalid={userAbled} id="username" aria-describedby="username-help" value={username} onChange={(e) => {setUsername(e.target.value)}}/>
                    </div>
                    <div id={"sign_passowrd"}>
                        <label htmlFor="username">Password</label>
                        <InputText invalid={passAbled} id="username" aria-describedby="username-help" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>

                </div>
                <div id={"sign_confirmation"}>
                    <button onClick={inputHandler}>Check</button>
                    <p>If you already have an account <a href="http://localhost:5173/login" target="_self">Login</a></p>
                </div>
            </div>
        </>
    )

}

export default SignupPage;