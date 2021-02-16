import React from "react";
import app from "./base";
import { Card, Container, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userfname: [],
      userlname: []
    };
  }

  componentDidMount() {
    var user = app.auth().currentUser;
    const db = app.firestore();
    var uprofileid = user.uid;
    console.log(uprofileid);
    db.collection('Profile').doc(uprofileid.toString()).get()
      .then(doc => {
        const data = doc.data();
        // console.log(data); 
        this.setState({ userfname: data.FirstName });
        this.setState({ userlname: data.LastName });
      });

  }


  render() {
    const { userfname } = this.state;
    const { userlname } = this.state;
    return (
      <>
        <Container>


          <h1>Home</h1>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>
                Welcome
              </Card.Title>
              <Card.Text>
                {userfname}
                {/* {userlname} */}
              </Card.Text>
              <Button variant="primary">Set/Update Profile</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>
                Lists
              </Card.Title>
              <Link to="/lists"><Button variant="primary">
                View and Create Lists
            </Button>
              </Link>
            </Card.Body>
          </Card>

          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>
                Family Tree
              </Card.Title>
              <Link to="/treeview">
                <Button variant="primary">
                  View Members
            </Button>
              </Link>

            </Card.Body>
          </Card>

          <Button variant="danger" onClick={() => app.auth().signOut()}>Sign out</Button>
        </Container>
      </>
    );
  }

};

export default Home;