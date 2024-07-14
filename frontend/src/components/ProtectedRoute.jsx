import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Import your AuthContext hook
import LoadingSpinner from './Loading';

const ProtectedRoute = ({ children }) => {
    const { loading, currentUser } = useContext(AuthContext);

  if (loading) {
    // Show a loading indicator or redirect to a temporary page while checking
    return <LoadingSpinner />; // Replace with your loading indicator
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />; // Redirect to login if not authenticated
  }

  return children || <Outlet />; // Render children or Outlet for nested routes
};

export default ProtectedRoute;
