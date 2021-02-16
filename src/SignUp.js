import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import { Card, Container, Modal, Button, Form } from 'react-bootstrap';

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const firestore = app.firestore();
        const { email, password, fname, lname } = event.target.elements;
        try {
            (app.auth().createUserWithEmailAndPassword(email.value, password.value))
                .then((resp) => {
                    return firestore.collection('Profile').doc(resp.user.uid).set({
                        FirstName: fname.value,
                        LastName: lname.value
                    })
                });
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);


    return (
        <div>
            <h1>Sign up</h1>
            <form onSubmit={handleSignUp}>
                <label>
                    Email
          <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                    Password
          <input name="password" type="password" placeholder="Password" />
                </label>
                <label>
                    First Name
          <input name="fname" type="input" placeholder="First Name" />
                </label>
                <label>
                    Last Name
          <input name="lname" type="input" placeholder="Last Name" />
                </label>
                <Button variant="success" type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default withRouter(SignUp);