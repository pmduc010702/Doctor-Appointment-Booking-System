import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'

const Appointment = () => {
  const { docId } = useParams()
  const navigate = useNavigate()
  const {
    doctors,
    currencySymbol,
    backendUrl,
    token,
    getDoctorsData,
  } = useContext(AppContext)

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  useEffect(() => {
    const fetchDoc = () => {
      if (!doctors || doctors.length === 0) return
      const found = doctors.find(doc => doc._id === docId)
      if (found) setDocInfo(found)
    }
    fetchDoc()
  }, [doctors, docId])

  useEffect(() => {
    const getSlots = async () => {
      if (!docInfo) return
      setDocSlots([])

      const today = new Date()

      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(today)
        currentDate.setDate(today.getDate() + i)

        const endTime = new Date(currentDate)
        endTime.setHours(21, 0, 0, 0)

        if (i === 0) {
          currentDate.setHours(Math.max(currentDate.getHours() + 1, 10))
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
        } else {
          currentDate.setHours(10, 0, 0, 0)
        }

        const timeSlots = []

        while (currentDate < endTime) {
          const time = currentDate.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })

          const slotDate = `${currentDate.getDate()}_${currentDate.getMonth() + 1}_${currentDate.getFullYear()}`
          const isAvailable =
            !docInfo.slots_booked?.[slotDate]?.includes(time)

          if (isAvailable) {
            timeSlots.push({
              dateTime: new Date(currentDate),
              time,
            })
          }

          currentDate.setMinutes(currentDate.getMinutes() + 30)
        }

        setDocSlots(prev => [...prev, timeSlots])
      }
    }

    getSlots()
  }, [docInfo])

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {
      const date = docSlots[slotIndex][0].dateTime
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`
      const res = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      )

      if (res.data.success) {
        toast.success(res.data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      console.error(err)
      toast.error(err.response?.data?.message || 'Error booking appointment')
    }
  }

  return (
    docInfo && (
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Doctor Card */}
        <div className="flex flex-col sm:flex-row gap-6 bg-white rounded-xl shadow-md p-6 sm:p-10">
          <div className="flex-shrink-0 mx-auto sm:mx-0 w-48 h-48 sm:w-64 sm:h-64 rounded-lg overflow-hidden border border-gray-200 bg-primary bg-opacity-10">
            <img
              className="w-full h-full object-cover"
              src={docInfo.image}
              alt={docInfo.name}
              loading="lazy"
            />
          </div>

          <div className="flex-1 border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
            <h1 className="text-3xl font-semibold flex items-center gap-2">
              {docInfo.name}
              <img src={assets.verified_icon} className="w-5 h-5" alt="verified" />
            </h1>

            <p className="mt-2 text-gray-600 text-lg">
              {docInfo.degree} - {docInfo.speciality}{' '}
              <span className="ml-2 px-3 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                {docInfo.experience}
              </span>
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-1">
                About <img src={assets.info_icon} className="w-5 h-5" />
              </h3>
              <p className="mt-2 text-gray-600 leading-relaxed">{docInfo.about}</p>
            </div>

            <p className="mt-6 text-gray-800 font-medium">
              Appointment Fee:{' '}
              <span className="text-xl font-bold text-gray-900">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Slot Selection */}
        <div className="mt-10 sm:ml-72 sm:pl-10">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Booking Slots</h3>

          {/* Days */}
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {docSlots.map((item, index) => (
              <button
                key={index}
                onClick={() => setSlotIndex(index)}
                className={`min-w-[60px] py-4 rounded-full flex flex-col items-center justify-center text-sm font-medium transition
                  ${slotIndex === index
                    ? 'bg-primary text-white shadow-lg'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
              >
                <span>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</span>
                <span className="text-lg">{item[0] && item[0].dateTime.getDate()}</span>
              </button>
            ))}
          </div>

          {/* Time Slots */}
          <div className="flex gap-3 overflow-x-auto mt-5 pb-2 no-scrollbar">
            {docSlots[slotIndex]?.map((item, index) => (
              <button
                key={index}
                onClick={() => setSlotTime(item.time)}
                className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-light transition
                  ${item.time === slotTime
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-500 border border-gray-300 hover:bg-gray-100'
                  }`}
              >
                {item.time}
              </button>
            ))}
          </div>

          <button
            onClick={bookAppointment}
            disabled={!slotTime}
            className={`mt-8 w-full max-w-xs mx-auto block rounded-full py-3 font-semibold text-white
              ${slotTime
                ? 'bg-primary hover:bg-primary-dark'
                : 'bg-gray-300 cursor-not-allowed'
              }`}
          >
            Book an Appointment
          </button>
        </div>

        {/* Related Doctors */}
        <div className="mt-16">
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  )
}

export default Appointment
