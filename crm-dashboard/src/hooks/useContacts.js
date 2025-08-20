import { useState, useEffect } from 'react';
import { contactApi } from '../services/api';
import toast from 'react-hot-toast';

export const useContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const data = await contactApi.getAllContacts();
      setContacts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const createContact = async (contactData) => {
    try {
      const newContact = await contactApi.createContact(contactData);
      setContacts(prev => [...prev, newContact]);
      toast.success('Contact created successfully');
      return newContact;
    } catch (err) {
      toast.error('Failed to create contact');
      throw err;
    }
  };

  const updateContact = async (id, contactData) => {
    try {
      const updatedContact = await contactApi.updateContact(id, contactData);
      setContacts(prev => prev.map(contact => contact.id === id ? updatedContact : contact));
      toast.success('Contact updated successfully');
      return updatedContact;
    } catch (err) {
      toast.error('Failed to update contact');
      throw err;
    }
  };

  const deleteContact = async (id) => {
    try {
      await contactApi.deleteContact(id);
      setContacts(prev => prev.filter(contact => contact.id !== id));
      toast.success('Contact deleted successfully');
    } catch (err) {
      toast.error('Failed to delete contact');
      throw err;
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    loading,
    error,
    createContact,
    updateContact,
    deleteContact,
    refetch: fetchContacts
  };
};
