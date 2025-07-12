import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className="bg-primary rounded-2xl px-6 md:px-10 lg:px-20 py-10 md:py-16 flex flex-col md:flex-row items-center gap-10">

            {/* Left Side */}
            <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 text-white">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug">
                    Your Health, <br /> Our Priority
                </h1>

                <div className="flex items-center gap-4">
                    <img className="w-24 sm:w-32" src={assets.group_profiles} alt="Trusted Doctors" />
                    <p className="text-sm sm:text-base font-light">
                        Connect with certified, experienced doctors <br className="hidden sm:block" />
                        and book your appointments in just a few clicks.
                    </p>
                </div>

                <a
                    href="#speciality"
                    className="mt-4 inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:scale-105 transition-transform duration-300"
                >
                    Get Started
                    <img className="w-4" src={assets.arrow_icon} alt="Arrow" />
                </a>
            </div>

            {/* Right Side */}
            <div className="md:w-1/2 relative">
                <img
                    className="w-full h-auto object-cover rounded-xl shadow-lg"
                    src={assets.header_img}
                    alt="Online Doctor Consultation"
                />
            </div>
        </div>
    )
}

export default Header
