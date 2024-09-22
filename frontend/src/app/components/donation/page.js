'use client'
import React from 'react'

const Donation = () => {
    return (
        <div className="max-w-md mx-auto bg-cyan-100 shadow-md rounded-lg p-6 my-8">
            <h2 className="text-2xl font-bold text-cyan-800 mb-4">Support the AIP API Project</h2>
            <p className="text-gray-600 mb-6">
                Help us build a stronger infrastructure for AIP API by donating. Your contribution will assist in expanding features, improving performance, and ensuring the API remains free and accessible to everyone.
            </p>

            <form>
                <label className="block mt-4 text-sm font-medium text-gray-700" for="donorName">
                    Name
                </label>
                <input
                    type="text"
                    id="donorName"
                    className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    placeholder="Enter Your Name"
                />

                <label className="block mt-4 text-sm font-medium text-gray-700" for="donorEmail">
                    Email Address
                </label>
                <input
                    type="email"
                    id="donorEmail"
                    className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    placeholder="Your email"
                />

                <button
                    type="button"
                    className="mt-6 w-full bg-cyan-600 text-white font-bold py-2 px-4 rounded-md hover:bg-cyan-700"
                >
                    Donate Now
                </button>


            </form>

            <p className="mt-4 text-gray-600 text-sm">
                Thank you for your support! For more information, contact us at <a className="text-cyan-500" href="mailto:support@aip.com">support@aip.com</a>.
            </p>
        </div>
    )
}

export default Donation
