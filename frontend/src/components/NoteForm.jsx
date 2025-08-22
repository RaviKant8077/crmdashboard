import React from 'react';

const NoteForm = ({ note, onChange, errors, onSubmit }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content *
        </label>
        <textarea
          id="content"
          name="content"
          rows={4}
          value={note.content || ''}
          onChange={onChange}
          className={`mt-1 block w-full px-3 py-2 border ${
            errors.content ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
          placeholder="Enter note content..."
        />
        {errors.content && (
          <p className="mt-1 text-sm text-red-600">{errors.content}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="customerId" className="block text-sm font-medium text-gray-700">
            Customer ID
          </label>
          <input
            type="number"
            id="customerId"
            name="customerId"
            value={note.customerId || ''}
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Optional customer ID"
          />
        </div>

        <div>
          <label htmlFor="dealId" className="block text-sm font-medium text-gray-700">
            Deal ID
          </label>
          <input
            type="number"
            id="dealId"
            name="dealId"
            value={note.dealId || ''}
            onChange={onChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Optional deal ID"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save Note
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
