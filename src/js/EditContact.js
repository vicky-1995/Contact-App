import React, { useState, useEffect } from "react";
import { Link } from "@reach/router";
import useForm from "./useForm";
import validate from "./validate";
import Modal from "./Modal";

const EditContact = (props) => {
    const [isLoading, setLoading] = useState(true); // set loading to false and wait until we fetch the current contact. 
    const [currentContact, setCurrentContact] = useState([]);
    const { handleInputChange, handleSubmit, values, errors } = useForm(currentContact, submit, validate); // made a Custom Hook  for Form Handling and a function for validation

    const editContact = () => {
        setLoading(false);
        let result = props.contacts.filter(contact => contact.id == props.id); // using filter to get the contact(from contacts) whose id matches the route id.
        setCurrentContact(result[0]);
    }

    function submit() {
        props.updateContact(values.id, values);  // using props to pass the function to EditContact component
        toggleModal()
    }
    useEffect(() => {
        editContact();
    }, [isLoading, values]); // as we are using the value to be computed in the render, this will prevent from warning.

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
            <form onSubmit={handleSubmit} noValidate>
                <label>Name</label>
                <input
                    className={`${errors.name && "inputError"}`} // adding a class when error
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                />
                {/* adding error text if error occurs */}
                {errors.name && <p className="error">{errors.name}</p>}
                <label>Email</label>
                <input
                    className={`${errors.email && "inputError"}`} // adding a class when error
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                />
                {/* adding error text if error occurs */}
                {errors.email && <p className="error">{errors.email}</p>}
                <label>Phone</label>
                <input
                    className={`${errors.phone && "inputError"}`} // adding a class when error
                    type="text"
                    name="phone"
                    value={values.phone}
                    onChange={handleInputChange}
                />
                {/* adding error text if error occurs */}
                {errors.phone && <p className="error">{errors.phone}</p>}
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
