import React from 'react'
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <footer className="bg-gray-50 px-6 md:px-10 lg:px-20 py-16 text-gray-700">
            <div className="grid gap-10 md:gap-20 md:grid-cols-3 text-sm">
                {/* Left Column */}
                <div>
                    <img className="mb-4 w-36" src={assets.logo} alt="Logo" />
                    <p className="leading-relaxed text-gray-600">
                        NIMHANS is world-renowned as a centre for mental health, neurosciences and allied fields. Our mission is to lead innovation and care through excellence in translational research and clinical service.
                    </p>
                </div>

                {/* Center Column */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Company</h3>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li className="hover:text-primary cursor-pointer">Home</li>
                        <li className="hover:text-primary cursor-pointer">About Us</li>
                        <li className="hover:text-primary cursor-pointer">Contact Us</li>
                        <li className="hover:text-primary cursor-pointer">Privacy Policy</li>
                    </ul>
                </div>

                {/* Right Column */}
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-900">Get in Touch</h3>
                    <ul className="flex flex-col gap-2 text-gray-600">
                        <li>📞 080 26995530</li>
                        <li>📧 ms@nimhans.ac.in</li>
                    </ul>
                </div>
            </div>

            {/* Bottom Line */}
            <div className="mt-12 border-t pt-6 text-center text-xs text-gray-500">
                © 2024 NIMHANS. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer
