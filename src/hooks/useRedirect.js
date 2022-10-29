import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post('/dj-rest-auth/token/refresh/')
                // if user is logged in this code will run:
                if (userAuthStatus === 'loggedIn') {
                    history.push('/');
                }
                // else if not logged in, the code below will run:
            } catch(err) {
                if (userAuthStatus === 'loggedOut') {
                    history.push('/');
                }
        }
    }

    handleMount();
}, [history, userAuthStatus]);
}