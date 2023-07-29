/* eslint-disable react/prop-types */
const ConfirmationModal = ({ show, contact, onCancel, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="bg-black border border-gray-300 p-4 rounded-lg text-white">
        <h2 className="text-xl font-bold mb-4">Delete Contact</h2>
        <p>Are you sure you want to delete {contact.name}?</p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
