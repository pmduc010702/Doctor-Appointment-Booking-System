import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  if (!userData) return null;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4 sm:p-6 bg-white rounded shadow-sm text-sm">
      {/* Avatar + Name */}
      <div className="flex flex-col items-center mb-6">
        {isEdit ? (
          <label htmlFor="image" className="relative cursor-pointer group">
            <img
              className="w-32 h-32 rounded-full object-cover opacity-80 group-hover:opacity-100 transition"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="avatar"
            />
            {!image && (
              <img
                src={assets.upload_icon}
                alt="upload"
                className="w-8 absolute bottom-0 right-2 bg-white rounded-full"
              />
            )}
            <input
              id="image"
              type="file"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        ) : (
          <img
            className="w-32 h-32 rounded-full object-cover"
            src={userData.image}
            alt="avatar"
          />
        )}

        {isEdit ? (
          <input
            className="mt-4 text-xl font-semibold text-center border-b border-gray-300 focus:outline-none"
            value={userData.name}
            onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
          />
        ) : (
          <p className="text-xl font-semibold mt-4">{userData.name}</p>
        )}
      </div>

      <hr className="mb-4" />

      {/* Contact Information */}
      <section>
        <p className="text-gray-500 font-medium mb-2 underline">Contact Information</p>
        <div className="grid grid-cols-[120px_1fr] gap-y-3 text-gray-700">
          <span className="font-medium">Email:</span>
          <span className="text-blue-600">{userData.email}</span>

          <span className="font-medium">Phone:</span>
          {isEdit ? (
            <input
              className="bg-gray-50 border px-2 py-1"
              value={userData.phone}
              onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
            />
          ) : (
            <span>{userData.phone}</span>
          )}

          <span className="font-medium">Address:</span>
          {isEdit ? (
            <div className="flex flex-col gap-1">
              <input
                className="bg-gray-50 border px-2 py-1"
                value={userData.address.line1}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
              />
              <input
                className="bg-gray-50 border px-2 py-1"
                value={userData.address.line2}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
              />
            </div>
          ) : (
            <span>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </span>
          )}
        </div>
      </section>

      <hr className="my-6" />

      {/* Basic Information */}
      <section>
        <p className="text-gray-500 font-medium mb-2 underline">Basic Information</p>
        <div className="grid grid-cols-[120px_1fr] gap-y-3 text-gray-700">
          <span className="font-medium">Gender:</span>
          {isEdit ? (
            <select
              className="bg-gray-50 border px-2 py-1"
              value={userData.gender}
              onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
            >
              <option>Male</option>
              <option>Female</option>
            </select>
          ) : (
            <span>{userData.gender}</span>
          )}

          <span className="font-medium">Date of Birth:</span>
          {isEdit ? (
            <input
              type="date"
              className="bg-gray-50 border px-2 py-1"
              value={userData.dob}
              onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
            />
          ) : (
            <span>{userData.dob}</span>
          )}
        </div>
      </section>

      {/* Action Buttons */}
      <div className="mt-8 flex gap-4 justify-center">
        {isEdit ? (
          <>
            <button
              onClick={updateUserProfileData}
              className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-dark transition"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                setIsEdit(false);
                setImage(null);
                loadUserProfileData();
              }}
              className="text-gray-500 border px-6 py-2 rounded-full hover:bg-gray-100"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
