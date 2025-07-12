import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { assets } from '../assets/assets';
import { X } from 'lucide-react';

const Sidebar = ({ show, onClose }) => {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorContext);

    const adminMenu = [
        { path: '/admin-dashboard', label: 'Dashboard', icon: assets.home_icon },
        { path: '/all-appointments', label: 'Appointments', icon: assets.appointment_icon },
        { path: '/add-doctor', label: 'Add Doctor', icon: assets.add_icon },
        { path: '/doctor-list', label: 'Doctors List', icon: assets.people_icon },
    ];

    const doctorMenu = [
        { path: '/doctor-dashboard', label: 'Dashboard', icon: assets.home_icon },
        { path: '/doctor-appointments', label: 'Appointments', icon: assets.appointment_icon },
        { path: '/doctor-profile', label: 'Profile', icon: assets.people_icon },
    ];

    const menuItems = aToken ? adminMenu : dToken ? doctorMenu : [];

    return (
        <aside className={`bg-white border-r w-64 md:block ${show ? 'fixed inset-0 z-40 block' : 'hidden'} md:relative`}>
            <div className='flex justify-between items-center p-4 md:hidden'>
                <p className='font-semibold text-gray-600'>Menu</p>
                <button onClick={onClose}><X className='w-5 h-5 text-gray-600' /></button>
            </div>
            <nav className='p-4'>
                <ul className='space-y-2'>
                    {menuItems.map(({ path, label, icon }) => (
                        <NavLink
                            key={path}
                            to={path}
                            onClick={onClose}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 hover:bg-gray-100
                ${isActive ? 'bg-[#F2F3FF] border-r-4 border-primary' : ''}`
                            }
                        >
                            <img src={icon} alt={`${label} icon`} className='w-5 h-5' />
                            <span className='text-sm'>{label}</span>
                        </NavLink>
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
