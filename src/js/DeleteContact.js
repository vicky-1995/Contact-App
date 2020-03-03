import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import Modal from "./Modal";

const DeleteContact = (props) => {

    const [isLoading, setLoading] = useState(true); //setting a loading parameter as we are using a value in the render which is yet to be computed from the props suing the function delete contact.
    const [currentContact, setCurrentContact] = useState([])
    const [modal, setModal] = useState(true);   // settinng the state for the modal.
    const toggleModal = () => setModal(!modal); // toggle the state.

    const deleteContact = () => {
        setLoading(false);
        let result = props.contacts.filter(contact => contact.id == props.id);
        setCurrentContact(result[0]);
    }

    // it is another Hook used for calling functions which is inside it, whenever the parameter(where isLoading is now) changes. if nothing is given it runs on every render(performance issue)
    useEffect(() => {
        deleteContact();
    }, [isLoading]);

    if (isLoading) {
        return <h1>loading … </h1>; // if error in computing the value loading.. displays. 
    }
    return (
        <div>
            {modal ? (
                <Modal>
                    <h1>Confirm delete</h1>
                    <div className="buttons">
                        <Link to="/">
                            {/* pass the id here back to ContactHome */}
                            <button onClick={() => {props.deleteContacts(currentContact.id)}}>Yes</button>
                            <button onClick={toggleModal}>No</button>
                        </Link>
                    </div>
                </Modal>
            ) : null}
        </div>
    )
}

export default DeleteContact;
