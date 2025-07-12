import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div
            className="flex flex-col items-center gap-6 py-16 text-gray-800"
            id="speciality"
        >
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-semibold text-center">
                Explore Medical Specialties
            </h2>

            {/* Subtitle */}
            <p className="text-sm text-gray-600 text-center max-w-xl">
                Choose from a wide range of specialties to find the most suitable doctor for your health needs.
            </p>

            {/* Scrollable Icons */}
            <div className="flex w-full gap-6 pt-6 overflow-x-auto px-4 sm:justify-center scrollbar-hide">
                {specialityData.map((item, index) => (
                    <Link
                        key={index}
                        to={`/doctors/${item.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        className="flex flex-col items-center text-center text-sm cursor-pointer flex-shrink-0 transition-transform duration-300 hover:-translate-y-2 hover:text-primary"
                    >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white shadow-md flex items-center justify-center mb-2 hover:shadow-xl transition-shadow duration-300">
                            <img
                                src={item.image}
                                alt={item.speciality}
                                className="w-12 sm:w-16 object-contain"
                            />
                        </div>
                        <p className="font-medium">{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu
