
import React from 'react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="py-12 md:py-24 lg:py-32 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-block rounded-lg bg-brand-100 px-3 py-1 text-sm text-brand-600">
                AI-Powered Education
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none">
                Revolutionize Grading with SmartGrade
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl">
                Our AI-powered platform automates essay grading, provides personalized feedback, and helps students improve their writing skills.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-brand-600 hover:bg-brand-700" size="lg" asChild>
                  <NavLink to="/register">Get Started</NavLink>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <NavLink to="/login">Sign In</NavLink>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mx-0 relative">
              <div className="relative">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-400 to-purple-500 blur-xl opacity-20"></div>
                <img
                  alt="SmartGrade Dashboard Preview"
                  className="mx-auto relative rounded-xl border shadow-xl"
                  src="https://images.unsplash.com/photo-1501290741922-b56c0d0884af?auto=format&fit=crop&q=80&w=2070"
                  width={550}
                  height={300}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 md:py-24 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Key Features</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Our all-in-one platform provides powerful tools for teachers and students
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-16">
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
              <div className="rounded-full bg-brand-100 p-3">
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
                  className="h-6 w-6 text-brand-600"
                >
                  <path d="M14 4h6v6h-6z"></path>
                  <path d="M4 14h6v6H4z"></path>
                  <path d="M17 17v.01"></path>
                  <path d="M7 7v.01"></path>
                  <path d="M14 17h3v3h-3z"></path>
                  <path d="M4 4h6v6H4z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">AI Essay Grading</h3>
              <p className="text-sm text-gray-500 text-center">
                Grade essays instantly with AI-powered feedback that's as accurate as human evaluation
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
              <div className="rounded-full bg-brand-100 p-3">
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
                  className="h-6 w-6 text-brand-600"
                >
                  <path d="M8 3v3a2 2 0 0 1-2 2H3"></path>
                  <path d="M21 8V5a2 2 0 0 0-2-2H8"></path>
                  <path d="M3 16v3a2 2 0 0 0 2 2h8"></path>
                  <path d="M16 21v-2.5a2.5 2.5 0 0 1 5 0V21"></path>
                  <path d="M16 19h4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Personalized Feedback</h3>
              <p className="text-sm text-gray-500 text-center">
                Students receive detailed, actionable feedback tailored to their specific writing style
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
              <div className="rounded-full bg-brand-100 p-3">
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
                  className="h-6 w-6 text-brand-600"
                >
                  <path d="M3 3v18h18"></path>
                  <path d="m19 9-5 5-4-4-3 3"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Teacher Analytics</h3>
              <p className="text-sm text-gray-500 text-center">
                Track student progress and identify common issues with comprehensive analytics
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Trusted by Educators</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                See what teachers and students are saying about SmartGrade
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-16">
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-gray-100 h-10 w-10"></div>
                <div>
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-gray-500">High School English Teacher</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "SmartGrade has saved me countless hours of grading time while providing my students with more detailed feedback than I could ever manage on my own."
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-gray-100 h-10 w-10"></div>
                <div>
                  <p className="text-sm font-medium">Michael Chen</p>
                  <p className="text-xs text-gray-500">College Professor</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "The analytics provided by SmartGrade have helped me identify common areas where students struggle, allowing me to refine my teaching approach."
              </p>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="rounded-full bg-gray-100 h-10 w-10"></div>
                <div>
                  <p className="text-sm font-medium">Emma Rodriguez</p>
                  <p className="text-xs text-gray-500">University Student</p>
                </div>
              </div>
              <p className="mt-4 text-gray-600">
                "The instant feedback from SmartGrade has helped me improve my writing skills faster than ever. I appreciate being able to make corrections before submitting final work."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-12 md:py-24 bg-brand-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Transform Your Grading?</h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Join thousands of educators and students who are already using SmartGrade
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-brand-600 hover:bg-brand-700" size="lg" asChild>
                <NavLink to="/register">Get Started Free</NavLink>
              </Button>
              <Button variant="outline" size="lg">Learn More</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
