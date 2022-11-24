import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from "./firebase";
import './login.css';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';
function Login() {
    const [{ }, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then(result =>
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            })
        )
            .catch(error => alert(error.message));
    };
    return (
        <div className='Login'>
            <div className="login_conatiner">
                <img src="https://www.keyreply.com/hs-fs/hubfs/WhatsApp_Logo_1.png?width=2067&name=WhatsApp_Logo_1.png" width={'200px'} height={'200px'}></img>
                <div className="login_text">
                    <h1>Sign In To WhatsApp</h1>
                </div>
                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login