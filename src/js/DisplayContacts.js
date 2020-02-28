import React, { useState, useEffect, useRef } from "react";
import AddContact from "./AddContacts";
import ContactCard from "./ContactCard";

const DisplayContact = (props) => {
    const { searchTerm } = props; // get the search term from contact home
    const [contacts, setContacts] = useState(props.contacts); // get the contacts from ContactHome
    const [letter, setLetter] = useState(""); // this is for setting the filter letter.
    const [filteredData, setFilteredData] = useState(contacts); // stores the filtered data.

    useEffect(() => {
        const results = contacts.filter(contact => // filtering the contact including the search term.
            contact.name.toLowerCase().includes(searchTerm)
        );
        setFilteredData(results); //updating the filtered contact as we are displaying that.
    }, [searchTerm]); // useEffect is called everytime the searchTerm changes.

    let firstLetterSet = new Set((contacts.map(contact => {
        return contact.name.substr(0, 1).toUpperCase(); //getting the first letter from each contact.
    })).sort()
    );

    useEffect(() => {
        props.refreshContact(contacts);
        const result = (letter == "") ? contacts : contacts.filter(contact => contact.name.toUpperCase().substr(0, 1) === letter);
        return setFilteredData(result);
    }, [letter, contacts]); //calling the function everytime the letter(filter) is changed or the contacts are updated(Edit, Delete or Add)


    const addContact = (contact) => {
        contact.id = contacts.length + 1 // incrementing the id of the contact.
        return setContacts([...contacts, contact]) // updating the contacts. (recommended reading: https://ultimatecourses.com/blog/all-about-immutable-arrays-and-objects-in-javascript)
    }

    return (
        <div>
            <div className="title">
                {/* click here to display all contact again */}
                <h1 onClick={() => { setLetter("") }}>Contacts</h1>
            </div>
            <div className="flex filter-contact">
                {
                    //  setting the letter.
                    Array.from(firstLetterSet).map((letter) => (
                        <div key={letter}>
                            <h2 onClick={() => { setLetter(letter); }}>{letter}</h2>
                        </div>
                    ))
                }
            </div>
            <div>
                <div className="flex all-contacts">
                    {
                        // if length is more the 0, call ContactCard to display all the contacts.
                        filteredData.length > 0 ? (
                            filteredData.map(contact => (
                                <ContactCard
                                    key={contact.id}
                                    name={contact.name}
                                    email={contact.email}
                                    phone={contact.phone}
                                    id={contact.id}
                                />
                            ))
                        ) : (
                                <h1>No contacts found</h1>
                            )
                    }
                </div>
            </div>
            {/* passing the addcontact function to AddContact Component(it will return the contact, which will be added to contacts(using addcontact: see above)). */}
            <AddContact addContact={addContact} />
        </div>
    )
}

export default DisplayContact;
