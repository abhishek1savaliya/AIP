import React from 'react';
import moment from 'moment';

const DonerList = async () => {
 
    const response = await fetch('https://freeaipuse.onrender.com/alldoner');
    const data = await response.json();

    return (
        <div className="bg-cyan-50 p-6">

            <div className='flex justify-center'>
                <h1 className="text-3xl font-bold text-cyan-800 mb-6">List of Donors</h1>
            </div>


            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data?.data?.map((donor, index) => {
                    const isNew = moment().diff(moment(donor.createdAt), 'days') <= 2;

                    return (
                        <li
                            key={index}
                            className="flex flex-col p-4 bg-cyan-100 border border-cyan-300 rounded-md shadow-sm relative">
                            {isNew && (
                                <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                                    New
                                </span>
                            )}
                            <h2 className="text-xl font-semibold text-cyan-700">{donor.name}</h2>
                            <p className="text-cyan-600">Donated on: {new Date(donor.createdAt).toLocaleString()}</p>
                        </li>
                    );
                })}
            </ul>
        </div>


    );
};

export default DonerList;