import React, { useState, useEffect } from 'react';
import { customerApi, userApi } from '../services/api';

const DealFilters = ({ onFilterChange, currentFilters }) => {
  const [customers, setCustomers] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchCustomers();
    fetchUsers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await customerApi.getAll();
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await userApi.getAll();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleFilterChange = (filterName, value) => {
    onFilterChange({ ...currentFilters, [filterName]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Customer
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={currentFilters.customerId || ''}
            onChange={(e) => handleFilterChange('customerId', e.target.value)}
          >
            <option value="">All Customers</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Assigned To
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={currentFilters.assignedTo || ''}
            onChange={(e) => handleFilterChange('assignedTo', e.target.value)}
          >
            <option value="">All Users</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={currentFilters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
          >
            <option value="">All Status</option>
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="WON">Won</option>
            <option value="LOST">Lost</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            className="w-full border border-gray-300 rounded-md px-3 py-2"
            value={currentFilters.priority || ''}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
          >
            <option value="">All Priority</option>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DealFilters;
