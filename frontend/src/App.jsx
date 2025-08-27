import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Link, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import AutoLogoutHandler from './components/AutoLogoutHandler';
import ThemeToggle from './components/ThemeToggle';
import Customers from './pages/Customers';
import Deals from './pages/Deals';
import Tasks from './pages/Tasks';
import Contacts from './pages/Contacts';
import Notes from './pages/Notes';
import Users from './pages/Users';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import SearchResults from './pages/SearchResults';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import PublicLayout from './components/PublicLayout';
import { searchGlobal } from './services/api';

// Main App Component with Sidebar (Protected Routes)
const AppContent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLabels, setShowLabels] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleSearch = async (query) => {
    if (query.trim().length < 2) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchGlobal(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
  };

  const navigate = useNavigate();

  const handleResultClick = (result) => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
    
    // Navigate to the search results page with type and id parameters
    navigate(`/search-results?type=${result.type}&id=${result.id}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // If user is not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-0`}>
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <button 
            className="mr-3 p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            onClick={() => setShowLabels(!showLabels)}
            aria-label="Toggle navigation labels"
          >
            <div className="flex flex-col space-y-1">
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
            </div>
          </button>
          <h1 className="text-xl font-bold">CRM Dashboard</h1>
        </div>
        <nav className="mt-5">
          <Link 
            to="/" 
            className={`flex items-center px-4 py-2 mt-1 ${isActive('/') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
            {showLabels && <span>Dashboard</span>}
          </Link>
            <Link 
              to="/customers" 
              className={`flex items-center px-4 py-2 mt-1 ${isActive('/customers') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
              {showLabels && <span>Customers</span>}
            </Link>
            <Link 
              to="/deals" 
              className={`flex items-center px-4 py-2 mt-1 ${isActive('/deals') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              {showLabels && <span>Deals</span>}
            </Link>
            <Link 
              to="/tasks" 
              className={`flex items-center px-4 py-2 mt-1 ${isActive('/tasks') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
              </svg>
              {showLabels && <span>Tasks</span>}
            </Link>
            <Link 
              to="/contacts" 
              className={`flex items-center px-4 py-2 mt-1 ${isActive('/contacts') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
              {showLabels && <span>Contacts</span>}
            </Link>
            <Link 
              to="/notes" 
              className={`flex items-center px-4 py-2 mt-1 ${isActive('/notes') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              {showLabels && <span>Notes</span>}
            </Link>
            <Link 
              to="/users" 
              className={`flex items-center px-4 py-2 mt-1 ${isActive('/users') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
              {showLabels && <span>Users</span>}
            </Link>
          </nav>
        </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header with Search */}
        <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <button 
            onClick={toggleSidebar}
            className="md:hidden text-gray-500 dark:text-gray-400 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            <Link 
              to="/about" 
              className={`px-3 py-1 rounded-md text-sm font-medium ${isActive('/about') ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600'}`}
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className={`px-3 py-1 rounded-md text-sm font-medium ${isActive('/contact') ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-600'}`}
            >
              Contact Us
            </Link>
          </div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {location.pathname === '/' && 'Dashboard'}
            {location.pathname === '/customers' && 'Customers'}
            {location.pathname === '/deals' && 'Deals'}
            {location.pathname === '/tasks' && 'Tasks'}
            {location.pathname === '/contacts' && 'Contacts'}
            {location.pathname === '/notes' && 'Notes'}
            {location.pathname === '/users' && 'Users'}
            {location.pathname === '/about' && 'About Us'}
            {location.pathname === '/contact' && 'Contact Us'}
          </h2>
          <div className="flex items-center space-x-6">
            {/* Search Input */}
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery} 
                onChange={handleSearchChange} 
                placeholder="Search..." 
                className="border rounded-md p-2 w-48 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              />
              {isSearching && (
                <span className="absolute right-2 top-2 text-gray-400 dark:text-gray-500">Loading...</span>
              )}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute z-10 bg-white dark:bg-gray-700 border rounded-md shadow-lg mt-1 w-full max-h-60 overflow-y-auto">
                  {searchResults.map((result, index) => (
                    <div 
                      key={index} 
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer border-b last:border-b-0 border-gray-200 dark:border-gray-600"
                      onClick={() => handleResultClick(result)}
                    >
                      <div className="font-medium text-gray-900 dark:text-gray-100">{result.name}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{result.type}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Theme Toggle */}
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
            
            {/* Notification Icon */}
            <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex-shrink-0 relative z-10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
            </button>
            
            {/* User Profile Dropdown */}
            <div className="relative group flex-shrink-0">
              <button className="flex items-center text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300">
                <img className="w-8 h-8 rounded-full" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}`} alt={user?.name || 'User'} />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user?.name || 'User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email || 'user@example.com'}</p>
                </div>
                <button 
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center"
                  aria-label="Logout"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/customers" element={
              <ProtectedRoute>
                <Customers />
              </ProtectedRoute>
            } />
            <Route path="/deals" element={
              <ProtectedRoute>
                <Deals />
              </ProtectedRoute>
            } />
            <Route path="/tasks" element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            } />
            <Route path="/contacts" element={
              <ProtectedRoute>
                <Contacts />
              </ProtectedRoute>
            } />
            <Route path="/notes" element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            } />
            <Route path="/search-results" element={<ProtectedRoute><SearchResults /></ProtectedRoute>} />
            <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />
            <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

// Public Routes Component
const PublicRoutes = () => {
  return (
    <PublicLayout>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Navigate to="/about" replace />} />
        <Route path="/*" element={<Navigate to="/about" replace />} />
      </Routes>
    </PublicLayout>
  );
};

// Main App Component
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AutoLogoutHandler 
          inactivityTimeout={4 * 60 * 1000} // 5 minutes
          gracePeriod={1 * 60 * 1000} // 5 minutes grace period
        />
        <Toaster position="top-right" />
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

// Router component that uses the auth context
const AppRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return user ? <AppContent /> : <PublicRoutes />;
};

export default App;
