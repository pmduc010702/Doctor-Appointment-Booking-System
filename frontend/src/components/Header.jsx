import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className="bg-primary rounded-2xl px-6 md:px-10 lg:px-20 py-10 md:py-16 flex flex-col md:flex-row items-center gap-10">

            {/* Left Side */}
            <div className="md:w-1/2 flex flex-col items-start justify-center gap-6 text-white">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug">
                    Book Appointment <br /> With Trusted Doctors
                </h1>

                <div className="flex items-center gap-4">
                    <img className="w-24 sm:w-32" src={assets.group_profiles} alt="Group Profiles" />
                    <p className="text-sm sm:text-base font-light">
                        Simply browse our extensive list of trusted <br className="hidden sm:block" />
                        doctors and schedule your appointment hassle-free.
                    </p>
                </div>

                <a
                    href="#speciality"
                    className="mt-4 inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full text-sm font-semibold shadow-md hover:scale-105 transition-transform duration-300"
                >
                    Book Appointment
                    <img className="w-4" src={assets.arrow_icon} alt="Arrow" />
                </a>
            </div>

            {/* Right Side */}
            <div className="md:w-1/2 relative">
                <img
                    className="w-full h-auto object-cover rounded-xl shadow-lg"
                    src={assets.header_img}
                    alt="Doctor Appointment"
                />
            </div>
        </div>
    )
}

export default Header
