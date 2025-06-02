import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'


const TopDoctors = () => {
    const navigate = useNavigate()
    const { doctors } = useContext(AppContext)

    return (
        <div className="flex flex-col items-center gap-6 my-20 text-gray-900 px-4 md:px-10 lg:px-20">
            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-semibold text-center">
                Top Doctors to Book
            </h2>
            <p className="text-center text-gray-600 max-w-xl text-sm">
                Simply browse through our extensive list of trusted doctors and book your appointment with ease.
            </p>

            {/* Doctors List */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
                {doctors.slice(0, 8).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            navigate(`/appointment/${item._id}`)
                            scrollTo(0, 0)
                        }}
                        className="group bg-white shadow hover:shadow-lg border border-gray-200 rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-2"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-56 object-cover bg-blue-50"
                        />
                        <div className="p-4 flex flex-col gap-1">
                            <div className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                <span>{item.available ? 'Available' : 'Not Available'}</span>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* More Button */}
            <button
                onClick={() => {
                    navigate('/doctors')
                    scrollTo(0, 0)
                }}
                className="mt-10 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-12 py-3 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            >
                View More Doctors
            </button>

        </div>
    )
}

export default TopDoctors
