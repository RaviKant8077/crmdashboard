import React, { useState, useEffect, useMemo } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import CustomerTable from '../components/CustomerTable';
import CustomerForm from '../components/CustomerForm';
import CustomerFilters from '../components/CustomerFilters';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

const Customers = () => {
  const {
    customers: allCustomers,
    loading,
    error,
    fetchCustomers,
    createCustomer,
    updateCustomerData,
    deleteCustomerData
  } = useCustomers();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [filters, setFilters] = useState({
    searchTerm: '',
    city: null,
    state: null,
    country: null,
    companyName: null,
    sortBy: null,
    sortOrder: 'asc'
  });
  const [activeFilters, setActiveFilters] = useState([]);

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  // Validate customer form
  const validateForm = () => {
    const errors = {};
    if (!customerForm.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!customerForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerForm.email)) {
      errors.email = 'Email is invalid';
    }
    return errors;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm({
      ...customerForm,
      [name]: value
    });
  };

  // Open modal for creating a new customer
  const openCreateModal = () => {
    setEditingCustomer(null);
    setCustomerForm({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      city: '',
      state: '',
      country: '',
      postalCode: ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing a customer
  const openEditModal = (customer) => {
    setEditingCustomer(customer);
    setCustomerForm({
      name: customer.name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      companyName: customer.companyName || '',
      city: customer.city || '',
      state: customer.state || '',
      country: customer.country || '',
      postalCode: customer.postalCode || ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCustomer(null);
    setCustomerForm({
      name: '',
      email: '',
      phone: '',
      companyName: '',
      city: '',
      state: '',
      country: '',
      postalCode: ''
    });
    setFormErrors({});
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      if (editingCustomer) {
        await updateCustomerData(editingCustomer.id, customerForm);
      } else {
        await createCustomer(customerForm);
      }
      closeModal();
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  // Handle customer deletion
  const handleDelete = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomerData(customerId);
      } catch (error) {
        // Error is already handled in the hook
      }
    }
  };

  // Filter and sort customers based on active filters
  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = [...allCustomers];

    // Apply search filter
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(customer => 
        customer.name?.toLowerCase().includes(searchTerm) ||
        customer.email?.toLowerCase().includes(searchTerm) ||
        customer.companyName?.toLowerCase().includes(searchTerm)
      );
    }

    // Apply city filter
    if (filters.city) {
      filtered = filtered.filter(customer => 
        customer.city?.toLowerCase() === filters.city.toLowerCase()
      );
    }

    // Apply state filter
    if (filters.state) {
      filtered = filtered.filter(customer => 
        customer.state?.toLowerCase() === filters.state.toLowerCase()
      );
    }

    // Apply country filter
    if (filters.country) {
      filtered = filtered.filter(customer => 
        customer.country?.toLowerCase() === filters.country.toLowerCase()
      );
    }

    // Apply company filter
    if (filters.companyName) {
      filtered = filtered.filter(customer => 
        customer.companyName?.toLowerCase() === filters.companyName.toLowerCase()
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        let valueA = a[filters.sortBy];
        let valueB = b[filters.sortBy];

        // Handle null/undefined values
        if (valueA === null || valueA === undefined) valueA = '';
        if (valueB === null || valueB === undefined) valueB = '';

        // Convert to string for comparison
        valueA = String(valueA).toLowerCase();
        valueB = String(valueB).toLowerCase();

        if (filters.sortOrder === 'asc') {
          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        } else {
          return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
        }
      });
    }

    return filtered;
  }, [allCustomers, filters]);

  // Update active filters display
  useEffect(() => {
    const newActiveFilters = [];
    
    if (filters.searchTerm) {
      newActiveFilters.push({ type: 'Search', value: filters.searchTerm });
    }
    if (filters.city) {
      newActiveFilters.push({ type: 'City', value: filters.city });
    }
    if (filters.state) {
      newActiveFilters.push({ type: 'State', value: filters.state });
    }
    if (filters.country) {
      newActiveFilters.push({ type: 'Country', value: filters.country });
    }
    if (filters.companyName) {
      newActiveFilters.push({ type: 'Company', value: filters.companyName });
    }
    if (filters.sortBy) {
      newActiveFilters.push({ 
        type: 'Sort', 
        value: `${filters.sortBy} (${filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'})` 
      });
    }
    
    setActiveFilters(newActiveFilters);
  }, [filters]);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Customers</h1>
          <button
            onClick={openCreateModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center dark:bg-indigo-700 dark:hover:bg-indigo-800"
          >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Customer
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700 dark:text-red-300">
                {error}
              </p>
            </div>
          </div>
        </div>
      )}

      <CustomerFilters 
        onFilterChange={setFilters}
        currentFilters={filters}
      />

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Active Filters: </span>
              <div className="inline-flex flex-wrap gap-2 ml-2">
                {activeFilters.map((filter, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200">
                    {filter.type}: {filter.value}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredAndSortedCustomers.length} results
            </span>
          </div>
        </div>
      )}
      
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
        <CustomerTable
          customers={filteredAndSortedCustomers}
          onEdit={openEditModal}
          onDelete={handleDelete}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCustomer ? 'Edit Customer' : 'Create Customer'}
        onSubmit={handleSubmit}
      >
        <CustomerForm
          customer={customerForm}
          onChange={handleInputChange}
          errors={formErrors}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Customers;
