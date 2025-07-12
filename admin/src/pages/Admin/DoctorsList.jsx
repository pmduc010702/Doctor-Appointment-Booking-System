import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) getAllDoctors();
  }, [aToken]);

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 mt-6 overflow-hidden">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">All Doctors</h1>

      {/* Responsive grid: 2 cols on mobile, 3 on sm, 4 on md+ */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-[80vh] overflow-y-auto pr-1">
        {doctors.map((item, index) => (
          <div
            key={index}
            className="border border-indigo-100 rounded-xl overflow-hidden shadow-sm bg-white hover:shadow-md transition-all"
          >
            {/* Doctor Image */}
            <div className="bg-indigo-50 transition">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
            </div>

            {/* Doctor Info */}
            <div className="p-4 space-y-1">
              <p className="text-lg font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.speciality}</p>

              {/* Availability Toggle */}
              <label className="flex items-center gap-2 mt-2 text-sm cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={item.available}
                  onChange={() => changeAvailability(item._id)}
                  className="accent-indigo-500"
                />
                <span className="text-gray-700">Available</span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;
