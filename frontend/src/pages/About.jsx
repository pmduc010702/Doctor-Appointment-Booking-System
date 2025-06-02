import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div className="px-6 md:px-10 lg:px-20 text-gray-700">

      {/* Section Title */}
      <div className="text-center text-3xl font-semibold pt-16 text-gray-800">
        <p>ABOUT <span className="text-primary">US</span></p>
      </div>

      {/* About Section */}
      <div className="my-12 flex flex-col md:flex-row gap-10 items-center">
        <img className="w-full md:max-w-md rounded-xl shadow-md" src={assets.about_image} alt="About" />
        <div className="flex flex-col gap-6 text-sm text-gray-600 leading-relaxed md:w-2/3">
          <p>
            Welcome to <span className="font-semibold text-gray-800">Prescripto</span>, your trusted partner in managing your healthcare needs conveniently and efficiently. We understand the challenges individuals face when it comes to scheduling appointments and managing health records.
          </p>
          <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to improve user experience and deliver superior service through innovation. Whether you're booking your first appointment or managing ongoing care, we're here to support you every step of the way.
          </p>
          <h3 className="text-base font-bold text-gray-800">Our Vision</h3>
          <p>
            Our vision is to create a seamless healthcare experience for everyone. We aim to bridge the gap between patients and providers, ensuring easy access to care when you need it most.
          </p>
        </div>
      </div>

      {/* Why Choose Us Title */}
      <div className="text-center text-2xl font-semibold my-12">
        <p>WHY <span className="text-primary">CHOOSE US</span></p>
      </div>

      {/* Why Choose Us Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 text-[15px]">
        {[
          {
            title: "EFFICIENCY",
            desc: "Streamlined appointment scheduling that fits into your busy lifestyle."
          },
          {
            title: "CONVENIENCE",
            desc: "Access to a network of trusted healthcare professionals in your area."
          },
          {
            title: "PERSONALIZATION",
            desc: "Tailored recommendations and reminders to help you stay on top of your health."
          }
        ].map((item, index) => (
          <div
            key={index}
            className="border rounded-xl px-8 py-10 hover:bg-primary hover:text-white transition-all duration-300 cursor-pointer shadow-sm"
          >
            <h4 className="font-semibold mb-3">{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About
