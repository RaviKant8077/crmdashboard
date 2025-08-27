import React, { useEffect } from 'react';
import { useCustomers } from '../hooks/useCustomers';
import { useDeals } from '../hooks/useDeals';
import { useContacts } from '../hooks/useContacts';
import { useTasks } from '../hooks/useTasks';

const Dashboard = () => {
  const { customers, loading: customersLoading, error: customersError, fetchCustomers } = useCustomers();
  const { deals, loading: dealsLoading, error: dealsError, fetchDeals } = useDeals();
  const { contacts, loading: contactsLoading, error: contactsError, refetch: fetchContacts } = useContacts();
  const { tasks, loading: tasksLoading, error: tasksError, refetch: fetchTasks } = useTasks();

  useEffect(() => {
    fetchCustomers();
    fetchDeals();
    fetchContacts();
    fetchTasks();
  }, []);

  if (customersLoading || dealsLoading || contactsLoading || tasksLoading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  if (customersError || dealsError || contactsError || tasksError) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error loading dashboard: {customersError || dealsError || contactsError || tasksError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Customers</h3>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{customers.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Active Deals</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {dealsLoading ? '...' : deals.filter(deal => deal.stage !== 'Closed').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Pending Tasks</h3>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {tasksLoading ? '...' : tasks.filter(task => task.status === 'Pending').length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Total Contacts</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {contactsLoading ? '...' : contacts.length}
          </p>
        </div>
      </div>

      {/* Recent Activity */}      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                <span className="text-indigo-600 dark:text-indigo-300 font-bold">C</span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">John Doe created</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">New customer account</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-300 font-bold">D</span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Jane Smith updated</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Deal status to Won</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                <span className="text-yellow-600 dark:text-yellow-300 font-bold">T</span>
              </div>
            </div>
            <div className="ml-4">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Mike Johnson completed</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Task "Follow up with client"</p>
              <p className="text-xs text-gray-400 dark:text-gray-500">Yesterday</p>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Upcoming Tasks</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Call client for project update</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Due in 2 days</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">Pending</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Send proposal to new lead</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Due tomorrow</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">In Progress</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Prepare Q3 report</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">Due next week</p>
            </div>
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-full">Not Started</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
