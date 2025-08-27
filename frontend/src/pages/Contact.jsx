import React, { useState } from 'react';
import MapModal from '../components/MapModal';

const Contact = () => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const openMapModal = () => setIsMapModalOpen(true);
  const closeMapModal = () => setIsMapModalOpen(false);

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-6">Contact Us</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Get in Touch</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We would love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to reach out to us.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Contact Information</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Email:</strong> support@crmdashboard.com</p>
          <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Phone:</strong> +91 807721019</p>
          <div className="flex items-center">
            <p className="text-gray-600 dark:text-gray-300 mb-2"><strong>Address:</strong> Vrindavan Seva Dham ,Near Bihari Ji Temple, Bhagausa Goverdhan, Goverdhan Mathura(Uttar Pradesh), 281502.</p>
            <button
              onClick={openMapModal}
              className="ml-2 p-2 text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
              title="View on Map"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Send Us a Message</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="name">Name</label>
              <input type="text" id="name" className="border rounded-md p-2 w-full" placeholder="Your Name" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">Email</label>
              <input type="email" id="email" className="border rounded-md p-2 w-full" placeholder="Your Email" required />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 mb-2" htmlFor="message">Message</label>
              <textarea id="message" className="border rounded-md p-2 w-full" rows="4" placeholder="Your Message" required></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white rounded-md px-4 py-2">Send Message</button>
          </form>
        </div>
      </div>

      <MapModal isOpen={isMapModalOpen} onClose={closeMapModal} />
    </div>
  );
};

export default Contact;
