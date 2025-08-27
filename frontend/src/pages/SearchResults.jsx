import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { customerApi, dealApi, taskApi, contactApi, userApi, noteApi } from '../services/api';

const SearchResults = () => {
  const [result, setResult] = useState({ type: '', data: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResultDetails = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const type = searchParams.get('type');
        const id = searchParams.get('id');

        if (!type || !id) {
          setError('Invalid search result');
          setLoading(false);
          return;
        }

        let data;
        switch (type) {
          case 'Customer':
            data = await customerApi.getCustomerById(id);
            break;
          case 'Deal':
            data = await dealApi.getDealById(id);
            break;
          case 'Task':
            data = await taskApi.getTaskById(id);
            break;
          case 'Contact':
            data = await contactApi.getContactById(id);
            break;
          case 'User':
            data = await userApi.getUserById(id);
            break;
          case 'Note':
            data = await noteApi.getNoteById(id);
            break;
          default:
            throw new Error('Unknown result type');
        }

        setResult({ type, data });
      } catch (err) {
        setError('Failed to load result details');
        console.error('Error fetching result:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResultDetails();
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500 dark:text-red-400 text-center">
          <p className="text-lg font-semibold">{error}</p>
          <button 
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500 dark:text-gray-400">No result found</p>
      </div>
    );
  }

  const renderCustomerDetails = (customer) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Customer Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700 dark:text-gray-300"><strong>Name:</strong> {customer.name}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {customer.email}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> {customer.phone}</p>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300"><strong>Company:</strong> {customer.company}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Industry:</strong> {customer.industry}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Status:</strong> {customer.status}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 dark:text-gray-300"><strong>Address:</strong> {customer.address}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>City:</strong> {customer.city}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>State:</strong> {customer.state}</p>
        <p className="text-gray-700 dark:text-gray-300"><strong>Country:</strong> {customer.country}</p>
      </div>
    </div>
  );

  const renderDealDetails = (deal) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Deal Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700 dark:text-gray-300"><strong>Deal Name:</strong> {deal.dealName}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Amount:</strong> ${deal.amount}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Stage:</strong> {deal.stage}</p>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300"><strong>Priority:</strong> {deal.priority}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Deal Date:</strong> {new Date(deal.dealDate).toLocaleDateString()}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Customer:</strong> {deal.customer?.name}</p>
        </div>
      </div>
    </div>
  );

  const renderTaskDetails = (task) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Task Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700 dark:text-gray-300"><strong>Description:</strong> {task.description}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Status:</strong> {task.status}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Priority:</strong> {task.priority}</p>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300"><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Customer:</strong> {task.customer?.name}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Assigned User:</strong> {task.assignedUser?.username}</p>
        </div>
      </div>
    </div>
  );

  const renderContactDetails = (contact) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Contact Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700 dark:text-gray-300"><strong>Name:</strong> {contact.name}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {contact.email}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Phone:</strong> {contact.phone}</p>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300"><strong>Position:</strong> {contact.position}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Customer:</strong> {contact.customer?.name}</p>
        </div>
      </div>
    </div>
  );

  const renderUserDetails = (user) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">User Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-gray-700 dark:text-gray-300"><strong>Username:</strong> {user.username}</p>
          <p className="text-gray-700 dark:text-gray-300"><strong>Email:</strong> {user.email}</p>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300"><strong>Roles:</strong> {user.roles?.join(', ')}</p>
        </div>
      </div>
    </div>
  );

  const renderNoteDetails = (note) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Note Details</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <p className="text-gray-700 dark:text-gray-300"><strong>Content:</strong></p>
          <p className="mt-2 p-4 bg-gray-50 dark:bg-gray-700 rounded text-gray-800 dark:text-gray-200">{note.content}</p>
        </div>
        <div>
          <p className="text-gray-700 dark:text-gray-300"><strong>Created:</strong> {new Date(note.createdAt).toLocaleString()}</p>
          {note.customer && <p className="text-gray-700 dark:text-gray-300"><strong>Customer:</strong> {note.customer.name}</p>}
          {note.deal && <p className="text-gray-700 dark:text-gray-300"><strong>Deal:</strong> {note.deal.dealName}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 mb-4 dark:bg-gray-600 dark:hover:bg-gray-700"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Search Result Details</h1>
      </div>

      {result.type === 'Customer' && renderCustomerDetails(result.data)}
      {result.type === 'Deal' && renderDealDetails(result.data)}
      {result.type === 'Task' && renderTaskDetails(result.data)}
      {result.type === 'Contact' && renderContactDetails(result.data)}
      {result.type === 'User' && renderUserDetails(result.data)}
      {result.type === 'Note' && renderNoteDetails(result.data)}
    </div>
  );
};

export default SearchResults;
