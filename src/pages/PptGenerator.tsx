
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import PptGeneratorComponent from '@/components/ppt/PptGeneratorComponent';

const PptGenerator = () => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is not a teacher, redirect to dashboard
  if (user?.role !== 'teacher') {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">PPT Generator</h1>
        <p className="text-muted-foreground">
          Generate presentation slides for your teaching materials
        </p>
      </div>
      
      <PptGeneratorComponent />
    </div>
  );
};

export default PptGenerator;
