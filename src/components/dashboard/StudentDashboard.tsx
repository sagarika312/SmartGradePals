
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const StudentDashboard = () => {
  // Mock data
  const recentFeedback = [
    { 
      id: 1, 
      title: 'Climate Change Essay', 
      date: '2025-04-04', 
      score: 85,
      feedback: 'Well-researched arguments with good use of evidence. Consider improving transitions between paragraphs.'
    },
    { 
      id: 2, 
      title: 'Literary Analysis of 1984', 
      date: '2025-03-28', 
      score: 92,
      feedback: 'Excellent analysis of themes and characters. Very insightful interpretation.'
    },
    { 
      id: 3, 
      title: 'Physics Lab Report', 
      date: '2025-03-21', 
      score: 78,
      feedback: 'Data analysis is good, but conclusions need more support from theory.'
    },
  ];
  
  const upcomingAssignments = [
    { id: 1, title: 'Research Paper: Renewable Energy', course: 'Environmental Science', due: '2025-04-15' },
    { id: 2, title: 'Analysis of Macbeth', course: 'English Literature', due: '2025-04-12' },
    { id: 3, title: 'Programming Assignment #4', course: 'Computer Science', due: '2025-04-10' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Assignments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              3 this week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback Received</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              AI-generated insights
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground text-red-500">
              1 due tomorrow
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="feedback" className="space-y-4">
        <TabsList>
          <TabsTrigger value="feedback">Recent Feedback</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Assignments</TabsTrigger>
        </TabsList>
        <TabsContent value="feedback" className="space-y-4">
          {recentFeedback.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{item.title}</CardTitle>
                    <CardDescription>Submitted on {item.date}</CardDescription>
                  </div>
                  <Badge className={`${
                    item.score >= 90 ? 'bg-green-100 text-green-800 hover:bg-green-200' : 
                    item.score >= 80 ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                    'bg-amber-100 text-amber-800 hover:bg-amber-200'
                  }`}>
                    Score: {item.score}/100
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">"{item.feedback}"</p>
                <div className="mt-4">
                  <Button variant="outline" className="text-brand-600 border-brand-300 hover:bg-brand-50">
                    View Full Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="upcoming">
          <div className="rounded-md border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="px-4 py-3 text-left">Assignment</th>
                    <th className="px-4 py-3 text-left">Course</th>
                    <th className="px-4 py-3 text-left">Due Date</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingAssignments.map((assignment) => (
                    <tr key={assignment.id} className="border-t hover:bg-muted/50">
                      <td className="px-4 py-3 font-medium">{assignment.title}</td>
                      <td className="px-4 py-3">{assignment.course}</td>
                      <td className="px-4 py-3">{assignment.due}</td>
                      <td className="px-4 py-3">
                        <Button variant="outline" size="sm">
                          Start
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentDashboard;
