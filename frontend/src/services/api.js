// Base URL for the API
const API_BASE_URL = 'http://localhost:8083/api';

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
    const response = await fetch(`${API_BASE_URL}/customers/create/customer`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(customerData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Update a customer
  updateCustomer: async (id, customerData) => {
    const response = await fetch(`${API_BASE_URL}/customers/update/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(customerData),
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
    const response = await fetch(`${API_BASE_URL}/deals/getDealBYId/${id}`);
    await handleApiError(response);
    return response.json();
  },

  // Create a new deal
  createDeal: async (dealData) => {
    const response = await fetch(`${API_BASE_URL}/deals/createDeal`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(dealData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Update a deal
  updateDeal: async (id, dealData) => {
    const response = await fetch(`${API_BASE_URL}/deals/updateDealById/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(dealData),
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
    const response = await fetch(`${API_BASE_URL}/tasks/createTask`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Update a task
  updateTask: async (id, taskData) => {
    const response = await fetch(`${API_BASE_URL}/tasks/update/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(taskData),
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
    const response = await fetch(`${API_BASE_URL}/contacts/createContact`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(contactData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Update a contact
  updateContact: async (id, contactData) => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(contactData),
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
    const response = await fetch(`${API_BASE_URL}/users/createUser`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Update a user
  updateUser: async (id, userData) => {
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData),
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
    const response = await fetch(`${API_BASE_URL}/notes/allNotes`);
    await handleApiError(response);
    return response.json();
  },

  // Get note by ID
  getNoteById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`);
    await handleApiError(response);
    return response.json();
  },

  // Create a new note
  createNote: async (noteData) => {
    const response = await fetch(`${API_BASE_URL}/notes/create/note`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Update a note
  updateNote: async (id, noteData) => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(noteData),
    });
    await handleApiError(response);
    return response.json();
  },

  // Delete a note
  deleteNote: async (id) => {
    const response = await fetch(`${API_BASE_URL}/notes/${id}`, {
      method: 'DELETE',
    });
    await handleApiError(response);
    return response.json();
  },
};
