/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const AddContact = ({ contacts, contact, onAddContact, onUpdateContact }) => {
  const [name, setName] = useState(contact ? contact.name : "");
  const [contactNumber, setContactNumber] = useState(
    contact ? contact.contact : ""
  );
  const [email, setEmail] = useState(contact ? contact.email : "");
  const [picture, setPicture] = useState(contact ? contact.picture : "");
  const [isNameValid, setIsNameValid] = useState(true);
  const [isContactNumberValid, setIsContactNumberValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPictureValid, setIsPictureValid] = useState(true);
  const [isEmailUnique, setIsEmailUnique] = useState(true);

  useEffect(() => {
    console.log(contacts);
    // Set the form fields when editing an existing contact
    if (contact) {
      setName(contact.name);
      setContactNumber(contact.contact);
      setEmail(contact.email);
      setPicture(contact.picture);
    }
  }, [contact, contacts]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    const isNameValid = name.length > 5;
    const isContactNumberValid = /^\d{9}$/.test(contactNumber);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPictureValid = picture !== "";

    setIsNameValid(isNameValid);
    setIsContactNumberValid(isContactNumberValid);
    setIsEmailValid(isEmailValid);
    setIsPictureValid(isPictureValid);

    if (isNameValid && isContactNumberValid && isEmailValid && isPictureValid) {
      const isContactDuplicate = contacts.filter(
        (c) => c.contact === contactNumber
      ).length;
      const isEmailDuplicate = contacts.some((c) => c.email === email);

      setIsEmailUnique(!isEmailDuplicate);

      if ((!isContactDuplicate && !isEmailDuplicate) || contact) {
        const updatedContact = {
          id: contact ? contact.id : Date.now(),
          name,
          contact: contactNumber,
          email,
          picture: picture,
        };

        if (contact) {
          onUpdateContact(updatedContact);
        } else {
          onAddContact(updatedContact);
        }

        setName("");
        setContactNumber("");
        setEmail("");
        setPicture("");
        setIsNameValid(true);
        setIsContactNumberValid(true);
        setIsEmailValid(true);
        setIsPictureValid(true);
        setIsEmailUnique(true);
      }
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="AddContact">
      <h2 className="text-2xl font-bold mb-4">
        {contact ? "Edit Contact" : "Add New Contact"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name"
            required
            className={`w-full p-2 border ${
              isNameValid ? "border-gray-300" : "border-red-500"
            } rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black`}
          />
          {!isNameValid && (
            <p className="text-red-500 text-sm">
              Name must be at least 5 characters long.
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium">Contact Number:</label>
          <input
            type="tel"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder="Type your phone number"
            required
            className={`w-full p-2 border ${
              isContactNumberValid ? "border-gray-300" : "border-red-500"
            } rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black`}
          />
          {!isContactNumberValid && (
            <p className="text-red-500 text-sm">
              Contact number must be 9 digits long.
            </p>
          )}
        </div>
        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type your email"
            required
            className={`w-full p-2 border ${
              isEmailValid ? "border-gray-300" : "border-red-500"
            } rounded-md focus:outline-none focus:ring focus:border-blue-300 text-black`}
          />
          {!isEmailValid && (
            <p className="text-red-500 text-sm">
              Please enter a valid email address.
            </p>
          )}
          {!isEmailUnique && (
            <p className="text-red-500 text-sm">Email must be unique.</p>
          )}
        </div>
        <div>
          <label className="block font-medium">Picture:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePictureChange}
            required
            className={`w-full p-2 border ${
              isPictureValid ? "border-gray-300" : "border-red-500"
            } rounded-md focus:outline-none focus:ring focus:border-blue-300`}
          />
          {!isPictureValid && (
            <p className="text-red-500 text-sm">Please select a picture.</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          {contact ? "Update Contact" : "Save Contact"}
        </button>
      </form>
    </div>
  );
};

export default AddContact;
