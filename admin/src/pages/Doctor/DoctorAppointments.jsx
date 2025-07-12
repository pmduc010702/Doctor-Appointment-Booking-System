import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext);

  useEffect(() => {
    if (dToken) getAppointments();
  }, [dToken]);

  return (
    <div className="p-5 max-w-7xl w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Doctor Appointments</h2>

      {/* ===== Desktop View ===== */}
      <div className="hidden md:block overflow-x-auto bg-white border rounded-md shadow-sm">
        <table className="min-w-[900px] w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 border-b">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Patient</th>
              <th className="px-4 py-3">Payment</th>
              <th className="px-4 py-3">Age</th>
              <th className="px-4 py-3">Date & Time</th>
              <th className="px-4 py-3">Fees</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {[...appointments].reverse().map((item, index) => (
              <tr key={item._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3 flex items-center gap-2">
                  <img src={item.userData.image} alt="user" className="w-8 h-8 rounded-full object-cover" />
                  <span>{item.userData.name}</span>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 text-xs rounded-full ${item.payment ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {item.payment ? 'Online' : 'Cash'}
                  </span>
                </td>
                <td className="px-4 py-3">{calculateAge(item.userData.dob)}</td>
                <td className="px-4 py-3">
                  {slotDateFormat(item.slotDate)}, {item.slotTime}
                </td>
                <td className="px-4 py-3">{currency} {item.amount}</td>
                <td className="px-4 py-3">
                  {item.cancelled ? (
                    <span className="text-red-500 font-medium text-xs">Cancelled</span>
                  ) : item.isCompleted ? (
                    <span className="text-green-500 font-medium text-xs">Completed</span>
                  ) : (
                    <div className="flex gap-2">
                      <img
                        onClick={() => cancelAppointment(item._id)}
                        src={assets.cancel_icon}
                        alt="Cancel"
                        className="w-6 cursor-pointer"
                      />
                      <img
                        onClick={() => completeAppointment(item._id)}
                        src={assets.tick_icon}
                        alt="Complete"
                        className="w-6 cursor-pointer"
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {appointments.length === 0 && (
          <p className="text-center text-gray-400 text-sm py-6">No appointments available</p>
        )}
      </div>

      {/* ===== Mobile View ===== */}
      <div className="block md:hidden space-y-4">
        {[...appointments].reverse().map((item) => (
          <div key={item._id} className="bg-white rounded border shadow-sm p-4 relative">
            <div className="flex items-center gap-3 mb-3">
              <img className="w-10 h-10 rounded-full object-cover" src={item.userData.image} alt="User" />
              <div>
                <p className="font-semibold">{item.userData.name}</p>
                <p className="text-gray-500 text-sm">Age: {calculateAge(item.userData.dob)}</p>
              </div>
            </div>

            <p><span className="font-semibold">Date:</span> {slotDateFormat(item.slotDate)}</p>
            <p><span className="font-semibold">Time:</span> {item.slotTime}</p>
            <p><span className="font-semibold">Fees:</span> {currency} {item.amount}</p>

            <p className="mt-1">
              <span className="font-semibold">Status:</span>{" "}
              {item.cancelled ? (
                <span className="text-red-500">Cancelled</span>
              ) : item.isCompleted ? (
                <span className="text-green-500">Completed</span>
              ) : (
                <span className="text-blue-500">Upcoming</span>
              )}
            </p>

            {!item.cancelled && !item.isCompleted && (
              <div className="absolute right-3 bottom-3 flex gap-2">
                <img
                  onClick={() => cancelAppointment(item._id)}
                  className="w-8 cursor-pointer"
                  src={assets.cancel_icon}
                  alt="Cancel"
                />
                <img
                  onClick={() => completeAppointment(item._id)}
                  className="w-8 cursor-pointer"
                  src={assets.tick_icon}
                  alt="Complete"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;
