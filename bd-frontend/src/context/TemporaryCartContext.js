// src/context/TemporaryCartContext.js
import React, { createContext, useState } from 'react';

export const TemporaryCartContext = createContext();

export const TemporaryCartProvider = ({ children }) => {
    const [temporaryCart, setTemporaryCart] = useState([]);

    return (
        <TemporaryCartContext.Provider value={{ temporaryCart, setTemporaryCart }}>
            {children}
        </TemporaryCartContext.Provider>
    );
};
