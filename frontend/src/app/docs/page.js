// components/Docs.js

import React from 'react';

const Docs = () => {
    return (
        <div className="min-h-screen bg-cyan-100 text-cyan-950 p-8">
            <h1 className="text-4xl font-bold mb-4">AIP API Documentation</h1>
            <p className="mb-6">
                Welcome to the <strong>AIP</strong> (Advanced IP Information Provider) API documentation. This API allows users to obtain detailed information about IP addresses, including their geographic location, timezone, and ASN (Autonomous System Number) details. Below you will find the necessary information to get started with our API, including the endpoint, usage examples, and response structure.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
            <p className="mb-4">
                You can use the AIP API for free by accessing the following endpoint:
            </p>
            <pre className="bg-cyan-800 p-4 rounded mb-4">
                <code className="text-white">https://freeaipuse.onrender.com</code>
            </pre>

            <h3 className="text-xl font-semibold mb-2">Example Request</h3>
            <p className="mb-4">
                To retrieve IP information, send a GET request to the API:
            </p>
            <pre className="bg-cyan-800 p-4 rounded mb-4">
                <code className="text-white">GET https://freeaipuse.onrender.com</code>
            </pre>

            <h3 className="text-xl font-semibold mb-2">Example Response</h3>
            <p className="mb-4">
                Upon a successful request, the API will return a JSON response containing detailed information about the queried IP address. Here’s an example response:
            </p>
            <pre className="bg-cyan-800 p-4 rounded mb-4">
                <code className="text-white">
                    {`{
  "ip": "60.254.114.133, 172.69.178.88, 10.210.122.205",
  "asn": 17488,
  "asnOrg": "Hathway IP Over Cable Internet",
  "continent": "Asia",
  "continentCode": "AS",
  "country": "India",
  "countryCode": "IN",
  "region": "MH",
  "regionName": "Maharashtra",
  "city": "Mumbai",
  "zip": "400013",
  "lat": 19.0748,
  "lon": 72.8856,
  "timezone": "Asia/Kolkata",
  "currency": "Indian rupee",
  "as": 17488,
  "asname": "Hathway IP Over Cable Internet",
  "mobile": false,
  "proxy": false,
  "hosting": false
}`}
                </code>
            </pre>

            <h3 className="text-xl font-semibold mb-2">Response Fields</h3>
            <table className="min-w-full text-white bg-cyan-800 rounded mb-6">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Field</th>
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">ip</td>
                        <td className="border px-4 py-2">string</td>
                        <td className="border px-4 py-2">The IP address (or addresses) detected.</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">asn</td>
                        <td className="border px-4 py-2">integer</td>
                        <td className="border px-4 py-2">The Autonomous System Number (ASN) associated with the IP.</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">asnOrg</td>
                        <td className="border px-4 py-2">string</td>
                        <td className="border px-4 py-2">The organization that owns the ASN.</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">continent</td>
                        <td className="border px-4 py-2">string</td>
                        <td className="border px-4 py-2">The continent where the IP address is located.</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">country</td>
                        <td className="border px-4 py-2">string</td>
                        <td className="border px-4 py-2">The country where the IP address is located.</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">region</td>
                        <td className="border px-4 py-2">string</td>
                        <td className="border px-4 py-2">Region/state of the IP address.</td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">city</td>
                        <td className="border px-4 py-2">string</td>
                        <td className="border px-4 py-2">City where the IP address is located.</td>
                    </tr>
                    {/* Add more rows as needed */}
                </tbody>
            </table>

            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <ul className="list-disc list-inside mb-6">
                <li>Accurate Geolocation: Get precise geographic data including country, region, and city.</li>
                <li>ASN Information: Details about the Autonomous System managing the IP address.</li>
                <li>Currency and Timezone Data: Automatically retrieve the local currency and timezone based on IP location.</li>
                <li>Detect Mobile, Proxy, or Hosting IPs: Know whether the IP is from a mobile device, a proxy, or a hosting server.</li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4">Usage Notes</h2>
            <p className="mb-4">
                The API supports both IPv4 and IPv6 addresses. If you are behind a proxy, multiple IP addresses may be returned in the <code>ip</code> field.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Rate Limiting</h2>
            <p className="mb-4">
                The AIP API is currently available for free with no strict rate-limiting. However, we reserve the right to impose rate limits in the future to ensure fair usage for all users.
            </p>

            <h2 className="text-2xl font-semibold mb-4">Error Handling</h2>
            <p className="mb-4">
                If an error occurs, the API will return an HTTP status code along with a JSON error message. Example:
            </p>
            <pre className="bg-cyan-800 p-4 rounded mb-4">
                <code className="text-white">
                    {`{
  "error": "Invalid request",
  "message": "Unable to retrieve IP information"
}`}
                </code>
            </pre>

            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p>
                For support or further information, feel free to contact our team at <strong>support@aip.com</strong> or visit our <a href="#" className="text-cyan-400 hover:underline">Help Center</a>.
            </p>
        </div>
    );
};

export default Docs;
