import React, { useState } from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

const NoteFilters = ({ onFilterChange, customers, deals }) => {
  const [filters, setFilters] = useState({
    content: '',
    customerId: '',
    dealId: '',
    sortField: 'createdAt',
    sortDirection: 'desc'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleSortChange = (field) => {
    const newSortDirection = filters.sortField === field && filters.sortDirection === 'asc' ? 'desc' : 'asc';
    const newFilters = { ...filters, sortField: field, sortDirection: newSortDirection };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClear = () => {
    const clearedFilters = { 
      content: '', 
      customerId: '', 
      dealId: '', 
      sortField: 'createdAt', 
      sortDirection: 'desc' 
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Content
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              name="content"
              value={filters.content}
              onChange={handleChange}
              placeholder="Search by content"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Customer
          </label>
          <select
            name="customerId"
            value={filters.customerId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">All Customers</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Deal
          </label>
          <select
            name="dealId"
            value={filters.dealId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">All Deals</option>
            {deals.map(deal => (
              <option key={deal.id} value={deal.id}>
                {deal.dealName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sort By
          </label>
          <div className="flex space-x-2">
            <button
              onClick={() => handleSortChange('createdAt')}
              className={`px-3 py-2 text-sm rounded-md flex items-center ${
                filters.sortField === 'createdAt'
                  ? 'bg-indigo-100 dark:bg-indigo-600 text-indigo-700 dark:text-indigo-100'
                  : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
              }`}
            >
              Date
              {filters.sortField === 'createdAt' && (
                filters.sortDirection === 'asc' ? 
                  <ArrowUp className="w-4 h-4 ml-1" /> : 
                  <ArrowDown className="w-4 h-4 ml-1" />
              )}
            </button>
            <button
              onClick={() => handleSortChange('content')}
              className={`px-3 py-2 text-sm rounded-md flex items-center ${
                filters.sortField === 'content'
                  ? 'bg-indigo-100 dark:bg-indigo-600 text-indigo-700 dark:text-indigo-100'
                  : 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-500'
              }`}
            >
              Content
              {filters.sortField === 'content' && (
                filters.sortDirection === 'asc' ? 
                  <ArrowUp className="w-4 h-4 ml-1" /> : 
                  <ArrowDown className="w-4 h-4 ml-1" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteFilters;
