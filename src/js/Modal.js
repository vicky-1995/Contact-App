import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.getElementById("modal");

const Modal = ({ children }) => {
    const elRef = useRef(null);
    if (!elRef.current){
        elRef.current = document.createElement("div");
    }
    // useRef is used for getting the reference such that we can add or append the HTML tag(very useful).

    useEffect(() => {
        modalRoot.appendChild(elRef.current);
        return () => modalRoot.removeChild(elRef.current);
    },[]);

return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal; // here we are creating the modal, we track the id=modal from the root.