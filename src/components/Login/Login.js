import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from './firebase.config';

const Login = () => {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const handleGoogleSignIn = () => {
        //provider
        var provider = new firebase.auth.GoogleAuthProvider();
        //signInWithPopup
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                // The signed-in user info.
                var user = result.user;
                // show user
                console.log(user);
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