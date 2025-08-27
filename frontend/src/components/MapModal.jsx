import React from 'react';

const MapModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const address = "Vrindavan Seva Dham, Near Bihari Ji Temple, Bhagausa Goverdhan, Goverdhan Mathura(Uttar Pradesh), 281502";
  const googleMapsUrl = "https://www.google.com/maps/place/Vrindavan+Seva+Dham/@27.5245,77.6796,15z";
  const embedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.234298373299!2d77.6796!3d27.5245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDMxJzI4LjIiTiA3N8KwNDAnNDYuNiJF!5e0!3m2!1sen!2sus!4v1640000000000!5m2!1sen!2sus";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Our Location</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-bold"
          >
            &times;
          </button>
        </div>
        
        <div className="p-4">
          <div className="mb-4">
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              <strong>Address:</strong> {address}
            </p>
          </div>
          
          <div className="rounded-lg mb-4 h-64 overflow-hidden">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="CRM Dashboard Location"
            ></iframe>
          </div>
          
          <div className="flex justify-between items-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
            >
              Close
            </button>
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
