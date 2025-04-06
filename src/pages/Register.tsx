
import React from 'react';
import RegisterForm from '@/components/auth/RegisterForm';
import { NavLink, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Register = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Create your account</h1>
          <p className="mt-2 text-sm text-gray-500">
            Already have an account?{' '}
            <NavLink to="/login" className="font-medium text-brand-600 hover:text-brand-500">
              Sign in
            </NavLink>
          </p>
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
