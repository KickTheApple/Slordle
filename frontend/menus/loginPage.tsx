import "./signPage.css"
import { InputText } from "primereact/inputtext"

function LoginPage() {

    return (
        <>
            <div id={"sign_container"}>
                <div id={"sign_title"}>
                    <h2>Login</h2>
                </div>
                <div id={"sign_data"}>
                    <div id={"sign_username"}>
                        <label htmlFor="username">Username</label>
                        <InputText id="username" aria-describedby="username-help" />
                    </div>
                    <div id={"sign_passowrd"}>
                        <label htmlFor="username">Password</label>
                        <InputText id="username" aria-describedby="username-help" />
                    </div>

                </div>
                <div id={"sign_confirmation"}>
                    <button>Check</button>
                    <p>If you don't have an account <a href="http://localhost:5173/signup" target="_self">Signup</a></p>
                </div>
            </div>
        </>
    )

}

export default LoginPage;