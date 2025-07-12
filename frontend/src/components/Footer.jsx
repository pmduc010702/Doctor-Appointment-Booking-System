import React from 'react'
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <footer className="bg-gray-50 px-6 md:px-10 lg:px-20 py-16 text-gray-700">
            <div className="grid gap-10 md:gap-20 md:grid-cols-3 text-sm">
                {/* Left Column */}
                <div>
                    <img className="mb-4 w-36" src={assets.logo} alt="HealthHub Logo" />
                    <p className="leading-relaxed text-gray-600">
                        HealthHub is your trusted platform to connect with certified doctors and book appointments online with ease and convenience. We’re committed to improving access to quality healthcare for everyone.
                    </p>
                </div>

                {/* Center Column */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li className="hover:text-primary cursor-pointer">Home</li>
                        <li className="hover:text-primary cursor-pointer">About Us</li>
                        <li className="hover:text-primary cursor-pointer">Contact</li>
                        <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>

                {/* Right Column */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Get in Touch</h3>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>📞 (+84) 90 123 4567</li>
                        <li>📧 pmduc@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="mt-12 border-t pt-6 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} HealthHub. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
