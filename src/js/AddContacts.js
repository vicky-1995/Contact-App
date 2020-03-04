import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import validate from "./validate";
import useForm from "./useForm";

const AddContact = (props) => {
    const [initialFormState, SetInitialFormState] = useState({});// initialFormState to empty object
    const { handleInputChange, handleSubmit, values, errors } = useForm(initialFormState, submit, validate); // made a Custom Hook  for Form Handling and a function for validation
    const [modal, setModal] = useState(false);  // settinng the state for the modal.
    const toggleModal = () => setModal(!modal); // toggle the state.

    function submit() {
        props.addContact(values) // using props to pass the function to AddContact component
        toggleModal()
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