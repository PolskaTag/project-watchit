import { useHistory } from 'react-router'
import { useLayoutEffect } from 'react'

function Register() {
    const history = useHistory()

    function handleRegister(e) {
        e.preventDefault()

        const form = e.target;
        const user = {
            username: form[0].value,
            password: form[1].value
        }

        fetch("/register", {
            method: "POST",
            header: {
                "Content-type": "applications/json"
            },
            body: JSON.stringify(user)
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
        <form onSubmit={event => handleRegister(event)}>
            <input required type="email"/>
            <input required type="password"/>
            <input required type="submit" value="Register"/>
        </form>
    )
}

export default Register;