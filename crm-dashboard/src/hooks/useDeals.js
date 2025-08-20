import { useState, useEffect } from 'react';
import { dealApi } from '../services/api';
import toast from 'react-hot-toast';

export const useDeals = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    customerId: null,
    sortBy: null,
    sortOrder: 'asc'
  });

  const fetchDeals = async (filterParams = {}) => {
    try {
      setLoading(true);
      const params = {};
      
      if (filterParams.customerId) {
        params.customerId = filterParams.customerId;
      }
      
      if (filterParams.sortBy) {
        params.sortBy = filterParams.sortBy;
        params.sortOrder = filterParams.sortOrder || 'asc';
      }
      
      const data = await dealApi.getAllDeals(params);
      setDeals(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch deals');
    } finally {
      setLoading(false);
    }
  };

  const createDeal = async (dealData) => {
    try {
      const newDeal = await dealApi.createDeal(dealData);
      setDeals(prev => [...prev, newDeal]);
      toast.success('Deal created successfully');
      return newDeal;
    } catch (err) {
      toast.error('Failed to create deal');
      throw err;
    }
  };

  const updateDeal = async (id, dealData) => {
    try {
      const updatedDeal = await dealApi.updateDeal(id, dealData);
      setDeals(prev => prev.map(deal => deal.id === id ? updatedDeal : deal));
      toast.success('Deal updated successfully');
      return updatedDeal;
    } catch (err) {
      toast.error('Failed to update deal');
      throw err;
    }
  };

  const deleteDeal = async (id) => {
    try {
      await dealApi.deleteDeal(id);
      setDeals(prev => prev.filter(deal => deal.id !== id));
      toast.success('Deal deleted successfully');
    } catch (err) {
      toast.error('Failed to delete deal');
      throw err;
    }
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
    fetchDeals(newFilters);
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  return {
    deals,
    loading,
    error,
    createDeal,
    updateDeal,
    deleteDeal,
    fetchDeals,
    applyFilters,
    filters
  };
};
