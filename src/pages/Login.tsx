
import React from 'react';
import LoginForm from '@/components/auth/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { Navigate, NavLink } from 'react-router-dom';

const Login = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-500">
            Don't have an account?{' '}
            <NavLink to="/register" className="font-medium text-brand-600 hover:text-brand-500">
              Register now
            </NavLink>
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
