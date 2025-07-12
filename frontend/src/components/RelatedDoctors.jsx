import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
    const { doctors } = useContext(AppContext)
    const navigate = useNavigate()

    const [relDoc, setRelDocs] = useState([])

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter(
                (doc) => doc.speciality === speciality && doc._id !== docId
            )
            setRelDocs(doctorsData)
        }
    }, [doctors, speciality, docId])

    return (
        <div className='flex flex-col items-center gap-4 my-20 px-4 md:px-10 text-gray-900'>
            {/* Title */}
            <h2 className='text-3xl font-semibold'>Related Doctors</h2>
            <p className='sm:w-2/3 lg:w-1/2 text-center text-sm text-gray-600'>
                Discover more doctors from the same specialty that may fit your needs.
            </p>

            {/* Doctor Cards */}
            <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'>
                {relDoc.slice(0, 5).map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            navigate(`/appointment/${item._id}`)
                            scrollTo(0, 0)
                        }}
                        className='bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all cursor-pointer overflow-hidden'
                    >
                        <img
                            className='w-full h-40 object-contain bg-blue-50 p-2'
                            src={item.image}
                            alt={item.name}
                        />
                        <div className='p-4'>
                            {/* Availability */}
                            <div
                                className={`flex items-center gap-2 text-sm mb-2 ${item.available ? 'text-green-600' : 'text-gray-400'
                                    }`}
                            >
                                <span
                                    className={`w-3 h-3 rounded-full inline-block ${item.available ? 'bg-green-600' : 'bg-gray-400'
                                        }`}
                                ></span>
                                <p>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-semibold'>{item.name}</p>
                            <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* More Button */}
            {relDoc.length > 0 && (
                <button
                    onClick={() => {
                        navigate('/doctors')
                        scrollTo(0, 0)
                    }}
                    className='bg-blue-50 text-gray-700 border border-gray-300 px-10 py-2.5 rounded-full mt-10 hover:bg-blue-100 transition'
                >
                    View All Doctors
                </button>
            )}
        </div>
    )
}

export default RelatedDoctors
