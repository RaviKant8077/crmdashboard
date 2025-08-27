import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useContacts } from '../hooks/useContacts';
import { useCustomers } from '../hooks/useCustomers';
import EnhancedContactTable from '../components/EnhancedContactTable';
import ContactForm from '../components/ContactForm';
import ContactFilters from '../components/ContactFilters';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

const Contacts = () => {
  const { contacts, loading, error, createContact, updateContact, deleteContact, refetch } = useContacts();
  const { customers } = useCustomers();
  const [showModal, setShowModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    customerId: '',
    sortField: 'name',
    sortDirection: 'asc'
  });

  useEffect(() => {
    // Apply filters to contacts
    let filtered = contacts;
    
    if (filters.name) {
      filtered = filtered.filter(contact => 
        contact.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }
    
    if (filters.email) {
      filtered = filtered.filter(contact => 
        contact.email?.toLowerCase().includes(filters.email.toLowerCase())
      );
    }
    
    if (filters.customerId) {
      filtered = filtered.filter(contact => 
        contact.customerId === parseInt(filters.customerId)
      );
    }
    
    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      const fieldA = a[filters.sortField]?.toLowerCase() || '';
      const fieldB = b[filters.sortField]?.toLowerCase() || '';
      
      if (filters.sortDirection === 'asc') {
        return fieldA.localeCompare(fieldB);
      } else {
        return fieldB.localeCompare(fieldA);
      }
    });
    
    setFilteredContacts(sorted);
  }, [contacts, filters]);

  const handleAddContact = () => {
    setEditingContact(null);
    setShowModal(true);
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setShowModal(true);
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteContact(contactId);
        toast.success('Contact deleted successfully');
      } catch (error) {
        toast.error('Failed to delete contact');
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingContact) {
        await updateContact(editingContact.id, formData);
        toast.success('Contact updated successfully');
      } else {
        await createContact(formData);
        toast.success('Contact created successfully');
      }
      setShowModal(false);
    } catch (error) {
      toast.error('Failed to save contact');
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingContact(null);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Contacts</h1>
        <button
          onClick={handleAddContact}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center dark:bg-indigo-700 dark:hover:bg-indigo-800"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Contact
        </button>
      </div>

      <ContactFilters 
        onFilterChange={handleFilterChange} 
        customers={customers} 
      />

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <EnhancedContactTable
        contacts={filteredContacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
        loading={loading}
      />

      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
      >
        <ContactForm
          contact={editingContact}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>
    </div>
  );
};

export default Contacts;
