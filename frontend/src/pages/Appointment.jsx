import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {
  const { docId } = useParams()
  const { doctors, currencySymbol } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')
  // const [formVisible, setFormVisible] = useState(false) // nếu bạn có xử lý form

  const fetchDocInfo = () => {
    if (!doctors || doctors.length === 0) return
    const docInfo = doctors.find((doc) => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])
    let today = new Date()
    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }

      setDocSlots((prev) => [...prev, timeSlots])
    }
  }

  useEffect(() => {
    fetchDocInfo()
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
  }, [docInfo])

  return (
    docInfo && (
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Doctor detail */}
        <div className="flex flex-col sm:flex-row gap-6 bg-white rounded-xl shadow-md p-6 sm:p-10">
          <div className="flex-shrink-0 mx-auto sm:mx-0 w-48 h-48 sm:w-64 sm:h-64 rounded-lg overflow-hidden border border-gray-200 bg-primary bg-opacity-10">
            <img
              className="w-full h-full object-cover"
              src={docInfo.image}
              alt={docInfo.name}
              loading="lazy"
            />
          </div>

          <div className="flex-1 border border-gray-300 rounded-lg p-6 bg-white shadow-sm">
            <h1 className="flex items-center gap-2 text-3xl font-semibold text-gray-900">
              {docInfo.name}{' '}
              <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
            </h1>

            <p className="mt-2 text-gray-600 text-lg font-medium">
              {docInfo.degree} - {docInfo.speciality}{' '}
              <span className="inline-block ml-3 px-3 py-0.5 text-xs rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                {docInfo.experience}
              </span>
            </p>

            <section className="mt-6">
              <h2 className="flex items-center gap-1 font-semibold text-gray-800 text-lg">
                About{' '}
                <img
                  src={assets.info_icon}
                  alt="Info"
                  className="w-5 h-5 opacity-70"
                  loading="lazy"
                />
              </h2>
              <p className="mt-2 text-gray-600 max-w-3xl leading-relaxed">{docInfo.about}</p>
            </section>

            <p className="mt-6 text-gray-700 font-semibold">
              Appointment fee:{' '}
              <span className="text-gray-900 text-xl font-bold">
                {currencySymbol}
                {docInfo.fees}
              </span>
            </p>
          </div>
        </div>

        {/* Booking Slots */}
        <section className="mt-10 sm:ml-72 sm:pl-10">
          <h3 className="text-xl font-semibold text-gray-700 mb-3">Booking Slots</h3>

          <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
            {docSlots.length > 0 &&
              docSlots.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotIndex(index)}
                  className={`min-w-[60px] py-4 rounded-full flex flex-col items-center justify-center text-sm font-semibold transition
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

          <div className="flex gap-3 overflow-x-auto mt-5 pb-2 no-scrollbar">
            {docSlots.length > 0 &&
              docSlots[slotIndex]?.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSlotTime(item.time)}
                  className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-light transition
                    ${item.time === slotTime
                      ? 'bg-primary text-white shadow-md'
                      : 'text-gray-500 border border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  {item.time.toLowerCase()}
                </button>
              ))}
          </div>

          <button
            onClick={() => alert(`Booked slot: ${slotTime}`)} // thay bằng setFormVisible(true) hoặc hàm bạn cần
            disabled={!slotTime}
            className={`mt-8 w-full max-w-xs mx-auto block rounded-full py-3 font-semibold text-white
              transition
              ${slotTime
                ? 'bg-primary hover:bg-primary-dark shadow-lg'
                : 'bg-gray-300 cursor-not-allowed'
              }`}
          >
            Book an Appointment
          </button>
        </section>

        {/* Related doctors */}
        <div className="mt-14">
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  )
}

export default Appointment
