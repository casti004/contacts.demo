import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Container, Card, CardSubtitle, CardBody,
    CardTitle, CardText, Button, ButtonGroup,
    Input
} from "reactstrap"
import logo from '../icon.jpg';

const ContactCardList = () => {

    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState(``);

    useEffect(() => {
        setLoading(true);

        fetch('api/contacts')
            .then(response => response.json())
            .then(data => {
                setContacts(data);
                setLoading(false);
            }).catch(err => { console.log(err) });
    }, []);

    const remove = async (contact) => {
        await fetch(`/api/contact`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        }).then(() => {
            let updatedContacts = [...contacts].filter(i => i.id !== contact.id);
            setContacts(updatedContacts);
        }).catch(err => { console.log(err) });
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    const contactList = contacts
        .filter(li => `${li.firstName}${li.lastName}`.toLowerCase().includes(search.toLowerCase()))
        .map(contact => {
            return (
                <div className="col" key={contact.id}>
                    <Card
                        style={{
                            width: '18rem'
                        }}
                    >
                        <img
                            alt="Sample"
                            src={logo}
                        />
                        <CardBody>
                            <CardTitle tag="h5">
                                {contact.firstName} {contact.lastName}
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
                            <ButtonGroup>
                                <Button size="sm" outline color="primary" tag={Link} to={"/contacts/" + contact.id}>Edit</Button>
                                <Button size="sm" outline color="danger" onClick={() => remove(contact)}>Delete</Button>
                            </ButtonGroup>
                        </CardBody>
                    </Card>
                </div>
            )
        });

    return (
        <div>
            <Container fluid>
                <div className="col-md-12 px-5">
                    <h1 className="display-4 fst-italic">Manage Your Contacts</h1>
                    <p className="lead my-3">You can add, update, delete and search for a contact from your list.</p>

                    <div className="row">
                        <div className='col'>
                            <Input
                                name="search"
                                placeholder="search..."
                                onChange={e => setSearch(e.target.value)}
                                type="search"
                            />
                        </div>
                        <div className='col'>
                            <Button color="success" tag={Link} to="/contacts/new">Add Contact</Button>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        {contactList}
                    </div>
                </div>
            </Container >
        </div >
    );
};

export default ContactCardList;