import { useState, useEffect } from 'react';
import { userApi } from '../services/api';

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const usersData = await userApi.getAllUsers();
      setUsers(usersData);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const newUser = await userApi.createUser(userData);
      setUsers(prev => [...prev, newUser]);
      return newUser;
    } catch (err) {
      setError(err.message);
      console.error('Error creating user:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    // Validate ID before making API call
    if (id === null || id === undefined || id === 'null' || id === '') {
      const errorMsg = `Invalid user ID: ${id}`;
      setError(errorMsg);
      console.error('Error updating user:', errorMsg);
      throw new Error(errorMsg);
    }

    setLoading(true);
    setError(null);
    try {
      const updatedUser = await userApi.updateUser(id, userData);
      setUsers(prev => prev.map(user => user.id === id ? updatedUser : user));
      return updatedUser;
    } catch (err) {
      setError(err.message);
      console.error('Error updating user:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    // Validate ID before making API call
    if (id === null || id === undefined || id === 'null' || id === '') {
      const errorMsg = `Invalid user ID: ${id}`;
      setError(errorMsg);
      console.error('Error deleting user:', errorMsg);
      throw new Error(errorMsg);
    }

    setLoading(true);
    setError(null);
    try {
      await userApi.deleteUser(id);
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting user:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUserById = async (id) => {
    // Validate ID before making API call
    if (id === null || id === undefined || id === 'null' || id === '') {
      const errorMsg = `Invalid user ID: ${id}`;
      setError(errorMsg);
      console.error('Error fetching user:', errorMsg);
      throw new Error(errorMsg);
    }

    setLoading(true);
    setError(null);
    try {
      const user = await userApi.getUserById(id);
      return user;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching user:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUsersByRole = async (role) => {
    setLoading(true);
    setError(null);
    try {
      const usersByRole = await userApi.getUsersByRole(role);
      return usersByRole;
    } catch (err) {
      setError(err.message);
      console.error('Error fetching users by role:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getUsersByRole
  };
};
