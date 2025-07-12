import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar = ({ onMenuClick }) => {
    const { aToken, setAToken } = useContext(AdminContext);
    const { dToken, setDToken } = useContext(DoctorContext);
    const navigate = useNavigate();

    const logout = () => {
        navigate('/');
        if (aToken) {
            setAToken('');
            localStorage.removeItem('aToken');
        }
        if (dToken) {
            setDToken('');
            localStorage.removeItem('dToken');
        }
    };

    return (
        <header className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white sticky top-0 z-50'>
            <div className='flex items-center gap-2 text-xs'>
                <button className='block md:hidden mr-2' onClick={onMenuClick}>
                    <Menu className='w-6 h-6 text-gray-600' />
                </button>
                <img className='w-28 sm:w-40 cursor-pointer' src={assets.logo} alt='Logo' />
                <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>
                    {aToken ? 'Admin' : 'Doctor'}
                </p>
            </div>
            <button
                onClick={logout}
                className='bg-primary text-white text-sm px-6 sm:px-10 py-2 rounded-full'
            >
                Logout
            </button>
        </header>
    );
};

export default Navbar;