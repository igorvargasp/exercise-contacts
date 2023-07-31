/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import AddContact from "./pages/AddContact";
import ConfirmationModal from "./components/ConfirmationModal";
import ContactDetails from "./pages/ContactDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { contactsData } from "./data/data";

const ContactList = ({ contacts, handleEditContact, onDeleteContact }) => {
  return (
    <div className="flex flex-wrap justify-center items-center">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="max-w-sm mx-4 my-4 bg-white rounded-lg shadow-lg"
        >
          <img
            src={contact.picture}
            alt={contact.name}
            className="w-full h-40 object-cover rounded-t-lg"
          />
          <div className="p-4">
            <label className="text-black">Name:</label>
            <h2 className="text-xl font-semibold mb-2 text-gray-600">
              {contact.name}
            </h2>
            <label className="text-black">Contact:</label>
            <p className="text-gray-600 mb-2">{contact.contact}</p>
            <label className="text-black">Email:</label>
            <p className="text-gray-600 mb-4">{contact.email}</p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <p
              className="text-black font-bold cursor-pointer"
              onClick={() => handleEditContact(contact)}
            >
              Details
            </p>
            <p
              className="text-white font-bold bg-red-600 p-2 rounded w-20 text-center cursor-pointer"
              onClick={() => onDeleteContact(contact)}
            >
              Delete
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

function App() {
  const [contacts, setContacts] = useState(contactsData);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts"));
    setContacts(storedContacts || contactsData);
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const handleAddContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const handleUpdateContact = (updatedContact) => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === updatedContact.id ? updatedContact : contact
    );

    setContacts(updatedContacts);

    localStorage.setItem("contacts", JSON.stringify(updatedContacts));

    setSelectedContact(null);
  };

  const handleEditContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleDeleteContact = (contact) => {
    const filteredContacts = contacts.filter((c) => c.id !== contact.id);
    setContacts(filteredContacts);
    setSelectedContact(null);
    setShowConfirmation(false);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen gap-10">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <ContactDetails contact={selectedContact} />
                <AddContact
                  contact={selectedContact}
                  onAddContact={handleAddContact}
                  onUpdateContact={handleUpdateContact}
                  contacts={contacts}
                />
                <ContactList
                  contacts={contacts}
                  handleEditContact={handleEditContact}
                  onDeleteContact={handleDeleteContact}
                />
                <ConfirmationModal
                  show={showConfirmation}
                  contact={selectedContact}
                  onCancel={() => setShowConfirmation(false)}
                  onConfirm={() => {
                    handleDeleteContact(selectedContact);
                    setShowConfirmation(false);
                  }}
                />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
