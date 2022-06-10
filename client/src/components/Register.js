import { React, useState, useEffect, useRef, } from 'react';
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../api/user';
import { storeToken } from '../auth';

const Register = ({ setDisplayMessage, setIsShown, setIsLoggedIn }) => {
    const [newUser, setNewUser] = useState();
    const history = useNavigate();

    const signUp = (event) => {
        event.preventDefault()
        console.log(event.target);
        const [email, name, username, password, confirmPassword] = event.target;
        if (username.value && password.value && confirmPassword.value && email.value && name.value) {
            if (confirmPassword.value === password.value) {
                setNewUser({
                    username: username.value,
                    password: password.value,
                    name: name.value,
                    email: email.value
                })
            } else {
                setDisplayMessage({
                    message: 'Passwords do not match',
                    type: 'error'
                });
                setIsShown(true);
            }

        } else {
            setDisplayMessage({
                message: 'Please provide a username password name and email',
                type: 'error'
            });
            setIsShown(true);
        }
    }

    let initialRender = useRef(true);

    useEffect(() => {
        if (!initialRender.current) {
            if (newUser) {
                registerUser(newUser)
                    .then(response => {
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
                                message: 'User already exists',
                                type: 'error'
                            })
                            setIsShown(true);
                        }
                    })
            }
        } else {
            initialRender.current = false;
        }

    }, [newUser])

    return (
        <form onSubmit={signUp}>
            <h1 className="logIn">Sign Up</h1>
            <div className="form-input">
                <label>Email: </label>
                <input type="text" id="email" />
            </div>
            <br />
            <div className="form-input">
                <label>Name: </label>
                <input type="text" id="name" />
            </div>
            <br />
            <div className="form-input">
                <label>Create Username: </label>
                <input type="text" id="username" />
            </div>
            <br />
            <div className="form-input">
                <label>Create Password: </label>
                <input type="password" />
            </div>
            <br />
            <div className="form-input">
                <label>Confirm Password: </label>
                <input type="password" />
            </div>
            <br />
            <div className="buttons">
                <button className="submit" type="submit" >Submit</button>
            </div>
        </form>
    )
}

export default Register;