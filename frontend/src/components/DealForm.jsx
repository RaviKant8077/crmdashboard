import React, { useState, useEffect } from 'react';
import { customerApi } from '../services/api';

const DealForm = ({ deal, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    value: '',
    stage: 'open',
    closeDate: '',
    customerId: '',
    ...deal
  });

  const [customers, setCustomers] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (deal) {
      setFormData({
        name: deal.name || '',
        description: deal.description || '',
        value: deal.value || '',
        stage: deal.stage || 'open',
        priority: deal.priority || 'medium',
        closeDate: deal.closeDate ? deal.closeDate.split('T')[0] : '',
        customerId: deal.customerId || '',
        ...deal
      });
    }
  }, [deal]);

  const fetchCustomers = async () => {
    console.log('Fetching customers for dropdown...');
    try {
      const response = await customerApi.getAllCustomers();
      console.log('Customers for dropdown:', response);
      // Check if response has data property or if it's the data itself
      const customersData = response && (response.data || response);
      if (customersData && Array.isArray(customersData)) {
        setCustomers(customersData);
      } else {
        console.error('Invalid customers data format:', customersData);
        setCustomers([]);
      }
    } catch (error) {
      console.error('Error fetching customers for dropdown:', error);
      setCustomers([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Deal name is required';
    }
    
    if (!formData.value || parseFloat(formData.value) <= 0) {
      newErrors.value = 'Deal value must be greater than 0';
    }
    
    if (!formData.closeDate) {
      newErrors.closeDate = 'Close date is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (validateForm()) {
      const submitData = {
        dealName: formData.name,
        description: formData.description,
        amount: parseFloat(formData.value),
        stage: formData.stage,
        priority: formData.priority,
        dealDate: formData.closeDate,
        customerId: formData.customerId ? parseInt(formData.customerId) : null
      };
      
      // If editing, include the ID
      if (deal && deal.id) {
        onSubmit(deal.id, submitData);
      } else {
        onSubmit(submitData);
      }
    }
    
    // Ensure form doesn't trigger browser refresh
    return false;
  };

  const stages = ['open', 'qualified', 'proposal', 'negotiation', 'won', 'lost'];
  const priorities = ['low', 'medium', 'high'];

  // Find customer name for display when editing
  const getCustomerName = (customerId) => {
    if (!customerId) return '';
    if (!customers || !Array.isArray(customers)) {
      return '';
    }
    const customer = customers.find(c => c.id === parseInt(customerId));
    return customer ? customer.name : '';
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Deal Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-100 ${errors.name ? 'border-red-500' : ''}`}
            required
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Deal Value *
          </label>
          <input
            type="number"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-100 ${errors.value ? 'border-red-500' : ''}`}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
          {errors.value && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.value}</p>}
        </div>

        <div>
          <label htmlFor="stage" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Stage
          </label>
          <select
            id="stage"
            name="stage"
            value={formData.stage}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-100"
          >
            {stages.map(stage => (
              <option key={stage} value={stage}>
                {stage.charAt(0).toUpperCase() + stage.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-100"
          >
            {priorities.map(priority => (
              <option key={priority} value={priority}>
                {priority.charAt(0).toUpperCase() + priority.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="closeDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Close Date *
          </label>
          <input
            type="date"
            id="closeDate"
            name="closeDate"
            value={formData.closeDate}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-100 ${errors.closeDate ? 'border-red-500' : ''}`}
            required
          />
          {errors.closeDate && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.closeDate}</p>}
        </div>

        <div>
          <label htmlFor="customerId" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Customer
          </label>
          <select
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">Select Customer</option>
            {customers && Array.isArray(customers) && customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          {formData.customerId && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Selected: {getCustomerName(formData.customerId)}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-gray-100"
          placeholder="Deal description..."
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {deal ? 'Update Deal' : 'Create Deal'}
        </button>
      </div>
    </form>
  );
};

export default DealForm;
