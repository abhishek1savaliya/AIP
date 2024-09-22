import Link from 'next/link';
import Donation from '../components/donation/page';

const About = () => {
  return (
    <div className="p-6 bg-cyan-50 min-h-screen flex flex-col items-center">
      
     

      <h1 className="text-4xl font-bold text-cyan-800 mb-4">About AIP API</h1>
      <Donation />
      <p className="text-lg text-cyan-700 mb-4">
        <strong>Developed by:</strong> Abhishek Savaliya
      </p>
      <p className="text-lg text-cyan-700 mb-6">
        <strong>Purpose:</strong> The AIP (Advanced IP Information Provider) API was created as a personal project to learn and implement new technologies, aiming to simplify access to detailed IP address information for users.
      </p>

      <h2 className="text-2xl font-semibold text-cyan-800 mt-8">What is AIP API?</h2>
      <p className="text-lg text-cyan-700 mb-6">
        The AIP API allows users to obtain comprehensive details about IP addresses, including geographic location, timezone, and ASN (Autonomous System Number) information. This API serves as a valuable tool for developers and businesses looking to enhance their applications with location-based features and insights.
      </p>

      <h3 className="text-xl font-semibold text-cyan-800 mt-6">Key Features</h3>
      <ul className="list-disc list-inside text-lg text-cyan-700 mb-6">
        <li>Accurate Geolocation: Provides precise geographic data, including country, region, and city.</li>
        <li>ASN Information: Delivers details about the organization managing the IP address.</li>
        <li>Currency and Timezone Data: Automatically retrieves the local currency and timezone based on the IP location.</li>
        <li>IP Type Detection: Identifies whether the IP is from a mobile device, a proxy, or a hosting server.</li>
      </ul>

      <h3 className="text-xl font-semibold text-cyan-800 mt-6">Development Journey</h3>
      <p className="text-lg text-cyan-700 mb-6">
        The AIP API is part of a broader learning experience aimed at mastering backend development and API integration. Through this project, I have gained hands-on experience with technologies such as Node.js, Express, and MongoDB, as well as valuable insights into API design and user experience.
      </p>

      <h3 className="text-xl font-semibold text-cyan-800 mt-6">Future Goals</h3>
      <p className="text-lg text-cyan-700 mb-6">
        I aim to expand the API's capabilities, improve its performance, and implement additional features based on user feedback. The project also serves as a foundation for future developments in geolocation and data analysis.
      </p>

      <h3 className="text-xl font-semibold text-cyan-800 mt-6">Contact Information</h3>
      <p className="text-lg text-cyan-700 mb-6">
        For support or further information, feel free to reach out via email at <Link href="mailto:support@aip.com" className="text-cyan-800 hover:underline">support@aip.com</Link> or visit our Help Center.
      </p>

    </div>
  );
};

export default About;
