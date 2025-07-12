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
        <img className="w-full md:max-w-md rounded-xl shadow-md" src={assets.about_image} alt="About HealthHub" />
        <div className="flex flex-col gap-6 text-sm text-gray-600 leading-relaxed md:w-2/3">
          <p>
            Welcome to <span className="font-semibold text-gray-800">HealthHub</span>, your reliable platform for booking medical appointments with ease. We connect patients to trusted doctors, helping you manage your healthcare with convenience and confidence.
          </p>
          <p>
            At HealthHub, we’re passionate about improving access to healthcare through technology. From finding the right doctor to scheduling and managing appointments — we’re here to make the process smooth, fast, and stress-free.
          </p>
          <h3 className="text-base font-bold text-gray-800">Our Vision</h3>
          <p>
            Our vision is to simplify healthcare for everyone. We aim to become the go-to platform where patients and providers meet, communicate, and build better health outcomes together.
          </p>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="text-center text-2xl font-semibold my-12">
        <p>WHY <span className="text-primary">CHOOSE US</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 text-[15px]">
        {[
          {
            title: "EFFICIENCY",
            desc: "Book appointments in seconds — anytime, anywhere, without waiting in line."
          },
          {
            title: "TRUSTED NETWORK",
            desc: "Connect with certified, highly-rated doctors across multiple specialities."
          },
          {
            title: "SMART SUPPORT",
            desc: "Receive timely reminders, recommendations, and health tips tailored to you."
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

      {/* Our Core Values */}
      <div className="text-center text-2xl font-semibold my-12">
        <p>OUR <span className="text-primary">CORE VALUES</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 text-[15px]">
        {[
          {
            title: "INTEGRITY",
            desc: "We are transparent, honest, and ethical in all interactions with users and partners.",
          },
          {
            title: "INNOVATION",
            desc: "We embrace technology to improve how healthcare is accessed and delivered.",
          },
          {
            title: "CARE",
            desc: "We put patient well-being at the center of everything we do.",
          },
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

      {/* How It Works */}
      <div className="text-center text-2xl font-semibold my-12">
        <p>HOW <span className="text-primary">IT WORKS</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-sm text-gray-700">
        {[
          {
            icon: "🔍",
            step: "1. Search",
            desc: "Find doctors by speciality, location, or availability.",
          },
          {
            icon: "📅",
            step: "2. Book",
            desc: "Choose a convenient time slot and confirm your appointment.",
          },
          {
            icon: "💬",
            step: "3. Connect",
            desc: "Meet your doctor in person or via online consultation.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center text-center border rounded-xl px-6 py-8 hover:shadow-lg transition duration-300"
          >
            <div className="text-4xl mb-4">{item.icon}</div>
            <h4 className="font-bold text-base mb-2">{item.step}</h4>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="text-center text-2xl font-semibold my-12">
        <p>WHAT OUR <span className="text-primary">USERS SAY</span></p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32 text-sm text-gray-700">
        {[
          {
            name: "Linh Tran",
            comment: "HealthHub giúp mình tìm bác sĩ phụ khoa nhanh chóng và đặt lịch chỉ trong vài phút. Rất tiện lợi!",
          },
          {
            name: "Nam Nguyen",
            comment: "Tôi thường xuyên khám với bác sĩ nội tiết qua HealthHub. Nền tảng này giúp tiết kiệm rất nhiều thời gian.",
          },
          {
            name: "Thao Pham",
            comment: "Dễ dùng, trực quan và có nhiều chuyên khoa để chọn. Tôi hài lòng với trải nghiệm!",
          },
        ].map((t, index) => (
          <div key={index} className="border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
            <p className="italic text-gray-600 mb-4">“{t.comment}”</p>
            <p className="font-semibold text-primary">— {t.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About
