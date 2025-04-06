
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import EssayGrading from '@/components/grading/EssayGrading';

const Grade = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Essay Grading</h1>
        <p className="text-muted-foreground">
          Submit an essay for AI-powered analysis and feedback
        </p>
      </div>
      
      <EssayGrading />
    </div>
  );
};

export default Grade;
