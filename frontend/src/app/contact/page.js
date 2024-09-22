import React from 'react';

const Contact = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-100 p-4">
            <h1 className="text-4xl font-bold text-cyan-800 mb-6">Contact Us</h1>
            <form className="bg-cyan-200 shadow-md rounded-lg p-8 max-w-lg w-full">
                <div className="mb-4">
                    <label className="block text-cyan-800 mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        className="border border-cyan-300 p-2 rounded w-full"
                        type="text"
                        id="name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-cyan-800 mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="border border-cyan-300 p-2 rounded w-full"
                        type="email"
                        id="email"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-cyan-800 mb-2" htmlFor="message">
                        Message
                    </label>
                    <textarea
                        className="border border-cyan-300 p-2 rounded w-full"
                        id="message"
                        rows="4"
                        required
                    ></textarea>
                </div>
                <button
                    className="bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 transition duration-200"
                    type="submit"
                >
                    Send Message
                </button>
            </form>
        </div>
    );
};

export default Contact;
