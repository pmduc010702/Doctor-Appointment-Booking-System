import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { backendUrl, token, getDoctorsData } = useContext(AppContext);
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);

  const months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const formatSlotDate = (slotDate) => {
    const [day, month, year] = slotDate.split('_');
    return `${day} ${months[Number(month)]} ${year}`;
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/appointments`, {
        headers: { token },
      });
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancel-appointment`,
        { appointmentId },
        { headers: { token } }
      );
      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  const payOnline = async (appointment) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/payment/create-checkout-session`,
        {
          amount: appointment.amount,
          userId: appointment.userId,
          appointmentId: appointment._id,
          userEmail: appointment.userData?.email || 'test@example.com',
        },
        { headers: { token } }
      );
      if (data.success) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
      toast.error('Payment failed');
    }
  };

  useEffect(() => {
    if (token) getUserAppointments();
  }, [token]);

  return (
    <div className="px-4 md:px-8 lg:px-12 mt-10 mb-20">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">You have no appointments yet.</p>
      ) : (
        <div className="space-y-6">
          {appointments.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 sm:p-6 flex flex-col sm:flex-row gap-6"
            >
              {/* Doctor Image */}
              <div className="flex-shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-md overflow-hidden bg-indigo-50">
                <img
                  src={item.docData.image}
                  alt={item.docData.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Doctor Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item.docData.name}</h3>
                <p className="text-sm text-gray-600">{item.docData.speciality}</p>

                <div className="mt-2 text-sm text-gray-700">
                  <p className="font-medium">Address:</p>
                  <p className="text-xs">{item.docData.address?.line1}</p>
                  <p className="text-xs">{item.docData.address?.line2}</p>
                </div>

                <p className="mt-3 text-sm text-gray-700">
                  <span className="font-medium">Date & Time:</span>{' '}
                  {formatSlotDate(item.slotDate)} | {item.slotTime}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col justify-end gap-3">
                {item.payment && !item.cancelled && (
                  <span className="text-sm text-green-600 border border-green-600 px-4 py-2 rounded text-center bg-green-50 cursor-default">
                    Payment Confirmed
                  </span>
                )}

                {!item.cancelled && !item.payment && !item.isCompleted && (
                  <button
                    onClick={() => payOnline(item)}
                    className="text-sm text-indigo-600 border border-indigo-500 px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition-all duration-200"
                  >
                    Pay Online
                  </button>
                )}

                {!item.cancelled && !item.isCompleted && (
                  <button
                    onClick={() => cancelAppointment(item._id)}
                    className="text-sm text-red-500 border border-red-500 px-4 py-2 rounded hover:bg-red-600 hover:text-white transition-all duration-200"
                  >
                    Cancel Appointment
                  </button>
                )}

                {item.cancelled && !item.isCompleted && (
                  <span className="text-sm border border-red-500 px-4 py-2 rounded text-red-500 bg-red-50 text-center cursor-default">
                    Appointment Cancelled
                  </span>
                )}

                {item.isCompleted && (
                  <span className="text-sm border border-blue-500 px-4 py-2 rounded text-blue-500 bg-blue-50 text-center cursor-default">
                    Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;
