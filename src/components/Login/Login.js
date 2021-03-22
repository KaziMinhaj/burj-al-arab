import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { UserContext } from '../../App';

const Login = () => {
    //context api
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)


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