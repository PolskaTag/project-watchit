import { useLayoutEffect} from 'react' //, useState
import { useHistory } from 'react-router-dom'

function Login() {
    const history = useHistory()

    function handleLogin(e) {
        e.preventDefault()

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        fetch("/login", {
            method: "POST",
            header: {
                "Content-type": "applications/json"
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            localStorage.setItems("token", data.token)
        })
    }

    useLayoutEffect(() => {
        fetch("/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        })
        .then(res => res.json())
        .then(data => data.isLoggedIn ? history.push("/dashboard"): null)
    }, [history])

    return (
        <form onSubmit={event => handleLogin(event)}>
            <input required type="email"/>
            <input required type="password"/>
            <input required type="submit" value="Submit"/>
        </form>
    )
}

export default Login;