import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';


const ContactEdit = () => {
    const initialFormState = {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
    };
    const [contact, setContact] = useState(initialFormState);
    const navigate = useNavigate();
    const { id } = useParams();
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (id !== 'new') {
            setIsDisabled(true);
            fetch(`/api/contact/${id}`)
                .then(response => response.json())
                .then(data => setContact(data))
                .catch(err => { console.log(err) })
        } else {
            setIsDisabled(false);
        }
    }, [id, setContact]);

    const handleChange = (event) => {
        const { name, value } = event.target

        setContact({ ...contact, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // SQLite starts at id=0
        await fetch('/api/contact', {
            method: (contact.id || contact.id === 0) ? 'PUT' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contact)
        }).catch(err => { console.log(err) });

        setContact(initialFormState);
        navigate('/contacts');
    }

    const title = <h2>{contact.id ? 'Edit Contact' : 'Add Contact'}</h2>;

    return (<div>
        <Container>
            {title}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="firstName">First Name</Label>
                    <Input type="text" name="firstName" id="firstName" value={contact.firstName || ''}
                        onChange={handleChange} autoComplete="firstName" disabled={isDisabled} />
                </FormGroup>
                <FormGroup>
                    <Label for="lastName">Last Name</Label>
                    <Input type="text" name="lastName" id="lastName" value={contact.lastName || ''}
                        onChange={handleChange} autoComplete="lastName" />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input type="text" name="email" id="email" value={contact.email || ''}
                        onChange={handleChange} autoComplete="email" />
                </FormGroup>
                <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input type="text" name="phone" id="phone" value={contact.phone || ''}
                        onChange={handleChange} autoComplete="phone" />
                </FormGroup>
                <FormGroup>
                    <Button color="primary" type="submit">Save</Button>{' '}
                    <Button color="secondary" tag={Link} to="/contacts">Cancel</Button>
                </FormGroup>
            </Form>
        </Container>
    </div>
    )
};

export default ContactEdit;