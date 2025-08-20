import { useState, useEffect } from 'react';
import { noteApi } from '../services/api';
import toast from 'react-hot-toast';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await noteApi.getAllNotes();
      setNotes(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch notes');
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (noteData) => {
    try {
      const newNote = await noteApi.createNote(noteData);
      setNotes(prev => [...prev, newNote]);
      toast.success('Note created successfully');
      return newNote;
    } catch (err) {
      toast.error('Failed to create note');
      throw err;
    }
  };

  const updateNote = async (id, noteData) => {
    try {
      const updatedNote = await noteApi.updateNote(id, noteData);
      setNotes(prev => prev.map(note => note.id === id ? updatedNote : note));
      toast.success('Note updated successfully');
      return updatedNote;
    } catch (err) {
      toast.error('Failed to update note');
      throw err;
    }
  };

  const deleteNote = async (id) => {
    try {
      await noteApi.deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
      toast.success('Note deleted successfully');
    } catch (err) {
      toast.error('Failed to delete note');
      throw err;
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    refetch: fetchNotes
  };
};
