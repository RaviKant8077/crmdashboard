import { useState, useEffect } from 'react';
import { customerApi } from '../services/api';
import { useCrm } from '../contexts/CrmContext';
import toast from 'react-hot-toast';

export const useCustomers = () => {
  const { 
    customers, 
    setCustomers, 
    addCustomer, 
    updateCustomer, 
    deleteCustomer,
    setLoading,
    setError,
    clearError
  } = useCrm();
  
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  // Fetch all customers
  const fetchCustomers = async () => {
    try {
      setLocalLoading(true);
      clearError();
      const data = await customerApi.getAllCustomers();
      setCustomers(data);
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch customers';
      setError(errorMessage);
      setLocalError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLocalLoading(false);
    }
  };

  // Create a new customer
  const createCustomer = async (customerData) => {
    try {
      setLocalLoading(true);
      clearError();
      const newCustomer = await customerApi.createCustomer(customerData);
      addCustomer(newCustomer);
      toast.success('Customer created successfully');
      return newCustomer;
    } catch (error) {
      const errorMessage = error.message || 'Failed to create customer';
      setError(errorMessage);
      setLocalError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLocalLoading(false);
    }
  };

  // Update a customer
  const updateCustomerData = async (id, customerData) => {
    try {
      setLocalLoading(true);
      clearError();
      const updatedCustomer = await customerApi.updateCustomer(id, customerData);
      updateCustomer(updatedCustomer);
      toast.success('Customer updated successfully');
      return updatedCustomer;
    } catch (error) {
      const errorMessage = error.message || 'Failed to update customer';
      setError(errorMessage);
      setLocalError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLocalLoading(false);
    }
  };

  // Delete a customer and refresh list
  const deleteCustomerData = async (id) => {
    try {
      setLocalLoading(true);
      clearError();
      await customerApi.deleteCustomer(id);
      deleteCustomer(id);
      
      // Refresh customer list after deletion
      await fetchCustomers();
      
      toast.success('Customer deleted successfully');
    } catch (error) {
      const errorMessage = error.message || 'Failed to delete customer';
      setError(errorMessage);
      setLocalError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLocalLoading(false);
    }
  };

  // Search customers by name
  const searchCustomers = async (name) => {
    try {
      setLocalLoading(true);
      clearError();
      const data = await customerApi.searchCustomersByName(name);
      setCustomers(data);
    } catch (error) {
      const errorMessage = error.message || 'Failed to search customers';
      setError(errorMessage);
      setLocalError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLocalLoading(false);
    }
  };

  // Get customers by city
  const getCustomersByCity = async (city) => {
    try {
      setLocalLoading(true);
      clearError();
      const data = await customerApi.getCustomersByCity(city);
      setCustomers(data);
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch customers by city';
      setError(errorMessage);
      setLocalError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLocalLoading(false);
    }
  };

  // Get customers by state
  const getCustomersByState = async (state) => {
    try {
      setLocalLoading(true);
      clearError();
      const data = await customerApi.getCustomersByState(state);
      setCustomers(data);
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch customers by state';
      setError(errorMessage);
      setLocalError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLocalLoading(false);
    }
  };

  // Get customers by country
  const getCustomersByCountry = async (country) => {
    try {
      setLocalLoading(true);
      clearError();
      const data = await customerApi.getCustomersByCountry(country);
      setCustomers(data);
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch customers by country';
      setError(errorMessage);
      setLocalError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLocalLoading(false);
    }
  };

  // Fetch individual customer details
  const fetchCustomerDetails = async (id) => {
    try {
      setLocalLoading(true);
      clearError();
      const customer = await customerApi.getCustomerById(id);
      return customer;
    } catch (error) {
      const errorMessage = error.message || 'Failed to fetch customer details';
      setError(errorMessage);
      setLocalError(errorMessage);
      toast.error(errorMessage);
      throw error;
    } finally {
      setLocalLoading(false);
    }
  };

  return {
    customers,
    loading: localLoading,
    error: localError,
    fetchCustomers,
    fetchCustomerDetails,
    createCustomer,
    updateCustomerData,
    deleteCustomerData,
    searchCustomers,
    getCustomersByCity,
    getCustomersByState,
    getCustomersByCountry,
  };
};
