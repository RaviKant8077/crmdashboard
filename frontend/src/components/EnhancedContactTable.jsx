import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Mail, Phone, User } from 'lucide-react';
import { customerApi } from '../services/api';

const EnhancedContactTable = ({ contacts, onEdit, onDelete, loading }) => {
  const [customerNames, setCustomerNames] = useState({});
  const [loadingCustomers, setLoadingCustomers] = useState(false);

  // Fetch customer names for all unique customer IDs
  useEffect(() => {
    const fetchCustomerNames = async () => {
      if (!contacts || contacts.length === 0) {
        setCustomerNames({});
        return;
      }
      
      const customerIds = [...new Set(contacts.map(contact => contact.customerId).filter(Boolean))];
      if (customerIds.length === 0) {
        setCustomerNames({});
        return;
      }

      setLoadingCustomers(true);
      const namesMap = {};
      
      try {
        await Promise.all(
          customerIds.map(async (customerId) => {
            try {
              const customer = await customerApi.getCustomerById(customerId);
              namesMap[customerId] = customer.name;
            } catch (error) {
              console.error(`Error fetching customer ${customerId}:`, error);
              namesMap[customerId] = `Customer ${customerId}`;
            }
          })
        );
        setCustomerNames(namesMap);
      } catch (error) {
        console.error('Error fetching customer names:', error);
      } finally {
        setLoadingCustomers(false);
      }
    };

    fetchCustomerNames();
  }, [contacts]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">No contacts found</h3>
        <p className="text-gray-500 dark:text-gray-400">Get started by creating a new contact.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {contacts.map((contact) => (
            <tr key={contact.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                      <User className="h-5 w-5 text-indigo-600 dark:text-indigo-300" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">{contact.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                  <Mail className="w-4 h-4 mr-2 text-gray-400" />
                  {contact.email || 'N/A'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-900 dark:text-gray-100">
                  <Phone className="w-4 h-4 mr-2 text-gray-400" />
                  {contact.phone || 'N/A'}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {contact.position || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {loadingCustomers ? (
                  <span className="text-gray-400">Loading...</span>
                ) : (
                  customerNames[contact.customerId] || `Customer ${contact.customerId}` || 'N/A'
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit(contact)}
                  className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 mr-3"
                  title="Edit contact"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(contact.id)}
                  className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  title="Delete contact"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EnhancedContactTable;
