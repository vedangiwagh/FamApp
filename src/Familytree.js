import React from "react";
import { Card, Container, Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import app from "./base.js";
import { withRouter } from "react-router";

const Familytree = () => {

    const [parent, setparent] = useState([])
    const [children, setchildren] = useState([])
    var user = app.auth().currentUser;
    const db = app.firestore();
    var uprofileid = user.uid;

    const fetchparents = async () => {
        const response = db.collection('Profile').doc(uprofileid.toString())
        const data = await response.get();
        const files = data.data().Parent;
        // console.log(files);
        if (files) {
            for (const file of files) {
                const res = db.collection('Profile').doc(file.toString())
                const d = await res.get();
                setparent(parent => [...parent, d.data().FirstName])
            }
        }


    }
    const fetchchildren = async () => {
        const response = db.collection('Profile').doc(uprofileid.toString())
        const data = await response.get();
        const files = data.data().Children;
        if (files) {
            for (const file of files) {
                const res = db.collection('Profile').doc(file.toString())
                const d = await res.get();
                setchildren(children => [...children, d.data().FirstName])
            }
        }




    }

    useEffect(() => {
        fetchparents();
        fetchchildren();
    }, [])

    // const listItems = () =>{
    //     parent.map((p) =>
    //     <li>
    //       {p}
    //     </li>
    //     );} 
    //   );

    return (
        <Container>
            <h3>Parent</h3>
            {/* {console.log(parent)} */}
            {

                parent != 0 && parent.map((p) => {
                    return (

                        <>
                            <li>{p}</li>

                        </>
                    )
                })

            }
            {
                parent == 0 &&
                <p>
                    No Parents linked
                </p>
            }
            <h3>Children</h3>
            {
                children != 0 && children.map(c => {
                    return (
                        <>
                            <li>{c}</li>
                            <br></br>
                        </>




                    )
                })
            }
            {
                children == 0 &&
                <p>
                    No Children linked
                </p>
            }
            <Button variant="primary">Add Link</Button>

        </Container>
    );

}

export default withRouter(Familytree);