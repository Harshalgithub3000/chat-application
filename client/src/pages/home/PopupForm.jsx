import React, { useState } from "react";
import { useSelector } from "react-redux";

const PopupForm = ({ isOpen, onClose, userDetails, onUpdate }) => {
  const {buttonLoading} = useSelector((state)=>state.user)

  const [formData, setFormData] = useState({
    fullName: userDetails?.fullName || "",
    username: userDetails?.username || "",
    avatar: userDetails?.avatar || null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, "avatar": e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(formData);
    onClose(); // Close popup after saving
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-50 z-10"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 p-6 rounded-lg shadow-lg w-80"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <h3 className="text-lg font-bold mb-4">Edit Profile</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm">Full Name</span>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm">Username</span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm">Avatar</span>
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-2 border rounded"
            />
          </label>

          <div className="flex justify-between gap-2 mt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-600 text-white rounded"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-800 text-white rounded"
            >
              {buttonLoading ? <> <span className="loading loading-spinner loading-xs"></span> Please wait...</>:"Update Profile"}
            
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupForm;
