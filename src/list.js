import React from "react";
import { Card, Container, Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import app from "./base.js";
import { withRouter } from "react-router";


const Lists = () => {
    const [logs, setlogs] = useState([])
    const [newlist, setnewlist] = useState([])
    var user = app.auth().currentUser;
    const db = app.firestore();
    var uprofileid = user.uid;

    const fetchlogs = async () => {
        const response = db.collection('Profile').doc(uprofileid.toString()).collection('Lists')
        const data = await response.get();
        data.docs.forEach(item => {
            setlogs([...logs, item.data()])
        })
    }

    useEffect(() => {
        fetchlogs();
    }, [])



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleListCreation = (e) => {

        // const {listname}=e.target.value;
        // console.log(listname.value);
        //     // db.collection('Profile').doc(uprofileid.toString()).collection('Lists').doc(listname)
    };

    return (
        <div>
            {
                logs && logs.map(log => {
                    return (
                        <div>
                            <h4>{log.name}</h4>
                            <p>{log.items}</p>
                        </div>
                    )
                })
            }
            {
                <p>
                    No lists created
          </p>
            }
            <button onClick={handleShow} >Add List</button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create New List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleListCreation}>
                        <label>
                            Name:
          <input type="text" />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    {/* <Button variant="primary" onClick={handleListCreation}>
            Create List
          </Button> */}
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default withRouter(Lists);