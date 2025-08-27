import { encryptSensitiveFields, decryptSensitiveFields } from '../utils/encryption';
import { cache, apiCache } from '../utils/cache';

// Base URL for the API
const API_BASE_URL = 'http://localhost:8083/api';
const SENSITIVE_FIELDS = ['password', 'token', 'email']; // Add more fields as needed

// Helper function to handle API errors
const handleApiError = async (response) => {
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`API Error: ${response.status} - ${errorData}`);
  }
  return response;
};

// Get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

// Customer API functions
export const customerApi = {
  // Get all customers
  getAllCustomers: async () => {
    const response = await fetch(`${API_BASE_URL}/customers/allCustomers`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },

  // Get customer by ID
  getCustomerById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/customers/getByCustomerId/${id}`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },

  // Create a new customer
  createCustomer: async (customerData) => {
    const encryptedData = encryptSensitiveFields(customerData, SENSITIVE_FIELDS);
    const response = await fetch(`${API_BASE_URL}/customers/create/customer`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(encryptedData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Update a customer
  updateCustomer: async (id, customerData) => {
    const encryptedData = encryptSensitiveFields(customerData, SENSITIVE_FIELDS);
    const response = await fetch(`${API_BASE_URL}/customers/update/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(encryptedData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Delete a customer
  deleteCustomer: async (id) => {
    const response = await fetch(`${API_BASE_URL}/customers/delete/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    await handleApiError(response);
    // Return empty object for DELETE requests since they return 204 No Content
    return response.status === 204 ? {} : response.json();
  },

  // Search customers by name
  searchCustomersByName: async (name) => {
    const response = await fetch(`${API_BASE_URL}/customers/searchByName?name=${encodeURIComponent(name)}`);
    await handleApiError(response);
    return response.json();
  },

  // Get customers by city
  getCustomersByCity: async (city) => {
    const response = await fetch(`${API_BASE_URL}/customers/byCityName?city=${encodeURIComponent(city)}`);
    await handleApiError(response);
    return response.json();
  },

  // Get customers by state
  getCustomersByState: async (state) => {
    const response = await fetch(`${API_BASE_URL}/customers/byStateName?state=${encodeURIComponent(state)}`);
    await handleApiError(response);
    return response.json();
  },

  // Get customers by country
  getCustomersByCountry: async (country) => {
    const response = await fetch(`${API_BASE_URL}/customers/byCountryName?country=${encodeURIComponent(country)}`);
    await handleApiError(response);
    return response.json();
  },

  // Get customers by user ID
  getCustomersByUserId: async (userId) => {
    const response = await fetch(`${API_BASE_URL}/customers/byUser/${userId}`);
    await handleApiError(response);
    return response.json();
  },
};

// Deal API functions
export const dealApi = {
  // Get all deals
  getAllDeals: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/deals/getAllDeals${queryString ? '?' + queryString : ''}`;
    
    const response = await fetch(url, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },

  // Get deal by ID
  getDealById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/deals/getDealBYId/${id}`,{
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },

  // Create a new deal
  createDeal: async (dealData) => {
    const encryptedData = encryptSensitiveFields(dealData, SENSITIVE_FIELDS);
    const response = await fetch(`${API_BASE_URL}/deals/createDeal`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(encryptedData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Update a deal
  updateDeal: async (id, dealData) => {
    const encryptedData = encryptSensitiveFields(dealData, SENSITIVE_FIELDS);
    const response = await fetch(`${API_BASE_URL}/deals/updateDealById/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(encryptedData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Delete a deal
  deleteDeal: async (id) => {
    const response = await fetch(`${API_BASE_URL}/deals/delete/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    await handleApiError(response);
    // Return empty object for DELETE requests since they return 204 No Content
    return response.status === 204 ? {} : response.json();
  },
};

// Task API functions
export const taskApi = {
  // Get all tasks
  getAllTasks: async () => {
    const response = await fetch(`${API_BASE_URL}/tasks/getAllTask`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },

  // Get task by ID
  getTaskById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/getTaskById/${id}`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },

  // Create a new task
  createTask: async (taskData) => {
    const encryptedData = encryptSensitiveFields(taskData, SENSITIVE_FIELDS);
    const response = await fetch(`${API_BASE_URL}/tasks/createTask`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(encryptedData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Update a task
  updateTask: async (id, taskData) => {
    const encryptedData = encryptSensitiveFields(taskData, SENSITIVE_FIELDS);
    const response = await fetch(`${API_BASE_URL}/tasks/update/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(encryptedData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Delete a task
  deleteTask: async (id) => {
    const response = await fetch(`${API_BASE_URL}/tasks/delete/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    // Return empty object for DELETE requests since they return 204 No Content
    return response.status === 204 ? {} : response.json();
  },
};

// Contact API functions
export const contactApi = {
  // Get all contacts
  getAllContacts: async () => {
    const response = await fetch(`${API_BASE_URL}/contacts/allContact`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },

  // Get contact by ID
  getContactById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },

  // Create a new contact
  createContact: async (contactData) => {
    const encryptedData = encryptSensitiveFields(contactData, SENSITIVE_FIELDS);
    const response = await fetch(`${API_BASE_URL}/contacts/createContact`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(encryptedData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Update a contact
  updateContact: async (id, contactData) => {
    const encryptedData = encryptSensitiveFields(contactData, SENSITIVE_FIELDS);
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(encryptedData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Delete a contact
  deleteContact: async (id) => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    // Return empty object for DELETE requests since they return 204 No Content
    return response.status === 204 ? {} : response.json();
  },
};

// User API functions
export const userApi = {
  // Get all users
  getAllUsers: async () => {
    const response = await fetch(`${API_BASE_URL}/users/getAllUsers`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },

  // Create a new user
  createUser: async (userData) => {
    const encryptedData = encryptSensitiveFields(userData, SENSITIVE_FIELDS);
    const response = await fetch(`${API_BASE_URL}/users/createUser`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(encryptedData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Update a user
  updateUser: async (id, userData) => {
    const encryptedData = encryptSensitiveFields(userData, SENSITIVE_FIELDS);
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(encryptedData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Delete a user
  deleteUser: async (id) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    await handleApiError(response);
    return response.status === 204 ? {} : response.json();
  },

  // Get users by role
  getUsersByRole: async (role) => {
    const response = await fetch(`${API_BASE_URL}/users/byRole?role=${encodeURIComponent(role)}`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },
};

// Note API functions
export const noteApi = {
  // Get all notes
  getAllNotes: async () => {
    const response = await fetch(`${API_BASE_URL}/notes/getAllNotes`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },

  // Get note by ID
  getNoteById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },

  // Create a new note
  createNote: async (noteData) => {
    const response = await fetch(`${API_BASE_URL}/notes/createNote`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(noteData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Update a note
  updateNote: async (id, noteData) => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(noteData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Delete a note
  deleteNote: async (id) => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    await handleApiError(response);
    return response.status === 204 ? {} : response.json();
  },
};

export const searchGlobal = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/search/global?query=${encodeURIComponent(query)}`, {
      headers: getAuthHeaders()
    });
    
    await handleApiError(response);
    const results = await response.json();
    
    // Format results with proper type labels
    return results.map(result => {
      let type = 'Unknown';
      let name = 'Unknown';
      
      // Determine entity type and name based on available fields
      // Use more specific checks to avoid ambiguity
      if (result.email && result.position) {
        // Contact has both email and position fields
        type = 'Contact';
        name = result.name;
      } else if (result.name && result.company && !result.email) {
        // Customer has name and company but no email (contacts have email)
        type = 'Customer';
        name = result.name;
      } else if (result.dealName) {
        type = 'Deal';
        name = result.dealName;
      } else if (result.description && result.dueDate) {
        // Task has description and dueDate
        type = 'Task';
        name = result.description;
      } else if (result.subject && result.content) {
        // Note has subject and content
        type = 'Note';
        name = result.subject;
      } else if (result.username) {
        type = 'User';
        name = result.username;
      } else if (result.name && result.email) {
        // If it has name and email but no position, it's likely a customer
        type = 'Customer';
        name = result.name;
      }
      
      return {
        ...result,
        type: type,
        name: name,
        displayName: `${type}: ${name}`,
        id: result.id // Ensure the ID is included for navigation
      };
    });
  } catch (error) {
    console.error('Global search error:', error);
    return [];
  }
};

// Entity-specific search functions
export const searchApi = {
  // Global search
  global: async (query) => {
    const response = await fetch(`${API_BASE_URL}/search/global?query=${encodeURIComponent(query)}`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },
  
  // Customer search
  customers: async (query) => {
    const response = await fetch(`${API_BASE_URL}/search/customers?query=${encodeURIComponent(query)}`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },
  
  // Deal search
  deals: async (query) => {
    const response = await fetch(`${API_BASE_URL}/search/deals?query=${encodeURIComponent(query)}`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },
  
  // Task search
  tasks: async (query) => {
    const response = await fetch(`${API_BASE_URL}/search/tasks?query=${encodeURIComponent(query)}`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },
  
  // Contact search
  contacts: async (query) => {
    const response = await fetch(`${API_BASE_URL}/search/contacts?query=${encodeURIComponent(query)}`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },
  
  // User search
  users: async (query) => {
    const response = await fetch(`${API_BASE_URL}/search/users?query=${encodeURIComponent(query)}`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  },
  
  // Note search
  notes: async (query) => {
    const response = await fetch(`${API_BASE_URL}/search/notes?query=${encodeURIComponent(query)}`, {
      headers: getAuthHeaders()
    });
    await handleApiError(response);
    return response.json();
  }
};
