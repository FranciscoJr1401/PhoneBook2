import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactForm.css'; // Importa el archivo CSS

const ContactForm = ({ fetchContacts, currentContact, setCurrentContact }) => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (currentContact) {
      setName(currentContact.name);
      setLastName(currentContact.lastName);
      setAge(currentContact.age);
      setPhone(currentContact.phone);
    } else {
      setName('');
      setLastName('');
      setAge('');
      setPhone('');
    }
  }, [currentContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const contactData = { name, lastName, age, phone };
      if (currentContact) {
        await axios.patch(`http://localhost:3001/contacts/${currentContact._id}`, contactData);
        setCurrentContact(null);
      } else {
        await axios.post('http://localhost:3001/contacts', contactData);
      }
      fetchContacts();
      setName('');
      setLastName('');
      setAge('');
      setPhone('');
    } catch (error) {
      console.error('Error saving contact', error);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Last Name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>
      <button className="submit-button" type="submit">
        {currentContact ? 'Update Contact' : 'Add Contact'}
      </button>
    </form>
  );
};

export default ContactForm;
