import React, { useState, useEffect, useRef } from "react";
import { Router, Link } from "@reach/router";
import EditContact from "./EditContact";
import DeleteContact from "./DeleteContact";
import DisplayContact from "./DisplayContacts";
import { data } from '../data/contacts.json';

const ContactHome = (props) => {
    const { searchTerm } = props; // taking the search Term from App component and passing it to Display Contact.
    const [contacts, setContacts] = useState(data); // reading the data file(contact.json)

    const updateContact = (id, updatedContact) => { // getting the values from EditContact with the ID and the Edited contact.
        return setContacts(contacts.map(contact => contact.id === id ? updatedContact : contact)); // using map function to compare the id and update the contact.
    }

    const deleteContacts = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id)); // using filter function to compare the id and filter all contacts except the matched id.
        console.log(contacts)
    }

    const refreshContact = (contacts) => {
        setContacts(contacts) // we need to pass the updated list of contacts to DisplayContact. Since at begining it is reading from data.json if we don't do this we can not update the new added contacts.
    }


    return (
        <div>
            <Router>
                <DisplayContact path="/" searchTerm={searchTerm} contacts={contacts} refreshContact={refreshContact} />
                <EditContact path="edit/:id" contacts={contacts} updateContact={updateContact} />
                <DeleteContact path="delete/:id" contacts={contacts} deleteContacts={deleteContacts} />
            </Router>
        </div>
    )
}

export default ContactHome;