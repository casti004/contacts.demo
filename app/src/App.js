import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  Card, CardSubtitle, CardBody,
  CardTitle, CardText, Button
} from "reactstrap"

const App = () => {

  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch('api/contacts')
      .then(response => response.json())
      .then(data => {
        setContacts(data);
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="App-intro">
          <h2>Contacts Demo</h2>
        </div>
      </header>
      <div>
        {contacts.map(contact =>
          <div key={contact.id}>
            <Card
              style={{
                width: '18rem'
              }}
            >
              <img
                alt="Sample"
                src="https://picsum.photos/300/200"
              />
              <CardBody>
                <CardTitle tag="h5">
                  {contact.firstName}_{contact.lastName}
                </CardTitle>
                <CardSubtitle
                  className="mb-2 text-muted"
                  tag="h6"
                >
                  {contact.email}
                </CardSubtitle>
                <CardText>
                  {contact.phone}
                </CardText>
                <Button>
                  Button
                </Button>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
