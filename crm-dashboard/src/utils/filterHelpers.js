// Utility functions for filtering and sorting customers

export const filterCustomers = (customers, filters) => {
  let filtered = [...customers];

  // Apply search filter
  if (filters.searchTerm) {
    const searchTerm = filters.searchTerm.toLowerCase();
    filtered = filtered.filter(customer => 
      customer.name?.toLowerCase().includes(searchTerm) ||
      customer.email?.toLowerCase().includes(searchTerm) ||
      customer.companyName?.toLowerCase().includes(searchTerm)
    );
  }

  // Apply city filter
  if (filters.city) {
    filtered = filtered.filter(customer => 
      customer.city?.toLowerCase() === filters.city.toLowerCase()
    );
  }

  // Apply state filter
  if (filters.state) {
    filtered = filtered.filter(customer => 
      customer.state?.toLowerCase() === filters.state.toLowerCase()
    );
  }

  // Apply country filter
  if (filters.country) {
    filtered = filtered.filter(customer => 
      customer.country?.toLowerCase() === filters.country.toLowerCase()
    );
  }

  // Apply company filter
  if (filters.companyName) {
    filtered = filtered.filter(customer => 
      customer.companyName?.toLowerCase() === filters.companyName.toLowerCase()
    );
  }

  return filtered;
};

export const sortCustomers = (customers, sortBy, sortOrder) => {
  if (!sortBy) return customers;

  return [...customers].sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];

    // Handle null/undefined values
    if (valueA === null || valueA === undefined) valueA = '';
    if (valueB === null || valueB === undefined) valueB = '';

    // Convert to string for comparison
    valueA = String(valueA).toLowerCase();
    valueB = String(valueB).toLowerCase();

    if (sortOrder === 'asc') {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  });
};

export const getActiveFilters = (filters) => {
  const active = [];
  
  if (filters.searchTerm) {
    active.push({ type: 'Search', value: filters.searchTerm });
  }
  if (filters.city) {
    active.push({ type: 'City', value: filters.city });
  }
  if (filters.state) {
    active.push({ type: 'State', value: filters.state });
  }
  if (filters.country) {
    active.push({ type: 'Country', value: filters.country });
  }
  if (filters.companyName) {
    active.push({ type: 'Company', value: filters.companyName });
  }
  if (filters.sortBy) {
    active.push({ 
      type: 'Sort', 
      value: `${filters.sortBy} (${filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'})` 
    });
  }
  
  return active;
};
