import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const AddContact = (props) => {
    const initialFormState = { id: null, name: '', email: '', phone: '' }
    const [contact, setContact] = useState(initialFormState)
    const [modal, setModal] = useState(false);  // settinng the state for the modal.
    const toggleModal = () => setModal(!modal); // toggle the state.

    const handleInputChange = event => {
        const { name, value } = event.target
        setContact({ ...contact, [name]: value }) // (recommended reading: https://ultimatecourses.com/blog/all-about-immutable-arrays-and-objects-in-javascript)
    }

    return (
        <div className="AddComponent">
            <button onClick={toggleModal} className="add-button">+</button>
            {modal ? (
                <Modal>
                    <div>
                        <div className="title">
                            <h1>Add Contact</h1>
                        </div>
                        <form
                            // here we have prevented the default form submission, on submit, passing contact to be the added. 
                            onSubmit={event => {
                                event.preventDefault()
                                if (!contact.name || !contact.email || !contact.phone) return
                                // passing the contact to Contact home using the function add contact go to Contact Home to see the custom tag (AddContact)
                                props.addContact(contact)
                                setContact(initialFormState)
                                toggleModal()
                            }}>
                            <label>Name</label>
                            <input type="text" name="name" value={contact.name} onChange={handleInputChange} />
                            <label>Email</label>
                            <input type="text" name="email" value={contact.email} onChange={handleInputChange} />
                            <label>Phone</label>
                            <input type="text" name="phone" value={contact.phone} onChange={handleInputChange} />
                            <div className="buttons">
                                <button>Add</button>
                                <button onClick={toggleModal}>No</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            ) : null}
        </div>
    )
}

export default AddContact;