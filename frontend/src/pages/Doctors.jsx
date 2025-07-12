import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const navigate = useNavigate()
  const { speciality } = useParams()
  const { doctors } = useContext(AppContext)

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [showAvailableOnly, setShowAvailableOnly] = useState(false)

  const applyFilter = () => {
    if (!doctors) return

    const filtered = doctors.filter(doc => {
      const matchSpeciality = speciality
        ? doc.speciality.toLowerCase() === speciality.toLowerCase()
        : true
      const matchSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchAvailability = showAvailableOnly ? doc.available : true
      return matchSpeciality && matchSearch && matchAvailability
    })

    setFilterDoc(filtered)
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality, searchTerm, showAvailableOnly])

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
        Browse Doctors by Specialization
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by doctor's name..."
          className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        />

        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={showAvailableOnly}
            onChange={() => setShowAvailableOnly(!showAvailableOnly)}
            className="accent-primary"
          />
          Show available doctors only
        </label>
      </div>

      <button
        className={`py-2 px-4 border rounded-md text-sm font-medium transition-all sm:hidden ${showFilter ? 'text-white' : 'bg-white text-gray-700 border-gray-300'}`}
        style={
          showFilter
            ? { backgroundColor: 'var(--color-primary)', borderColor: 'var(--color-primary)' }
            : {}
        }
        onClick={() => setShowFilter(prev => !prev)}
        aria-expanded={showFilter}
        aria-label="Toggle filters"
      >
        {showFilter ? 'Hide Specialities' : 'Filter by Speciality'}
      </button>

      <div className={`text-sm text-gray-600 w-full sm:w-auto ${showFilter ? 'block' : 'hidden'} sm:block`}>
        <div className="flex flex-wrap gap-2 py-2">
          {specialties.map(spec => (
            <button
              key={spec}
              onClick={() => (speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`))}
              className={`px-4 py-1.5 rounded-full border text-sm transition-all duration-300 ${speciality === spec ? 'text-white bg-primary border-primary' : 'bg-white text-gray-700 border-gray-300 hover:bg-indigo-100 hover:text-indigo-700'}`}
              aria-pressed={speciality === spec}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-4 mt-2">
        Showing {filterDoc.length} doctor{filterDoc.length !== 1 ? 's' : ''}
      </p>

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
              className="w-full h-48 sm:h-40 object-contain bg-primary"
              src={item.image}
              alt={item.name}
              loading="lazy"
            />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm ${item.available ? 'text-green-600' : 'text-gray-400'}`}
              >
                <span className={`w-3 h-3 ${item.available ? 'bg-green-600' : 'bg-gray-400'} rounded-full`}></span>
                <p className="select-none">
                  {item.available ? 'Available Now' : 'Currently Unavailable'}
                </p>
              </div>
              <p className="text-gray-900 text-lg font-semibold mt-1">{item.name}</p>
              <p className="text-gray-600 text-sm mt-0.5">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Doctors
