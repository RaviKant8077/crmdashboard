import { useState, useEffect } from 'react';
import { taskApi } from '../services/api';
import toast from 'react-hot-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    customerId: null,
    status: null,
    priority: null,
    assignedUserId: null,
    dueDateFrom: null,
    dueDateTo: null,
    sortBy: null,
    sortOrder: 'asc'
  });

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await taskApi.getAllTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const createTask = async (taskData) => {
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      toast.success('Task created successfully');
      return newTask;
    } catch (err) {
      toast.error('Failed to create task');
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      // Ensure all required fields are present and properly formatted
      const sanitizedTaskData = {
        description: taskData.description || '',
        dueDate: taskData.dueDate || '',
        status: taskData.status || 'Pending',
        priority: taskData.priority || 'Medium',
        customer: taskData.customer || { id: null }
      };
      
      const updatedTask = await taskApi.updateTask(id, sanitizedTaskData);
      
      // Force refresh the tasks list to ensure UI updates
      await fetchTasks();
      
      toast.success('Task updated successfully');
      return updatedTask;
    } catch (err) {
      // Removed debug log for task update error
      toast.error('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (err) {
      toast.error('Failed to delete task');
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
    applyFilters,
    filters
  };
};
