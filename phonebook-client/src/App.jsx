// src/App.jsx
import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { fetchContacts } from './services/contactService';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);

  // Función para obtener los contactos desde el servidor
  const getContacts = async () => {
    try {
      const contacts = await fetchContacts();
      setContacts(contacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm 
        fetchContacts={getContacts}
        currentContact={currentContact}
        setCurrentContact={setCurrentContact}
      />
      <ContactList 
        contacts={contacts} 
        fetchContacts={getContacts}
        setCurrentContact={setCurrentContact} 
      />
    </div>
  );
};

export default App;
