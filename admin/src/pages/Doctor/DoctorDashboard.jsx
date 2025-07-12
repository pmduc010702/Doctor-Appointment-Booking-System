import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';

const DoctorDashboard = () => {
  const {
    dToken,
    dashData,
    setDashData,
    getDashData,
    completeAppointment,
    cancelAppointment,
  } = useContext(DoctorContext);

  const { currency, slotDateFormat } = useContext(AppContext);

  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  useEffect(() => {
    if (dashData?.latestAppointments) {
      if (filterDate) {
        const filtered = dashData.latestAppointments.filter((item) =>
          item.slotDate.startsWith(filterDate)
        );
        setFilteredAppointments(filtered);
      } else {
        setFilteredAppointments(dashData.latestAppointments);
      }
    }
  }, [dashData, filterDate]);

  // Tạo dữ liệu biểu đồ lượt khám
  const chartData = dashData?.latestAppointments?.reduce((acc, appt) => {
    const date = appt.slotDate.slice(0, 10); // YYYY-MM-DD
    const existing = acc.find((item) => item.date === date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []) || [];

  return dashData && (
    <div className="m-5">
      {/* Tổng quan */}
      <div className="flex flex-wrap gap-3">
        <div className="flex gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all">
          <img className="w-14" src={assets.earning_icon} />
          <div>
            <p className="text-xl font-semibold text-gray-600">
              {currency} {dashData.earnings}
            </p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>

        <div className="flex gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all">
          <img className="w-14" src={assets.appointments_icon} />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.appointments}</p>
            <p className="text-gray-400">Appointments</p>
          </div>
        </div>

        <div className="flex gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 hover:scale-105 transition-all">
          <img className="w-14" src={assets.patients_icon} />
          <div>
            <p className="text-xl font-semibold text-gray-600">{dashData.patients}</p>
            <p className="text-gray-400">Patients</p>
          </div>
        </div>
      </div>

      {/* Biểu đồ lượt khám */}
      <div className="bg-white mt-10 p-6 rounded border">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Appointments Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="date" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Danh sách booking */}
      <div className="bg-white mt-10 rounded border">
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <div className="flex items-center gap-2.5">
            <img src={assets.list_icon} />
            <p className="font-semibold">Latest Bookings</p>
          </div>
          <input
            type="date"
            className="border rounded px-2 py-1 text-sm"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        <div className="pt-4">
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                <img className="rounded-full w-10" src={item.userData.image} />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">{item.userData.name}</p>
                  <p className="text-gray-800">{slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">Cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">Completed</p>
                ) : (
                  <div className="flex gap-2">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-8 cursor-pointer"
                      src={assets.cancel_icon}
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-8 cursor-pointer"
                      src={assets.tick_icon}
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-sm text-gray-400 py-4">
              No appointments found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
