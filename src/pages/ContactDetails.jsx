/* eslint-disable react/prop-types */
const ContactDetails = ({ contact }) => {
  if (!contact) {
    return null;
  }
  return (
    <div className="ContactDetails p-4 border rounded-lg bg-black">
      <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
      {contact ? (
        <div className="text-white">
          <p>
            <strong>Name:</strong> {contact.name}
          </p>
          <p>
            <strong>Email:</strong> {contact.email}
          </p>
          <p>
            <strong>Phone:</strong> {contact.contact}
          </p>
        </div>
      ) : (
        <p>No contact selected.</p>
      )}
    </div>
  );
};

export default ContactDetails;
