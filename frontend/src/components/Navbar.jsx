import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, userData } = useContext(AppContext);
    const [showMenu, setShowMenu] = useState(false);

    const logout = () => {
        setToken(false);
        localStorage.removeItem('token');
    };

    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-300 px-4 md:px-10'>
            {/* Logo */}
            <img
                onClick={() => navigate('/')}
                className='w-44 cursor-pointer'
                src={assets.logo}
                alt='Logo'
            />

            {/* Desktop Menu */}
            <ul className='hidden md:flex items-center gap-6 font-medium text-gray-700'>
                <NavLink to='/' className={({ isActive }) => isActive ? 'text-primary font-semibold' : ''}>
                    <li className='py-1 hover:text-primary transition-all'>HOME</li>
                </NavLink>
                <NavLink to='/doctors' className={({ isActive }) => isActive ? 'text-primary font-semibold' : ''}>
                    <li className='py-1 hover:text-primary transition-all'>ALL DOCTORS</li>
                </NavLink>
                <NavLink to='/about' className={({ isActive }) => isActive ? 'text-primary font-semibold' : ''}>
                    <li className='py-1 hover:text-primary transition-all'>ABOUT</li>
                </NavLink>
                <NavLink to='/contact' className={({ isActive }) => isActive ? 'text-primary font-semibold' : ''}>
                    <li className='py-1 hover:text-primary transition-all'>CONTACT</li>
                </NavLink>
            </ul>

            {/* Right Section */}
            <div className='flex items-center gap-4'>
                {token && userData ? (
                    <div className='relative group cursor-pointer'>
                        <div className='flex items-center gap-2'>
                            <img className='w-8 h-8 rounded-full object-cover' src={userData.image} alt='User avatar' />
                            <img className='w-2.5' src={assets.dropdown_icon} alt='Dropdown icon' />
                        </div>
                        {/* Dropdown */}
                        <div className='absolute top-12 right-0 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 z-20'>
                            <div className='min-w-48 bg-stone-100 rounded-lg shadow-lg p-4 flex flex-col gap-3 text-base font-medium text-gray-700'>
                                <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                                <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className='bg-primary text-white px-6 py-2.5 rounded-full font-medium hidden md:block hover:bg-primary-dark transition duration-300'
                    >
                        Create Account
                    </button>
                )}

                {/* Mobile Menu Icon */}
                <img
                    onClick={() => setShowMenu(true)}
                    className='w-6 h-6 md:hidden cursor-pointer'
                    src={assets.menu_icon}
                    alt='Menu'
                />
            </div>

            {/* Mobile Sidebar Menu */}
            <div className={`${showMenu ? 'fixed' : 'hidden'} inset-0 z-30 bg-white transition-all`}>
                <div className='flex items-center justify-between px-5 py-6 border-b border-gray-300'>
                    <img className='w-36' src={assets.logo} alt='Logo' />
                    <img
                        className='w-6 cursor-pointer'
                        src={assets.cross_icon}
                        onClick={() => setShowMenu(false)}
                        alt='Close menu'
                    />
                </div>
                <ul className='flex flex-col items-center gap-4 mt-6 text-lg font-medium text-gray-800'>
                    <NavLink to='/' onClick={() => setShowMenu(false)} className='hover:text-primary'>
                        HOME
                    </NavLink>
                    <NavLink to='/doctors' onClick={() => setShowMenu(false)} className='hover:text-primary'>
                        ALL DOCTORS
                    </NavLink>
                    <NavLink to='/about' onClick={() => setShowMenu(false)} className='hover:text-primary'>
                        ABOUT
                    </NavLink>
                    <NavLink to='/contact' onClick={() => setShowMenu(false)} className='hover:text-primary'>
                        CONTACT
                    </NavLink>

                    {!token && (
                        <button
                            onClick={() => {
                                setShowMenu(false)
                                navigate('/login')
                            }}
                            className="mt-4 text-primary border border-primary px-6 py-2 rounded-full"
                        >
                            Create Account
                        </button>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
