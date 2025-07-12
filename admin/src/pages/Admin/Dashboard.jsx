import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const Dashboard = () => {
  const { aToken, getDashData, cancelAppointment, dashData } = useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);

  useEffect(() => {
    if (aToken) getDashData();
  }, [aToken]);

  return dashData && (
    <div className="w-full px-4 sm:px-6 lg:px-10 mt-6 space-y-10">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <SummaryCard icon={assets.doctor_icon} title="Doctors" count={dashData.doctors} />
        <SummaryCard icon={assets.patients_icon} title="Patients" count={dashData.patients} />
        <SummaryCard icon={assets.appointments_icon} title="Appointments" count={dashData.appointments} />
      </div>

      {/* Latest Bookings */}
      <div className="bg-white border rounded-lg shadow-sm">
        <div className="flex items-center gap-3 p-4 border-b bg-gray-50">
          <img src={assets.list_icon} alt="List Icon" className="w-5 h-5" />
          <h3 className="font-semibold text-gray-800">Latest Bookings</h3>
        </div>

        {/* Scrollable Section */}
        <div className="divide-y max-h-[260px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
            >
              {/* Doctor Info */}
              <div className="flex items-center gap-4">
                <img
                  className="w-10 h-10 rounded-full object-cover bg-gray-100"
                  src={item.docData.image}
                  alt={item.docData.name}
                />
                <div className="text-sm">
                  <p className="font-medium text-gray-800">{item.docData.name}</p>
                  <p className="text-gray-500 text-xs">{slotDateFormat(item.slotDate)}</p>
                </div>
              </div>

              {/* Status */}
              <div className="w-[120px] flex-shrink-0 flex items-center gap-2 justify-end">
                {item.cancelled ? (
                  <span className="w-full text-center text-xs font-semibold text-red-500 border border-red-500 px-2 py-1 rounded bg-red-50">
                    Cancelled
                  </span>
                ) : item.isCompleted ? (
                  <span className="w-full text-center text-xs font-semibold text-green-600 border border-green-500 px-2 py-1 rounded bg-green-50">
                    Completed
                  </span>
                ) : (
                  <>
                    <span className="w-full text-center text-xs font-medium text-gray-600 border border-gray-400 px-2 py-1 rounded bg-gray-100">
                      Pending
                    </span>
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-5 h-5 cursor-pointer hover:scale-110 transition"
                      src={assets.cancel_icon}
                      alt="Cancel"
                    />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ✅ SummaryCard Component
const SummaryCard = ({ icon, title, count }) => (
  <div className="bg-white shadow-sm border rounded-lg p-6 flex items-center gap-4 hover:shadow-md transition">
    <img className="w-12 h-12" src={icon} alt={`${title} Icon`} />
    <div>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
      <p className="text-gray-500 text-sm">{title}</p>
    </div>
  </div>
);

export default Dashboard;
