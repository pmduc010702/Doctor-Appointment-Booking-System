import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="px-6 md:px-10 lg:px-20">

      {/* Title */}
      <div className="text-center text-3xl font-semibold pt-16 text-gray-800">
        <p>CONTACT <span className="text-primary">US</span></p>
      </div>

      {/* Content */}
      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">

        {/* Image */}
        <img
          className="w-full md:max-w-md rounded-lg shadow-md"
          src={assets.contact_image}
          alt="Contact Us"
        />

        {/* Info */}
        <div className="flex flex-col justify-center items-start gap-6 text-gray-600 text-sm md:w-2/3 leading-relaxed">
          <div>
            <p className="font-semibold text-lg text-gray-700 mb-2">OUR OFFICE</p>
            <p>
              Hosur Road / Marigowda Road, (Lakkasandra, Wilson Garden)<br />
              Bangalore – 560029 Karnataka, India.
            </p>
            <p className="mt-3">
              Tel: <a href="tel:+918026995530" className="underline hover:text-primary">080 26995530</a><br />
              Email: <a href="mailto:dirstaff@nimhans.ac.in" className="underline hover:text-primary">dirstaff@nimhans.ac.in</a>
            </p>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700 mb-2">CAREERS AT NIMHANS</p>
            <p>Learn more about us.</p>
          </div>

          <button className="border border-black px-8 py-3 text-sm rounded-md hover:bg-black hover:text-white transition-all duration-300">
            Explore More
          </button>
        </div>
      </div>

    </div>
  )
}

export default Contact
