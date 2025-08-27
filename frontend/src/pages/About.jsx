import React from 'react';

const About = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">About Us</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            At CRM Dashboard, we are committed to providing businesses with powerful, intuitive, 
            and reliable customer relationship management solutions. Our mission is to help 
            organizations build stronger relationships with their customers through innovative 
            technology and exceptional service.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Our Story</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Founded in 2023, CRM Dashboard was born out of a need for simple yet powerful 
            CRM tools that businesses of all sizes could use. We understand that managing 
            customer relationships is crucial for success, and we've built our platform 
            to make that process as seamless as possible.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">Ravi Kant</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">CEO & Founder</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                With over 2 years of experience in CRM solutions and business development.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">Radhey Sharma</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">CTO</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Expert in software architecture and leading our technical innovation.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">Kritika Dixit</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Lead Developer</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Specializes in frontend development and user experience design.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-2">Kamini Sharma</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Customer Success Manager</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                Dedicated to ensuring our customers get the most value from our platform.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Our Values</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li><strong>Customer First:</strong> We prioritize our customers' success above all else</li>
            <li><strong>Innovation:</strong> We continuously improve and innovate our solutions</li>
            <li><strong>Simplicity:</strong> We believe powerful tools should be easy to use</li>
            <li><strong>Reliability:</strong> We provide stable and dependable service</li>
            <li><strong>Collaboration:</strong> We work together to achieve common goals</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
