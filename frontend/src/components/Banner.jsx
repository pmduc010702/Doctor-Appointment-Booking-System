import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-col md:flex-row bg-primary rounded-2xl overflow-hidden px-6 sm:px-10 md:px-14 lg:px-20 py-10 my-20 mx-4 md:mx-10 items-center">
            {/* Left Side */}
            <div className="flex-1 text-center md:text-left mb-6 md:mb-0">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-white leading-snug">
                    Your Health, <br />
                    <span className="mt-2 block">Our Trusted Doctors Are Here</span>
                </h2>
                <button
                    onClick={() => {
                        navigate('/login')
                        scrollTo(0, 0)
                    }}
                    className="bg-white text-primary font-medium text-sm sm:text-base px-8 py-3 rounded-full mt-6 hover:bg-gray-100 transition-all duration-300"
                >
                    Get Started
                </button>
            </div>

            {/* Right Side */}
            <div className="w-full md:w-[45%] lg:w-[400px]">
                <img
                    src={assets.appointment_img}
                    alt="appointment"
                    className="w-full h-auto object-contain"
                />
            </div>
        </div>
    )
}

export default Banner
