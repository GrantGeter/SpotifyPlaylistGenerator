import { React, useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from '../api/user';
import { storeToken } from '../auth';

const LogIn = ({ setDisplayMessage, setIsShown, setIsLoggedIn }) => {
    const [user, setUser] = useState();
    const history = useNavigate();

    const signIn = (event) => {
        event.preventDefault()
        const [username, password] = event.target;
        if (username.value && password.value) {
            setUser({
                username: username.value,
                password: password.value
            })
        } else {
            setDisplayMessage({
                message: 'Please provide a username and password',
                type: 'error'
            });
            setIsShown(true);
        }
    }

    let initialRender = useRef(true);
    useEffect(() => {
        if (!initialRender.current) {
            if (user) {
                loginUser(user)
                    .then(response => {
                        console.log(response)
                        if (response) {
                            storeToken(response.data.token)
                            setDisplayMessage({
                                message: response.data.message,
                                type: 'success'
                            })
                            setIsShown(true);
                            setIsLoggedIn(true);
                            history('/');
                        } else {
                            setDisplayMessage({
                                message: 'Incorect username or password.',
                                type: 'error'
                            })
                            setIsShown(true);
                        }
                    })
            }
        } else {
            initialRender.current = false;
        }

    }, [user])

    return (
        <form onSubmit={signIn}>
            <h1 className="logIn">Log In</h1>
            <div className="form-input">
                <label>Username: </label>
                <input type="text" id="username" />
            </div>
            <br />
            <div className="form-input">
                <label>Password: </label>
                <input type="password" id="password" />
            </div>
            <br />
            <div className="buttons">
                <button className="submit" type="submit" >Submit</button>
                <Link className="linkButton" to="/register">Register</Link>
            </div>
        </form>
    )
}

export default LogIn;