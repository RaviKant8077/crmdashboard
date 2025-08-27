import React, { useState, useEffect } from 'react';
import { customerApi } from '../services/api';

const DealFilters = ({ onFilterChange, currentFilters, users = [] }) => {
  const [customers, setCustomers] = useState([]);
  console.log('Users in DealFilters:', users); // Debug log
  console.log('Users array check:', Array.isArray(users)); // Check if it's an array
  console.log('Users length:', users ? users.length : 0); // Check the length
  if (users && Array.isArray(users) && users.length > 0) {
    console.log('First user:', users[0]); // Check the structure of first user
    console.log('First user has id:', users[0].hasOwnProperty('id'));
    console.log('First user has name:', users[0].hasOwnProperty('name'));
  } else {
    console.log('Users data is empty or not an array');
  }

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await customerApi.getAllCustomers();
      console.log('Customers for filters:', response);
      // Check if response has data property or if it's the data itself
      const customersData = response && (response.data || response);
      if (customersData && Array.isArray(customersData)) {
        setCustomers(customersData);
      } else {
        console.error('Invalid customers data format:', customersData);
        setCustomers([]);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
      setCustomers([]);
    }
  };

  const handleFilterChange = (filterName, value) => {
    onFilterChange({ ...currentFilters, [filterName]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      customerId: '',
      assignedTo: '',
      status: '',
      priority: ''
    });
  };

  // Define all available deal stages based on DealForm component
  const dealStages = ['open', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4 border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Filter Deals</h3>
        <button
          onClick={clearFilters}
          className="px-3 py-1 text-sm text-gray-600 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Clear Filters
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Customer
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 dark:bg-gray-700 dark:text-gray-100"
            value={currentFilters.customerId || ''}
            onChange={(e) => handleFilterChange('customerId', e.target.value)}
          >
            <option value="">All Customers</option>
            {customers && Array.isArray(customers) && customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Assigned To
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 dark:bg-gray-700 dark:text-gray-100"
            value={currentFilters.assignedTo || ''}
            onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
          >
            <option value="">All Users</option>
            {users && Array.isArray(users) && users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Stage
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 dark:bg-gray-700 dark:text-gray-100"
            value={currentFilters.stage || ''}
            onChange={(e) => handleFilterChange('stage', e.target.value)}
          >
            <option value="">All Stages</option>
            {dealStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage.charAt(0).toUpperCase() + stage.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority
          </label>
          <select
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 dark:bg-gray-700 dark:text-gray-100"
            value={currentFilters.priority || ''}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DealFilters;
