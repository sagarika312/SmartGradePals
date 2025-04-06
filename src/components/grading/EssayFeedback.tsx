
import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type FeedbackData = {
  score: number;
  overallFeedback: string;
  strengths: string[];
  improvements: string[];
  grammarFeedback: { issue: string; suggestion: string }[];
};

interface EssayFeedbackProps {
  feedback: FeedbackData;
  title: string;
}

const EssayFeedback: React.FC<EssayFeedbackProps> = ({ feedback, title }) => {
  const { score, overallFeedback, strengths, improvements, grammarFeedback } = feedback;
  
  // Determine score color
  const getScoreColor = () => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-xl md:text-2xl">
                {title || 'Essay Feedback'}
              </CardTitle>
              <CardDescription>
                AI-generated feedback and analysis
              </CardDescription>
            </div>
            <div className="text-center">
              <div className="text-sm text-muted-foreground">Score</div>
              <div className={`text-3xl font-bold ${getScoreColor()}`}>
                {score}/100
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">Overall Rating</h3>
              <Progress value={score} className="h-2" />
              <p className="mt-4 text-gray-700">{overallFeedback}</p>
            </div>

            <div>
              <h3 className="font-medium mb-2">Strengths</h3>
              <ul className="list-disc pl-5 space-y-1">
                {strengths.map((strength, index) => (
                  <li key={index} className="text-gray-700">{strength}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-2">Areas for Improvement</h3>
              <ul className="list-disc pl-5 space-y-1">
                {improvements.map((improvement, index) => (
                  <li key={index} className="text-gray-700">{improvement}</li>
                ))}
              </ul>
            </div>

            {grammarFeedback.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Grammar & Style Suggestions</h3>
                <div className="space-y-3">
                  {grammarFeedback.map((item, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline" className="text-amber-500 border-amber-200 bg-amber-50">
                          Issue
                        </Badge>
                        <p className="text-gray-700">{item.issue}</p>
                      </div>
                      <div className="flex items-start gap-2 mt-2">
                        <Badge variant="outline" className="text-green-500 border-green-200 bg-green-50">
                          Suggestion
                        </Badge>
                        <p className="text-gray-700">{item.suggestion}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EssayFeedback;
