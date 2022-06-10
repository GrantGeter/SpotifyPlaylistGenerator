import { React } from "react";
import { useNavigate } from 'react-router-dom'
import { clearToken } from '../auth'

const Logout = ({ setIsLoggedIn, setDisplayMessage, setIsShown }) => {
    let history = useNavigate();
    const logOut = () => {
        clearToken()
        setIsLoggedIn(false)
        history.push("/LogIn")
        setDisplayMessage({
            message: 'You logged out!',
            type: 'success'
        });
        setIsShown(true);
    }

    const returnToHome = () => {
        history("/home")
    }
    return (
        <div className="logout">
            <h3>Are you sure you want to logout?</h3>
            <div>
                <button onClick={logOut}>Yes</button>
                <button onClick={returnToHome}>No</button>
            </div>
        </div>
    )
}

export default Logout;