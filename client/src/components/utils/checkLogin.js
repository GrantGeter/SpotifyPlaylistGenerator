import { getToken } from '../../auth'

const checkLogin = () => {
    const profileToken = getToken();
    if (profileToken !== null && profileToken !== '') {
        return true;
    }
    return false;
}

export default checkLogin;