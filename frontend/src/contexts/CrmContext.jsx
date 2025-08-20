import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  customers: [],
  deals: [],
  tasks: [],
  contacts: [],
  notes: [],
  loading: false,
  error: null,
};

// Action types
const ACTIONS = {
  SET_CUSTOMERS: 'SET_CUSTOMERS',
  SET_DEALS: 'SET_DEALS',
  SET_TASKS: 'SET_TASKS',
  SET_CONTACTS: 'SET_CONTACTS',
  SET_NOTES: 'SET_NOTES',
  ADD_CUSTOMER: 'ADD_CUSTOMER',
  UPDATE_CUSTOMER: 'UPDATE_CUSTOMER',
  DELETE_CUSTOMER: 'DELETE_CUSTOMER',
  ADD_DEAL: 'ADD_DEAL',
  UPDATE_DEAL: 'UPDATE_DEAL',
  DELETE_DEAL: 'DELETE_DEAL',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
};

// Reducer
const crmReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };
    case ACTIONS.SET_DEALS:
      return {
        ...state,
        deals: action.payload,
      };
    case ACTIONS.SET_TASKS:
      return {
        ...state,
        tasks: action.payload,
      };
    case ACTIONS.SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload,
      };
    case ACTIONS.SET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    case ACTIONS.ADD_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };
    case ACTIONS.UPDATE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer.id === action.payload.id ? action.payload : customer
        ),
      };
    case ACTIONS.DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(customer => customer.id !== action.payload),
      };
    case ACTIONS.ADD_DEAL:
      return {
        ...state,
        deals: [...state.deals, action.payload],
      };
    case ACTIONS.UPDATE_DEAL:
      return {
        ...state,
        deals: state.deals.map(deal =>
          deal.id === action.payload.id ? action.payload : deal
        ),
      };
    case ACTIONS.DELETE_DEAL:
      return {
        ...state,
        deals: state.deals.filter(deal => deal.id !== action.payload),
      };
    case ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Create context
const CrmContext = createContext();

// Provider component
export const CrmProvider = ({ children }) => {
  const [state, dispatch] = useReducer(crmReducer, initialState);

  // Action creators
  const setCustomers = (customers) => {
    dispatch({ type: ACTIONS.SET_CUSTOMERS, payload: customers });
  };

  const setDeals = (deals) => {
    dispatch({ type: ACTIONS.SET_DEALS, payload: deals });
  };

  const setTasks = (tasks) => {
    dispatch({ type: ACTIONS.SET_TASKS, payload: tasks });
  };

  const setContacts = (contacts) => {
    dispatch({ type: ACTIONS.SET_CONTACTS, payload: contacts });
  };

  const setNotes = (notes) => {
    dispatch({ type: ACTIONS.SET_NOTES, payload: notes });
  };

  const addCustomer = (customer) => {
    dispatch({ type: ACTIONS.ADD_CUSTOMER, payload: customer });
  };

  const updateCustomer = (customer) => {
    dispatch({ type: ACTIONS.UPDATE_CUSTOMER, payload: customer });
  };

  const deleteCustomer = (customerId) => {
    dispatch({ type: ACTIONS.DELETE_CUSTOMER, payload: customerId });
  };

  const addDeal = (deal) => {
    dispatch({ type: ACTIONS.ADD_DEAL, payload: deal });
  };

  const updateDeal = (deal) => {
    dispatch({ type: ACTIONS.UPDATE_DEAL, payload: deal });
  };

  const deleteDeal = (dealId) => {
    dispatch({ type: ACTIONS.DELETE_DEAL, payload: dealId });
  };

  const setLoading = (loading) => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: loading });
  };

  const setError = (error) => {
    dispatch({ type: ACTIONS.SET_ERROR, payload: error });
  };

  const clearError = () => {
    dispatch({ type: ACTIONS.CLEAR_ERROR });
  };

  return (
    <CrmContext.Provider
      value={{
        ...state,
        setCustomers,
        setDeals,
        setTasks,
        setContacts,
        setNotes,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        addDeal,
        updateDeal,
        deleteDeal,
        setLoading,
        setError,
        clearError,
      }}
    >
      {children}
    </CrmContext.Provider>
  );
};

// Custom hook to use the context
export const useCrm = () => {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error('useCrm must be used within a CrmProvider');
  }
  return context;
};
