import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import Modal from "./Modal";

const EditContact = (props) => {
    const [isLoading, setLoading] = useState(true);
    const [currentContact, setCurrentContact] = useState([]);

    const editContact = () => {
        setLoading(false);
        let result = props.contacts.filter(contact => contact.id == props.id); // using filter to get the contact(from contacts) whose id matches the route id.
        setCurrentContact(result[0]);
    }

    useEffect(() => {
        editContact();
    }, [isLoading]); // as we are using the value to be computed in the render, this will prevent from warning.

    const handleInputChange = event => {
        const { name, value } = event.target
        setCurrentContact({ ...currentContact, [name]: value }) // (recommended reading: https://ultimatecourses.com/blog/all-about-immutable-arrays-and-objects-in-javascript)
    }
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);

    if (isLoading) {
        return <h1>loading … </h1>; // will display loading if the id is not loaded or any error occurs in fetching the contact.
    }
    return (
        <div>
            <div className="title">
                <h1>Edit Contact</h1>
            </div>
            <form
                // here we have prevented the default form submission, on submit, passing set contact to be the updated. 
                onSubmit={event => {
                    event.preventDefault()
                    if (!currentContact.name || !currentContact.email || !currentContact.phone) return
                    props.updateContact(currentContact.id, currentContact);
                    toggleModal()
                }}>
                <label>Name</label>
                <input type="text" name="name" value={currentContact.name} onChange={handleInputChange} />
                <label>Email</label>
                <input type="text" name="email" value={currentContact.email} onChange={handleInputChange} />
                <label>Phone</label>
                <input type="text" name="phone" value={currentContact.phone} onChange={handleInputChange} />
                <div className="buttons">
                    <button>Update</button>
                    <Link to="/">
                        <button className="button muted-button" onClick={() => { editContact() }}>Cancel</button>
                    </Link>
                </div>
            </form>
            {/* here we use the Modal to ask for confirmation */}
            {modal ? (
                <Modal>
                    <h1>Confirm update</h1>
                    <div className="buttons">
                        <Link to="/">
                            <button>Yes</button>
                        </Link>
                        <button onClick={toggleModal}>No</button>
                    </div>
                </Modal>
            ) : null}
        </div>
    )
}

export default EditContact;
