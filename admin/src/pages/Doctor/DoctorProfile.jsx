import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext);
  const { currency } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
      };

      const { data } = await axios.post(
        backendUrl + '/api/doctor/update-profile',
        updateData,
        { headers: { dToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="p-5 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <img
              className="w-full max-w-xs rounded-lg border"
              src={profileData.image}
              alt="Doctor"
            />
          </div>

          {/* Doctor Info */}
          <div className="flex-1 border border-stone-200 rounded-lg p-6 bg-white shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700">{profileData.name}</h2>

            <div className="flex flex-wrap items-center gap-2 mt-1 text-gray-600">
              <span>{profileData.degree} - {profileData.speciality}</span>
              <span className="px-2 py-0.5 border text-xs rounded-full">{profileData.experience} years</span>
            </div>

            {/* About */}
            <div className="mt-4">
              <p className="text-sm font-medium text-neutral-800 mb-1">About</p>
              <p className="text-sm text-gray-600 max-w-[700px]">
                {profileData.about || 'No information provided'}
              </p>
            </div>

            {/* Fees */}
            <div className="mt-4 text-sm text-gray-700">
              <span className="font-medium">Appointment Fee:</span>{' '}
              {isEdit ? (
                <input
                  type="number"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                  }
                  className="border px-2 py-0.5 rounded w-24 ml-2"
                />
              ) : (
                <span className="ml-1">{currency} {profileData.fees}</span>
              )}
            </div>

            {/* Address */}
            <div className="mt-4 text-sm text-gray-700">
              <span className="font-medium">Address:</span>
              <div className="mt-1">
                {isEdit ? (
                  <>
                    <input
                      type="text"
                      value={profileData.address.line1}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line1: e.target.value },
                        }))
                      }
                      className="border px-2 py-1 mb-2 w-full rounded"
                      placeholder="Line 1"
                    />
                    <input
                      type="text"
                      value={profileData.address.line2}
                      onChange={(e) =>
                        setProfileData((prev) => ({
                          ...prev,
                          address: { ...prev.address, line2: e.target.value },
                        }))
                      }
                      className="border px-2 py-1 w-full rounded"
                      placeholder="Line 2"
                    />
                  </>
                ) : (
                  <>
                    <p>{profileData.address.line1}</p>
                    <p>{profileData.address.line2}</p>
                  </>
                )}
              </div>
            </div>

            {/* Available Checkbox */}
            <div className="mt-4 flex items-center gap-2 text-sm text-gray-700">
              <input
                id="available"
                type="checkbox"
                checked={profileData.available}
                onChange={() =>
                  isEdit &&
                  setProfileData((prev) => ({
                    ...prev,
                    available: !prev.available,
                  }))
                }
              />
              <label htmlFor="available">Available</label>
            </div>

            {/* Buttons */}
            <div className="mt-6">
              {isEdit ? (
                <button
                  onClick={updateProfile}
                  className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary/90 transition"
                >
                  Save Information
                </button>
              ) : (
                <button
                  onClick={() => setIsEdit(true)}
                  className="border border-primary text-primary px-4 py-2 rounded-full text-sm hover:bg-primary hover:text-white transition"
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
