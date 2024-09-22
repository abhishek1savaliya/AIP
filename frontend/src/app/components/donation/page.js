'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Donation = () => {
    const router = useRouter();

    const [donorName, setDonorName] = useState('');
    const [donorEmail, setDonorEmail] = useState('');
    const [emailInputType, setEmailInputType] = useState(''); 
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({ name: '', email: '' });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Email validation regex

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({ name: '', email: '' });
        let valid = true;

        // Validate Name
        if (!donorName) {
            setLoading(false);
            setErrors((prev) => ({ ...prev, name: 'Name cannot be empty.' }));
            valid = false;
        }

        // Validate Email Format
        if (!donorEmail) {
            setLoading(false);
            setErrors((prev) => ({ ...prev, email: 'Email cannot be empty.' }));
            valid = false;
        } else if (!emailPattern.test(donorEmail)) {
            setEmailInputType('text'); // Change input type to text if email format is invalid
            setErrors((prev) => ({ ...prev, email: 'Enter email in correct format.' }));
            valid = false;
        } else {
            setEmailInputType('email'); // Reset to 'email' type once valid
        }

        if (!valid) return;

        setLoading(true);

        const donationData = {
            name: donorName,
            emailAddress: donorEmail,
        };

        try {
            const response = await axios.post('https://freeaipuse.onrender.com/donation', donationData);
            if (response.data.success) {
                router.push('https://paypal.me/AbhishekGSavaliya?country.x=IN&locale.x=en_GB');
            } else {
                alert('Something Went Wrong');
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error submitting donation:', error);
            alert('There was an error processing your donation. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-cyan-100 shadow-md rounded-lg p-6 my-8">
            <h2 className="text-2xl font-bold text-cyan-800 mb-4">Support the AIP API Project</h2>
            <p className="text-gray-600 mb-6">
                Help us build a stronger infrastructure for AIP API by donating. Your contribution will assist in expanding features, improving performance, and ensuring the API remains free and accessible to everyone.
            </p>

            <form onSubmit={handleSubmit}>
                <label className="block mt-4 text-sm font-medium text-gray-700" htmlFor="donorName">
                    Name
                </label>
                <input
                    type="text"
                    id="donorName"
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    placeholder="Enter Your Name"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}

                <label className="block mt-4 text-sm font-medium text-gray-700" htmlFor="donorEmail">
                    Email Address
                </label>
                <input
                    type={emailInputType} // Change input type based on validation
                    id="donorEmail"
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="block w-full mt-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                    placeholder="Your email"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

                <button
                    type="submit"
                    className="mt-6 w-full flex justify-center bg-cyan-600 text-white font-bold py-3 px-4 rounded-md hover:bg-cyan-700"
                >
                    {loading ? <div className="spinner"></div> : 'Donate Now'}
                </button>
            </form>

            <p className="mt-4 text-gray-600 text-sm">
                Thank you for your support! For more information, contact us at{' '}
                <a className="text-cyan-500" href="mailto:support@aip.com">support@aip.com</a>.
            </p>
        </div>
    );
};

export default Donation;