import React, { useState, useEffect, useRef } from "react";
import { Link } from "@reach/router";

const ContactCard = (props) => {
    const { name, email, phone, id } = props; // getting the values DisplayContact through custom tag contact card. 

    return (
        <div className="contact-card">
            <div>
                <h3 className="flex name">{name}</h3>
                <p className="flex details">{email}
                    <br />{phone}</p>
                <div className="action">
                    {/* linkl tag is used everywhere instead of a tag as it helps reach router to locate the specific route when and if conflicts arise.*/}
                    <Link to={`edit/${id}`} >
                        <p className="edit">✏️</p>
                    </Link>
                    <Link to={`delete/${id}`} >
                        <p className="delete">🗑️</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ContactCard;