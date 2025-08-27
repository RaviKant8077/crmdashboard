import React from 'react';

const Careers = () => {
  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">Careers at CRM Dashboard</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Join Our Team</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            At CRM Dashboard, we're always looking for talented individuals who are passionate about 
            building innovative solutions and delivering exceptional customer experiences. Join us 
            in our mission to revolutionize customer relationship management.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Current Openings</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">Frontend Developer</h3>
              <p className="text-gray-600 dark:text-gray-300">Full-time • Remote/Hybrid</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                We're looking for a skilled React developer to help us build intuitive and responsive user interfaces.
              </p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">Backend Developer</h3>
              <p className="text-gray-600 dark:text-gray-300">Full-time • Remote/Hybrid</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Join our backend team to develop scalable and secure APIs using Java Spring Boot.
              </p>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4 py-2">
              <h3 className="text-xl font-medium text-gray-800 dark:text-gray-100">UX/UI Designer</h3>
              <p className="text-gray-600 dark:text-gray-300">Full-time • Remote/Hybrid</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Help us create beautiful and user-friendly interfaces that delight our customers.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Why Work With Us?</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
            <li>Competitive salary and benefits package</li>
            <li>Flexible working hours and remote work options</li>
            <li>Opportunities for professional growth and development</li>
            <li>Collaborative and inclusive work environment</li>
            <li>Work on cutting-edge technologies and projects</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">How to Apply</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Interested in joining our team? Send your resume and portfolio to:
          </p>
          <p className="text-orange-600 dark:text-orange-400 font-medium">
            careers@crmdashboard.com
          </p>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
            Please include the position you're applying for in the subject line.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Careers;
