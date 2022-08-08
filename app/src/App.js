import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

import {
  Card, CardSubtitle, CardBody,
  CardTitle, CardText, Button,
  Table
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
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Contacts Management System (CMS)</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li>
                <button type="button" class="btn btn-outline-danger">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-person me-1" viewBox="0 0 16 16">
                    <path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                    <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2v9.255S12 12 8 12s-5 1.755-5 1.755V2a1 1 0 0 1 1-1h5.5v2z"></path>
                  </svg>
                  Add Contact
                </button>
              </li>
            </ul>
            <form class="d-flex">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>

          </div>
        </div>
      </nav>

      <div className="container">
        <div class="col-md-12 px-5">
          <h1 class="display-4 fst-italic">Manage Your Contacts</h1>
          <p class="lead my-3">You can add a contact, update a contact, and delete a contact from your list.</p>
          <p class="lead mb-0">

            <Table size="sm">
              <thead>
                <tr>
                  <th>
                    First Name
                  </th>
                  <th>
                    Last Name
                  </th>
                  <th>
                    Phone
                  </th>
                  <th>
                    Email
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(contact =>
                  <tr>
                    <td>
                      {contact.firstName}
                    </td>
                    <td>
                      {contact.lastName}
                    </td>
                    <td>
                      {contact.phone}
                    </td>
                    <td>
                      {contact.email}
                    </td>
                    <td>
                      <button type="button" class="btn btn-outline-success">Update</button>
                      <button type="button" class="btn btn-outline-danger ms-1">Delete</button>
                    </td>
                  </tr>
                )}

              </tbody>
            </Table>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
