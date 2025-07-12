import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const AllAppointments = () => {
  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelAppointment,
  } = useContext(AdminContext);

  const {
    calculateAge,
    slotDateFormat,
    currency,
    formatSlotTime,
  } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      console.log('🔄 Fetching appointments...');
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <p className="mb-4 text-xl font-semibold">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-auto">
        {/* Desktop Header */}
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] py-3 px-6 bg-gray-100 font-medium text-gray-700 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p className="text-center">Actions</p>
        </div>

        {/* Appointment Rows */}
        {appointments.length > 0 ? (
          appointments
            .slice() // avoid mutating original
            .reverse()
            .map((item, index) => (
              <div
                key={item._id}
                className="border-b px-4 py-4 sm:px-6 sm:py-3 hover:bg-gray-50 transition"
              >
                {/* Desktop View */}
                <div className="hidden sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center text-gray-600">
                  <p>{index + 1}</p>

                  <div className="flex items-center gap-2">
                    <img
                      className="w-8 h-8 object-cover rounded-full bg-gray-200"
                      src={item.userData?.image || assets.default_user}
                      alt={item.userData?.name || 'Patient'}
                    />
                    <p>{item.userData?.name || 'Unknown Patient'}</p>
                  </div>

                  <p>{item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}</p>

                  <p>
                    {slotDateFormat(item.slotDate)}, {formatSlotTime?.(item.slotTime) || item.slotTime}
                  </p>

                  <div className="flex items-center gap-2">
                    <img
                      className="w-8 h-8 object-cover rounded-full bg-gray-200"
                      src={item.docData?.image || assets.default_user}
                      alt={item.docData?.name || 'Doctor'}
                    />
                    <p>{item.docData?.name || 'Unknown Doctor'}</p>
                  </div>

                  <p>
                    {currency} {Number.isFinite(item.amount) ? item.amount : 'N/A'}
                  </p>

                  <div className="flex justify-center">
                    {item.cancelled ? (
                      <p className="text-red-500 text-xs font-medium">Cancelled</p>
                    ) : item.isCompleted ? (
                      <p className="text-green-600 text-xs font-medium">Completed</p>
                    ) : (
                      <img
                        onClick={() =>
                          window.confirm('Are you sure to cancel this appointment?') &&
                          cancelAppointment(item._id)
                        }
                        className="w-6 cursor-pointer hover:scale-110 transition"
                        src={assets.cancel_icon}
                        alt="Cancel"
                        title="Cancel appointment"
                      />
                    )}
                  </div>
                </div>

                {/* Mobile View */}
                <div className="sm:hidden flex flex-col gap-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-9 h-9 object-cover rounded-full bg-gray-200"
                      src={item.userData?.image || assets.default_user}
                      alt="Patient"
                    />
                    <div>
                      <p className="font-semibold">{item.userData?.name || 'Unknown Patient'}</p>
                      <p className="text-xs text-gray-500">
                        Age: {item.userData?.dob ? calculateAge(item.userData.dob) : 'N/A'}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm">
                    <span className="font-medium">Date:</span> {slotDateFormat(item.slotDate)}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Time:</span> {formatSlotTime?.(item.slotTime) || item.slotTime}
                  </p>

                  <div className="flex items-center gap-2">
                    <img
                      className="w-8 h-8 object-cover rounded-full bg-gray-200"
                      src={item.docData?.image || assets.default_user}
                      alt="Doctor"
                    />
                    <p className="text-sm">{item.docData?.name || 'Unknown Doctor'}</p>
                  </div>

                  <p className="text-sm">
                    <span className="font-medium">Fees:</span> {currency} {item.amount}
                  </p>

                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm font-medium">
                      Status:{' '}
                      {item.cancelled ? (
                        <span className="text-red-500">Cancelled</span>
                      ) : item.isCompleted ? (
                        <span className="text-green-600">Completed</span>
                      ) : (
                        <span className="text-gray-600">Upcoming</span>
                      )}
                    </p>
                    {!item.cancelled && !item.isCompleted && (
                      <img
                        onClick={() =>
                          window.confirm('Cancel this appointment?') && cancelAppointment(item._id)
                        }
                        className="w-6 h-6 cursor-pointer hover:scale-110 transition"
                        src={assets.cancel_icon}
                        alt="Cancel"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="py-10 text-center text-gray-500">No Appointments Found</div>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
