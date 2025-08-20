import React from 'react';

const Notes = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notes</h1>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Note
        </button>
      </div>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <p className="text-gray-700">Note management features will be implemented here.</p>
          <p className="text-gray-700 mt-2">This page will show a list of notes, with options to create, edit, and delete notes.</p>
        </div>
      </div>
    </div>
  );
};

export default Notes;
