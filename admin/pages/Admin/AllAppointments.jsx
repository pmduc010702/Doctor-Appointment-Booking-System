import React from 'react'
import { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';


const AllAppointments = () => {

  const { aToken, appointments, getAllAppointments, cancelAppointment, backendUrl } = useContext(AdminContext);
  const { calculateAge, slotDateFormat, currency, formatSlotTime } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      console.log("🔄 Fetching appointments...");
      getAllAppointments();
    }
  }, [aToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-auto'>
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr_1fr_1fr] py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
      </div>
      {
        appointments.map((item, index) => (
          <div 
            className='flex flex-wrap sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50'
            key={item._id}
          >
            <p className='hidden sm:block'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img
                className='w-8 rounded-full'
                src={item.userData.image || 'default_image_url'}
                alt={item.userData.name || 'Patient'}
              />
              <p>{item.userData.name || 'Unknown Patient'}</p>
            </div>
            <p className='hidden sm:block'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)} , {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img
                className='w-8 rounded-full bg-gray-200'
                src={item.docData?.image || 'default_image_url'}
                alt={item.docData?.name || 'Doctor'}
              />
              <p>{item.docData?.name || 'Unknown Doctor'}</p>
            </div>
            <p>{currency} {Number.isFinite(item.amount) ? item.amount : 'N/A'}</p>
            {
              item.cancelled 
                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                : <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} />
            }
          </div>
          
        ))
      }
    </div>
  )
}

export default AllAppointments