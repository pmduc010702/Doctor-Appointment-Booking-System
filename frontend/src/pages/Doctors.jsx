import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Doctors = () => {
  const navigate = useNavigate()
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (!doctors) return
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality.toLowerCase() === speciality.toLowerCase()))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  const specialties = [
    'General physician',
    'Gynecologist',
    'Dermatologist',
    'Pediatricians',
    'Neurologist',
    'Gastroenterologist',
  ]

  return (
    <div className="px-4 md:px-8 lg:px-12">
      <p className="text-gray-600 mb-4 text-center md:text-left text-base md:text-lg font-semibold">
        Browse through the doctors specialist.
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">

        {/* Filter Button for mobile */}
        <button
          className={`py-2 px-4 border rounded-md text-sm font-medium transition-all sm:hidden ${showFilter ? 'text-white' : 'bg-white text-gray-700 border-gray-300'
            }`}
          style={showFilter ? { backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)' } : {}}
          onClick={() => setShowFilter(prev => !prev)}
          aria-expanded={showFilter}
          aria-label="Toggle filters"
        >
          {showFilter ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Filters */}
        <div
          className={`text-sm text-gray-600 w-full sm:w-auto
            ${showFilter ? 'block' : 'hidden'} sm:block
          `}
        >
          {/* Scroll container trên mobile */}
          <div className="flex sm:flex-col overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 gap-3 px-1 sm:px-0 py-2 sm:py-0">
            {specialties.map(spec => (
              <button
                key={spec}
                onClick={() => (speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`))}
                className={`flex-shrink-0 whitespace-nowrap px-4 py-2 rounded-full border transition-colors duration-300 ${speciality === spec ? 'text-white shadow-md' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-100 hover:text-indigo-700'
                  }`}
                style={
                  speciality === spec
                    ? { backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)' }
                    : {}
                }
                aria-pressed={speciality === spec}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-8">
          {filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-gray-300 rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-2 transform transition-all duration-300"
              role="button"
              tabIndex={0}
              onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate(`/appointment/${item._id}`)}
            >
              <img
                className="w-full h-48 sm:h-40 object-contain"
                style={{ backgroundColor: 'var(--color-primary)'}}
                src={item.image}
                alt={item.name}
                loading="lazy"
              />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-600' : 'text-gray-400'
                    }`}
                >
                  <span
                    className={`w-3 h-3 ${item.available ? 'bg-green-600' : 'bg-gray-400'
                      } rounded-full inline-block`}
                  ></span>
                  <p className="select-none">{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p className="text-gray-900 text-lg font-semibold mt-1">{item.name}</p>
                <p className="text-gray-600 text-sm mt-0.5">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
