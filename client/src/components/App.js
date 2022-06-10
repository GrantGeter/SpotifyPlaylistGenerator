import { useState } from "react";
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
} from "react-router-dom";

import Register from './Register';
import LogIn from './Login';
import LogOut from './Logout'
import Home from './Home';
import checkLogin from './utils/checkLogin';
import PopupMessage from './PopupMessage';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(checkLogin());
    const [isShown, setIsShown] = useState(false);
    const [displayMessage, setDisplayMessage] = useState();
    return (
        <Router>
            <div>
                <nav>
                    <header>
                        <h1>Boiler Plate</h1>
                    </header >
                    <ul>
                        <>
                            {
                                !isLoggedIn ?
                                    <>
                                        <li>
                                            <Link to="/logIn">Log In</Link>
                                        </li>
                                        <li>
                                            <Link to="/register">Register</Link>
                                        </li>
                                    </> :
                                    <li>
                                        <Link to="/logout">Log Out</Link>
                                    </li>
                            }

                            <li>
                                <Link to="/">Home</Link>
                            </li>
                        </>
                    </ul>
                </nav>

                <div>
                    <Routes>
                        <Route exact path='/' element={<Home />} />
                        <Route exact path="/register" element={
                            <Register
                                setDisplayMessage={setDisplayMessage}
                                setIsShown={setIsShown}
                                setIsLoggedIn={setIsLoggedIn}

                            />
                        } />

                        <Route exact path="/logIn" element={
                            <LogIn
                                setDisplayMessage={setDisplayMessage}
                                setIsShown={setIsShown}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        } />

                        <Route exact path="/logout" element={
                            <LogOut
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                                setDisplayMessage={setDisplayMessage}
                                setIsShown={setIsShown}
                            />
                        } />

                    </Routes>
                </div>
                {
                    isShown ? <PopupMessage
                        displayMessage={displayMessage}
                        setIsShown={setIsShown} /> : ''
                }
            </div>
        </Router>
    )
}
export default App;