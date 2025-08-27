import React, { useState, useEffect } from 'react';
import { customerApi, userApi } from '../services/api';

const TaskFilters = ({ onFilterChange, currentFilters }) => {
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFiltersData();
  }, []);

  const loadFiltersData = async () => {
    try {
      const [customersData, usersData] = await Promise.all([
        customerApi.getAllCustomers(),
        userApi.getAllUsers()
      ]);
      setCustomers(customersData);
      setUsers(usersData);
      setLoading(false);
    } catch (error) {
      console.error('Error loading filter data:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...currentFilters };
    
    switch (filterType) {
      case 'customerId':
        newFilters.customerId = value === '' ? null : parseInt(value);
        break;
      case 'status':
        newFilters.status = value === '' ? null : value;
        break;
      case 'priority':
        newFilters.priority = value === '' ? null : value;
        break;
      case 'assignedUserId':
        newFilters.assignedUserId = value === '' ? null : parseInt(value);
        break;
      case 'dueDateFrom':
        newFilters.dueDateFrom = value || null;
        break;
      case 'dueDateTo':
        newFilters.dueDateTo = value || null;
        break;
      case 'sortBy':
        newFilters.sortBy = value === '' ? null : value;
        break;
      case 'sortOrder':
        newFilters.sortOrder = value;
        break;
      default:
        newFilters[filterType] = value;
    }
    
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      customerId: null,
      status: null,
      priority: null,
      assignedUserId: null,
      dueDateFrom: null,
      dueDateTo: null,
      sortBy: null,
      sortOrder: 'asc'
    };
    onFilterChange(clearedFilters);
  };

  const applyFilters = () => {
    onFilterChange(currentFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Customer Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Customer
          </label>
          <select
            value={currentFilters.customerId || ''}
            onChange={(e) => handleFilterChange('customerId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
            disabled={loading}
          >
            <option value="">All Customers</option>
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Status
          </label>
          <select
            value={currentFilters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Priority
          </label>
          <select
            value={currentFilters.priority || ''}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        {/* Assigned User Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Assigned To
          </label>
          <select
            value={currentFilters.assignedUserId || ''}
            onChange={(e) => handleFilterChange('assignedUserId', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
            disabled={loading}
          >
            <option value="">All Users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>

        {/* Due Date Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Due Date From
          </label>
          <input
            type="date"
            value={currentFilters.dueDateFrom || ''}
            onChange={(e) => handleFilterChange('dueDateFrom', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Due Date To
          </label>
          <input
            type="date"
            value={currentFilters.dueDateTo || ''}
            onChange={(e) => handleFilterChange('dueDateTo', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Sort By
          </label>
          <select
            value={currentFilters.sortBy || ''}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">Default</option>
            <option value="title">Title</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
            <option value="createdAt">Created Date</option>
          </select>
        </div>

        {/* Sort Order */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Order
          </label>
          <select
            value={currentFilters.sortOrder}
            onChange={(e) => handleFilterChange('sortOrder', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Apply Filters */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <button
            onClick={applyFilters}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors dark:bg-indigo-700 dark:hover:bg-indigo-800"
          >
            Apply Filters
          </button>
        </div>

        {/* Clear Filters */}
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <button
            onClick={clearFilters}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors dark:bg-gray-600 dark:text-gray-300 dark:hover:bg-gray-500"
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskFilters;
