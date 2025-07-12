import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="px-6 md:px-10 lg:px-20">

      {/* Title */}
      <div className="text-center text-3xl font-semibold pt-16 text-gray-800">
        <p>CONTACT <span className="text-primary">US</span></p>
        <p className="text-sm text-gray-500 mt-2 max-w-xl mx-auto">
          Need help or have any questions? Our team is here to assist you anytime.
        </p>
      </div>

      {/* Content Layout */}
      <div className="my-16 grid md:grid-cols-2 gap-12 items-start">

        {/* Image */}
        <div className="w-full">
          <img
            className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-md"
            src={assets.contact_image}
            alt="Contact Us"
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center gap-6 text-gray-600 text-sm leading-relaxed">
          <div>
            <p className="font-semibold text-lg text-gray-700 mb-2">OUR OFFICE</p>
            <p>
              10 Thanh Luong 27, Hoa Xuan Ward, <br />
              Cam Le District, Da Nang City, Vietnam
            </p>
            <p className="mt-3">
              Tel: <a href="tel:+84901234567" className="underline hover:text-primary">(+84) 90 123 4567</a><br />
              Email: <a href="mailto:pmduc@gmail.com" className="underline hover:text-primary">pmduc@gmail.com</a>
            </p>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700 mb-2">WHY CONTACT US?</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Get support for your appointments or technical issues</li>
              <li>Inquire about partnerships or collaborations</li>
              <li>Share feedback to improve our services</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold text-lg text-gray-700 mb-2">JOIN OUR TEAM</p>
            <p>We’re hiring talented individuals in:</p>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Healthcare Support</li>
              <li>Marketing & Communications</li>
            </ul>
          </div>

          <button className="w-max border border-black px-6 py-2 text-sm rounded-md hover:bg-black hover:text-white transition-all duration-300 mt-2">
            Explore Careers
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="my-20">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Find Us On Map</h3>
        <div className="w-full max-w-4xl mx-auto">
          <iframe
            title="HealthHub Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.751297355299!2d108.2224253!3d16.0758732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219e3a53ed7e9%3A0x4e5f29a8a9cc2a32!2zMTAgVGjDoG5oIEx14buRbmcgMjcsIEjhuqNpIFF14buRYyBHw6FuZywgQ8O0bmcgTMOibmgsIMSQw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1sen!2s!4v1720718287206!5m2!1sen!2s"
            width="100%"
            height="320"
            className="rounded-xl shadow-lg border"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Contact
