
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import TeacherDashboard from '@/components/dashboard/TeacherDashboard';
import StudentDashboard from '@/components/dashboard/StudentDashboard';
import { Navigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}! Here's an overview of your {user?.role === 'teacher' ? 'class' : 'learning'} activity.
        </p>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <Button asChild>
          <Link to="/grade">Essay Grading</Link>
        </Button>
        <Button asChild>
          <Link to="/mcq">Multiple Choice Questions</Link>
        </Button>
      </div>
      
      {user?.role === 'teacher' ? <TeacherDashboard /> : <StudentDashboard />}
    </div>
  );
};

export default Dashboard;
