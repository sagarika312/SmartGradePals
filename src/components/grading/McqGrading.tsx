
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from '@/context/AuthContext';

// Mock questions
const questionSets = {
  'math-101': [
    {
      id: 1,
      question: 'What is the value of π (pi) rounded to two decimal places?',
      options: ['3.10', '3.14', '3.16', '3.18'],
      correctAnswer: '3.14',
      explanation: 'The mathematical constant π (pi) is approximately equal to 3.14159, which rounds to 3.14 when expressed with two decimal places.'
    },
    {
      id: 2,
      question: 'Which of these is not a prime number?',
      options: ['13', '17', '21', '23'],
      correctAnswer: '21',
      explanation: '21 is divisible by 3 and 7, making it a composite number (21 = 3 × 7). The other options (13, 17, and 23) are all prime numbers.'
    },
    {
      id: 3,
      question: 'If f(x) = 3x² + 2x - 5, what is f(2)?',
      options: ['7', '9', '11', '15'],
      correctAnswer: '15',
      explanation: 'f(2) = 3(2²) + 2(2) - 5 = 3(4) + 4 - 5 = 12 + 4 - 5 = 16 - 5 = 11'
    }
  ],
  'science-101': [
    {
      id: 1,
      question: 'Which of these is NOT a state of matter?',
      options: ['Solid', 'Liquid', 'Gas', 'Energy'],
      correctAnswer: 'Energy',
      explanation: 'Energy is not a state of matter. The four fundamental states of matter are solid, liquid, gas, and plasma.'
    },
    {
      id: 2,
      question: 'What is the chemical symbol for gold?',
      options: ['Au', 'Ag', 'Fe', 'Gd'],
      correctAnswer: 'Au',
      explanation: 'The chemical symbol for gold is Au (from Latin "aurum"). Ag is silver, Fe is iron, and Gd is gadolinium.'
    },
    {
      id: 3,
      question: 'What is the main function of mitochondria in a cell?',
      options: ['Protein synthesis', 'Energy production', 'Cell division', 'Waste removal'],
      correctAnswer: 'Energy production',
      explanation: 'Mitochondria are often called the "powerhouses of the cell" because they generate most of the cell\'s supply of adenosine triphosphate (ATP), which is used as a source of energy.'
    }
  ],
  'history-101': [
    {
      id: 1,
      question: 'In which year did World War II end?',
      options: ['1942', '1945', '1947', '1950'],
      correctAnswer: '1945',
      explanation: 'World War II ended in 1945 with the surrender of Japan on September 2, following the nuclear bombings of Hiroshima and Nagasaki.'
    },
    {
      id: 2,
      question: 'Who was the first President of the United States?',
      options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'James Madison'],
      correctAnswer: 'George Washington',
      explanation: 'George Washington served as the first President of the United States from 1789 to 1797.'
    },
    {
      id: 3,
      question: 'Which of these ancient civilizations was located in modern-day Mexico?',
      options: ['Inca', 'Maya', 'Aztec', 'Both Maya and Aztec'],
      correctAnswer: 'Both Maya and Aztec',
      explanation: 'Both the Maya and Aztec civilizations were located in what is now Mexico. The Inca civilization was centered in Peru.'
    }
  ]
};

const McqGrading: React.FC = () => {
  const { user } = useAuth();
  const [selectedQuizType, setSelectedQuizType] = useState<string>('');
  const [currentQuestions, setCurrentQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanations, setShowExplanations] = useState(false);

  const handleQuizChange = (value: string) => {
    setSelectedQuizType(value);
    setCurrentQuestions(questionSets[value as keyof typeof questionSets] || []);
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setShowExplanations(false);
  };

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = () => {
    // Check if all questions are answered
    if (Object.keys(answers).length < currentQuestions.length) {
      toast.warning('Please answer all questions before submitting');
      return;
    }

    // Calculate score
    let correct = 0;
    currentQuestions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    const finalScore = Math.round((correct / currentQuestions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);

    // In a real app, we would save this to the database
    toast.success(`Quiz submitted! Your score: ${finalScore}%`);
  };

  const requestAiExplanations = () => {
    // In a real app, this would call Gemini API to get AI-powered explanations
    // For now, we'll just show the pre-written explanations
    setShowExplanations(true);
    toast.success('AI explanations loaded');
  };

  if (!selectedQuizType) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Select a Quiz</h3>
              <p className="text-sm text-gray-500 mb-2">Choose a subject to begin</p>
              <Select onValueChange={handleQuizChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="math-101">Mathematics 101</SelectItem>
                  <SelectItem value="science-101">Science 101</SelectItem>
                  <SelectItem value="history-101">History 101</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">
              {selectedQuizType === 'math-101' ? 'Mathematics 101' : 
               selectedQuizType === 'science-101' ? 'Science 101' : 'History 101'} Quiz
            </h3>
            <Button variant="outline" onClick={() => setSelectedQuizType('')}>
              Change Quiz
            </Button>
          </div>

          {!submitted ? (
            <div className="space-y-6">
              {currentQuestions.map((q, idx) => (
                <div key={q.id} className="space-y-3">
                  <h4 className="font-medium">Question {idx + 1}: {q.question}</h4>
                  <RadioGroup onValueChange={(value) => handleAnswerChange(q.id, value)} value={answers[q.id] || ''}>
                    {q.options.map((option: string, i: number) => (
                      <div key={i} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`q${q.id}-option${i}`} />
                        <Label htmlFor={`q${q.id}-option${i}`}>{option}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ))}

              <Button className="w-full" onClick={handleSubmit}>Submit Answers</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-center p-4 bg-muted rounded-lg">
                <h3 className="text-2xl font-bold">{score}%</h3>
                <p>You answered {Math.round((score / 100) * currentQuestions.length)} out of {currentQuestions.length} questions correctly</p>
              </div>

              <div className="space-y-6">
                {currentQuestions.map((q, idx) => {
                  const isCorrect = answers[q.id] === q.correctAnswer;
                  return (
                    <div key={q.id} className="space-y-3">
                      <h4 className="font-medium">Question {idx + 1}: {q.question}</h4>
                      <div className="pl-4 border-l-4 border-gray-200">
                        <p>Your answer: <span className={isCorrect ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          {answers[q.id]}
                        </span></p>
                        <p>Correct answer: <span className="text-green-600 font-medium">{q.correctAnswer}</span></p>
                        
                        {showExplanations && (
                          <div className="mt-2 bg-gray-50 p-3 rounded-md">
                            <p className="text-sm text-gray-700">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {!showExplanations && (
                  <Button onClick={requestAiExplanations} variant="outline" className="flex-1">
                    Get AI Explanations
                  </Button>
                )}
                <Button onClick={() => {
                  setSelectedQuizType('');
                  setSubmitted(false);
                }} variant="outline" className="flex-1">
                  Try Another Quiz
                </Button>
                <Button onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  setScore(0);
                  setShowExplanations(false);
                }} className="flex-1">
                  Retake Quiz
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default McqGrading;
