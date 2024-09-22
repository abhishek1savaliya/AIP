'use client'
import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
        setErrors({ ...errors, [id]: '' });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required!';
        if (!formData.email) {
            newErrors.email = 'Email is required!';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Enter a valid email format!';
        }
        if (!formData.message) newErrors.message = 'Message is required!';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://freeaipuse.onrender.com/contact', {
                name: formData.name,
                email: formData.email,
                message: formData.message,
            });
            setLoading(false);
            setSuccessMessage('Message sent successfully!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
            setFormData({ name: '', email: '', message: '' });

        } catch (error) {
            setLoading(false);
            console.error('Error sending message:', error);
            setSuccessMessage('Failed to send message. Please try again later.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-cyan-100 p-4">
            <h1 className="text-5xl font-bold text-cyan-800 mb-6 mt-5">Contact Us</h1>
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            <form className="bg-cyan-200 shadow-md mb-5 mt-5 rounded-lg p-8 max-w-lg w-full" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-cyan-800 mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className={`border ${errors.name ? 'border-red-500' : 'border-cyan-300'} p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-600 transition duration-200`}
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-cyan-800 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className={`border ${errors.email ? 'border-red-500' : 'border-cyan-300'} p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-600 transition duration-200`}
                        type="text"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-cyan-800 mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        className={`border ${errors.message ? 'border-red-500' : 'border-cyan-300'} p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-cyan-600 transition duration-200`}
                        id="message"
                        rows="4"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
                    {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>
                <button
                    className="bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 transition duration-200 w-full sm:w-auto flex justify-center items-center"
                    type="submit"
                    style={{ width: '150px' }}
                >
                    {loading ? (
                        <div className="spinner border-t-2 border-white border-solid rounded-full w-5 h-5 animate-spin"></div>
                    ) : (
                        'Send Message'
                    )}
                </button>
            </form>
        </div>
    );
};

export default Contact;