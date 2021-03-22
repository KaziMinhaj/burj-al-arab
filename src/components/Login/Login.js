import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

const Login = () => {
    //context api
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    //react router hooks
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }

    const handleGoogleSignIn = () => {
        //provider
        var provider = new firebase.auth.GoogleAuthProvider();
        //signInWithPopup
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                // The signed-in user info.
                var { displayName, email } = result.user;
                const signedInUser = { name: displayName, email: email }
                // show user
                setLoggedInUser(signedInUser);
                history.replace(from); //go back to the page from where you came here
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google sign in</button>
        </div>
    );
};

export default Login;