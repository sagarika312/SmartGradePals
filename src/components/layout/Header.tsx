
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center">
          <NavLink to="/" className="flex items-center">
            <span className="text-xl font-bold text-brand-600">SmartGrade</span>
          </NavLink>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              <nav className="flex items-center space-x-4">
                <NavLink 
                  to="/dashboard" 
                  className={({ isActive }) => `text-sm font-medium transition-colors hover:text-brand-900 ${isActive ? 'text-brand-700' : 'text-gray-600'}`}
                >
                  Dashboard
                </NavLink>
                <NavLink 
                  to="/grade" 
                  className={({ isActive }) => `text-sm font-medium transition-colors hover:text-brand-900 ${isActive ? 'text-brand-700' : 'text-gray-600'}`}
                >
                  Grade Essays
                </NavLink>
                {user?.role === 'teacher' && (
                  <NavLink 
                    to="/analytics" 
                    className={({ isActive }) => `text-sm font-medium transition-colors hover:text-brand-900 ${isActive ? 'text-brand-700' : 'text-gray-600'}`}
                  >
                    Analytics
                  </NavLink>
                )}
              </nav>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-gray-200 hover:bg-gray-50" size="sm">
                    {user?.name || 'Account'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <NavLink to="/profile" className="w-full">Profile</NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <NavLink to="/login">Sign In</NavLink>
              </Button>
              <Button className="bg-brand-600 hover:bg-brand-700" asChild>
                <NavLink to="/register">Register</NavLink>
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="outline" size="sm" className="border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
