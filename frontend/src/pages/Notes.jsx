import React, { useState, useEffect, useMemo } from 'react';
import { useNotes } from '../hooks/useNotes';
import { customerApi, dealApi } from '../services/api';
import NoteTable from '../components/NoteTable';
import NoteForm from '../components/NoteForm';
import NoteFilters from '../components/NoteFilters';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';

const Notes = () => {
  const {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    refetch
  } = useNotes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [noteForm, setNoteForm] = useState({
    content: '',
    customerId: '',
    dealId: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [customers, setCustomers] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loadingCustomers, setLoadingCustomers] = useState(false);
  const [loadingDeals, setLoadingDeals] = useState(false);
  const [filters, setFilters] = useState({
    content: '',
    customerId: '',
    dealId: '',
    sortField: 'createdAt',
    sortDirection: 'desc'
  });

  // Fetch notes, customers, and deals on component mount
  useEffect(() => {
    refetch();
    fetchCustomers();
    fetchDeals();
  }, []);

  // Filter and sort notes based on filters
  const filteredAndSortedNotes = useMemo(() => {
    let filtered = [...notes];

    // Filter by content
    if (filters.content) {
      filtered = filtered.filter(note =>
        note.content.toLowerCase().includes(filters.content.toLowerCase())
      );
    }

    // Filter by customer
    if (filters.customerId) {
      filtered = filtered.filter(note =>
        note.customerId === parseInt(filters.customerId)
      );
    }

    // Filter by deal
    if (filters.dealId) {
      filtered = filtered.filter(note =>
        note.dealId === parseInt(filters.dealId)
      );
    }

    // Sort notes
    filtered.sort((a, b) => {
      let aValue, bValue;

      if (filters.sortField === 'createdAt') {
        aValue = new Date(a.createdAt);
        bValue = new Date(b.createdAt);
      } else if (filters.sortField === 'content') {
        aValue = a.content.toLowerCase();
        bValue = b.content.toLowerCase();
      }

      if (filters.sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [notes, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const fetchCustomers = async () => {
    try {
      setLoadingCustomers(true);
      const customersData = await customerApi.getAllCustomers();
      setCustomers(customersData);
    } catch (error) {
      toast.error('Failed to fetch customers');
    } finally {
      setLoadingCustomers(false);
    }
  };

  const fetchDeals = async () => {
    try {
      setLoadingDeals(true);
      const dealsData = await dealApi.getAllDeals();
      setDeals(dealsData);
    } catch (error) {
      toast.error('Failed to fetch deals');
    } finally {
      setLoadingDeals(false);
    }
  };

  // Validate note form
  const validateForm = () => {
    const errors = {};
    if (!noteForm.content.trim()) {
      errors.content = 'Content is required';
    }
    return errors;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNoteForm({
      ...noteForm,
      [name]: value
    });
  };

  // Open modal for creating a new note
  const openCreateModal = () => {
    setEditingNote(null);
    setNoteForm({
      content: '',
      customerId: '',
      dealId: ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Open modal for editing a note
  const openEditModal = (note) => {
    setEditingNote(note);
    setNoteForm({
      content: note.content || '',
      customerId: note.customerId || '',
      dealId: note.dealId || ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
    setNoteForm({
      content: '',
      customerId: '',
      dealId: ''
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
      const noteData = {
        content: noteForm.content,
        customerId: noteForm.customerId ? parseInt(noteForm.customerId) : null,
        dealId: noteForm.dealId ? parseInt(noteForm.dealId) : null
      };

      if (editingNote) {
        await updateNote(editingNote.id, noteData);
      } else {
        await createNote(noteData);
      }
      closeModal();
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  // Handle note deletion
  const handleDelete = async (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(noteId);
      } catch (error) {
        // Error is already handled in the hook
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Notes</h1>
        <button
          onClick={openCreateModal}
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md flex items-center dark:bg-indigo-700 dark:hover:bg-indigo-800"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Add Note
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

      {!loading && !error && (
        <>
          <NoteFilters
            onFilterChange={handleFilterChange}
            customers={customers}
            deals={deals}
          />
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <NoteTable
              notes={filteredAndSortedNotes}
              customers={customers}
              deals={deals}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          </div>
        </>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingNote ? 'Edit Note' : 'Create Note'}
        onSubmit={handleSubmit}
      >
        <NoteForm
          note={noteForm}
          onChange={handleInputChange}
          errors={formErrors}
          onSubmit={handleSubmit}
        />
      </Modal>
    </div>
  );
};

export default Notes;
