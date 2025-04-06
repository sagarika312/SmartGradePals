
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import McqGrading from '@/components/grading/McqGrading';

const McqGrade = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Multiple Choice Questions</h1>
        <p className="text-muted-foreground">
          Submit your answers to multiple-choice questions for instant grading
        </p>
      </div>
      
      <McqGrading />
    </div>
  );
};

export default McqGrade;
