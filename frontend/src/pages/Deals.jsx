import React, { useState, useEffect } from 'react';
import DealTable from '../components/DealTable';
import DealForm from '../components/DealForm';
import Modal from '../components/Modal';
import DealFilters from '../components/DealFilters';
import { useDeals } from '../hooks/useDeals';
import { useUsers } from '../hooks/useUsers';
import { customerApi } from '../services/api';

const Deals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [filteredDeals, setFilteredDeals] = useState([]);
  const { deals, loading, error, createDeal, updateDeal, deleteDeal, fetchDeals, applyFilters, filters } = useDeals();
  const { users } = useUsers();
  console.log('Users in Deals page:', users);

  useEffect(() => {
    fetchCustomers();
    // Initialize filtered deals with all deals
    setFilteredDeals(deals);
  }, [deals]);

  const fetchCustomers = async () => {
    console.log('Fetching customers...');
    try {
      const response = await customerApi.getAllCustomers();
      console.log('Customers fetched:', response);
      // Check if response has data property or if it's the data itself
      const customersData = response.data || response;
      setCustomers(customersData);
    } catch (error) {
      console.error('Error fetching customers:', error);
      alert('Failed to load customers. Please try again later.');
    }
  };

  const handleCreate = async (dealData) => {
    try {
      await createDeal(dealData);
      setIsModalOpen(false);
      setSelectedDeal(null);
    } catch (error) {
      console.error('Error creating deal:', error);
    }
  };

  const handleUpdate = async (id, dealData) => {
    try {
      await updateDeal(id, dealData);
      setSelectedDeal(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating deal:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this deal?')) {
      try {
        await deleteDeal(id);
        // No need to refetch - the hook already updates local state
      } catch (error) {
        console.error('Error deleting deal:', error);
      }
    }
  };

  const handleEdit = (deal) => {
    setSelectedDeal(deal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDeal(null);
  };

  const handleFilterChange = (newFilters) => {
    applyFilters(newFilters);
    // Filter deals based on the new filters
    const filteredDeals = deals.filter(deal => {
      const matchesCustomer = newFilters.customerId ? deal.customerId === newFilters.customerId : true;
      const matchesAssignedTo = newFilters.assignedTo ? deal.assignedTo === newFilters.assignedTo : true;
      return matchesCustomer && matchesAssignedTo;
    });
    setFilteredDeals(filteredDeals);
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading deals...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-md p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error loading deals</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <p>{error}</p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => fetchDeals()}
                  className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-500 dark:hover:text-red-300"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Deals</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center dark:bg-indigo-700 dark:hover:bg-indigo-800"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Deal
        </button>
      </div>

      <DealFilters 
        onFilterChange={handleFilterChange} 
        currentFilters={filters}
        users={users}
      />

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">All Deals</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {filteredDeals.length} {filteredDeals.length === 1 ? 'deal' : 'deals'} found
          </p>
        </div>
        
        {filteredDeals.length === 0 ? (
          <div className="p-12 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">No deals found</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No deals match your current filters.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setIsModalOpen(true)}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Deal
                </button>
            </div>
          </div>
        ) : (
          <DealTable 
            deals={filteredDeals} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
            customers={customers}
          />
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
            {selectedDeal ? 'Edit Deal' : 'Create New Deal'}
          </h2>
          <DealForm
            deal={selectedDeal}
            onSubmit={selectedDeal ? handleUpdate : handleCreate}
            onCancel={handleCloseModal}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Deals;
