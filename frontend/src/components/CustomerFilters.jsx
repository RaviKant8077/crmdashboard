import React, { useState } from 'react';

const CustomerFilters = ({ onFilterChange, currentFilters }) => {
  const [selectedFilter, setSelectedFilter] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const filterOptions = [
    { value: '', label: 'Select Filter...' },
    { value: 'searchTerm', label: 'Search by Name/Email' },
    { value: 'city', label: 'Filter by City' },
    { value: 'state', label: 'Filter by State' },
    { value: 'country', label: 'Filter by Country' },
    { value: 'companyName', label: 'Filter by Company' }
  ];

  const sortOptions = [
    { value: '', label: 'Default' },
    { value: 'firstName', label: 'First Name' },
    { value: 'lastName', label: 'Last Name' },
    { value: 'email', label: 'Email' },
    { value: 'companyName', label: 'Company' },
    { value: 'city', label: 'City' },
    { value: 'state', label: 'State' },
    { value: 'country', label: 'Country' },
    { value: 'createdAt', label: 'Created Date' }
  ];

  const handleFilterSelect = (filterType) => {
    setSelectedFilter(filterType);
    setFilterValue('');
  };

  const handleApplyFilter = () => {
    const newFilters = {
      searchTerm: '',
      city: null,
      state: null,
      country: null,
      companyName: null,
      sortBy: sortBy || null,
      sortOrder: sortOrder
    };
    
    if (selectedFilter === 'searchTerm') {
      newFilters.searchTerm = filterValue.trim();
    } else if (selectedFilter === 'city') {
      newFilters.city = filterValue.trim() || null;
    } else if (selectedFilter === 'state') {
      newFilters.state = filterValue.trim() || null;
    } else if (selectedFilter === 'country') {
      newFilters.country = filterValue.trim() || null;
    } else if (selectedFilter === 'companyName') {
      newFilters.companyName = filterValue.trim() || null;
    }
    
    onFilterChange(newFilters);
  };

  const handleClearAll = () => {
    setSelectedFilter('');
    setFilterValue('');
    setSortBy('');
    setSortOrder('asc');
    onFilterChange({
      searchTerm: '',
      city: null,
      state: null,
      country: null,
      companyName: null,
      sortBy: null,
      sortOrder: 'asc'
    });
  };

  const getInputPlaceholder = () => {
    switch (selectedFilter) {
      case 'searchTerm':
        return 'Enter name or email...';
      case 'city':
        return 'Enter city name...';
      case 'state':
        return 'Enter state name...';
      case 'country':
        return 'Enter country name...';
      case 'companyName':
        return 'Enter company name...';
      default:
        return '';
    }
  };

  const isFilterInputVisible = selectedFilter && selectedFilter !== '';

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
      <div className="flex flex-wrap gap-4 items-end">
        
        {/* Filter Type Dropdown */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Select Filter
          </label>
          <select
            value={selectedFilter}
            onChange={(e) => handleFilterSelect(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {filterOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filter Value Input */}
        {isFilterInputVisible && (
          <div className="flex-1 min-w-[200px]">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter Value
            </label>
            <input
              type="text"
              placeholder={getInputPlaceholder()}
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        )}

        {/* Sort By */}
        <div className="flex-1 min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {sortOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Order */}
        <div className="flex-1 min-w-[120px]">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Order
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            disabled={!sortBy}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Apply Button */}
        <button
          onClick={handleApplyFilter}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
        >
          Apply
        </button>

        {/* Clear All Button */}
        <button
          onClick={handleClearAll}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Clear All
        </button>
      </div>

      {/* Active Filters Display */}
      {(currentFilters.searchTerm || currentFilters.city || currentFilters.state || 
        currentFilters.country || currentFilters.companyName || currentFilters.sortBy) && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {currentFilters.searchTerm && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                Search: {currentFilters.searchTerm}
              </span>
            )}
            {currentFilters.city && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                City: {currentFilters.city}
              </span>
            )}
            {currentFilters.state && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                State: {currentFilters.state}
              </span>
            )}
            {currentFilters.country && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                Country: {currentFilters.country}
              </span>
            )}
            {currentFilters.companyName && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                Company: {currentFilters.companyName}
              </span>
            )}
            {currentFilters.sortBy && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                Sort: {currentFilters.sortBy} ({currentFilters.sortOrder})
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerFilters;
