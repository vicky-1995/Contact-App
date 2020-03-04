import React, { useState, useEffect } from "react";

const useForm = (defaultState, callback, validate) => {
    const [values, setValues] = useState({ id: null, name: '', email: '', phone: '' }); // initializing the values.

    const [errors, setErrors] = useState({}); // initialized errors
    const [isSubmitting, setIsSubmitting] = useState(false); // isSubmitting is set to false

    const handleSubmit = event => {
        event.preventDefault();  // prevent default submission
        setErrors(validate(values)); // values are passed to validate function where errors object is populated
        setIsSubmitting(true); // then isSubmitting is set to False
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) { //if no errors and isSubmitting is True
            callback(); // then calling the callaback which is submit function in respective Forms
            setValues({ id: null, name: '', email: '', phone: '' }); // set back to initial value
        }
    }, [errors]); // it gets called whenever the errors gets modified.

    // tricky stuff: for EditContact initially the default state is empty and thus can't be used.
    // for the AddContact we want the defaultstate to be empty and set here, since otherwise it renders it infinte.

    useEffect(() => {
        if (Object.keys(defaultState).length !== 0) { // since initially the default state is empty
            setValues(defaultState)  // if not empty then setValues to the one to be Updated(EditContact)
        }
    }, [defaultState]);

    const handleInputChange = event => {
        const { name, value } = event.target
        setValues({ ...values, [name]: value }) // (recommended reading: https://ultimatecourses.com/blog/all-about-immutable-arrays-and-objects-in-javascript)
    }
    return {
        // we return all the functions to AddContact and EditContact.
        handleInputChange,
        handleSubmit,
        values,
        errors
    };
};

export default useForm;