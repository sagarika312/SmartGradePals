
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EssayFeedback from './EssayFeedback';
import { gradeEssay } from '@/services/aiService';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

type FeedbackData = {
  score: number;
  overallFeedback: string;
  strengths: string[];
  improvements: string[];
  grammarFeedback: { issue: string; suggestion: string; }[];
};

const EssayGrading = () => {
  const [title, setTitle] = useState('');
  const [essayText, setEssayText] = useState('');
  const [prompt, setPrompt] = useState('');
  const [gradeLevel, setGradeLevel] = useState('college');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (essayText.trim().length < 100) {
      toast.error('Essay is too short. Please enter at least 100 characters.');
      return;
    }
    
    setLoading(true);
    try {
      const result = await gradeEssay(essayText, prompt, gradeLevel, title);
      setFeedback(result);
      toast.success('Essay graded successfully!');
    } catch (error) {
      console.error('Error grading essay:', error);
      toast.error('Failed to grade essay. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="submit" className="space-y-4">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2">
          <TabsTrigger value="submit">Submit Essay</TabsTrigger>
          <TabsTrigger value="feedback" disabled={!feedback}>Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Submit Essay for AI Grading</CardTitle>
              <CardDescription>
                Enter your essay text below and our AI will provide detailed feedback and suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">Essay Title</label>
                  <Input
                    id="title"
                    placeholder="Enter essay title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="prompt" className="text-sm font-medium">Assignment Prompt (Optional)</label>
                  <Textarea
                    id="prompt"
                    placeholder="Enter the original assignment prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="gradeLevel" className="text-sm font-medium">Grade Level</label>
                  <Select value={gradeLevel} onValueChange={setGradeLevel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select grade level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="middle">Middle School</SelectItem>
                      <SelectItem value="high">High School</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="essay" className="text-sm font-medium">Essay Text</label>
                  <Textarea
                    id="essay"
                    placeholder="Paste your essay here"
                    value={essayText}
                    onChange={(e) => setEssayText(e.target.value)}
                    className="min-h-[300px]"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full md:w-auto bg-brand-600 hover:bg-brand-700"
                  disabled={loading || essayText.trim().length < 50}
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Grading...
                    </>
                  ) : (
                    'Grade Essay'
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Your data is processed securely using AI models. Essays are not stored permanently.
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback">
          {feedback && <EssayFeedback feedback={feedback} title={title} />}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EssayGrading;
