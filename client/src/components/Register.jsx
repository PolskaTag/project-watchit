import { useHistory } from 'react-router'
import { useLayoutEffect } from 'react'
import axios from 'axios'

function Register() {
    const history = useHistory()

    function handleRegister(e) {
        e.preventDefault()
        console.warn(e)

        const form = e.target
        const user = {
            username: form[0].value,
            password: form[1].value,
            confirmPassword: form[2].value
        }

        console.warn(JSON.stringify(user))

        axios
        .post("http://localhost:5000/register", user).then((response) => {
            console.log(response);
        })
        // fetch("http://localhost:5000/register", {
        //     method: "POST",
        //     header: {
        //         "Content-type": "applications/json"
        //     },
        //     body: user
        // })
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
            <input required type="username"/>
            <input required type="password"/>
            <input required type="password"/>
            <input required type="submit" value="Register"/>
        </form>
    )
}

export default Register;